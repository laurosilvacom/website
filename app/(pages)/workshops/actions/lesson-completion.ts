'use server'

import {revalidatePath} from 'next/cache'
import {cookies} from 'next/headers'
import {Lesson} from '@/app/(pages)/workshops/types'
import {getUserData, saveUserData} from './user-data' // Add this import

const COMPLETION_COOKIE_NAME = 'completed_lessons'
const COMPLETION_COOKIE_MAX_AGE = 60 * 60 * 24 * 365 // 1 year in seconds

export async function resetWorkshopProgress(
	workshopSlug: string
): Promise<void> {
	const cookieStore = await cookies()
	const completedLessons = await getCompletedLessons()

	// Filter out all lessons from this workshop
	const updatedLessons = completedLessons.filter(
		(lessonId) => !lessonId.startsWith(`${workshopSlug}/`)
	)

	// Update lesson completion cookie with the filtered list
	cookieStore.set({
		name: COMPLETION_COOKIE_NAME,
		value: JSON.stringify(updatedLessons),
		maxAge: COMPLETION_COOKIE_MAX_AGE,
		path: '/',
		sameSite: 'lax'
	})

	// Also reset the user's workshop start status
	const userData = await getUserData()

	if (
		userData.startedWorkshops &&
		userData.startedWorkshops.includes(workshopSlug)
	) {
		// Remove this workshop from the started workshops list
		const updatedStartedWorkshops = userData.startedWorkshops.filter(
			(slug) => slug !== workshopSlug
		)

		// Update the user data with the modified list
		await saveUserData({
			startedWorkshops: updatedStartedWorkshops
		})
	}

	// Revalidate all relevant paths
	revalidatePath('/workshops/[slug]/lessons/[lessonSlug]')
	revalidatePath(`/workshops/${workshopSlug}`)
	revalidatePath(`/workshops/${workshopSlug}/certificate`)
}

// Get completed lessons
export async function getCompletedLessons(): Promise<string[]> {
	const cookieStore = await cookies()
	const completedLessonsCookie = cookieStore.get(COMPLETION_COOKIE_NAME)

	if (!completedLessonsCookie?.value) {
		return []
	}

	try {
		return JSON.parse(completedLessonsCookie.value)
	} catch (error) {
		console.error('Error parsing completed lessons cookie:', error)
		return []
	}
}

// Toggle lesson completion status
export async function toggleLessonCompletion(
	lessonId: string,
	allLessons: Record<string, Lesson[]>,
	allLessonsFlat?: Lesson[]
): Promise<{
	completed: boolean
	sectionCompleted: boolean
	sectionName: string
	workshopCompleted: boolean
}> {
	const cookieStore = await cookies()
	const completedLessons = await getCompletedLessons()

	const isCompleted = completedLessons.includes(lessonId)
	let updatedLessons: string[]

	// Handle uncompleting
	if (isCompleted) {
		updatedLessons = completedLessons.filter((id) => id !== lessonId)

		// Update cookie
		cookieStore.set({
			name: COMPLETION_COOKIE_NAME,
			value: JSON.stringify(updatedLessons),
			maxAge: COMPLETION_COOKIE_MAX_AGE,
			path: '/',
			sameSite: 'lax'
		})

		revalidatePath('/workshops/[slug]/lessons/[lessonSlug]')

		return {
			completed: false,
			sectionCompleted: false,
			sectionName: '',
			workshopCompleted: false
		}
	}

	// Handle completing
	updatedLessons = [...completedLessons, lessonId]

	// Check if this completed a section
	const [workshopSlug, lessonSlug] = lessonId.split('/')
	let sectionCompleted = false
	let completedSectionName = ''

	// Find which section contains this lesson
	for (const [sectionName, lessons] of Object.entries(allLessons)) {
		// Use lessonSlug to find the current lesson - this makes the code more readable
		const currentLesson = lessons.find((lesson) => lesson.slug === lessonSlug)

		if (currentLesson) {
			// Found the section, now check if all lessons in this section are completed
			const allLessonsInSectionCompleted = lessons.every((lesson) =>
				updatedLessons.includes(`${workshopSlug}/${lesson.slug}`)
			)

			if (allLessonsInSectionCompleted) {
				sectionCompleted = true
				completedSectionName = sectionName
			}

			break
		}
	}

	// Check if entire workshop is completed
	let workshopCompleted = false
	if (allLessonsFlat && allLessonsFlat.length > 0) {
		workshopCompleted = allLessonsFlat.every((lesson) =>
			updatedLessons.includes(`${workshopSlug}/${lesson.slug}`)
		)
	} else {
		// If allLessonsFlat not provided, check using all lessons from sections
		const allWorkshopLessons = Object.values(allLessons).flat()
		workshopCompleted = allWorkshopLessons.every((lesson) =>
			updatedLessons.includes(`${workshopSlug}/${lesson.slug}`)
		)
	}

	// Update cookie
	cookieStore.set({
		name: COMPLETION_COOKIE_NAME,
		value: JSON.stringify(updatedLessons),
		maxAge: COMPLETION_COOKIE_MAX_AGE,
		path: '/',
		sameSite: 'lax'
	})

	revalidatePath('/workshops/[slug]/lessons/[lessonSlug]')

	return {
		completed: true,
		sectionCompleted,
		sectionName: completedSectionName,
		workshopCompleted
	}
}

// Check if a specific lesson is completed
export async function isLessonCompleted(lessonId: string): Promise<boolean> {
	const completedLessons = await getCompletedLessons()
	return completedLessons.includes(lessonId)
}

// Check if all lessons in a workshop are completed
export async function areAllLessonsCompleted(
	workshopSlug: string,
	allLessons: Lesson[]
): Promise<boolean> {
	const completedLessons = await getCompletedLessons()

	// Check if all lessons from this workshop are completed
	return allLessons.every((lesson) =>
		completedLessons.includes(`${workshopSlug}/${lesson.slug}`)
	)
}
