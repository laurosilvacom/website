import {NextResponse} from 'next/server'
import {createResendContact} from '@/lib/resend'

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

function sanitizeName(input: string) {
	return input
		.replace(/[^\p{L}\p{N}\s'-]/gu, '')
		.trim()
		.slice(0, 80)
}

export async function POST(request: Request) {
	try {
		const {email, firstName} = await request.json()

		if (typeof email !== 'string' || !email.trim()) {
			return NextResponse.json({error: 'Email is required'}, {status: 400})
		}

		const normalizedEmail = email.trim()
		if (normalizedEmail.length > 320 || !EMAIL_PATTERN.test(normalizedEmail)) {
			return NextResponse.json({error: 'Invalid email format'}, {status: 400})
		}

		const audienceId = process.env.RESEND_AUDIENCE_ID
		if (!audienceId) {
			console.error('RESEND_AUDIENCE_ID is not configured')
			return NextResponse.json(
				{error: 'Newsletter service not configured'},
				{status: 500}
			)
		}

		let sanitizedFirstName: string | undefined
		if (typeof firstName === 'string') {
			const cleaned = sanitizeName(firstName)
			if (cleaned) sanitizedFirstName = cleaned
		}

		const {data, error} = await createResendContact({
			email: normalizedEmail,
			audienceId,
			firstName: sanitizedFirstName
		})

		if (error) {
			console.error('Resend error:', error)
			return NextResponse.json({error: error.message}, {status: 400})
		}

		return NextResponse.json({success: true, data}, {status: 200})
	} catch (error) {
		console.error('Newsletter signup error:', error)
		return NextResponse.json({error: 'Failed to subscribe'}, {status: 500})
	}
}
