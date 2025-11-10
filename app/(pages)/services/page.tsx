import {ArrowRight} from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import Container from '@/components/container'
import {Button} from '@/components/ui/button'

export default function ServicesPage() {
	return (
		<>
			{/* Hero Section */}
			<section className="relative flex min-h-[85vh] items-center overflow-hidden pt-24 pb-16 lg:min-h-screen lg:pt-32 lg:pb-24">
				<div className="from-background via-background/95 to-background pointer-events-none absolute inset-0 bg-gradient-to-b" />

				<Container size="xl" className="relative z-10">
					<div className="grid items-center gap-12 lg:grid-cols-12 lg:gap-16">
						{/* Content */}
						<div className="space-y-8 lg:col-span-7 lg:space-y-12">
							{/* Status Badge */}
							<div className="inline-flex">
								<div className="bg-muted text-primary border-border inline-flex items-center gap-2 rounded-full border px-4 py-2">
									<div className="bg-primary h-2 w-2 animate-pulse rounded-full" />
									<span className="text-sm font-medium">
										Available for new projects
									</span>
								</div>
							</div>

							{/* Heading and Description */}
							<div className="space-y-6 lg:space-y-8">
								<h1 className="text-4xl leading-[1.1] font-bold tracking-tight sm:text-5xl lg:text-7xl xl:text-8xl">
									Technical leadership.
									<br />
									<span className="text-primary">Custom platforms.</span>
								</h1>

								<div className="text-muted-foreground max-w-2xl space-y-4 text-lg leading-relaxed lg:text-xl">
									<p>
										I help companies build better products and develop stronger
										teams through technical leadership, developer experience
										consulting, and educational services. I&apos;ve worked with
										teams at{' '}
										<strong className="text-foreground">
											Google, Shopify, O&apos;Reilly, and Sentry
										</strong>
										.
									</p>
									<p>
										I also build custom platforms for professional athletes in
										the outdoor industry. These are complete solutions that
										professional athletes own, designed to support their brand
										and connect with their community.
									</p>
								</div>
							</div>

							{/* CTA */}
							<div className="pt-4">
								<Button asChild size="lg" className="group">
									<Link
										href="https://cal.com/laurosilvacom/chat"
										target="_blank"
										rel="noopener noreferrer">
										Book a free consultation
										<ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
									</Link>
								</Button>
							</div>
						</div>

						{/* Image */}
						<div className="lg:col-span-5">
							<div className="relative aspect-[4/5] lg:aspect-[3/4]">
								<div className="from-muted absolute inset-0 -z-10 rounded-2xl bg-gradient-to-br to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
								<Image
									src="/photos/website-photo-7.jpg"
									alt="Technical leadership and custom platforms"
									fill
									className="rounded-2xl object-cover"
									priority
									sizes="(max-width: 1024px) 100vw, 40vw"
								/>
							</div>
						</div>
					</div>
				</Container>
			</section>

			{/* Companies Section */}
			<section className="border-border border-t py-24 lg:py-32">
				<Container size="xl">
					{/* Section Header */}
					<div className="mb-16 lg:mb-24">
						<div className="max-w-3xl">
							<h2 className="mb-6 text-3xl font-bold tracking-tight lg:text-5xl xl:text-6xl">
								Technical expertise and team development
							</h2>
							<div className="text-muted-foreground space-y-4 text-lg leading-relaxed lg:text-xl">
								<p>
									I provide technical leadership, developer experience
									consulting, and educational services to help your team build
									better products. My expertise comes from years of building
									large-scale, full-stack educational products and working with
									subject matter experts to create learning experiences that are
									effective and add real value.
								</p>
								<p>
									I&apos;ve worked on projects for companies like{' '}
									<strong className="text-foreground">
										Google, Shopify, O&apos;Reilly, and Sentry
									</strong>
									. I bring that enterprise-level expertise, especially in
									developer experience and educational product development, to
									companies in the outdoor industry and beyond.
								</p>
							</div>
						</div>
					</div>

					<div className="grid items-start gap-12 lg:grid-cols-12 lg:gap-16">
						{/* Image */}
						<div className="lg:col-span-5">
							<div className="sticky top-32">
								<div className="group relative aspect-[4/5] lg:aspect-[3/4]">
									<div className="from-muted absolute inset-0 -z-10 rounded-2xl bg-gradient-to-br to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
									<Image
										src="/photos/website-photo-7.jpg"
										alt="Technical leadership"
										fill
										className="rounded-2xl object-cover transition-transform duration-300 group-hover:scale-[1.02]"
										sizes="(max-width: 1024px) 100vw, 40vw"
									/>
								</div>
							</div>
						</div>

						{/* Content */}
						<div className="space-y-12 lg:col-span-7 lg:space-y-16">
							{/* Services Grid */}
							<div className="grid gap-8 md:grid-cols-2 lg:gap-12">
								{/* Technical Leadership */}
								<div className="group border-border bg-muted hover:bg-card hover:border-border relative space-y-6 overflow-hidden rounded-2xl border p-8 transition-all duration-300 lg:p-10">
									<div className="bg-muted absolute top-0 right-0 h-32 w-32 translate-x-1/2 -translate-y-1/2 rounded-full opacity-0 blur-3xl transition-opacity duration-500 group-hover:opacity-100" />
									<div className="relative z-10">
										<div className="mb-6 flex items-center gap-3">
											<div className="bg-primary h-2.5 w-2.5 rounded-full transition-transform group-hover:scale-125" />
											<h3 className="text-xl font-semibold tracking-tight lg:text-2xl">
												Technical Leadership & Consulting
											</h3>
										</div>
										<div className="text-muted-foreground space-y-4 text-base leading-relaxed">
											<p>
												I come in as a technical lead or consultant to help your
												team make better decisions, improve your developer
												experience, and build products that scale. This includes
												architecture planning, code reviews, technical strategy,
												and hands-on development when needed.
											</p>
											<p>
												My focus is on making your team more efficient and
												practical. I help you integrate modern tools and
												practices, from React and Next.js to AI integration into
												existing enterprise applications, in ways that actually
												work for your team and your users.
											</p>
										</div>
										<div className="flex flex-wrap gap-2 pt-6">
											{[
												'Architecture',
												'Code Reviews',
												'Technical Strategy',
												'Hands-on Development'
											].map((tag) => (
												<span
													key={tag}
													className="bg-muted text-primary border-border rounded-full border px-3 py-1.5 text-xs font-medium">
													{tag}
												</span>
											))}
										</div>
									</div>
								</div>

								{/* Educational Services */}
								<div className="group border-border bg-muted hover:bg-card hover:border-border relative space-y-6 overflow-hidden rounded-2xl border p-8 transition-all duration-300 lg:p-10">
									<div className="bg-muted absolute top-0 right-0 h-32 w-32 translate-x-1/2 -translate-y-1/2 rounded-full opacity-0 blur-3xl transition-opacity duration-500 group-hover:opacity-100" />
									<div className="relative z-10">
										<div className="mb-6 flex items-center gap-3">
											<div className="bg-primary h-2.5 w-2.5 rounded-full transition-transform group-hover:scale-125" />
											<h3 className="text-xl font-semibold tracking-tight lg:text-2xl">
												Educational Services & Team Upskilling
											</h3>
										</div>
										<div className="text-muted-foreground space-y-4 text-base leading-relaxed">
											<p>
												I create and deliver educational content and workshops
												focused on full-stack development with React, Next.js,
												and TypeScript. I also help teams integrate AI into
												their existing applications and improve their overall
												developer experience.
											</p>
											<p>
												This includes remote workshops, custom curriculum
												development tailored to your team&apos;s needs, and
												educational content creation. My experience building
												large-scale educational products means I understand how
												to create learning experiences that are effective, not
												just informative.
											</p>
										</div>
										<div className="flex flex-wrap gap-2 pt-6">
											{[
												'Workshops',
												'Curriculum Development',
												'Content Creation',
												'AI Integration'
											].map((tag) => (
												<span
													key={tag}
													className="bg-muted text-primary border-border rounded-full border px-3 py-1.5 text-xs font-medium">
													{tag}
												</span>
											))}
										</div>
									</div>
								</div>
							</div>

							{/* Testimonials */}
							<div className="space-y-8">
								<div className="grid gap-8 md:grid-cols-2">
									<blockquote className="group border-border bg-muted hover:bg-card hover:border-border relative space-y-6 overflow-hidden rounded-2xl border p-8 transition-all duration-300 lg:p-10">
										<div className="text-muted absolute top-0 right-0 -mt-4 -mr-4 font-serif text-8xl leading-none select-none">
											&ldquo;
										</div>
										<div className="relative z-10">
											<p className="text-foreground text-lg leading-relaxed">
												Lauro&apos;s expertise bridges technology and brand
												strategy. He understands how to connect technical
												excellence with authentic storytelling.
											</p>
											<div className="border-muted mt-6 flex items-center gap-4 border-t pt-6">
												<div className="ring-border group-hover:ring-primary relative h-14 w-14 flex-shrink-0 overflow-hidden rounded-full ring-2 transition-all">
													<Image
														src="https://res.cloudinary.com/laurosilvacom/image/upload/v1731436030/laurosilvacom/hire-me-page/ru1j6csfgvj2af4b1dn6.webp"
														alt="Emily Schmitz"
														fill
														className="object-cover"
													/>
												</div>
												<div className="min-w-0 space-y-1">
													<p className="text-base font-semibold">
														Emily Schmitz
													</p>
													<p className="text-muted-foreground text-sm">HOKA</p>
												</div>
											</div>
										</div>
									</blockquote>

									<blockquote className="group border-border bg-muted hover:bg-card hover:border-border relative space-y-6 overflow-hidden rounded-2xl border p-8 transition-all duration-300 lg:p-10">
										<div className="text-muted absolute top-0 right-0 -mt-4 -mr-4 font-serif text-8xl leading-none select-none">
											&ldquo;
										</div>
										<div className="relative z-10">
											<p className="text-foreground text-lg leading-relaxed">
												Lauro is a total pro. His guidance helped us not only
												create polished onboarding videos, but also build the
												capability to create additional content independently.
											</p>
											<div className="border-muted mt-6 flex items-center gap-4 border-t pt-6">
												<div className="ring-border group-hover:ring-primary relative h-14 w-14 flex-shrink-0 overflow-hidden rounded-full ring-2 transition-all">
													<Image
														src="https://res.cloudinary.com/laurosilvacom/image/upload/v1731435976/laurosilvacom/hire-me-page/ok4aceenrvijrjcafxba.jpg"
														alt="Andrew Hedges"
														fill
														className="object-cover"
													/>
												</div>
												<div className="min-w-0 space-y-1">
													<p className="text-base font-semibold">
														Andrew Hedges
													</p>
													<p className="text-muted-foreground text-sm">
														Assistiv Labs
													</p>
												</div>
											</div>
										</div>
									</blockquote>
								</div>

								<blockquote className="group border-border bg-muted hover:bg-card hover:border-border relative space-y-6 overflow-hidden rounded-2xl border p-8 transition-all duration-300 lg:p-10">
									<div className="text-muted absolute top-0 right-0 -mt-4 -mr-4 font-serif text-8xl leading-none select-none">
										&ldquo;
									</div>
									<div className="relative z-10">
										<p className="text-foreground text-lg leading-relaxed">
											An hour with Lauro helped me untangle my thoughts and make
											a concrete plan. If you need dev content strategy,
											he&apos;s your person.
										</p>
										<div className="border-muted mt-6 flex items-center gap-4 border-t pt-6">
											<div className="ring-border group-hover:ring-primary relative h-14 w-14 flex-shrink-0 overflow-hidden rounded-full ring-2 transition-all">
												<Image
													src="https://res.cloudinary.com/laurosilvacom/image/upload/v1731435976/laurosilvacom/hire-me-page/py2kbwptjbxfdqpoepkj.jpg"
													alt="Jason Lengstorf"
													fill
													className="object-cover"
												/>
											</div>
											<div className="min-w-0 space-y-1">
												<p className="text-base font-semibold">
													Jason Lengstorf
												</p>
												<p className="text-muted-foreground text-sm">
													Learn With Jason
												</p>
											</div>
										</div>
									</div>
								</blockquote>
							</div>

							<div className="pt-4">
								<Button asChild size="lg" variant="default" className="group">
									<Link href="/services/companies">
										Learn more about company services
										<ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
									</Link>
								</Button>
							</div>
						</div>
					</div>
				</Container>
			</section>

			{/* Divider */}
			<div className="relative py-12 lg:py-16">
				<div className="via-border absolute top-1/2 right-0 left-0 h-px bg-gradient-to-r from-transparent to-transparent" />
				<div className="relative flex items-center justify-center">
					<div className="bg-background px-6">
						<div className="bg-primary h-3 w-3 rounded-full" />
					</div>
				</div>
			</div>

			{/* Athletes Section */}
			<section className="py-24 lg:py-32">
				<Container size="xl">
					{/* Section Header */}
					<div className="mb-16 lg:mb-24">
						<div className="max-w-3xl">
							<h2 className="mb-6 text-3xl font-bold tracking-tight lg:text-5xl xl:text-6xl">
								Custom platforms that you own
							</h2>
							<div className="text-muted-foreground space-y-4 text-lg leading-relaxed lg:text-xl">
								<p>
									I work with professional athletes in the outdoor industry to
									build custom platforms that go far beyond a simple website.
									These are complete solutions that professional athletes own,
									designed to support their brand and connect with their
									community.
								</p>
								<p>
									At a certain stage in your career, you&apos;ve already built
									your brand. What you need is a platform you own. Instagram,
									Substack, YouTube. These are amazing places to create content,
									but they&apos;re not your platform. The only thing you truly
									own is your domain name. That&apos;s your internet real
									estate.
								</p>
								<p>
									I build custom software that meets your exact needs. Whether
									you need to publish coaching content, create educational
									materials, build an audience, or manage your brand, I create a
									platform that grows with your career.
								</p>
							</div>
						</div>
					</div>

					<div className="grid items-start gap-12 lg:grid-cols-12 lg:gap-16">
						{/* Content */}
						<div className="order-2 space-y-16 lg:order-1 lg:col-span-7 lg:space-y-20">
							{/* What I Build */}
							<div className="group border-border bg-muted hover:bg-card hover:border-border relative space-y-6 overflow-hidden rounded-2xl border p-8 transition-all duration-300 lg:p-10">
								<div className="bg-muted absolute top-0 right-0 h-32 w-32 translate-x-1/2 -translate-y-1/2 rounded-full opacity-0 blur-3xl transition-opacity duration-500 group-hover:opacity-100" />
								<div className="relative z-10">
									<div className="mb-6 flex items-center gap-3">
										<div className="bg-primary h-2.5 w-2.5 rounded-full transition-transform group-hover:scale-125" />
										<h3 className="text-xl font-semibold tracking-tight lg:text-2xl">
											What I build
										</h3>
									</div>
									<div className="text-muted-foreground space-y-4 text-base leading-relaxed">
										<p>
											I create custom platforms built with React and modern web
											technologies. These aren&apos;t templates or generic
											solutions. They&apos;re built specifically to reflect your
											unique story, support your content strategy, and connect
											with your community.
										</p>
										<p>
											For example, I worked with Emily Schromm to build her
											content platform. As an athlete, she needed to create an
											audience and build her brand. As a coach, she wanted to
											publish her coaching content. She needed something more
											than a simple website. She needed a complete solution that
											integrated her content strategy, educational materials,
											and brand narrative.
										</p>
										<p>
											I also provide consulting on how to use these tools to
											build out a marketing strategy that benefits your overall
											brand. The platform is just the foundation. I help you
											think through how it fits into your broader content and
											brand strategy.
										</p>
									</div>
									<div className="flex flex-wrap gap-2 pt-6">
										{[
											'Custom Platforms',
											'Content Strategy',
											'Brand Narrative',
											'Community Building'
										].map((tag) => (
											<span
												key={tag}
												className="bg-muted text-primary border-border rounded-full border px-3 py-1.5 text-xs font-medium">
												{tag}
											</span>
										))}
									</div>
								</div>
							</div>

							{/* Who I Work With */}
							<div className="group border-border bg-muted hover:bg-card hover:border-border relative space-y-6 overflow-hidden rounded-2xl border p-8 transition-all duration-300 lg:p-10">
								<div className="bg-muted absolute top-0 right-0 h-32 w-32 translate-x-1/2 -translate-y-1/2 rounded-full opacity-0 blur-3xl transition-opacity duration-500 group-hover:opacity-100" />
								<div className="relative z-10">
									<div className="mb-6 flex items-center gap-3">
										<div className="bg-primary h-2.5 w-2.5 rounded-full transition-transform group-hover:scale-125" />
										<h3 className="text-xl font-semibold tracking-tight lg:text-2xl">
											Who I work with
										</h3>
									</div>
									<div className="text-muted-foreground space-y-4 text-base leading-relaxed">
										<p>
											I work exclusively with professional athletes in the
											outdoor industry, across multiple sports including trail
											running, climbing, cycling, and more. If you&apos;re at a
											stage where you need to own your platform and build
											something custom that reflects your brand and supports
											your career, we might be a good fit.
										</p>
									</div>
									<div className="flex flex-wrap gap-2 pt-6">
										{[
											'Trail Running',
											'Climbing',
											'Cycling',
											'Outdoor Sports'
										].map((tag) => (
											<span
												key={tag}
												className="bg-muted text-primary border-border rounded-full border px-3 py-1.5 text-xs font-medium">
												{tag}
											</span>
										))}
									</div>
								</div>
							</div>

							{/* Testimonial */}
							<blockquote className="group border-border bg-muted hover:bg-card hover:border-border relative space-y-6 overflow-hidden rounded-2xl border p-8 transition-all duration-300 lg:p-10">
								<div className="text-muted absolute top-0 right-0 -mt-4 -mr-4 font-serif text-8xl leading-none select-none">
									&ldquo;
								</div>
								<div className="relative z-10">
									<p className="text-foreground text-lg leading-relaxed">
										Working with Lauro is always a great experience. His
										technical guidance and patience make complex projects feel
										manageable.
									</p>
									<div className="border-muted mt-6 flex items-center gap-4 border-t pt-6">
										<div className="ring-border group-hover:ring-primary relative h-14 w-14 flex-shrink-0 overflow-hidden rounded-full ring-2 transition-all">
											<Image
												src="https://res.cloudinary.com/laurosilvacom/image/upload/v1731435976/laurosilvacom/hire-me-page/p3eglqeb7qfvsfzvh3qr.jpg"
												alt="Alejandro Nanez"
												fill
												className="object-cover"
											/>
										</div>
										<div className="min-w-0 space-y-1">
											<p className="text-base font-semibold">Alejandro Nanez</p>
											<p className="text-muted-foreground text-sm">
												Staff Engineer
											</p>
										</div>
									</div>
								</div>
							</blockquote>

							<div className="pt-4">
								<Button asChild size="lg" variant="outline" className="group">
									<Link href="/services/athletes">
										Learn more about athlete platforms
										<ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
									</Link>
								</Button>
							</div>
						</div>

						{/* Image */}
						<div className="order-1 lg:order-2 lg:col-span-5">
							<div className="sticky top-32">
								<div className="group relative aspect-[4/5] lg:aspect-[3/4]">
									<div className="from-muted absolute inset-0 -z-10 rounded-2xl bg-gradient-to-br to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
									<Image
										src="/photos/website-photo-12.jpg"
										alt="Custom athlete platforms"
										fill
										className="rounded-2xl object-cover transition-transform duration-300 group-hover:scale-[1.02]"
										sizes="(max-width: 1024px) 100vw, 40vw"
									/>
								</div>
							</div>
						</div>
					</div>
				</Container>
			</section>

			{/* Clients Section */}
			<section className="border-border border-t py-24 lg:py-32">
				<Container size="lg">
					<div className="space-y-12">
						<div className="space-y-4 text-center">
							<p className="text-muted-foreground text-sm font-medium tracking-wider uppercase">
								Working with teams at
							</p>
						</div>
						<div className="grid grid-cols-2 items-center justify-items-center gap-12 md:grid-cols-3 lg:gap-16">
							{[
								{src: '/google.png', alt: 'Google', width: 90},
								{src: '/oreilly.svg', alt: "O'Reilly", width: 90},
								{src: '/sentry.png', alt: 'Sentry', width: 110}
							].map((logo) => (
								<div
									key={logo.alt}
									className="w-24 opacity-60 transition-opacity duration-300 hover:opacity-100 sm:w-32 lg:w-36">
									<Image
										src={logo.src}
										alt={logo.alt}
										width={logo.width}
										height={30}
										className="h-auto w-full"
									/>
								</div>
							))}
						</div>
					</div>
				</Container>
			</section>

			{/* CTA Section */}
			<section className="border-border from-background to-background border-t bg-gradient-to-b py-24 lg:py-32">
				<Container size="lg">
					<div className="mx-auto max-w-4xl">
						<div className="border-border bg-muted space-y-8 rounded-3xl border p-12 text-center backdrop-blur-sm lg:p-16">
							<div className="space-y-6">
								<h2 className="text-3xl font-bold tracking-tight lg:text-5xl xl:text-6xl">
									Ready to work together?
								</h2>
								<p className="text-muted-foreground mx-auto max-w-2xl text-lg leading-relaxed lg:text-xl">
									Let&apos;s discuss how I can help your team build better
									products or create a custom platform that supports your brand.
								</p>
							</div>
							<div className="pt-4">
								<Button asChild size="lg" className="group">
									<Link
										href="https://cal.com/laurosilvacom/chat"
										target="_blank"
										rel="noopener noreferrer">
										Book a free consultation
										<ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
									</Link>
								</Button>
							</div>
						</div>
					</div>
				</Container>
			</section>
		</>
	)
}
