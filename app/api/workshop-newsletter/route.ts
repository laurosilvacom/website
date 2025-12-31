import {NextResponse} from 'next/server'
import {createResendContact} from '@/lib/resend'

export async function POST(request: Request) {
	try {
		const {email, firstName, workshopSlug, audienceId} = await request.json()

		if (!email) {
			return NextResponse.json({error: 'Email is required'}, {status: 400})
		}

		if (!audienceId) {
			return NextResponse.json(
				{error: 'Audience ID is required for this workshop'},
				{status: 400}
			)
		}

		const {data, error} = await createResendContact({
			email,
			audienceId,
			firstName: firstName || undefined
		})

		if (error) {
			console.error('Resend error:', error)
			return NextResponse.json({error: error.message}, {status: 400})
		}

		return NextResponse.json({success: true, data}, {status: 200})
	} catch (error) {
		console.error('Workshop newsletter signup error:', error)
		const message =
			error instanceof Error ? error.message : 'Failed to subscribe'
		return NextResponse.json({error: message}, {status: 500})
	}
}
