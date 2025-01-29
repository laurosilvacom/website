'use server'

const BUTTONDOWN_API_KEY =
	process.env.BUTTONDOWN_API_KEY || 'a30e458c-4fbf-4b3c-b6af-52ab95dc67f8'
const BUTTONDOWN_API_URL = 'https://api.buttondown.email/v1/subscribers'
const PENDING_PAGE = '/subscribe-pending'

interface ActionResponse {
	success: boolean
	message: string
	status?: 'pending_verification' | 'subscribed' | 'error'
	redirect?: string
}

export async function subscribeToNewsletter(
	_prevState: ActionResponse,
	formData: FormData
): Promise<ActionResponse> {
	const email = formData.get('email')?.toString().trim()
	const firstName = formData.get('firstName')?.toString().trim()

	// Get metadata from form
	const pageUrl = formData.get('pageUrl')?.toString()
	const pagePath = formData.get('pagePath')?.toString()
	const referrer = formData.get('referrer')?.toString()
	const userAgent = formData.get('userAgent')?.toString()
	const utmSource = formData.get('utmSource')?.toString()
	const utmMedium = formData.get('utmMedium')?.toString()
	const utmCampaign = formData.get('utmCampaign')?.toString()

	if (!email) {
		return {
			success: false,
			message: 'Email is required',
			status: 'error'
		}
	}

	const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
	if (!emailRegex.test(email)) {
		return {
			success: false,
			message: 'Please enter a valid email address',
			status: 'error'
		}
	}

	try {
		const response = await fetch(BUTTONDOWN_API_URL, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Token ${BUTTONDOWN_API_KEY}`,
				'X-Buttondown-Collision-Behavior': 'add'
			},
			body: JSON.stringify({
				email_address: email,
				type: 'unsubscribed',
				metadata: {
					first_name: firstName,
					source: 'website',
					signupPage: pagePath,
					fullUrl: pageUrl,
					referrer: referrer,
					browser: userAgent,
					utm_source: utmSource,
					utm_medium: utmMedium,
					utm_campaign: utmCampaign,
					signupDate: new Date().toISOString()
				}
			})
		})

		if (!response.ok) {
			const error = await response.json()

			if (error.detail?.includes('already subscribed')) {
				return {
					success: false,
					message:
						'This email is already in our system. Please check your inbox for a verification email.',
					status: 'error'
				}
			}

			return {
				success: false,
				message: error.message || 'Failed to subscribe',
				status: 'error'
			}
		}

		return {
			success: true,
			message: 'Subscription successful',
			status: 'pending_verification',
			redirect: PENDING_PAGE
		}
	} catch (error) {
		return {
			success: false,
			message:
				error instanceof Error
					? error.message
					: 'Something went wrong while processing your subscription',
			status: 'error'
		}
	}
}
