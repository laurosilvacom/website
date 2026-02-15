import {NextResponse} from 'next/server'
import {processWorkshopDripQueue} from '@/features/workshop-newsletter/server'

export const runtime = 'nodejs'

export async function POST() {
	const result = await processWorkshopDripQueue()
	return NextResponse.json({success: true, ...result})
}

export async function GET() {
	return POST()
}
