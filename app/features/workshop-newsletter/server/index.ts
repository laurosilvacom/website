import {del, head, put} from '@vercel/blob'
import {createResendContact, sendResendEmail} from '@/shared/integrations/resend'
import {
	enqueueWorkshopDripCampaign,
	processWorkshopDripQueue,
	inspectWorkshopDripQueue,
} from './queue'
import {
	EMAIL_PATTERN,
	OPT_IN_PREFIX,
	TOKEN_TTL_SECONDS,
	type WorkshopOptInRecord,
	type WorkshopOptInRequestBody,
	type WorkshopOptInStartResult,
} from './types'
import {getBlobToken, getRequiredAppUrl, getWorkshopResendFrom} from './config'

export {enqueueWorkshopDripCampaign, processWorkshopDripQueue, inspectWorkshopDripQueue}
export {getOptionalAppUrl} from './config'
export type {WorkshopOptInRequestBody} from './types'

function sanitizeName(input: string) {
	// Allow letters, numbers, spaces, apostrophes, and hyphens; strip other characters.
	return input
		.replace(/[^\p{L}\p{N}\s'-]/gu, '')
		.trim()
		.slice(0, 80)
}

function isValidEmail(email: string) {
	if (email.length > 320) return false
	return EMAIL_PATTERN.test(email)
}

function isTrustedVercelBlobUrl(urlString: string, expectedPathname: string) {
	let url: URL
	try {
		url = new URL(urlString)
	} catch {
		return false
	}

	if (url.protocol !== 'https:') return false
	if (!url.hostname.endsWith('blob.vercel-storage.com')) return false
	if (url.pathname !== `/${expectedPathname}`) return false

	return true
}

export function parseWorkshopOptInBody(body: WorkshopOptInRequestBody) {
	const email = typeof body.email === 'string' ? body.email.trim() : ''
	const firstName = typeof body.firstName === 'string' ? sanitizeName(body.firstName) : ''
	const workshopSlug =
		typeof body.workshopSlug === 'string' ? body.workshopSlug.trim() : ''
	const audienceId = typeof body.audienceId === 'string' ? body.audienceId.trim() : ''

	return {email, firstName, workshopSlug, audienceId}
}

export function getOptInPath(token: string) {
	return `${OPT_IN_PREFIX}/${token}.json`
}

export async function storeOptInRecord(token: string, record: WorkshopOptInRecord) {
	const blobToken = getBlobToken()
	await put(getOptInPath(token), JSON.stringify(record), {
		access: 'public',
		contentType: 'application/json',
		token: blobToken,
	})
}

export async function deleteOptInRecord(token: string) {
	const blobToken = getBlobToken()
	await del(getOptInPath(token), {token: blobToken})
}

export async function readOptInRecord(token: string) {
	const blobToken = getBlobToken()
	const pathname = getOptInPath(token)
	const meta = await head(pathname, {token: blobToken}).catch(() => undefined)
	if (!meta?.url) return null
	if (!isTrustedVercelBlobUrl(meta.url, pathname)) return null

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
		workshopSlug: typeof record.workshopSlug === 'string' ? record.workshopSlug : '',
		audienceId: record.audienceId,
		expiresAt: record.expiresAt,
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
	if (!isValidEmail(args.email)) {
		throw new Error('Invalid email format')
	}
	if (!args.audienceId) {
		throw new Error('Audience ID is required for this workshop')
	}

	const appUrl = getRequiredAppUrl()

	const token = crypto.randomUUID()
	const record: WorkshopOptInRecord = {
		email: args.email,
		firstName: args.firstName ? sanitizeName(args.firstName) : '',
		workshopSlug: args.workshopSlug || '',
		audienceId: args.audienceId,
		expiresAt: Date.now() + TOKEN_TTL_SECONDS * 1000,
	}

	await storeOptInRecord(token, record)

	const confirmUrl = `${appUrl}/api/workshop-newsletter/confirm?token=${token}`
	const fromAddress = getWorkshopResendFrom()

	const {error} = await sendResendEmail({
		from: fromAddress,
		to: args.email,
		subject: 'Confirm your email to start learning',
		html: `
			<!doctype html>
			<html lang="en">
				<body style="margin:0;padding:0;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;background:#f8f9fb;">
					<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="width:100%;border-collapse:collapse;">
						<tr>
							<td align="center" style="padding:40px 16px;">
								<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="max-width:480px;width:100%;border-collapse:collapse;background:#ffffff;border-radius:12px;overflow:hidden;box-shadow:0 4px 24px rgba(15,23,42,0.08);">
									<tr>
										<td style="padding:32px;">
											<h1 style="margin:0 0 16px 0;font-size:24px;font-weight:700;color:#0f172a;text-align:center;">One click to start</h1>
											<p style="margin:0 0 24px 0;font-size:16px;line-height:1.6;color:#475569;text-align:center;">Confirm your email to begin your free email course. Your first lesson is ready to go.</p>
											<div style="text-align:center;">
												<a href="${confirmUrl}" style="display:inline-block;padding:14px 32px;background:#0f172a;color:#ffffff;text-decoration:none;border-radius:8px;font-weight:600;font-size:16px;">Start Learning →</a>
											</div>
										</td>
									</tr>
								</table>
								<p style="margin:24px 0 0 0;font-size:12px;color:#94a3b8;text-align:center;">Didn't request this? You can safely ignore this email.</p>
							</td>
						</tr>
					</table>
				</body>
			</html>
		`,
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
		firstName: record.firstName || undefined,
	})

	if (error) {
		const message = typeof error.message === 'string' ? error.message : ''
		const isDuplicate = message.toLowerCase().includes('already')
		if (!isDuplicate) {
			return {status: 'error', errorMessage: message} as const
		}
	}

	try {
		const enqueueResult = await enqueueWorkshopDripCampaign({
			email: record.email,
			firstName: record.firstName,
			workshopSlug: record.workshopSlug,
		})

		// In test mode, send ALL emails immediately (no cron needed for testing)
		if (enqueueResult?.status === 'queued' && enqueueResult.isTest) {
			// Wait for all emails to become due (1 sec stagger per email)
			const waitMs = enqueueResult.count * 1_000 + 500
			await new Promise((r) => setTimeout(r, waitMs))
			// Now process all
			await processWorkshopDripQueue()
		}
	} catch (enqueueError) {
		console.error('Workshop drip enqueue error', enqueueError)
	}

	await deleteOptInRecord(token)
	return {status: 'success'} as const
}
