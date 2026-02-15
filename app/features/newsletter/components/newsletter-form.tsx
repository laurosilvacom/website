'use client'

import {useState} from 'react'
import {Button} from '@/shared/ui/button'

export function NewsletterForm() {
	const [email, setEmail] = useState('')
	const [firstName, setFirstName] = useState('')
	const [honeypot, setHoneypot] = useState(false)
	const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
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
				body: JSON.stringify({email, firstName}),
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
			setErrorMessage(error instanceof Error ? error.message : 'Something went wrong')
		}
	}

	if (status === 'success') {
		return (
			<div className="py-4">
				<p className="text-foreground text-sm font-medium">You&apos;re subscribed!</p>
				<p className="text-muted-foreground text-xs">
					Check your inbox for a confirmation email.
				</p>
			</div>
		)
	}

	return (
		<form onSubmit={handleSubmit} className="max-w-lg">
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

			<div className="flex flex-col gap-2 sm:flex-row sm:items-start">
				<div className="flex-1">
					<label htmlFor="newsletter-firstName" className="sr-only">
						First Name
					</label>
					<input
						id="newsletter-firstName"
						type="text"
						value={firstName}
						onChange={(e) => setFirstName(e.target.value)}
						className="border-border bg-background text-foreground placeholder:text-muted-foreground focus:border-primary focus:ring-primary h-9 w-full rounded-lg border px-3 text-sm transition-colors focus:ring-1 focus:outline-none"
						placeholder="First name"
						aria-describedby="firstName-description"
					/>
					<span id="firstName-description" className="sr-only">
						Your first name is optional
					</span>
				</div>

				<div className="flex-2">
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
						className="border-border bg-background text-foreground placeholder:text-muted-foreground focus:border-primary focus:ring-primary h-9 w-full rounded-lg border px-3 text-sm transition-colors focus:ring-1 focus:outline-none"
						placeholder="you@example.com"
						aria-describedby="email-description"
						aria-required="true"
					/>
					<span id="email-description" className="sr-only">
						Your email address for newsletter subscription
					</span>
				</div>

				<Button
					type="submit"
					size="sm"
					disabled={status === 'loading'}
					className="shrink-0"
					aria-busy={status === 'loading'}>
					{status === 'loading' ? 'Subscribing...' : 'Subscribe'}
				</Button>
			</div>

			{errorMessage && (
				<div role="alert" className="text-destructive mt-2 text-xs font-medium">
					{errorMessage}
				</div>
			)}

			<p className="text-muted-foreground mt-2 text-xs">
				No spam. Unsubscribe anytime.
			</p>
		</form>
	)
}
