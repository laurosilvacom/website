// app/api/revalidate/route.ts
import {revalidateTag} from 'next/cache'
import {type NextRequest, NextResponse} from 'next/server'
import {parseBody} from 'next-sanity/webhook'

// Define a secret to secure the webhook
const SANITY_WEBHOOK_SECRET = process.env.SANITY_WEBHOOK_SECRET

export async function POST(req: NextRequest) {
	if (!SANITY_WEBHOOK_SECRET) {
		return new NextResponse('Missing SANITY_WEBHOOK_SECRET', {status: 500})
	}

	try {
		const {body, isValidSignature} = await parseBody<{
			_type: string
			slug?: {current: string}
		}>(req, SANITY_WEBHOOK_SECRET)

		if (!isValidSignature) {
			return new NextResponse('Invalid signature', {status: 401})
		}

		if (body?._type === 'post') {
			// Using revalidateTag to revalidate all pages that use the 'post' tag
			revalidateTag('post')
			return NextResponse.json({
				status: 200,
				revalidated: true,
				now: Date.now(),
				body
			})
		}

		return new NextResponse('No revalidation needed', {status: 200})
	} catch (error: any) {
		console.error('Error during revalidation:', error)
		return new NextResponse(error.message || 'Error revalidating', {
			status: 500
		})
	}
}
