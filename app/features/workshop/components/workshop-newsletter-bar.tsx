'use client'

import {useEffect, useState} from 'react'
import {Button} from '@/shared/ui/button'
import {Input} from '@/shared/ui/input'
import {CheckCircle, Loader2} from 'lucide-react'
import {cn} from '@/shared/lib/utils'

interface WorkshopNewsletterBarProps {
	workshopSlug: string
	audienceId?: string
	lessonCount?: number
	preface?: string
	ctaLabel?: string
	scrollOffset?: number
	apiPath?: string
}

export function WorkshopNewsletterBar({
	workshopSlug,
	audienceId,
	lessonCount,
	preface = 'Free Email Course',
	ctaLabel = 'Start Learning',
	scrollOffset = 400,
	apiPath = '/api/workshop-newsletter/opt-in',
}: WorkshopNewsletterBarProps) {
	const [email, setEmail] = useState('')
	const [firstName, setFirstName] = useState('')
	const [isSubmitting, setIsSubmitting] = useState(false)
	const [isSuccess, setIsSuccess] = useState(false)
	const [error, setError] = useState('')
	const [isVisible, setIsVisible] = useState(false)

	useEffect(() => {
		const handleScroll = () => {
			setIsVisible(window.scrollY > scrollOffset)
		}

		handleScroll()
		window.addEventListener('scroll', handleScroll)
		return () => window.removeEventListener('scroll', handleScroll)
	}, [scrollOffset])

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault()
		setIsSubmitting(true)
		setError('')

		if (!audienceId) {
			setError(
				'Signup is unavailable right now. Audience configuration is missing for this workshop.',
			)
			setIsSubmitting(false)
			return
		}

		try {
			const response = await fetch(apiPath, {
				method: 'POST',
				headers: {'Content-Type': 'application/json'},
				body: JSON.stringify({
					email,
					firstName,
					workshopSlug,
					audienceId,
				}),
			})

			const data = await response.json()
			if (response.ok && data.success) {
				setIsSuccess(true)
				setEmail('')
				setFirstName('')
				return
			}

			setError(
				data.message ||
					data.error ||
					'Unable to start signup right now. Please try again.',
			)
		} catch {
			setError('Failed to subscribe. Please try again later.')
		} finally {
			setIsSubmitting(false)
		}
	}

	return (
		<div
			className={cn(
				'fixed right-0 bottom-6 left-0 z-40 flex justify-center px-6 transition-transform duration-700 ease-out sm:px-8',
				isVisible ? 'translate-y-0' : 'translate-y-[calc(100%+1.5rem)]',
			)}>
			<div className="w-full max-w-4xl rounded-xl border border-primary-foreground/20 bg-primary shadow-2xl shadow-primary/30">
				<div className="flex items-center justify-center px-6 py-4 sm:px-8">
					{isSuccess ? (
						<div className="animate-in fade-in-0 flex items-center gap-3">
							<div className="flex size-8 shrink-0 items-center justify-center rounded-full bg-primary-foreground/20">
								<CheckCircle className="size-4 text-primary-foreground" />
							</div>
							<div>
							<p className="text-sm font-semibold text-primary-foreground">
								Check your email to confirm!
							</p>
							<p className="text-xs text-primary-foreground/70">
									{lessonCount
										? `You'll receive ${lessonCount} lessons, one per day.`
										: 'Your first lesson will arrive shortly.'}
								</p>
							</div>
						</div>
					) : (
						<div className="flex w-full flex-col gap-3 sm:flex-row sm:items-center sm:gap-4">
							<p className="text-center text-sm font-medium text-primary-foreground sm:text-left lg:shrink-0">
								{preface}
							</p>
							<form
								onSubmit={handleSubmit}
								className="flex w-full flex-col gap-2 sm:flex-1 sm:flex-row sm:items-center sm:gap-3">
								<label htmlFor="bottom-firstName" className="sr-only">
									First name
								</label>
								<Input
									id="bottom-firstName"
									type="text"
									placeholder="First name"
									value={firstName}
									onChange={(e) => setFirstName(e.target.value)}
									disabled={isSubmitting}
								className="h-10 w-full border-primary-foreground/20 bg-primary-foreground/10 text-sm text-primary-foreground placeholder:text-primary-foreground/60 sm:h-9 sm:flex-1"
							/>

							<label htmlFor="bottom-email" className="sr-only">
								Email address
							</label>
							<Input
								id="bottom-email"
								type="email"
								placeholder="Email address"
								value={email}
								onChange={(e) => setEmail(e.target.value)}
								required
								disabled={isSubmitting}
								className="h-10 w-full border-primary-foreground/20 bg-primary-foreground/10 text-sm text-primary-foreground placeholder:text-primary-foreground/60 sm:h-9 sm:flex-1"
								/>

								<Button
									type="submit"
									className="h-10 w-full bg-primary-foreground px-6 text-sm font-medium text-primary hover:bg-primary-foreground/90 sm:h-9 sm:w-auto sm:shrink-0"
									disabled={isSubmitting}>
									{isSubmitting ? <Loader2 className="size-4 animate-spin" /> : ctaLabel}
								</Button>
							</form>
						</div>
					)}
				</div>

				{error && !isSuccess && (
				<div className="rounded-b-xl border-t border-primary-foreground/10 bg-primary-foreground/10 px-6 py-2 text-center sm:px-8">
					<p className="text-xs font-medium text-primary-foreground">{error}</p>
					</div>
				)}
			</div>
		</div>
	)
}
