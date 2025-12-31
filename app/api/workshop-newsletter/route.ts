import {NextResponse} from 'next/server'
import {createResendContact} from '@/lib/resend'

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export async function POST(request: Request) {
	try {
		const {email, firstName, workshopSlug, audienceId} = await request.json()

		if (typeof email !== 'string' || !email.trim()) {
			return NextResponse.json({error: 'Email is required'}, {status: 400})
		}

		const normalizedEmail = email.trim()

		if (!EMAIL_PATTERN.test(normalizedEmail)) {
			return NextResponse.json({error: 'Invalid email format'}, {status: 400})
		}

		if (typeof audienceId !== 'string' || !audienceId.trim()) {
			return NextResponse.json(
				{error: 'Audience ID is required for this workshop'},
				{status: 400}
			)
		}

		let sanitizedFirstName: string | undefined
		if (typeof firstName === 'string') {
			// Allow letters, numbers, spaces, apostrophes, and hyphens; strip other characters.
			const cleaned = firstName.replace(/[^\p{L}\p{N}\s'-]/gu, '').trim()
			if (cleaned) {
				sanitizedFirstName = cleaned
			}
		}

		const {data, error} = await createResendContact({
			email: normalizedEmail,
			audienceId: audienceId.trim(),
			firstName: sanitizedFirstName
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
