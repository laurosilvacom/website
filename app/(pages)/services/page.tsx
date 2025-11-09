import {ArrowRight} from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import Container from '@/components/container'
import {Button} from '@/components/ui/button'

export default function ServicesPage() {
	return (
		<>
			{/* Hero Section */}
			<section className="relative min-h-[85vh] lg:min-h-[90vh] flex items-center justify-center pt-24 lg:pt-32 pb-16 lg:pb-24 overflow-hidden">
				<div className="absolute inset-0 bg-gradient-to-b from-background via-background/95 to-background pointer-events-none" />
				
				<Container size="xl" className="relative z-10">
					<div className="max-w-4xl mx-auto space-y-8 lg:space-y-12 text-center">
						<div className="inline-flex">
							<div className="bg-primary/10 text-primary inline-flex items-center gap-2 rounded-full px-4 py-2 border border-primary/20">
								<div className="bg-primary h-2 w-2 rounded-full animate-pulse" />
								<span className="text-sm font-medium">
									Available for new projects
								</span>
							</div>
						</div>

						<div className="space-y-6 lg:space-y-8">
							<h1 className="text-4xl sm:text-5xl lg:text-7xl xl:text-8xl font-bold leading-[1.1] tracking-tight">
								Technical leadership for companies.
								<br />
								<span className="text-primary">Custom platforms for athletes.</span>
							</h1>
							<div className="space-y-4 text-lg lg:text-xl leading-relaxed text-muted-foreground max-w-3xl mx-auto">
								<p>
									I help companies build better products and develop stronger teams through technical leadership, developer experience consulting, and educational services. I&apos;ve worked with teams at <strong className="text-foreground">Google, Shopify, O&apos;Reilly, and Sentry</strong>.
								</p>
								<p>
									I also build custom platforms for professional athletes in the outdoor industry. These are complete solutions that professional athletes own, designed to support their brand and connect with their community.
								</p>
							</div>
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
				</Container>
			</section>

			{/* Companies Section */}
			<section className="py-24 lg:py-32 border-t border-border/50">
				<Container size="xl">
					{/* Section Header */}
					<div className="mb-16 lg:mb-24">
						<div className="max-w-3xl">
							<h2 className="text-3xl lg:text-5xl xl:text-6xl font-bold tracking-tight mb-6">
								Technical expertise and team development
							</h2>
							<div className="space-y-4 text-lg lg:text-xl leading-relaxed text-muted-foreground">
								<p>
									I provide technical leadership, developer experience consulting, and educational services to help your team build better products. My expertise comes from years of building large-scale, full-stack educational products and working with subject matter experts to create learning experiences that are effective and add real value.
								</p>
								<p>
									I&apos;ve worked on projects for companies like <strong className="text-foreground">Google, Shopify, O&apos;Reilly, and Sentry</strong>. I bring that enterprise-level expertise, especially in developer experience and educational product development, to companies in the outdoor industry and beyond.
								</p>
							</div>
						</div>
					</div>

					<div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-start">
						{/* Image */}
						<div className="lg:col-span-5">
							<div className="sticky top-32">
								<div className="relative aspect-[4/5] lg:aspect-[3/4] group">
									<div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10" />
									<Image
										src="/photos/website-photo-7.jpg"
										alt="Technical leadership"
										fill
										className="object-cover rounded-2xl transition-transform duration-300 group-hover:scale-[1.02]"
										sizes="(max-width: 1024px) 100vw, 40vw"
									/>
								</div>
							</div>
						</div>

						{/* Content */}
						<div className="lg:col-span-7 space-y-12 lg:space-y-16">

							{/* Services Grid */}
							<div className="grid md:grid-cols-2 gap-8 lg:gap-12">
								{/* Technical Leadership */}
								<div className="group relative space-y-6 p-8 lg:p-10 rounded-2xl border border-border/50 bg-card/50 hover:bg-card/70 hover:border-border transition-all duration-300 overflow-hidden">
									<div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 -translate-y-1/2 translate-x-1/2" />
									<div className="relative z-10">
										<div className="flex items-center gap-3 mb-6">
											<div className="h-2.5 w-2.5 rounded-full bg-primary group-hover:scale-125 transition-transform" />
											<h3 className="text-xl lg:text-2xl font-semibold tracking-tight">
												Technical Leadership & Consulting
											</h3>
										</div>
										<div className="space-y-4 text-base leading-relaxed text-muted-foreground">
											<p>
												I come in as a technical lead or consultant to help your team make better decisions, improve your developer experience, and build products that scale. This includes architecture planning, code reviews, technical strategy, and hands-on development when needed.
											</p>
											<p>
												My focus is on making your team more efficient and practical. I help you integrate modern tools and practices, from React and Next.js to AI integration into existing enterprise applications, in ways that actually work for your team and your users.
											</p>
										</div>
										<div className="pt-6 flex flex-wrap gap-2">
											{['Architecture', 'Code Reviews', 'Technical Strategy', 'Hands-on Development'].map((tag) => (
												<span key={tag} className="text-xs px-3 py-1.5 rounded-full bg-primary/10 text-primary border border-primary/20 font-medium">
													{tag}
												</span>
											))}
										</div>
									</div>
								</div>

								{/* Educational Services */}
								<div className="group relative space-y-6 p-8 lg:p-10 rounded-2xl border border-border/50 bg-card/50 hover:bg-card/70 hover:border-border transition-all duration-300 overflow-hidden">
									<div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 -translate-y-1/2 translate-x-1/2" />
									<div className="relative z-10">
										<div className="flex items-center gap-3 mb-6">
											<div className="h-2.5 w-2.5 rounded-full bg-primary group-hover:scale-125 transition-transform" />
											<h3 className="text-xl lg:text-2xl font-semibold tracking-tight">
												Educational Services & Team Upskilling
											</h3>
										</div>
										<div className="space-y-4 text-base leading-relaxed text-muted-foreground">
											<p>
												I create and deliver educational content and workshops focused on full-stack development with React, Next.js, and TypeScript. I also help teams integrate AI into their existing applications and improve their overall developer experience.
											</p>
											<p>
												This includes remote workshops, custom curriculum development tailored to your team&apos;s needs, and educational content creation. My experience building large-scale educational products means I understand how to create learning experiences that are effective, not just informative.
											</p>
										</div>
										<div className="pt-6 flex flex-wrap gap-2">
											{['Workshops', 'Curriculum Development', 'Content Creation', 'AI Integration'].map((tag) => (
												<span key={tag} className="text-xs px-3 py-1.5 rounded-full bg-primary/10 text-primary border border-primary/20 font-medium">
													{tag}
												</span>
											))}
										</div>
									</div>
								</div>
							</div>

							{/* Testimonials */}
							<div className="space-y-8">
								<div className="grid md:grid-cols-2 gap-8">
									<blockquote className="group relative p-8 lg:p-10 rounded-2xl border border-border/50 bg-card/30 hover:bg-card/50 hover:border-border transition-all duration-300 space-y-6 overflow-hidden">
										<div className="absolute top-0 right-0 text-8xl text-primary/5 font-serif leading-none -mt-4 -mr-4 select-none">&ldquo;</div>
										<div className="relative z-10">
											<p className="text-lg leading-relaxed text-foreground">
												Lauro&apos;s expertise bridges technology and brand strategy. He understands how to connect technical excellence with authentic storytelling.
											</p>
											<div className="flex items-center gap-4 pt-6 mt-6 border-t border-border/30">
												<div className="relative h-14 w-14 overflow-hidden rounded-full flex-shrink-0 ring-2 ring-border/50 group-hover:ring-primary/30 transition-all">
													<Image
														src="https://res.cloudinary.com/laurosilvacom/image/upload/v1731436030/laurosilvacom/hire-me-page/ru1j6csfgvj2af4b1dn6.webp"
														alt="Emily Schmitz"
														fill
														className="object-cover"
													/>
												</div>
												<div className="space-y-1 min-w-0">
													<p className="text-base font-semibold">
														Emily Schmitz
													</p>
													<p className="text-muted-foreground text-sm">
														HOKA
													</p>
												</div>
											</div>
										</div>
									</blockquote>

									<blockquote className="group relative p-8 lg:p-10 rounded-2xl border border-border/50 bg-card/30 hover:bg-card/50 hover:border-border transition-all duration-300 space-y-6 overflow-hidden">
										<div className="absolute top-0 right-0 text-8xl text-primary/5 font-serif leading-none -mt-4 -mr-4 select-none">&ldquo;</div>
										<div className="relative z-10">
											<p className="text-lg leading-relaxed text-foreground">
												Lauro is a total pro. His guidance helped us not only create polished onboarding videos, but also build the capability to create additional content independently.
											</p>
											<div className="flex items-center gap-4 pt-6 mt-6 border-t border-border/30">
												<div className="relative h-14 w-14 overflow-hidden rounded-full flex-shrink-0 ring-2 ring-border/50 group-hover:ring-primary/30 transition-all">
													<Image
														src="https://res.cloudinary.com/laurosilvacom/image/upload/v1731435976/laurosilvacom/hire-me-page/ok4aceenrvijrjcafxba.jpg"
														alt="Andrew Hedges"
														fill
														className="object-cover"
													/>
												</div>
												<div className="space-y-1 min-w-0">
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

								<blockquote className="group relative p-8 lg:p-10 rounded-2xl border border-border/50 bg-card/30 hover:bg-card/50 hover:border-border transition-all duration-300 space-y-6 overflow-hidden">
									<div className="absolute top-0 right-0 text-8xl text-primary/5 font-serif leading-none -mt-4 -mr-4 select-none">&ldquo;</div>
									<div className="relative z-10">
										<p className="text-lg leading-relaxed text-foreground">
											An hour with Lauro helped me untangle my thoughts and make a concrete plan. If you need dev content strategy, he&apos;s your person.
										</p>
										<div className="flex items-center gap-4 pt-6 mt-6 border-t border-border/30">
											<div className="relative h-14 w-14 overflow-hidden rounded-full flex-shrink-0 ring-2 ring-border/50 group-hover:ring-primary/30 transition-all">
												<Image
													src="https://res.cloudinary.com/laurosilvacom/image/upload/v1731435976/laurosilvacom/hire-me-page/py2kbwptjbxfdqpoepkj.jpg"
													alt="Jason Lengstorf"
													fill
													className="object-cover"
												/>
											</div>
											<div className="space-y-1 min-w-0">
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
								<Button asChild size="lg" variant="outline" className="group">
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
				<div className="absolute left-0 right-0 top-1/2 h-px bg-gradient-to-r from-transparent via-border to-transparent" />
				<div className="relative flex items-center justify-center">
					<div className="bg-background px-6">
						<div className="h-3 w-3 rounded-full bg-primary/50" />
					</div>
				</div>
			</div>

			{/* Athletes Section */}
			<section className="py-24 lg:py-32">
				<Container size="xl">
					{/* Section Header */}
					<div className="mb-16 lg:mb-24">
						<div className="max-w-3xl">
							<h2 className="text-3xl lg:text-5xl xl:text-6xl font-bold tracking-tight mb-6">
								Custom platforms that you own
							</h2>
							<div className="space-y-4 text-lg lg:text-xl leading-relaxed text-muted-foreground">
								<p>
									I work with professional athletes in the outdoor industry to build custom platforms that go far beyond a simple website. These are complete solutions that professional athletes own, designed to support their brand and connect with their community.
								</p>
								<p>
									At a certain stage in your career, you&apos;ve already built your brand. What you need is a platform you own. Instagram, Substack, YouTube. These are amazing places to create content, but they&apos;re not your platform. The only thing you truly own is your domain name. That&apos;s your internet real estate.
								</p>
								<p>
									I build custom software that meets your exact needs. Whether you need to publish coaching content, create educational materials, build an audience, or manage your brand, I create a platform that grows with your career.
								</p>
							</div>
						</div>
					</div>

					<div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-start">
						{/* Content */}
						<div className="lg:col-span-7 space-y-16 lg:space-y-20 order-2 lg:order-1">

							{/* What I Build */}
							<div className="group relative space-y-6 p-8 lg:p-10 rounded-2xl border border-border/50 bg-card/50 hover:bg-card/70 hover:border-border transition-all duration-300 overflow-hidden">
								<div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 -translate-y-1/2 translate-x-1/2" />
								<div className="relative z-10">
									<div className="flex items-center gap-3 mb-6">
										<div className="h-2.5 w-2.5 rounded-full bg-primary group-hover:scale-125 transition-transform" />
										<h3 className="text-xl lg:text-2xl font-semibold tracking-tight">
											What I build
										</h3>
									</div>
									<div className="space-y-4 text-base leading-relaxed text-muted-foreground">
										<p>
											I create custom platforms built with React and modern web technologies. These aren&apos;t templates or generic solutions. They&apos;re built specifically to reflect your unique story, support your content strategy, and connect with your community.
										</p>
										<p>
											For example, I worked with Emily Schromm to build her content platform. As an athlete, she needed to create an audience and build her brand. As a coach, she wanted to publish her coaching content. She needed something more than a simple website. She needed a complete solution that integrated her content strategy, educational materials, and brand narrative.
										</p>
										<p>
											I also provide consulting on how to use these tools to build out a marketing strategy that benefits your overall brand. The platform is just the foundation. I help you think through how it fits into your broader content and brand strategy.
										</p>
									</div>
									<div className="pt-6 flex flex-wrap gap-2">
										{['Custom Platforms', 'Content Strategy', 'Brand Narrative', 'Community Building'].map((tag) => (
											<span key={tag} className="text-xs px-3 py-1.5 rounded-full bg-primary/10 text-primary border border-primary/20 font-medium">
												{tag}
											</span>
										))}
									</div>
								</div>
							</div>

							{/* Who I Work With */}
							<div className="group relative space-y-6 p-8 lg:p-10 rounded-2xl border border-border/50 bg-card/50 hover:bg-card/70 hover:border-border transition-all duration-300 overflow-hidden">
								<div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 -translate-y-1/2 translate-x-1/2" />
								<div className="relative z-10">
									<div className="flex items-center gap-3 mb-6">
										<div className="h-2.5 w-2.5 rounded-full bg-primary group-hover:scale-125 transition-transform" />
										<h3 className="text-xl lg:text-2xl font-semibold tracking-tight">
											Who I work with
										</h3>
									</div>
									<div className="space-y-4 text-base leading-relaxed text-muted-foreground">
										<p>
											I work exclusively with professional athletes in the outdoor industry, across multiple sports including trail running, climbing, cycling, and more. If you&apos;re at a stage where you need to own your platform and build something custom that reflects your brand and supports your career, we might be a good fit.
										</p>
									</div>
									<div className="pt-6 flex flex-wrap gap-2">
										{['Trail Running', 'Climbing', 'Cycling', 'Outdoor Sports'].map((tag) => (
											<span key={tag} className="text-xs px-3 py-1.5 rounded-full bg-primary/10 text-primary border border-primary/20 font-medium">
												{tag}
											</span>
										))}
									</div>
								</div>
							</div>

							{/* Testimonial */}
							<blockquote className="group relative p-8 lg:p-10 rounded-2xl border border-border/50 bg-card/30 hover:bg-card/50 hover:border-border transition-all duration-300 space-y-6 overflow-hidden">
								<div className="absolute top-0 right-0 text-8xl text-primary/5 font-serif leading-none -mt-4 -mr-4 select-none">&ldquo;</div>
								<div className="relative z-10">
									<p className="text-lg leading-relaxed text-foreground">
										Working with Lauro is always a great experience. His technical guidance and patience make complex projects feel manageable.
									</p>
									<div className="flex items-center gap-4 pt-6 mt-6 border-t border-border/30">
										<div className="relative h-14 w-14 overflow-hidden rounded-full flex-shrink-0 ring-2 ring-border/50 group-hover:ring-primary/30 transition-all">
											<Image
												src="https://res.cloudinary.com/laurosilvacom/image/upload/v1731435976/laurosilvacom/hire-me-page/p3eglqeb7qfvsfzvh3qr.jpg"
												alt="Alejandro Nanez"
												fill
												className="object-cover"
											/>
										</div>
										<div className="space-y-1 min-w-0">
											<p className="text-base font-semibold">
												Alejandro Nanez
											</p>
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
						<div className="lg:col-span-5 order-1 lg:order-2">
							<div className="sticky top-32">
								<div className="relative aspect-[4/5] lg:aspect-[3/4] group">
									<div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10" />
									<Image
										src="/photos/website-photo-12.jpg"
										alt="Custom athlete platforms"
										fill
										className="object-cover rounded-2xl transition-transform duration-300 group-hover:scale-[1.02]"
										sizes="(max-width: 1024px) 100vw, 40vw"
									/>
								</div>
							</div>
						</div>
					</div>
				</Container>
			</section>

			{/* Clients Section */}
			<section className="py-24 lg:py-32 border-t border-border/50">
				<Container size="lg">
					<div className="space-y-12">
						<div className="text-center space-y-4">
							<p className="text-sm font-medium text-muted-foreground uppercase tracking-wider">
								Working with teams at
							</p>
						</div>
						<div className="grid grid-cols-2 md:grid-cols-3 items-center justify-items-center gap-12 lg:gap-16">
							{[
								{src: '/google.png', alt: 'Google', width: 90},
								{src: '/oreilly.svg', alt: "O'Reilly", width: 90},
								{src: '/sentry.png', alt: 'Sentry', width: 110}
							].map((logo) => (
								<div key={logo.alt} className="w-24 sm:w-32 lg:w-36 opacity-60 hover:opacity-100 transition-opacity duration-300">
									<Image
										src={logo.src}
										alt={logo.alt}
										width={logo.width}
										height={30}
										className="w-full h-auto"
									/>
								</div>
							))}
						</div>
					</div>
				</Container>
			</section>

			{/* CTA Section */}
			<section className="py-24 lg:py-32 border-t border-border/50 bg-gradient-to-b from-background to-background/95">
				<Container size="lg">
					<div className="max-w-4xl mx-auto">
						<div className="p-12 lg:p-16 rounded-3xl border border-border/50 bg-card/30 backdrop-blur-sm text-center space-y-8">
							<div className="space-y-6">
								<h2 className="text-3xl lg:text-5xl xl:text-6xl font-bold tracking-tight">
									Ready to work together?
								</h2>
								<p className="text-lg lg:text-xl text-muted-foreground leading-relaxed max-w-2xl mx-auto">
									Let&apos;s discuss how I can help your team build better products or create a custom platform that supports your brand.
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
