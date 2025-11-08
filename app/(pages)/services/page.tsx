import {ArrowRight} from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import Container from '@/components/container'
import {Button} from '@/components/ui/button'

export default function ServicesPage() {
	return (
		<Container>
			<main>
				{/* Hero Section */}
				<section className="py-24">
					<div className="space-y-8 max-w-2xl">
						<div className="inline-flex">
							<div className="bg-primary/10 text-primary inline-flex items-center gap-2 rounded-full px-3 py-1.5">
								<div className="bg-primary h-1.5 w-1.5 rounded-full" />
								<span className="text-xs font-medium">
									Available for new projects
								</span>
							</div>
						</div>

						<div className="space-y-6">
							<h1 className="text-xl font-semibold leading-tight sm:text-2xl tracking-tight">
								Technical leadership for companies. Custom platforms for athletes.
							</h1>
							<div className="space-y-4">
								<p className="text-base leading-relaxed sm:text-lg text-foreground">
									I help companies build better products and develop stronger teams through technical leadership, developer experience consulting, and educational services. I&apos;ve worked with teams at Google, Shopify, O&apos;Reilly, and Sentry.
								</p>
								<p className="text-base leading-relaxed sm:text-lg text-foreground">
									I also build custom platforms for professional athletes in the outdoor industry. These are complete solutions that professional athletes own, designed to support their brand and connect with their community.
								</p>
							</div>
						</div>
					</div>
				</section>

				{/* Photo */}
				<section className="py-12">
					<div className="max-w-2xl">
						<div className="relative w-full aspect-[4/3] rounded-lg overflow-hidden">
							<Image
								src="/photos/website-photo-2.jpg"
								alt="Lauro Silva"
								fill
								className="object-cover"
								sizes="(max-width: 768px) 100vw, 680px"
							/>
						</div>
					</div>
				</section>

				{/* Companies Section */}
				<section className="py-24">
					<div className="space-y-16 max-w-2xl">
						<div className="relative">
							<div className="absolute left-0 top-0 bottom-0 w-1 bg-primary/20 rounded-full" />
							<div className="pl-8 space-y-12">
								{/* Photo */}
								<div className="relative w-full aspect-[4/3] rounded-lg overflow-hidden">
									<Image
										src="/photos/website-photo-7.jpg"
										alt=""
										fill
										className="object-cover"
										sizes="(max-width: 768px) 100vw, 680px"
									/>
								</div>

								<div className="space-y-8">
									<div className="space-y-6">
										<h2 className="text-lg font-semibold leading-tight sm:text-xl tracking-tight">
											Technical expertise and team development
							</h2>
										<div className="space-y-4">
											<p className="text-base leading-relaxed text-foreground">
												I provide technical leadership, developer experience consulting, and educational services to help your team build better products. My expertise comes from years of building large-scale, full-stack educational products and working with subject matter experts to create learning experiences that are effective and add real value.
											</p>
											<p className="text-base leading-relaxed text-muted-foreground">
												I&apos;ve worked on projects for companies like Google, Shopify, O&apos;Reilly, and Sentry. I bring that enterprise-level expertise, especially in developer experience and educational product development, to companies in the outdoor industry and beyond.
											</p>
										</div>
									</div>

									{/* Technical Leadership */}
									<div className="space-y-6">
										<div className="flex items-center gap-3">
											<div className="h-1 w-1 rounded-full bg-primary" />
											<h3 className="text-lg font-semibold leading-tight tracking-tight">
												Technical Leadership & Consulting
											</h3>
										</div>
										<div className="pl-4 space-y-4">
											<p className="text-base leading-relaxed text-foreground">
												I come in as a technical lead or consultant to help your team make better decisions, improve your developer experience, and build products that scale. This includes architecture planning, code reviews, technical strategy, and hands-on development when needed.
											</p>
											<p className="text-base leading-relaxed text-muted-foreground">
												My focus is on making your team more efficient and practical. I help you integrate modern tools and practices, from React and Next.js to AI integration into existing enterprise applications, in ways that actually work for your team and your users.
											</p>
										</div>

										{/* Testimonial */}
										<div className="pl-4 pt-6 border-t border-primary/20">
											<blockquote className="space-y-6">
												<p className="text-base leading-relaxed text-foreground">
													&ldquo;Lauro&apos;s expertise bridges technology and brand strategy. He understands how to connect technical excellence with authentic storytelling.&rdquo;
												</p>
												<div className="flex items-center gap-4">
													<div className="relative h-12 w-12 overflow-hidden rounded-full flex-shrink-0">
														<Image
															src="https://res.cloudinary.com/laurosilvacom/image/upload/v1731436030/laurosilvacom/hire-me-page/ru1j6csfgvj2af4b1dn6.webp"
															alt="Emily Schmitz"
															fill
															className="object-cover"
														/>
													</div>
													<div className="space-y-1 min-w-0">
														<p className="text-sm font-medium">
															Emily Schmitz
														</p>
														<p className="text-muted-foreground text-xs">
															HOKA
														</p>
													</div>
												</div>
											</blockquote>
										</div>
									</div>

									{/* Educational Services */}
									<div className="space-y-6 pt-6 border-t border-primary/20">
										<div className="flex items-center gap-3">
											<div className="h-1 w-1 rounded-full bg-primary" />
											<h3 className="text-lg font-semibold leading-tight tracking-tight">
												Educational Services & Team Upskilling
											</h3>
										</div>
										<div className="pl-4 space-y-4">
											<p className="text-base leading-relaxed text-foreground">
												I create and deliver educational content and workshops focused on full-stack development with React, Next.js, and TypeScript. I also help teams integrate AI into their existing applications and improve their overall developer experience.
											</p>
											<p className="text-base leading-relaxed text-muted-foreground">
												This includes remote workshops, custom curriculum development tailored to your team&apos;s needs, and educational content creation. My experience building large-scale educational products means I understand how to create learning experiences that are effective, not just informative.
											</p>
											<p className="text-base leading-relaxed text-muted-foreground">
												I work with subject matter experts to translate complex technical concepts into practical, actionable learning experiences. Whether you need to upskill your team on modern web development or integrate new technologies like AI, I create curriculum that your team can actually use.
											</p>
										</div>

										{/* Testimonials */}
										<div className="pl-4 pt-6 border-t border-primary/20 space-y-8">
											<blockquote className="space-y-6">
												<p className="text-base leading-relaxed text-foreground">
													&ldquo;Lauro is a total pro. His guidance helped us not only create polished onboarding videos, but also build the capability to create additional content independently. He taught us how to think about educational content strategically.&rdquo;
												</p>
												<div className="flex items-center gap-4">
													<div className="relative h-12 w-12 overflow-hidden rounded-full flex-shrink-0">
														<Image
															src="https://res.cloudinary.com/laurosilvacom/image/upload/v1731435976/laurosilvacom/hire-me-page/ok4aceenrvijrjcafxba.jpg"
															alt="Andrew Hedges"
															fill
															className="object-cover"
														/>
													</div>
													<div className="space-y-1 min-w-0">
														<p className="text-sm font-medium">
															Andrew Hedges
														</p>
														<p className="text-muted-foreground text-xs">
															Assistiv Labs
														</p>
													</div>
												</div>
											</blockquote>

											<blockquote className="space-y-6 pt-6 border-t border-primary/10">
												<p className="text-base leading-relaxed text-foreground">
													&ldquo;An hour with Lauro helped me untangle my thoughts and make a concrete plan. If you need dev content strategy, he&apos;s your person.&rdquo;
												</p>
												<div className="flex items-center gap-4">
													<div className="relative h-12 w-12 overflow-hidden rounded-full flex-shrink-0">
														<Image
															src="https://res.cloudinary.com/laurosilvacom/image/upload/v1731435976/laurosilvacom/hire-me-page/py2kbwptjbxfdqpoepkj.jpg"
															alt="Jason Lengstorf"
															fill
															className="object-cover"
														/>
													</div>
													<div className="space-y-1 min-w-0">
														<p className="text-sm font-medium">
															Jason Lengstorf
														</p>
														<p className="text-muted-foreground text-xs">
															Learn With Jason
														</p>
													</div>
												</div>
											</blockquote>
										</div>
									</div>

									{/* Button */}
									<div className="pt-8">
										<Button asChild size="lg">
											<Link href="/services/companies">
												Learn more about company services
												<ArrowRight className="ml-2 h-4 w-4" />
											</Link>
										</Button>
									</div>
								</div>
							</div>
						</div>
					</div>
				</section>

				{/* Divider */}
				<div className="relative py-8">
					<div className="absolute left-0 right-0 top-1/2 h-px bg-primary/30" />
					<div className="relative flex items-center justify-center">
						<div className="bg-background px-4">
							<div className="h-2 w-2 rounded-full bg-primary" />
						</div>
					</div>
				</div>

				{/* Professional Athletes Section */}
				<section className="py-24">
					<div className="space-y-16 max-w-2xl">
						<div className="relative">
							<div className="absolute left-0 top-0 bottom-0 w-1 bg-primary/20 rounded-full" />
							<div className="pl-8 space-y-12">
								{/* Photo */}
								<div className="relative w-full aspect-[4/3] rounded-lg overflow-hidden">
									<Image
										src="/photos/website-photo-12.jpg"
										alt=""
										fill
										className="object-cover"
										sizes="(max-width: 768px) 100vw, 680px"
									/>
								</div>

								<div className="space-y-8">
									<div className="space-y-6">
										<h2 className="text-lg font-semibold leading-tight sm:text-xl tracking-tight">
											Custom platforms that you own
										</h2>
										<div className="space-y-4">
											<p className="text-base leading-relaxed text-foreground">
												I work with professional athletes in the outdoor industry to build custom platforms that go far beyond a simple website. These are complete solutions that professional athletes own, designed to support their brand and connect with their community.
											</p>
											<p className="text-base leading-relaxed text-muted-foreground">
												At a certain stage in your career, you&apos;ve already built your brand. What you need is a platform you own. Instagram, Substack, YouTube. These are amazing places to create content, but they&apos;re not your platform. The only thing you truly own is your domain name. That&apos;s your internet real estate.
											</p>
											<p className="text-base leading-relaxed text-muted-foreground">
												I build custom software that meets your exact needs. Whether you need to publish coaching content, create educational materials, build an audience, or manage your brand, I create a platform that grows with your career.
											</p>
										</div>
									</div>

									{/* What I Build */}
									<div className="space-y-6">
										<div className="flex items-center gap-3">
											<div className="h-1 w-1 rounded-full bg-primary" />
											<h3 className="text-lg font-semibold leading-tight tracking-tight">
												What I build
											</h3>
										</div>
										<div className="pl-4 space-y-4">
											<p className="text-base leading-relaxed text-foreground">
												I create custom platforms built with React and modern web technologies. These aren&apos;t templates or generic solutions. They&apos;re built specifically to reflect your unique story, support your content strategy, and connect with your community.
											</p>
											<p className="text-base leading-relaxed text-muted-foreground">
												For example, I worked with Emily Schromm to build her content platform. As an athlete, she needed to create an audience and build her brand. As a coach, she wanted to publish her coaching content. She needed something more than a simple website. She needed a complete solution that integrated her content strategy, educational materials, and brand narrative.
											</p>
											<p className="text-base leading-relaxed text-muted-foreground">
												I also provide consulting on how to use these tools to build out a marketing strategy that benefits your overall brand. The platform is just the foundation. I help you think through how it fits into your broader content and brand strategy.
											</p>
										</div>
									</div>

									{/* Who I Work With */}
									<div className="space-y-6 pt-6 border-t border-primary/20">
										<div className="flex items-center gap-3">
											<div className="h-1 w-1 rounded-full bg-primary" />
											<h3 className="text-lg font-semibold leading-tight tracking-tight">
												Who I work with
											</h3>
										</div>
										<div className="pl-4 space-y-4">
											<p className="text-base leading-relaxed text-foreground">
												I work exclusively with professional athletes in the outdoor industry, across multiple sports including trail running, climbing, cycling, and more. If you&apos;re at a stage where you need to own your platform and build something custom that reflects your brand and supports your career, we might be a good fit.
											</p>
										</div>
									</div>

									{/* Testimonial */}
									<div className="pt-6 border-t border-primary/20">
										<blockquote className="space-y-6">
											<p className="text-base leading-relaxed text-foreground">
												&ldquo;Working with Lauro is always a great experience. His technical guidance and patience make complex projects feel manageable.&rdquo;
											</p>
											<div className="flex items-center gap-4">
												<div className="relative h-12 w-12 overflow-hidden rounded-full flex-shrink-0">
													<Image
														src="https://res.cloudinary.com/laurosilvacom/image/upload/v1731435976/laurosilvacom/hire-me-page/p3eglqeb7qfvsfzvh3qr.jpg"
														alt="Alejandro Nanez"
														fill
														className="object-cover"
													/>
												</div>
												<div className="space-y-1 min-w-0">
													<p className="text-sm font-medium">
														Alejandro Nanez
													</p>
													<p className="text-muted-foreground text-xs">
														Staff Engineer
													</p>
												</div>
											</div>
										</blockquote>
									</div>

									{/* Button */}
									<div className="pt-8">
										<Button asChild size="lg">
											<Link href="/services/athletes">
												Learn more about athlete platforms
												<ArrowRight className="ml-2 h-4 w-4" />
											</Link>
										</Button>
									</div>
								</div>
							</div>
						</div>
					</div>
				</section>

				{/* Clients */}
				<section className="py-24">
					<p className="text-muted-foreground mb-12 text-sm font-medium uppercase tracking-wider">
						Working with teams at:
					</p>
					<div className="grid grid-cols-2 items-center justify-items-center gap-12 sm:grid-cols-3">
						{[
							{src: '/google.png', alt: 'Google', width: 90},
							{src: '/oreilly.svg', alt: "O'Reilly", width: 90},
							{src: '/sentry.png', alt: 'Sentry', width: 110}
						].map((logo) => (
							<div key={logo.alt} className="w-20 sm:w-28">
								<Image
									src={logo.src}
									alt={logo.alt}
									width={logo.width}
									height={30}
									className="w-full opacity-60 transition-all duration-300 hover:opacity-100"
								/>
							</div>
						))}
					</div>
				</section>

				{/* CTA */}
				<section className="py-24">
					<div className="text-center max-w-2xl mx-auto">
							<Button asChild size="lg">
								<Link
									href="https://cal.com/laurosilvacom/chat"
									target="_blank"
									rel="noopener noreferrer">
									Book a free consultation
									<ArrowRight className="ml-2 h-4 w-4" />
								</Link>
							</Button>
					</div>
				</section>
			</main>
		</Container>
	)
}
