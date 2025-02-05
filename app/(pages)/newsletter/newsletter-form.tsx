'use client'

import {useRouter} from 'next/navigation'
import {useActionState, useEffect, useState} from 'react'
import {useFormStatus} from 'react-dom'
import {subscribeToNewsletter} from './actions/newsletter'

function SubmitButton() {
	const {pending} = useFormStatus()

	return (
		<button
			type="submit"
			disabled={pending}
			className="bg-primary text-primary-foreground focus:ring-primary/50 w-full rounded-xl px-8 py-3.5 text-base font-medium transition-all duration-200 hover:-translate-y-0.5 hover:opacity-90 focus:ring-2 focus:outline-none disabled:cursor-not-allowed disabled:opacity-50 md:text-lg">
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
			// Use the new router.push() pattern for App Router
			router.push(state.redirect)
		}
	}, [state?.redirect, router])

	return (
		<form action={formAction} className="space-y-8">
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
			<div className="space-y-6">
				<div>
					<label
						htmlFor="firstName"
						className="text-muted-foreground mb-2 block text-sm font-medium">
						First Name
					</label>
					<input
						id="firstName"
						name="firstName"
						type="text"
						placeholder="John"
						className="border-input bg-background text-foreground placeholder:text-muted-foreground/60 hover:border-primary/50 focus:border-primary focus:ring-primary/20 w-full rounded-xl border px-4 py-3.5 text-base focus:ring-2 focus:outline-none md:text-lg"
					/>
				</div>

				<div>
					<label
						htmlFor="email"
						className="text-muted-foreground mb-2 block text-sm font-medium">
						Email address
					</label>
					<input
						id="email"
						name="email"
						type="email"
						placeholder="you@example.com"
						className="border-input bg-background text-foreground placeholder:text-muted-foreground/60 hover:border-primary/50 focus:border-primary focus:ring-primary/20 w-full rounded-xl border px-4 py-3.5 text-base focus:ring-2 focus:outline-none md:text-lg"
						required
					/>
				</div>
			</div>

			<SubmitButton />

			{state?.message && !state.redirect && (
				<div
					className={`rounded-lg p-4 text-center text-sm ${
						state.success
							? 'bg-green-500/10 text-green-500'
							: 'bg-destructive/10 text-destructive'
					}`}>
					{state.message}
				</div>
			)}
		</form>
	)
}
