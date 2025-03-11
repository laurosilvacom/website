'use client'

import {useState} from 'react'
import Link from 'next/link'
import {WorkshopWelcomeDialog} from '@/components/workshop-welcome-dialog'

interface LessonLinkProps {
	lessonSlug: string
	lessonTitle: string
	workshopSlug: string
	workshopTitle: string
	isCompleted: boolean
	hasUserStarted: boolean
}

export function LessonLink({
	lessonSlug,
	lessonTitle,
	workshopSlug,
	workshopTitle,
	isCompleted,
	hasUserStarted
}: LessonLinkProps) {
	const [dialogOpen, setDialogOpen] = useState(false)

	// If user has already started the workshop, just use a regular link
	if (hasUserStarted) {
		return (
			<Link
				href={`/workshops/${workshopSlug}/lessons/${lessonSlug}`}
				className={`${isCompleted ? 'text-primary' : 'text-foreground hover:text-primary'} flex-1 hover:underline`}>
				{lessonTitle}
			</Link>
		)
	}

	// If user hasn't started, show the dialog when clicked
	return (
		<>
			<button
				onClick={() => setDialogOpen(true)}
				className={`text-foreground hover:text-primary flex-1 text-left hover:underline`}>
				{lessonTitle}
			</button>

			<WorkshopWelcomeDialog
				open={dialogOpen}
				onOpenChange={setDialogOpen}
				workshopSlug={workshopSlug}
				workshopTitle={workshopTitle}
				firstLessonSlug={lessonSlug}
			/>
		</>
	)
}
