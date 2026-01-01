export function getOptionalAppUrl() {
	// Check multiple possible env var names and provide Vercel URL fallback
	return (
		process.env.NEXT_PUBLIC_APP_URL ||
		process.env.NEXT_PUBLIC_SITE_URL ||
		(process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : undefined)
	)
}

export function getRequiredAppUrl() {
	const appUrl = getOptionalAppUrl()
	if (!appUrl) {
		// In production, this should never happen with Vercel
		console.error(
			'Missing app URL. Set NEXT_PUBLIC_APP_URL or NEXT_PUBLIC_SITE_URL.'
		)
		// Return a safe fallback for production to avoid crashes
		return 'https://laurosilva.com'
	}
	return appUrl
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
