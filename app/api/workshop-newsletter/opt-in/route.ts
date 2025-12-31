import {NextResponse} from 'next/server'
import {
	parseWorkshopOptInBody,
	startWorkshopOptIn
} from '@/lib/workshop-newsletter'

export async function POST(request: Request) {
	try {
		const rawBody = (await request.json()) as any
		const {email, firstName, workshopSlug, audienceId} =
			parseWorkshopOptInBody(rawBody)

		await startWorkshopOptIn({
			email,
			firstName,
			workshopSlug,
			audienceId
		})

		return NextResponse.json({success: true, pending: true}, {status: 200})
	} catch (error) {
		console.error('Workshop opt-in error:', error)
		const message =
			error instanceof Error ? error.message : 'Failed to start opt-in'
		const status =
			message === 'Email is required' ||
			message === 'Audience ID is required for this workshop'
				? 400
				: 500
		return NextResponse.json({message}, {status})
	}
}
