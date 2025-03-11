'use client'

import {useState} from 'react'
import {Button} from '@/components/ui/button'
import {WorkshopWelcomeDialog} from './workshop-welcome-dialog'

interface StartWorkshopButtonProps {
	workshopSlug: string
	workshopTitle: string
	firstLessonSlug: string
}

export function StartWorkshopButton({
	workshopSlug,
	workshopTitle,
	firstLessonSlug
}: StartWorkshopButtonProps) {
	const [dialogOpen, setDialogOpen] = useState(false)

	return (
		<>
			<Button
				className="w-full justify-center"
				size="lg"
				onClick={() => setDialogOpen(true)}>
				Start Workshop
			</Button>

			<WorkshopWelcomeDialog
				open={dialogOpen}
				onOpenChange={setDialogOpen}
				workshopSlug={workshopSlug}
				workshopTitle={workshopTitle}
				firstLessonSlug={firstLessonSlug}
			/>
		</>
	)
}
