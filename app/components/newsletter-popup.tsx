'use client'

import {useState, useEffect} from 'react'
import {cn} from '@/lib/utils'

export function NewsletterPopup() {
	const [showBubble, setShowBubble] = useState(false)
	const [showModal, setShowModal] = useState(false)
	const [email, setEmail] = useState('')
	const [firstName, setFirstName] = useState('')
	const [honeypot, setHoneypot] = useState(false)
	const [status, setStatus] = useState<
		'idle' | 'loading' | 'success' | 'error'
	>('idle')
	const [errorMessage, setErrorMessage] = useState('')

	useEffect(() => {
		const dismissed = localStorage.getItem('newsletter-dismissed')
		const subscribed = localStorage.getItem('newsletter-subscribed')

		if (dismissed || subscribed) {
			return
		}

		const timer = setTimeout(() => {
			setShowBubble(true)
		}, 5000)

		return () => clearTimeout(timer)
	}, [])

	const handleDismiss = () => {
		setShowBubble(false)
		setShowModal(false)
		localStorage.setItem('newsletter-dismissed', 'true')
	}

	const handleAccept = () => {
		setShowBubble(false)
		setShowModal(true)
	}

	const handleDecline = () => {
		setShowBubble(false)
		localStorage.setItem('newsletter-dismissed', 'true')
	}

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
			localStorage.setItem('newsletter-subscribed', 'true')

			setTimeout(() => {
				setShowModal(false)
			}, 2000)
		} catch (error) {
			setStatus('error')
			setErrorMessage(
				error instanceof Error ? error.message : 'Something went wrong'
			)
		}
	}

	if (!showBubble && !showModal) {
		return null
	}

	return (
		<>
			{/* Speech Bubble */}
			{showBubble && (
				<div
					className="fixed right-4 bottom-4 left-4 z-50 max-w-sm sm:right-auto sm:bottom-8 sm:left-8"
					style={{
						animation: 'fadeInUp 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards'
					}}
					role="dialog"
					aria-labelledby="bubble-heading"
					aria-describedby="bubble-description">
					<div className="flex flex-col items-center gap-4 sm:flex-row sm:items-end">
						<img
							src="/newsletter-icon.png"
							alt=""
							role="presentation"
							className="h-16 w-16 animate-[float_3s_ease-in-out_infinite] object-contain sm:h-20 sm:w-20"
							style={{filter: 'none'}}
						/>
						<div className="border-border bg-card relative w-full rounded-xl border-2 p-4 shadow-[4px_4px_0px_0px_var(--border)] sm:p-6">
							<div className="border-border bg-card absolute bottom-8 -left-2 hidden h-4 w-4 rotate-45 border-b-2 border-l-2 sm:block" />
							<p
								id="bubble-description"
								className="text-foreground mb-4 text-sm leading-relaxed sm:text-base">
								Hi friend! Hope I didn't startle you. Can I tell you about my
								newsletter?
							</p>
							<div className="flex flex-col gap-3 sm:flex-row">
								<button
									onClick={handleAccept}
									className="bg-primary text-primary-foreground focus:ring-ring rounded-lg px-4 py-2.5 text-sm font-medium transition-all hover:opacity-90 focus:ring-2 focus:ring-offset-2 active:scale-95 sm:py-2"
									aria-label="Accept newsletter subscription">
									Sure!
								</button>
								<button
									onClick={handleDecline}
									className="border-border bg-card text-foreground hover:bg-muted focus:ring-ring rounded-lg border-2 px-4 py-2.5 text-sm font-medium transition-all focus:ring-2 focus:ring-offset-2 active:scale-95 sm:py-2"
									aria-label="Decline newsletter subscription">
									No thanks
								</button>
							</div>
						</div>
					</div>
				</div>
			)}

			{/* Full Modal */}
			{showModal && (
				<div
					className="bg-background/80 fixed inset-0 z-50 flex items-center justify-center p-4 backdrop-blur-sm"
					style={{
						animation: 'fadeIn 0.3s cubic-bezier(0.16, 1, 0.3, 1) forwards'
					}}
					role="dialog"
					aria-modal="true"
					aria-labelledby="modal-heading"
					onClick={handleDismiss}>
					<div
						className="border-border bg-card relative max-h-[90vh] w-full max-w-lg overflow-y-auto rounded-xl border-2 shadow-[8px_8px_0px_0px_var(--border)]"
						style={{
							animation: 'fadeInUp 0.4s cubic-bezier(0.16, 1, 0.3, 1) forwards'
						}}
						onClick={(e) => e.stopPropagation()}>
						<button
							onClick={handleDismiss}
							className="text-foreground/60 hover:bg-muted hover:text-foreground focus:ring-ring sticky top-4 right-4 z-10 mr-4 ml-auto flex items-center justify-center rounded-lg p-2 transition-colors focus:ring-2 focus:ring-offset-2"
							aria-label="Close newsletter dialog">
							<svg
								xmlns="http://www.w3.org/2000/svg"
								width="20"
								height="20"
								viewBox="0 0 24 24"
								fill="none"
								stroke="currentColor"
								strokeWidth="2"
								strokeLinecap="round"
								strokeLinejoin="round"
								aria-hidden="true">
								<path d="M18 6 6 18" />
								<path d="m6 6 12 12" />
							</svg>
						</button>

						{/* Header with illustration */}
						<div className="from-primary/20 to-primary/10 -mt-12 flex items-center justify-center rounded-t-xl bg-gradient-to-br px-6 py-12 sm:px-10 sm:py-16">
							<img
								src="/newsletter-icon.png"
								alt=""
								role="presentation"
								className="h-24 w-24 animate-[float_3s_ease-in-out_infinite] object-contain sm:h-32 sm:w-32"
								style={{filter: 'none'}}
							/>
						</div>

						{/* Content */}
						<div className="bg-card rounded-b-xl px-6 pt-6 pb-8 sm:px-10 sm:pt-8 sm:pb-10">
							{status === 'success' ? (
								<div className="py-8 text-center sm:py-12">
									<div
										className="mb-4 text-5xl sm:mb-6 sm:text-6xl"
										role="img"
										aria-label="Party popper">
										🎉
									</div>
									<h2
										id="modal-heading"
										className="text-foreground mb-2 text-xl font-bold sm:mb-3 sm:text-2xl">
										You're subscribed!
									</h2>
									<p className="text-muted-foreground text-sm sm:text-base">
										Thanks for joining the newsletter.
									</p>
								</div>
							) : (
								<>
									{/* Heading */}
									<h2
										id="modal-heading"
										className="text-foreground mb-6 text-xl leading-tight font-bold sm:mb-8 sm:text-2xl">
										Get insights on software, trails, and community
									</h2>

									{/* Description */}
									<div className="mb-8 space-y-4 sm:mb-10 sm:space-y-5">
										<p className="text-foreground/90 text-sm leading-relaxed sm:text-[15px]">
											I write about building software for the outdoor industry,
											lessons from the trails, and what I'm learning about
											growing inclusive communities. Subscribers get new posts
											and occasional insights that don't make it to the blog.
										</p>

										<p className="text-foreground/90 text-sm leading-relaxed sm:text-[15px]">
											No spam. Just thoughtful writing when I have something
											worth sharing.
										</p>
									</div>

									{/* Form */}
									<form
										onSubmit={handleSubmit}
										className="space-y-4 sm:space-y-5">
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

										<div>
											<label
												htmlFor="firstName"
												className="text-foreground mb-2 block text-sm font-medium sm:mb-2.5">
												First Name{' '}
												<span className="text-muted-foreground font-normal">
													(optional)
												</span>
											</label>
											<input
												id="firstName"
												type="text"
												value={firstName}
												onChange={(e) => setFirstName(e.target.value)}
												className="border-input bg-background text-foreground focus:border-ring focus:ring-ring/20 w-full rounded-lg border-2 px-4 py-3 text-sm transition-colors focus:ring-2 focus:outline-none sm:text-[15px]"
												placeholder="Alex"
												aria-describedby="firstName-description"
											/>
											<span id="firstName-description" className="sr-only">
												Your first name is optional
											</span>
										</div>

										<div>
											<label
												htmlFor="email"
												className="text-foreground mb-2 block text-sm font-medium sm:mb-2.5">
												Email{' '}
												<span
													className="text-destructive"
													aria-label="required">
													*
												</span>
											</label>
											<input
												id="email"
												type="email"
												value={email}
												onChange={(e) => setEmail(e.target.value)}
												required
												autoComplete="email"
												className="border-input bg-background text-foreground focus:border-ring focus:ring-ring/20 w-full rounded-lg border-2 px-4 py-3 text-sm transition-colors focus:ring-2 focus:outline-none sm:text-[15px]"
												placeholder="antonio@yahoo.com"
												aria-describedby="email-description"
												aria-required="true"
											/>
											<span id="email-description" className="sr-only">
												Your email address for newsletter subscription
											</span>
										</div>

										{errorMessage && (
											<div
												role="alert"
												className="text-destructive pt-1 text-sm font-medium">
												{errorMessage}
											</div>
										)}

										<button
											type="submit"
											disabled={status === 'loading'}
											className="bg-primary text-primary-foreground focus:ring-ring mt-6 w-full rounded-lg px-6 py-3.5 text-sm font-semibold transition-all hover:opacity-90 focus:ring-2 focus:ring-offset-2 active:scale-95 disabled:transform-none disabled:cursor-not-allowed disabled:opacity-50 sm:text-[15px]"
											aria-busy={status === 'loading'}>
											{status === 'loading' ? 'Subscribing...' : 'Subscribe!'}
										</button>
									</form>

									{/* Footer note */}
									<p className="text-muted-foreground mt-5 text-center text-xs sm:mt-6 sm:text-sm">
										If you change your mind, it's super easy to unsubscribe. 💨
									</p>
								</>
							)}
						</div>
					</div>
				</div>
			)}
		</>
	)
}
