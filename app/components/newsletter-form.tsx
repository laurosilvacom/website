'use client'

import {useState} from 'react'

export function NewsletterForm() {
	const [email, setEmail] = useState('')
	const [firstName, setFirstName] = useState('')
	const [honeypot, setHoneypot] = useState(false)
	const [status, setStatus] = useState<
		'idle' | 'loading' | 'success' | 'error'
	>('idle')
	const [errorMessage, setErrorMessage] = useState('')

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault()

		if (honeypot) {
			return
		}

		setStatus('loading')
		setErrorMessage('')

		try {
			const response = await fetch('/api/newsletter', {
				method: 'POST',
				headers: {'Content-Type': 'application/json'},
				body: JSON.stringify({email, firstName})
			})

			const data = await response.json()

			if (!response.ok) {
				throw new Error(data.error || 'Failed to subscribe')
			}

			setStatus('success')
			setEmail('')
			setFirstName('')
		} catch (error) {
			setStatus('error')
			setErrorMessage(
				error instanceof Error ? error.message : 'Something went wrong'
			)
		}
	}

	if (status === 'success') {
		return (
			<div className="w-full max-w-md py-12 text-center">
				<div className="mb-6 text-6xl" role="img" aria-label="Party popper">
					🎉
				</div>
				<h2
					className="text-foreground mb-3 text-2xl font-bold"
					style={{
						fontFamily: 'Elan ITC Std, serif',
						letterSpacing: '-0.03em'
					}}>
					You're subscribed!
				</h2>
				<p className="text-muted-foreground text-base">
					Check your inbox for a confirmation email.
				</p>
			</div>
		)
	}

	return (
		<form onSubmit={handleSubmit} className="w-full max-w-xl">
			{/* Honeypot */}
			<input
				type="checkbox"
				name="accept-terms"
				tabIndex={-1}
				autoComplete="off"
				className="hidden"
				checked={honeypot}
				onChange={(e) => setHoneypot(e.target.checked)}
				aria-hidden="true"
			/>

			<div className="flex flex-col gap-3 sm:flex-row sm:items-start">
				{/* First Name */}
				<div className="flex-1">
					<label htmlFor="newsletter-firstName" className="sr-only">
						First Name
					</label>
					<input
						id="newsletter-firstName"
						type="text"
						value={firstName}
						onChange={(e) => setFirstName(e.target.value)}
						className="border-border bg-background text-foreground placeholder:text-muted-foreground focus:border-primary focus:ring-primary w-full rounded-md border px-4 py-3 text-base transition-colors focus:ring-1 focus:outline-none"
						placeholder="First name"
						aria-describedby="firstName-description"
					/>
					<span id="firstName-description" className="sr-only">
						Your first name is optional
					</span>
				</div>

				{/* Email */}
				<div className="flex-[2]">
					<label htmlFor="newsletter-email" className="sr-only">
						Email address (required)
					</label>
					<input
						id="newsletter-email"
						type="email"
						value={email}
						onChange={(e) => setEmail(e.target.value)}
						required
						autoComplete="email"
						className="border-border bg-background text-foreground placeholder:text-muted-foreground focus:border-primary focus:ring-primary w-full rounded-md border px-4 py-3 text-base transition-colors focus:ring-1 focus:outline-none"
						placeholder="you@example.com"
						aria-describedby="email-description"
						aria-required="true"
					/>
					<span id="email-description" className="sr-only">
						Your email address for newsletter subscription
					</span>
				</div>

				{/* Submit Button */}
				<button
					type="submit"
					disabled={status === 'loading'}
					className="bg-foreground text-background focus:ring-ring rounded-md px-8 py-3 text-base font-medium transition-all hover:opacity-90 focus:ring-2 focus:ring-offset-2 active:scale-[0.98] disabled:transform-none disabled:cursor-not-allowed disabled:opacity-50 sm:flex-shrink-0"
					aria-busy={status === 'loading'}>
					{status === 'loading' ? 'Subscribing...' : 'Subscribe'}
				</button>
			</div>

			{/* Error Message */}
			{errorMessage && (
				<div role="alert" className="text-destructive mt-3 text-sm font-medium">
					{errorMessage}
				</div>
			)}

			{/* Privacy Note */}
			<p className="text-muted-foreground mt-3 text-sm">
				No spam. Unsubscribe anytime.
			</p>
		</form>
	)
}
