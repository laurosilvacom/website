'use client'

import {useState} from 'react'
import {Button} from '@/components/ui/button'
import {RotateCcw} from 'lucide-react'
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
	DialogDescription,
	DialogFooter,
	DialogClose
} from '@/components/ui/dialog'
import {resetWorkshopProgress} from '@/app/(pages)/workshops/actions/lesson-completion'

interface ResetProgressButtonProps {
	workshopSlug: string
}

export function ResetProgressButton({workshopSlug}: ResetProgressButtonProps) {
	const [open, setOpen] = useState(false)
	const [isResetting, setIsResetting] = useState(false)

	const handleReset = async () => {
		setIsResetting(true)
		try {
			await resetWorkshopProgress(workshopSlug)
			// Reload the page to reflect the changes
			window.location.reload()
		} catch (error) {
			console.error('Error resetting progress:', error)
			setIsResetting(false)
			setOpen(false)
		}
	}

	return (
		<>
			<Button
				variant="outline"
				className="text-muted-foreground hover:text-destructive gap-2"
				onClick={() => setOpen(true)}>
				<RotateCcw className="h-4 w-4" />
				Reset Progress
			</Button>

			<Dialog open={open} onOpenChange={setOpen}>
				<DialogContent className="sm:max-w-md">
					<DialogHeader>
						<DialogTitle>Reset Workshop Progress</DialogTitle>
						<DialogDescription>
							This will clear all your completed lessons for this workshop. This
							action cannot be undone.
						</DialogDescription>
					</DialogHeader>

					<DialogFooter className="flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2">
						<DialogClose asChild>
							<Button type="button" variant="secondary">
								Cancel
							</Button>
						</DialogClose>
						<Button
							variant="destructive"
							onClick={handleReset}
							disabled={isResetting}>
							{isResetting ? 'Resetting...' : 'Reset Progress'}
						</Button>
					</DialogFooter>
				</DialogContent>
			</Dialog>
		</>
	)
}
