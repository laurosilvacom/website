import {NextResponse} from 'next/server'
import {
	parseWorkshopOptInBody,
	startWorkshopOptIn,
	type WorkshopOptInRequestBody,
} from '@/features/workshop-newsletter/server'

// Legacy endpoint now delegates to double opt-in so sequences only start after confirmation.
export async function POST(request: Request) {
	try {
		const rawBody = (await request.json()) as WorkshopOptInRequestBody
		const {email, firstName, workshopSlug, audienceId} = parseWorkshopOptInBody(rawBody)

		await startWorkshopOptIn({
			email,
			firstName,
			workshopSlug,
			audienceId,
		})

		return NextResponse.json({success: true, pending: true}, {status: 200})
	} catch (error) {
		console.error('Workshop newsletter signup error:', error)
		const message = error instanceof Error ? error.message : 'Failed to subscribe'
		const status =
			message === 'Email is required' ||
			message === 'Audience ID is required for this workshop'
				? 400
				: 500
		return NextResponse.json({error: message}, {status})
	}
}
