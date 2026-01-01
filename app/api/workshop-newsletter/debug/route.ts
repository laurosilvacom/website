import {NextResponse} from 'next/server'
import {inspectWorkshopDripQueue} from '@/lib/workshop-newsletter'

export const runtime = 'nodejs'

/**
 * Debug endpoint to inspect the drip queue state.
 * Shows all scheduled deliveries, when they're due, etc.
 *
 * Usage: GET /api/workshop-newsletter/debug
 */
export async function GET() {
	// Only allow in development
	if (process.env.NODE_ENV === 'production') {
		return NextResponse.json(
			{error: 'Not available in production'},
			{status: 403}
		)
	}

	const result = await inspectWorkshopDripQueue()
	return NextResponse.json(result, {status: 200})
}
