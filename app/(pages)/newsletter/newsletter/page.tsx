'use client'

import Container from 'app/components/container'
import {NewsletterForm} from '../newsletter-form'

export default function NewsletterPage() {
	return (
		<Container className="mx-auto w-full max-w-screen-xl">
			<main className="relative px-6 py-24 md:py-32">
				{/* Hero Section */}
				<div className="mx-auto mb-16 max-w-2xl space-y-8 text-center">
					<h1 className="motion-safe:animate-hero-text-reveal">
						<span className="text-foreground block text-4xl font-bold tracking-tight md:text-5xl lg:text-6xl">
							Learn, build, and grow
						</span>
						<span className="text-primary mt-2 block text-4xl font-bold tracking-tight md:text-5xl lg:text-6xl">
							every week
						</span>
					</h1>
					<p className="text-muted-foreground mx-auto max-w-xl text-lg md:text-xl lg:text-2xl">
						Join developers learning React, TypeScript, and the human side of
						writing exceptional software.
					</p>
				</div>

				{/* Form Section */}
				<div className="mx-auto max-w-md">
					<div className="bg-card rounded-2xl border p-6 shadow-sm md:p-8">
						<div className="mb-6 text-center">
							<h2 className="text-foreground text-xl font-semibold md:text-2xl">
								Subscribe to the newsletter
							</h2>
							<p className="text-muted-foreground mt-2 text-sm md:text-base">
								Get the latest updates directly in your inbox.
							</p>
						</div>
						<NewsletterForm />
					</div>
				</div>
			</main>
		</Container>
	)
}
