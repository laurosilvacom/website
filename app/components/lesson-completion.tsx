'use client'

import {useState, useTransition, useEffect} from 'react'
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
import {getUserData} from '@/app/(pages)/workshops/actions/user-data'

// Dynamically import react-confetti to avoid SSR issues
const ReactConfetti = dynamic(() => import('react-confetti'), {ssr: false})

// Section completion messages
const sectionCompletionMessages = [
	'Oh snap, {name}! You just crushed this entire section!',
	'Dude, {name}! That was sick! Section complete!',
	'Hot tip: {name} is absolutely CRUSHING this workshop right now!',
	"That's what I'm talking about, {name}! Section finished like a boss!",
	'Boom! {name} just leveled up their skills with this section!',
	"Honestly {name}, I'm super impressed with how you're working through this!",
	'Wicked! {name} is making this section look easy!',
	"Yo {name}! That's some serious progress right there!",
	'Check this out - {name} just finished another section. So good!',
	"That's bananas, {name}! You're really getting the hang of this!"
]

// Workshop completion messages in David Rochefort's (Syntax podcast) style
const workshopCompletionMessages = [
	'HOLY MOLY {name}! You just crushed the ENTIRE workshop!',
	'Daaaaaang {name}! You actually did it! The whole workshop - COMPLETE!',
	'ABSOLUTELY BONKERS, {name}! Workshop: DONE AND DUSTED!',
	"This is NEXT LEVEL, {name}! You've mastered EVERYTHING in this workshop!",
	'OH MY GOODNESS! {name} just became a certified BADASS by finishing this workshop!',
	'WHAT THE WHAT?! {name} just DOMINATED this entire workshop!',
	"That's BANANAS, {name}! You've officially CRUSHED IT from start to finish!",
	"LEGENDARY STATUS achieved, {name}! This workshop didn't stand a chance!",
	'ARE YOU KIDDING ME?! {name} just POWERED through this entire workshop!',
	"HOLY SMOKES {name}! You're an absolute MACHINE - workshop DEMOLISHED!"
]

interface LessonCompletionProps {
	workshopSlug: string
	lessonSlug: string
	initialCompletionState: boolean
	variant?: 'icon' | 'button'
	lessonsBySection: Record<
		string,
		import('@/app/(pages)/workshops/types').Lesson[]
	>
	allLessons: import('@/app/(pages)/workshops/types').Lesson[]
	// Add a prop for the next lesson slug
	nextLessonSlug?: string
}

