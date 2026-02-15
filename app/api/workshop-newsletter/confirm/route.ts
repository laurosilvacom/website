import {NextResponse} from 'next/server'
import {
	confirmWorkshopOptIn,
	getOptionalAppUrl,
} from '@/features/workshop-newsletter/server'

export async function GET(request: Request) {
	const {searchParams} = new URL(request.url)
	const token = searchParams.get('token')
	const appUrl = getOptionalAppUrl()

	if (!token) {
		if (appUrl) {
			return NextResponse.redirect(
				new URL('/workshop-newsletter/confirmed?status=invalid', appUrl),
			)
		}
		return new NextResponse('Missing token', {status: 400})
	}

	try {
		const result = await confirmWorkshopOptIn(token)
		const status =
			result.status === 'success'
				? 'success'
				: result.status === 'invalid'
					? 'invalid'
					: 'error'

		if (result.status === 'error') {
			console.error('Workshop confirm error:', result.errorMessage || 'Unknown error')
		}

		if (appUrl) {
			return NextResponse.redirect(
				new URL(`/workshop-newsletter/confirmed?status=${status}`, appUrl),
			)
		}

		return new NextResponse(
			status === 'success'
				? 'Subscription confirmed'
				: status === 'invalid'
					? 'Invalid or expired token'
					: 'Unable to confirm subscription',
			{status: status === 'success' ? 200 : status === 'invalid' ? 400 : 500},
		)
	} catch (error) {
		console.error('Workshop confirm error:', error)
		if (appUrl) {
			return NextResponse.redirect(
				new URL('/workshop-newsletter/confirmed?status=error', appUrl),
			)
		}
		return new NextResponse('Unable to confirm subscription', {status: 500})
	}
}
