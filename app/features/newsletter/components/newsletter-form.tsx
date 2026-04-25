'use client'

import {useState} from 'react'
import {Button} from '@/shared/ui/button'
import {Input} from '@/shared/ui/input'
import {Alert, AlertDescription, AlertTitle} from '@/shared/ui/alert'

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
			<Alert className="max-w-lg py-3">
				<AlertTitle>You&apos;re subscribed!</AlertTitle>
				<AlertDescription>
					Check your inbox for a confirmation email.
				</AlertDescription>
			</Alert>
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
					<Input
						id="newsletter-firstName"
						type="text"
						value={firstName}
						onChange={(e) => setFirstName(e.target.value)}
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
					<Input
						id="newsletter-email"
						type="email"
						value={email}
						onChange={(e) => setEmail(e.target.value)}
						required
						autoComplete="email"
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
				<Alert variant="destructive" className="mt-3 py-2.5">
					<AlertDescription>{errorMessage}</AlertDescription>
				</Alert>
			)}

			<p className="text-muted-foreground mt-2 text-xs">No spam. Unsubscribe anytime.</p>
		</form>
	)
}
