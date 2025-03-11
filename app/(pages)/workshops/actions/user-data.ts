'use server'

import {cookies} from 'next/headers'
import {revalidatePath} from 'next/cache'

const USER_DATA_COOKIE_NAME = 'user_workshop_data'
const COOKIE_MAX_AGE = 60 * 60 * 24 * 365 // 1 year in seconds

export interface UserWorkshopData {
	name?: string
	email?: string
	startedWorkshops: string[]
}

export async function getUserData(): Promise<UserWorkshopData> {
	const cookieStore = await cookies()
	const userDataCookie = cookieStore.get(USER_DATA_COOKIE_NAME)

	if (!userDataCookie?.value) {
		return {startedWorkshops: []}
	}

	try {
		return JSON.parse(userDataCookie.value)
	} catch (error) {
		console.error('Error parsing user data cookie:', error)
		return {startedWorkshops: []}
	}
}

export async function saveUserData(
	data: Partial<UserWorkshopData>
): Promise<void> {
	const cookieStore = await cookies()
	const currentData = await getUserData()

	// Merge existing data with new data
	const updatedData = {
		...currentData,
		...data
	}

	// Update cookie - use secure flags for production
	cookieStore.set({
		name: USER_DATA_COOKIE_NAME,
		value: JSON.stringify(updatedData),
		maxAge: COOKIE_MAX_AGE,
		path: '/',
		httpOnly: true, // Prevents JavaScript access to the cookie
		secure: process.env.NODE_ENV === 'production', // Only use HTTPS in production
		sameSite: 'lax'
	})

	// Revalidate appropriate paths to ensure updated data is shown
	if (data.name) {
		// Revalidate certificate pages if name was updated
		for (const slug of updatedData.startedWorkshops) {
			revalidatePath(`/workshops/${slug}/certificate`)
		}
	}
}

export async function hasStartedWorkshop(slug: string): Promise<boolean> {
	const userData = await getUserData()
	return userData.startedWorkshops.includes(slug)
}

export async function markWorkshopStarted(slug: string): Promise<void> {
	const userData = await getUserData()

	if (!userData.startedWorkshops.includes(slug)) {
		await saveUserData({
			startedWorkshops: [...userData.startedWorkshops, slug]
		})

		// Revalidate the workshop page
		revalidatePath(`/workshops/${slug}`)
	}
}
