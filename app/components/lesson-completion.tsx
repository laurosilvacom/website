'use client'

import {useState, useTransition} from 'react'
import {Check, CheckCircle, Circle} from 'lucide-react'
import {Button} from '@/components/ui/button'
import {
	Tooltip,
	TooltipContent,
	TooltipProvider,
	TooltipTrigger
} from '@/components/ui/tooltip'
import {toggleLessonCompletion} from '@/app/(pages)/workshops/actions/lesson-completion'
import dynamic from 'next/dynamic'
import {useWindowSize} from 'react-use'
import {useRouter} from 'next/navigation'

// Dynamically import react-confetti to avoid SSR issues
const ReactConfetti = dynamic(() => import('react-confetti'), {ssr: false})

interface LessonCompletionProps {
	workshopSlug: string
	lessonSlug: string
	initialCompletionState: boolean
	variant?: 'icon' | 'button'
	lessonsBySection: Record<
		string,
		import('@/app/(pages)/workshops/types').Lesson[]
	>
	allLessons?: import('@/app/(pages)/workshops/types').Lesson[] // Optional
}

export function LessonCompletion({
	workshopSlug,
	lessonSlug,
	initialCompletionState,
	variant = 'icon',
	lessonsBySection,
	allLessons
}: LessonCompletionProps) {
	// Track if we're in a pending state
	const [isPending, startTransition] = useTransition()
	const {width, height} = useWindowSize()
	const router = useRouter()

	// Track completion state
	const [completed, setCompleted] = useState(initialCompletionState)
	const [showCelebration, setShowCelebration] = useState(false)
	const [completedSection, setCompletedSection] = useState('')
	const [workshopCompleted, setWorkshopCompleted] = useState(false)

	// Generate a unique ID for this lesson
	const lessonId = `${workshopSlug}/${lessonSlug}`

	// Handle dismissing the celebration
	const dismissCelebration = () => {
		setShowCelebration(false)

		// If workshop is completed, redirect to certificate after dismissing
		if (workshopCompleted) {
			router.push(`/workshops/${workshopSlug}/certificate`)
		}
	}

	// Toggle lesson completion status
	const handleToggleCompletion = () => {
		// Avoid toggling again while pending
		if (isPending) return

		// Wrap the update in startTransition to avoid React errors
		startTransition(async () => {
			// Only process if marking as complete (not uncompleting)
			if (!completed) {
				// Optimistically update the UI
				setCompleted(true)

				try {
					// Call server action with the lesson sections data
					const result = await toggleLessonCompletion(
						lessonId,
						lessonsBySection,
						allLessons || Object.values(lessonsBySection).flat()
					)

					// If a section was completed, show celebration immediately
					if (result.sectionCompleted) {
						setCompletedSection(result.sectionName)
						setShowCelebration(true)
					}

					// If the entire workshop is completed, update state and show special celebration
					if (result.workshopCompleted) {
						setWorkshopCompleted(true)
						// If we didn't already trigger celebration for section completion
						if (!result.sectionCompleted) {
							setCompletedSection('Entire Workshop')
							setShowCelebration(true)
						}
					}
				} catch (error) {
					console.error('Error toggling lesson completion:', error)
					// Revert optimistic UI update on error
					setCompleted(initialCompletionState)
				}
			} else {
				// Just unmark as completed
				setCompleted(false)
				try {
					await toggleLessonCompletion(
						lessonId,
						lessonsBySection,
						allLessons || Object.values(lessonsBySection).flat()
					)
				} catch (error) {
					console.error('Error toggling lesson completion:', error)
					setCompleted(true) // Revert optimistic UI update on error
				}
			}
		})
	}

	if (variant === 'icon') {
		return (
			<>
				<TooltipProvider>
					<Tooltip>
						<TooltipTrigger asChild>
							<Button
								variant="ghost"
								size="sm"
								onClick={handleToggleCompletion}
								disabled={isPending}
								className="text-muted-foreground hover:text-foreground">
								{completed ? (
									<CheckCircle className="text-primary h-4 w-4" />
								) : (
									<Circle className="h-4 w-4" />
								)}
								<span className="sr-only">
									{completed ? 'Mark as incomplete' : 'Mark as complete'}
								</span>
							</Button>
						</TooltipTrigger>
						<TooltipContent>
							{completed ? 'Mark as incomplete' : 'Mark as complete'}
						</TooltipContent>
					</Tooltip>
				</TooltipProvider>

				{/* Celebration Modal */}
				{showCelebration && (
					<div
						className="fixed inset-0 z-50 flex items-center justify-center bg-black/40"
						onClick={dismissCelebration}>
						{/* Confetti overlay */}
						<div className="pointer-events-none fixed inset-0">
							<ReactConfetti
								width={width}
								height={height}
								recycle={false}
								numberOfPieces={500}
								gravity={0.15}
								colors={[
									'#F5D547', // Primary gold/yellow
									'#F7E174', // Lighter gold
									'#E6B91E', // Deeper gold
									'#D69E2E', // Gold-orange
									'#38A169', // Complementary green
									'#3182CE' // Complementary blue
								]}
							/>
						</div>

						{/* Celebration message */}
						<div
							className="bg-card border-border text-foreground mx-4 max-w-sm rounded-lg border px-6 py-4 shadow-lg"
							onClick={(e) => e.stopPropagation()}>
							<h3 className="flex items-center gap-2 text-xl font-bold">
								<span className="text-primary bg-primary/10 rounded-full p-1">
									🎉
								</span>
								{workshopCompleted
									? 'Workshop Completed!'
									: 'Section Completed!'}
							</h3>
							<p className="text-muted-foreground mt-2">
								{workshopCompleted
									? `Congratulations! You've completed the entire workshop!`
									: `You've completed the "${completedSection}" section!`}
							</p>
							<button
								className="bg-primary text-primary-foreground hover:bg-primary/90 mt-4 w-full rounded-md py-2 transition-colors"
								onClick={dismissCelebration}>
								{workshopCompleted ? 'Get Certificate' : 'Continue Learning'}
							</button>
						</div>
					</div>
				)}
			</>
		)
	}

	return (
		<>
			<Button
				variant={completed ? 'default' : 'outline'}
				className={`gap-2 ${completed ? 'bg-primary' : ''}`}
				onClick={handleToggleCompletion}
				disabled={isPending}>
				{completed ? (
					<>
						<Check className="h-4 w-4" />
						{isPending ? 'Updating...' : 'Lesson Completed'}
					</>
				) : (
					<>
						<Circle className="h-4 w-4" />
						{isPending ? 'Updating...' : 'Mark Lesson as Complete'}
					</>
				)}
			</Button>

			{/* Celebration Modal */}
			{showCelebration && (
				<div
					className="fixed inset-0 z-50 flex items-center justify-center bg-black/40"
					onClick={dismissCelebration}>
					{/* Confetti overlay */}
					<div className="pointer-events-none fixed inset-0">
						<ReactConfetti
							width={width}
							height={height}
							recycle={false}
							numberOfPieces={500}
							gravity={0.15}
							colors={[
								'#F5D547', // Primary gold/yellow
								'#F7E174', // Lighter gold
								'#E6B91E', // Deeper gold
								'#D69E2E', // Gold-orange
								'#38A169', // Complementary green
								'#3182CE' // Complementary blue
							]}
						/>
					</div>

					{/* Celebration message */}
					<div
						className="bg-card border-border text-foreground mx-4 max-w-sm rounded-lg border px-6 py-4 shadow-lg"
						onClick={(e) => e.stopPropagation()}>
						<h3 className="flex items-center gap-2 text-xl font-bold">
							<span className="text-primary bg-primary/10 rounded-full p-1">
								🎉
							</span>
							{workshopCompleted ? 'Workshop Completed!' : 'Section Completed!'}
						</h3>
						<p className="text-muted-foreground mt-2">
							{workshopCompleted
								? `Congratulations! You've completed the entire workshop!`
								: `You've completed the "${completedSection}" section!`}
						</p>
						<button
							className="bg-primary text-primary-foreground hover:bg-primary/90 mt-4 w-full rounded-md py-2 transition-colors"
							onClick={dismissCelebration}>
							{workshopCompleted ? 'Get Certificate' : 'Continue Learning'}
						</button>
					</div>
				</div>
			)}
		</>
	)
}
