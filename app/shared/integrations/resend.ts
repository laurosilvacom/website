import {Resend} from 'resend'

let cachedClient: Resend | null = null

export function getResendClient(): Resend {
	const apiKey = process.env.RESEND_API_KEY
	if (!apiKey) {
		throw new Error('RESEND_API_KEY is not configured')
	}

	if (!cachedClient) {
		cachedClient = new Resend(apiKey)
	}

	return cachedClient
}

export type CreateContactInput = {
	email: string
	audienceId: string
	firstName?: string
}

export async function createResendContact(input: CreateContactInput) {
	const resend = getResendClient()
	return resend.contacts.create({
		email: input.email,
		audienceId: input.audienceId,
		firstName: input.firstName || undefined,
		unsubscribed: false,
	})
}

export type SendEmailInput = {
	from: string
	to: string
	subject: string
	html: string
}

export async function sendResendEmail(input: SendEmailInput) {
	const resend = getResendClient()
	return resend.emails.send({
		from: input.from,
		to: input.to,
		subject: input.subject,
		html: input.html,
	})
}
