'use client'

import {useRouter} from 'next/navigation'
import {useActionState, useEffect, useState} from 'react'
import {useFormStatus} from 'react-dom'
import {subscribeToNewsletter} from '../actions/newsletter'

function SubmitButton() {
	const {pending} = useFormStatus()

	return (
		<button
			type="submit"
			disabled={pending}
			className="bg-primary text-primary-foreground hover:bg-primary/90 w-full rounded-xl px-8 py-3 text-base font-medium transition-all hover:-translate-y-0.5 disabled:opacity-50 md:text-lg">
			{pending ? 'Subscribing...' : 'Subscribe'}
		</button>
	)
}

const initialState = {
	message: '',
	success: false,
	status: undefined,
	redirect: undefined
}

export function NewsletterForm() {
	const router = useRouter()
	const [state, formAction] = useActionState(
		subscribeToNewsletter,
		initialState
	)
	const [pageMetadata, setPageMetadata] = useState({
		url: '',
		path: '',
		referrer: '',
		userAgent: '',
		utmSource: '',
		utmMedium: '',
		utmCampaign: ''
	})

	// Collect metadata on component mount
	useEffect(() => {
		const urlParams = new URLSearchParams(window.location.search)

		setPageMetadata({
			url: window.location.href,
			path: window.location.pathname,
			referrer: document.referrer,
			userAgent: window.navigator.userAgent,
			utmSource: urlParams.get('utm_source') || '',
			utmMedium: urlParams.get('utm_medium') || '',
			utmCampaign: urlParams.get('utm_campaign') || ''
		})
	}, [])

	// Handle redirect using useEffect
	useEffect(() => {
		if (state?.redirect) {
			router.push(state.redirect)
		}
	}, [state?.redirect, router])

	return (
		<form action={formAction} className="space-y-6">
			{/* Hidden metadata fields */}
			<input type="hidden" name="pageUrl" value={pageMetadata.url} />
			<input type="hidden" name="pagePath" value={pageMetadata.path} />
			<input type="hidden" name="referrer" value={pageMetadata.referrer} />
			<input type="hidden" name="userAgent" value={pageMetadata.userAgent} />
			<input type="hidden" name="utmSource" value={pageMetadata.utmSource} />
			<input type="hidden" name="utmMedium" value={pageMetadata.utmMedium} />
			<input
				type="hidden"
				name="utmCampaign"
				value={pageMetadata.utmCampaign}
			/>

			{/* Visible form fields */}
			<div className="space-y-4">
				<label htmlFor="firstName" className="sr-only">
					First Name
				</label>
				<input
					id="firstName"
					name="firstName"
					type="text"
					placeholder="First Name"
					className="border-input bg-background text-foreground placeholder:text-primary hover:border-primary focus-visible:border-primary focus-visible:ring-primary w-full rounded-xl border px-4 py-3 text-base transition-colors focus-visible:ring-2 focus-visible:outline-none md:text-lg"
				/>
			</div>

			<div>
				<label htmlFor="email" className="sr-only">
					Enter your email
				</label>
				<input
					id="email"
					name="email"
					type="email"
					placeholder="you@example.com"
					className="border-input bg-background text-foreground placeholder:text-primary hover:border-primary focus-visible:border-primary focus-visible:ring-primary w-full rounded-xl border px-4 py-3 text-base transition-colors focus-visible:ring-2 focus-visible:outline-none md:text-lg"
					required
				/>
			</div>

			<SubmitButton />

			{state?.message && !state.redirect && (
				<p
					className={`text-center text-sm ${
						state.success ? 'text-green-500' : 'text-red-500'
					}`}>
					{state.message}
				</p>
			)}
		</form>
	)
}