export function LessonCompletion({
	workshopSlug,
	lessonSlug,
	initialCompletionState,
	variant = 'icon',
	lessonsBySection,
	allLessons,
	nextLessonSlug
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
	const [userName, setUserName] = useState('')
	const [motivationalMessage, setMotivationalMessage] = useState('')
	const [completionType, setCompletionType] = useState<'section' | 'workshop'>(
		'section'
	)

	useEffect(() => {
		const fetchUserData = async () => {
			try {
				const data = await getUserData()
				if (data.name) {
					// Use optional chaining and nullish coalescing for type safety
					const firstName = data.name.split(' ')[0] ?? ''
					setUserName(firstName)
				}
			} catch (error) {
				console.error('Failed to fetch user data:', error)
			}
		}

		fetchUserData()
	}, [])

	// Generate a random motivational message
	const getRandomMessage = (messageArray: string[]) => {
		if (messageArray.length === 0) {
			return 'Great job!' // Default message if array is empty
		}

		const randomIndex = Math.floor(Math.random() * messageArray.length)
		const message = messageArray[randomIndex]
		// Add null check to handle potential undefined message
		return (
			message?.replace('{name}', userName || 'you') ||
			`Great job, ${userName || 'you'}!`
		)
	}
	// Generate a unique ID for this lesson
	const lessonId = `${workshopSlug}/${lessonSlug}`

	// Handle dismissing the celebration
	const dismissCelebration = () => {
		setShowCelebration(false)

		// If workshop is completed, redirect to certificate after dismissing
		if (workshopCompleted) {
			router.push(`/workshops/${workshopSlug}/certificate`)
		} else if (completionType === 'section' && nextLessonSlug) {
			// If a section was completed, navigate to the next lesson
			router.push(`/workshops/${workshopSlug}/lessons/${nextLessonSlug}`)
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
						allLessons
					)

					// Handle different completion scenarios
					if (result.workshopCompleted) {
						// Workshop completion - show special celebration
						setCompletionType('workshop')
						setMotivationalMessage(getRandomMessage(workshopCompletionMessages))
						setWorkshopCompleted(true)
						setCompletedSection('Entire Workshop')
						setShowCelebration(true)
					} else if (result.sectionCompleted) {
						// Section completion - show celebration
						setCompletionType('section')
						setMotivationalMessage(getRandomMessage(sectionCompletionMessages))
						setCompletedSection(result.sectionName)
						setShowCelebration(true)
					} else if (nextLessonSlug) {
						// Regular lesson completion - redirect to next lesson
						router.push(`/workshops/${workshopSlug}/lessons/${nextLessonSlug}`)
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
					await toggleLessonCompletion(lessonId, lessonsBySection, allLessons)
				} catch (error) {
					console.error('Error toggling lesson completion:', error)
					setCompleted(true) // Revert optimistic UI update on error
				}
			}
		})
	}

	// Get confetti pieces based on completion type
	const getConfettiPieces = () => {
		return completionType === 'workshop' ? 500 : 200
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
							{completed ? (
								<>
									<CheckCircle className="text-primary-foreground mr-1.5 inline-block h-3 w-3" />
									<span>
										{userName ? `Great job, ${userName}!` : 'Lesson completed!'}
									</span>
								</>
							) : (
								<>
									<Circle className="text-primary-foreground mr-1.5 inline-block h-3 w-3" />
									<span>Mark as complete</span>
								</>
							)}
						</TooltipContent>
					</Tooltip>
				</TooltipProvider>

				{/* Celebration Modal - Only for section/workshop completions */}
				{showCelebration && (
					<div
						className="fixed inset-0 z-50 flex items-center justify-center bg-black/60"
						onClick={dismissCelebration}>
						{/* Confetti overlay */}
						<div className="pointer-events-none fixed inset-0">
							<ReactConfetti
								width={width}
								height={height}
								recycle={false}
								numberOfPieces={getConfettiPieces()}
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

						{/* Celebration message box with improved design */}
						<div
							className={`bg-card relative mx-4 max-w-md rounded-xl border-2 ${
								completionType === 'workshop'
									? 'border-primary shadow-[0_0_30px_rgba(245,213,71,0.3)]'
									: 'border-primary/70 shadow-lg'
							} overflow-hidden`}
							onClick={(e) => e.stopPropagation()}>
							{/* Top color bar */}
							<div
								className={`h-2 w-full ${
									completionType === 'workshop' ? 'bg-primary' : 'bg-primary/70'
								}`}></div>

							<div className="px-8 py-10">
								{/* Icon and heading */}
								<div className="mb-6 flex items-center justify-center">
									<div
										className={`mb-5 rounded-full p-3 ${
											completionType === 'workshop'
												? 'bg-primary/20 text-4xl'
												: 'bg-primary/10 text-3xl'
										}`}>
										{completionType === 'workshop' ? '🏆' : '🎉'}
									</div>
								</div>

								{/* Title */}
								<h2
									className={`text-center font-bold ${
										completionType === 'workshop'
											? 'text-primary mb-4 text-3xl'
											: 'mb-3 text-2xl'
									}`}>
									{completionType === 'workshop'
										? 'Workshop Completed!'
										: 'Section Completed!'}
								</h2>

								{/* Personalized message */}
								<p
									className={`mb-4 text-center ${
										completionType === 'workshop'
											? 'text-xl font-semibold'
											: 'text-lg font-medium'
									}`}>
									{motivationalMessage}
								</p>

								{/* Additional context */}
								<p className="text-muted-foreground mb-8 text-center">
									{completionType === 'workshop'
										? `You've mastered the entire workshop!`
										: `You've completed the "${completedSection}" section!`}
								</p>

								{/* Action button */}
								<Button
									className={`w-full ${
										completionType === 'workshop' ? 'animate-pulse text-lg' : ''
									}`}
									onClick={dismissCelebration}>
									{completionType === 'workshop'
										? 'Get Your Certificate!'
										: 'Continue to Next Section'}
								</Button>
							</div>
						</div>
					</div>
				)}
			</>
		)
	}

	// Button variant (similar changes)
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

			{/* Celebration Modal - Only for section/workshop completions */}
			{showCelebration && (
				<div
					className="fixed inset-0 z-50 flex items-center justify-center bg-black/60"
					onClick={dismissCelebration}>
					{/* Confetti overlay */}
					<div className="pointer-events-none fixed inset-0">
						<ReactConfetti
							width={width}
							height={height}
							recycle={false}
							numberOfPieces={getConfettiPieces()}
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

					{/* Celebration message box with improved design */}
					<div
						className={`bg-card relative mx-4 max-w-md rounded-xl border-2 ${
							completionType === 'workshop'
								? 'border-primary shadow-[0_0_30px_rgba(245,213,71,0.3)]'
								: 'border-primary/70 shadow-lg'
						} overflow-hidden`}
						onClick={(e) => e.stopPropagation()}>
						{/* Top color bar */}
						<div
							className={`h-2 w-full ${
								completionType === 'workshop' ? 'bg-primary' : 'bg-primary/70'
							}`}></div>

						<div className="px-8 py-10">
							{/* Icon and heading */}
							<div className="mb-6 flex items-center justify-center">
								<div
									className={`text-foreground mb-5 rounded-full p-3 ${
										completionType === 'workshop'
											? 'bg-primary/20 text-4xl'
											: 'bg-primary/10 text-3xl'
									}`}>
									{completionType === 'workshop' ? '🏆' : '🎉'}
								</div>
							</div>

							{/* Title */}
							<h2
								className={`text-center font-bold ${
									completionType === 'workshop'
										? 'text-primary mb-4 text-3xl'
										: 'mb-3 text-2xl'
								}`}>
								{completionType === 'workshop'
									? 'Workshop Completed!'
									: 'Section Completed!'}
							</h2>

							{/* Personalized message */}
							<p
								className={`mb-4 text-center ${
									completionType === 'workshop'
										? 'text-xl font-semibold'
										: 'text-lg font-medium'
								}`}>
								{motivationalMessage}
							</p>

							{/* Additional context */}
							<p className="text-muted-foreground mb-8 text-center">
								{completionType === 'workshop'
									? `You've mastered the entire workshop!`
									: `You've completed the "${completedSection}" section!`}
							</p>

							{/* Action button */}
							<button
								className={`text-foreground w-full rounded-lg py-3 text-center font-medium transition-all ${
									completionType === 'workshop'
										? 'bg-primary text-foreground hover:bg-primary/90 animate-pulse text-lg'
										: 'bg-primary/90 text-foreground hover:bg-primary/80'
								}`}
								onClick={dismissCelebration}>
								{completionType === 'workshop'
									? 'Get Your Certificate!'
									: 'Continue to Next Section'}
							</button>
						</div>
					</div>
				</div>
			)}
		</>
	)
}
