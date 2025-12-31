import {del, head, put} from '@vercel/blob'
import {createResendContact, sendResendEmail} from '@/lib/resend'

const TOKEN_TTL_SECONDS = 60 * 60 * 48 // 48 hours
const OPT_IN_PREFIX = 'workshop-optin'

export type WorkshopOptInRequestBody = {
	email?: unknown
	firstName?: unknown
	workshopSlug?: unknown
	audienceId?: unknown
}

export type WorkshopOptInRecord = {
	email: string
	firstName: string
	workshopSlug: string
	audienceId: string
	expiresAt: number
}

export type WorkshopOptInStartResult = {
	token: string
	confirmUrl: string
}

export function getOptionalAppUrl() {
	return process.env.NEXT_PUBLIC_APP_URL || process.env.NEXT_PUBLIC_SITE_URL
}

export function getBlobToken() {
	const token = process.env.BLOB_READ_WRITE_TOKEN
	if (!token) {
		throw new Error('BLOB_READ_WRITE_TOKEN is not configured')
	}
	return token
}

export function getWorkshopResendFrom() {
	return process.env.RESEND_FROM || 'Workshops <me@laurosilva.com>'
}

export function parseWorkshopOptInBody(body: WorkshopOptInRequestBody) {
	const email = typeof body.email === 'string' ? body.email.trim() : ''
	const firstName =
		typeof body.firstName === 'string' ? body.firstName.trim() : ''
	const workshopSlug =
		typeof body.workshopSlug === 'string' ? body.workshopSlug.trim() : ''
	const audienceId =
		typeof body.audienceId === 'string' ? body.audienceId.trim() : ''

	return {email, firstName, workshopSlug, audienceId}
}

export function getOptInPath(token: string) {
	return `${OPT_IN_PREFIX}/${token}.json`
}

export async function storeOptInRecord(
	token: string,
	record: WorkshopOptInRecord
) {
	const blobToken = getBlobToken()
	await put(getOptInPath(token), JSON.stringify(record), {
		access: 'public',
		contentType: 'application/json',
		token: blobToken
	})
}

export async function deleteOptInRecord(token: string) {
	const blobToken = getBlobToken()
	await del(getOptInPath(token), {token: blobToken})
}

export async function readOptInRecord(token: string) {
	const blobToken = getBlobToken()
	const meta = await head(getOptInPath(token), {token: blobToken}).catch(
		() => undefined
	)
	if (!meta?.url) return null

	const response = await fetch(meta.url, {cache: 'no-store'})
	if (!response.ok) return null

	const record = (await response.json()) as Partial<WorkshopOptInRecord>
	if (
		!record ||
		typeof record.email !== 'string' ||
		typeof record.audienceId !== 'string' ||
		typeof record.expiresAt !== 'number'
	) {
		return null
	}

	return {
		email: record.email,
		firstName: typeof record.firstName === 'string' ? record.firstName : '',
		workshopSlug:
			typeof record.workshopSlug === 'string' ? record.workshopSlug : '',
		audienceId: record.audienceId,
		expiresAt: record.expiresAt
	} satisfies WorkshopOptInRecord
}

export async function startWorkshopOptIn(args: {
	email: string
	firstName: string
	workshopSlug: string
	audienceId: string
}) {
	if (!args.email) {
		throw new Error('Email is required')
	}
	if (!args.audienceId) {
		throw new Error('Audience ID is required for this workshop')
	}

	const appUrl = getOptionalAppUrl()
	if (!appUrl) {
		throw new Error(
			'NEXT_PUBLIC_APP_URL or NEXT_PUBLIC_SITE_URL is not configured'
		)
	}

	const token = crypto.randomUUID()
	const record: WorkshopOptInRecord = {
		email: args.email,
		firstName: args.firstName || '',
		workshopSlug: args.workshopSlug || '',
		audienceId: args.audienceId,
		expiresAt: Date.now() + TOKEN_TTL_SECONDS * 1000
	}

	await storeOptInRecord(token, record)

	const confirmUrl = `${appUrl}/api/workshop-newsletter/confirm?token=${token}`
	const fromAddress = getWorkshopResendFrom()

	const {error} = await sendResendEmail({
		from: fromAddress,
		to: args.email,
		subject: 'Confirm your subscription',
		html: `
			<h2>Confirm your subscription</h2>
			<p>Thanks for joining the waitlist. Please confirm your email to finish signing up.</p>
			<p><a href="${confirmUrl}" style="color:#0070f3;font-weight:600">Confirm subscription</a></p>
			<p style="color:#666;font-size:12px">If you did not request this, you can ignore this email.</p>
		`
	})

	if (error) {
		throw new Error(error.message)
	}

	return {token, confirmUrl} satisfies WorkshopOptInStartResult
}

export async function confirmWorkshopOptIn(token: string) {
	const record = await readOptInRecord(token)
	if (!record) return {status: 'invalid'} as const

	if (Date.now() > record.expiresAt) {
		await deleteOptInRecord(token)
		return {status: 'invalid'} as const
	}

	const {error} = await createResendContact({
		email: record.email,
		audienceId: record.audienceId,
		firstName: record.firstName || undefined
	})

	if (error) {
		const message = typeof error.message === 'string' ? error.message : ''
		const isDuplicate = message.toLowerCase().includes('already')
		if (!isDuplicate) {
			return {status: 'error', errorMessage: message} as const
		}
	}

	await deleteOptInRecord(token)
	return {status: 'success'} as const
}
