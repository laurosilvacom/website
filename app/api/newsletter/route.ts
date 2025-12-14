import {Resend} from 'resend'
import {NextResponse} from 'next/server'

const resend = new Resend(process.env.RESEND_API_KEY)

export async function POST(request: Request) {
	try {
		const {email, firstName} = await request.json()

		if (!email) {
			return NextResponse.json({error: 'Email is required'}, {status: 400})
		}

		const audienceId = process.env.RESEND_AUDIENCE_ID
		if (!audienceId) {
			console.error('RESEND_AUDIENCE_ID is not configured')
			return NextResponse.json(
				{error: 'Newsletter service not configured'},
				{status: 500}
			)
		}

		const {data, error} = await resend.contacts.create({
			email,
			firstName: firstName || undefined,
			unsubscribed: false,
			audienceId
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
