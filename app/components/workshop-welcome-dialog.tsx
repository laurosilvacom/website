'use client'

import {useState, useRef} from 'react'
import {useRouter} from 'next/navigation'
import {Button} from '@/components/ui/button'
import {Input} from '@/components/ui/input'
import {Copy, Check} from 'lucide-react'
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
	DialogDescription,
	DialogFooter
} from '@/components/ui/dialog'
import {
	saveUserData,
	markWorkshopStarted
} from '@/app/(pages)/workshops/actions/user-data'

// The test API key that will be used in the workshop
const TEST_API_KEY = 'test-key-340340'

interface WorkshopWelcomeDialogProps {
	open: boolean
	onOpenChange: (open: boolean) => void
	workshopSlug: string
	workshopTitle: string
	firstLessonSlug: string
}

export function WorkshopWelcomeDialog({
	open,
	onOpenChange,
	workshopSlug,
	workshopTitle,
	firstLessonSlug
}: WorkshopWelcomeDialogProps) {
	const [name, setName] = useState('')
	const [isSubmitting, setIsSubmitting] = useState(false)
	const [copied, setCopied] = useState(false)
	const router = useRouter()
	const apiKeyRef = useRef<HTMLInputElement>(null)

	const copyApiKey = () => {
		if (apiKeyRef.current) {
			navigator.clipboard.writeText(apiKeyRef.current.value)
			setCopied(true)
			setTimeout(() => setCopied(false), 2000)
		}
	}

	const handleSubmit = async () => {
		if (!name.trim()) return

		setIsSubmitting(true)
		try {
			// Save user data securely in cookies via server action
			await saveUserData({
				name: name.trim()
			})

			// Mark workshop as started
			await markWorkshopStarted(workshopSlug)

			onOpenChange(false)

			// Navigate to first lesson
			router.push(`/workshops/${workshopSlug}/lessons/${firstLessonSlug}`)
		} catch (error) {
			console.error('Failed to save user data:', error)
		} finally {
			setIsSubmitting(false)
		}
	}

	return (
		<Dialog open={open} onOpenChange={onOpenChange}>
			<DialogContent className="sm:max-w-md">
				<DialogHeader>
					<DialogTitle>Welcome to {workshopTitle}</DialogTitle>
					<DialogDescription>
						Please provide your name for your certificate of completion.
					</DialogDescription>
				</DialogHeader>

				<div className="space-y-6 py-4">
					<div className="space-y-2">
						<label htmlFor="name" className="text-sm font-medium">
							Your Name <span className="text-destructive">*</span>
						</label>
						<Input
							id="name"
							placeholder="John Doe"
							value={name}
							onChange={(e) => setName(e.target.value)}
							className="w-full"
							required
						/>
						<p className="text-muted-foreground text-xs">
							This will appear on your certificate of completion.
						</p>
					</div>

					<div className="space-y-2">
						<label htmlFor="apiKey" className="text-sm font-medium">
							Workshop API Key
						</label>
						<div className="flex">
							<Input
								ref={apiKeyRef}
								id="apiKey"
								value={TEST_API_KEY}
								readOnly
								className="flex-1 rounded-r-none border-r-0"
							/>
							<Button
								type="button"
								variant="outline"
								size="icon"
								className="rounded-l-none border-l-0"
								onClick={copyApiKey}>
								{copied ? (
									<Check className="h-4 w-4" />
								) : (
									<Copy className="h-4 w-4" />
								)}
							</Button>
						</div>
						<p className="text-muted-foreground text-xs">
							You will need this API key during the workshop exercises!
						</p>
					</div>

					<div className="bg-muted text-muted-foreground rounded-md p-3 text-sm">
						<p>
							<strong>Privacy Note:</strong> Your name is stored locally in your
							browser cookies and is only used for the workshop certificate. We
							will not send this data to any servers.
						</p>
					</div>
				</div>

				<DialogFooter>
					<Button
						type="submit"
						onClick={handleSubmit}
						disabled={isSubmitting || !name.trim()}
						className="w-full sm:w-auto">
						{isSubmitting ? 'Saving...' : 'Start Learning'}
					</Button>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	)
}
