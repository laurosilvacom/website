import {ArrowRight} from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import Container from '@/components/container'
import {Button} from '@/components/ui/button'

interface Testimonial {
	quote: string
	author: string
	role: string
	image: string
	company: string
}

const testimonials: Testimonial[] = [
	{
		quote:
			'Lauro is a total pro. His guidance helped us not only create polished onboarding videos, but also build the capability to create additional content independently. He taught us how to think about educational content strategically.',
		author: 'Andrew Hedges',
		role: 'Assistiv Labs',
		image:
			'https://res.cloudinary.com/laurosilvacom/image/upload/v1731435976/laurosilvacom/hire-me-page/ok4aceenrvijrjcafxba.jpg',
		company: 'Assistiv Labs'
	},
	{
		quote:
			'An hour with Lauro helped me untangle my thoughts and make a concrete plan. If you need dev content strategy, he&apos;s your person.',
		author: 'Jason Lengstorf',
		role: 'Learn With Jason',
		image:
			'https://res.cloudinary.com/laurosilvacom/image/upload/v1731435976/laurosilvacom/hire-me-page/py2kbwptjbxfdqpoepkj.jpg',
		company: 'Learn With Jason'
	},
	{
		quote:
			'Lauro is an incredible engineer with a deep understanding of how to leverage technology for social good. His expertise has been invaluable in advancing our mission.',
		author: 'Anya Yeager',
		role: 'LOTUS Humanitarian',
		image:
			'https://res.cloudinary.com/laurosilvacom/image/upload/v1731435977/laurosilvacom/hire-me-page/gbwkf4uzwmxomngxhkj6.png',
		company: 'LOTUS Humanitarian'
	},
	{
		quote:
			'Lauro&apos;s expertise bridges technology and brand strategy, making him an invaluable partner. He understands how to connect technical excellence with authentic storytelling.',
		author: 'Emily Schmitz',
		role: 'HOKA',
		image:
			'https://res.cloudinary.com/laurosilvacom/image/upload/v1731436030/laurosilvacom/hire-me-page/ru1j6csfgvj2af4b1dn6.webp',
		company: 'HOKA'
	}
]

export default function CompaniesPage() {
	return (
		<>
			<Container>
				<main>
					{/* Hero */}
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
									Technical Leadership and Team Development for Companies
								</h1>
								<p className="text-base leading-relaxed sm:text-lg text-muted-foreground">
									I bring enterprise-level expertise from Google, Shopify, O&apos;Reilly, and Sentry to help your team build better products, improve developer experience, and create effective learning experiences.
								</p>
							</div>
						</div>
					</section>

					{/* Photo */}
					<section className="py-12">
						<div className="max-w-2xl">
							<div className="relative w-full aspect-[4/3] rounded-lg overflow-hidden">
								<Image
									src="/photos/website-photo-15.jpg"
									alt=""
									fill
									className="object-cover"
									sizes="(max-width: 768px) 100vw, 680px"
								/>
							</div>
						</div>
					</section>

					{/* What I believe */}
					<section className="py-16">
						<div className="space-y-8 max-w-2xl">
							<h2 className="text-lg font-semibold leading-tight sm:text-xl tracking-tight">
								What I believe
							</h2>

							<div className="space-y-6 text-base leading-relaxed">
								<p className="text-foreground">
									I believe that great products come from understanding both the technology and the people who use it. My years of building large-scale, full-stack educational products have taught me that effective software isn&apos;t just about clean code. It&apos;s about creating experiences that add real value.
								</p>

								<p className="text-muted-foreground">
									I&apos;ve worked on projects for companies like Google, Shopify, O&apos;Reilly, and Sentry. I bring that enterprise-level expertise, especially in developer experience and educational product development, to help companies in the outdoor industry and beyond build better products and develop stronger teams.
								</p>

								<p className="text-muted-foreground">
									Whether you need technical leadership, team upskilling, or help building educational products, I work with you to create solutions that are practical, effective, and genuinely useful. I understand how to translate complex technical concepts into actionable learning experiences, and I know how to make teams more efficient through better developer experience.
								</p>

								<p className="text-foreground">
									My focus is on bringing enterprise-level expertise to companies that want to build better products and develop stronger teams.
								</p>
							</div>
						</div>
					</section>

					{/* Photo */}
					<section className="py-12">
						<div className="max-w-2xl">
							<div className="relative w-full aspect-[4/3] rounded-lg overflow-hidden">
								<Image
									src="/photos/website-photo-14.jpg"
									alt=""
									fill
									className="object-cover"
									sizes="(max-width: 768px) 100vw, 680px"
								/>
							</div>
						</div>
					</section>

					{/* Who I support */}
					<section className="py-16">
						<div className="space-y-8 max-w-2xl">
							<h2 className="text-lg font-semibold leading-tight sm:text-xl tracking-tight">
								Who I support
							</h2>

							<p className="text-base leading-relaxed text-muted-foreground mb-6">
								You might be a good fit if:
							</p>

							<ul className="space-y-4 text-base leading-relaxed">
								<li className="flex items-start gap-3">
									<div className="h-1.5 w-1.5 rounded-full bg-primary mt-2 flex-shrink-0" />
									<span className="text-foreground">
										You need technical leadership or consulting to improve your developer experience and build products that scale
									</span>
								</li>
								<li className="flex items-start gap-3">
									<div className="h-1.5 w-1.5 rounded-full bg-primary mt-2 flex-shrink-0" />
									<span className="text-foreground">
										You want to upskill your team on modern web development (React, Next.js, TypeScript) or integrate AI into existing applications
									</span>
								</li>
								<li className="flex items-start gap-3">
									<div className="h-1.5 w-1.5 rounded-full bg-primary mt-2 flex-shrink-0" />
									<span className="text-foreground">
										You&apos;re building educational products or learning platforms and need expertise in creating effective learning experiences
									</span>
								</li>
								<li className="flex items-start gap-3">
									<div className="h-1.5 w-1.5 rounded-full bg-primary mt-2 flex-shrink-0" />
									<span className="text-foreground">
										You work with subject matter experts and need help translating complex concepts into practical, actionable content
									</span>
								</li>
								<li className="flex items-start gap-3">
									<div className="h-1.5 w-1.5 rounded-full bg-primary mt-2 flex-shrink-0" />
									<span className="text-foreground">
										You&apos;re in the outdoor industry and want to bring enterprise-level technical expertise to your products and teams
									</span>
								</li>
							</ul>
						</div>
					</section>

					{/* What I offer */}
					<section className="py-16">
						<div className="space-y-8 max-w-2xl">
							<h2 className="text-lg font-semibold leading-tight sm:text-xl tracking-tight">
								What I offer
							</h2>

							<div className="space-y-12">
								{/* Technical Leadership */}
								<div className="space-y-6">
									<h3 className="text-base font-semibold">
										Technical Leadership & Consulting
									</h3>
									<div className="space-y-4">
										<p className="text-base leading-relaxed text-foreground">
											I come in as a technical lead or consultant to help your team make better decisions, improve your developer experience, and build products that scale. This includes:
										</p>
										<ul className="space-y-2 text-base leading-relaxed pl-4">
											<li className="flex items-start gap-3">
												<span className="text-muted-foreground">•</span>
												<span className="text-foreground">
													<strong>Architecture planning</strong> – Design systems that scale and make sense for your team
												</span>
											</li>
											<li className="flex items-start gap-3">
												<span className="text-muted-foreground">•</span>
												<span className="text-foreground">
													<strong>Code reviews & technical strategy</strong> – Improve code quality and establish best practices
												</span>
											</li>
											<li className="flex items-start gap-3">
												<span className="text-muted-foreground">•</span>
												<span className="text-foreground">
													<strong>Developer experience consulting</strong> – Make your team more efficient through better tools and processes
												</span>
											</li>
											<li className="flex items-start gap-3">
												<span className="text-muted-foreground">•</span>
												<span className="text-foreground">
													<strong>AI integration</strong> – Help integrate AI into existing enterprise applications in practical ways
												</span>
											</li>
											<li className="flex items-start gap-3">
												<span className="text-muted-foreground">•</span>
												<span className="text-foreground">
													<strong>Hands-on development</strong> – Build features, fix critical issues, or lead development when needed
												</span>
											</li>
										</ul>
										<p className="text-base leading-relaxed text-muted-foreground">
											My expertise comes from years of building large-scale, full-stack products at companies like Google, Shopify, O&apos;Reilly, and Sentry. I understand how to make technical decisions that work for your team and your users.
										</p>
									</div>
								</div>

								{/* Educational Services */}
								<div className="space-y-6 pt-6 border-t border-primary/20">
									<h3 className="text-base font-semibold">
										Educational Services & Team Upskilling
									</h3>
									<div className="space-y-4">
										<p className="text-base leading-relaxed text-foreground">
											I create and deliver educational content and workshops focused on full-stack development. My experience building large-scale educational products means I understand how to create learning experiences that are effective, not just informative.
										</p>
										<ul className="space-y-2 text-base leading-relaxed pl-4">
											<li className="flex items-start gap-3">
												<span className="text-muted-foreground">•</span>
												<span className="text-foreground">
													<strong>Remote workshops</strong> – Hands-on sessions on React, Next.js, TypeScript, and modern web development
												</span>
											</li>
											<li className="flex items-start gap-3">
												<span className="text-muted-foreground">•</span>
												<span className="text-foreground">
													<strong>Custom curriculum development</strong> – Learning paths tailored to your team&apos;s needs and goals
												</span>
											</li>
											<li className="flex items-start gap-3">
												<span className="text-muted-foreground">•</span>
												<span className="text-foreground">
													<strong>Educational content creation</strong> – Work with subject matter experts to translate complex concepts into practical content
												</span>
											</li>
											<li className="flex items-start gap-3">
												<span className="text-muted-foreground">•</span>
												<span className="text-foreground">
													<strong>AI integration training</strong> – Help your team understand how to integrate AI into existing applications
												</span>
											</li>
											<li className="flex items-start gap-3">
												<span className="text-muted-foreground">•</span>
												<span className="text-foreground">
													<strong>Developer experience workshops</strong> – Improve team efficiency through better tools, processes, and practices
												</span>
											</li>
										</ul>
										<p className="text-base leading-relaxed text-muted-foreground">
											I work with subject matter experts to create learning experiences that add real value. Whether you&apos;re building educational products or upskilling your team, I create curriculum that your team can actually use.
										</p>
									</div>
								</div>
							</div>
						</div>
					</section>

					{/* Testimonials */}
					<section className="py-16">
						<div className="space-y-8 max-w-2xl">
							<h2 className="text-lg font-semibold leading-tight sm:text-xl tracking-tight">
								What clients say
							</h2>

							<div className="space-y-8">
								{testimonials.map((testimonial, idx) => (
									<div key={idx} className="border-t border-primary/20 pt-8">
										<blockquote className="space-y-6">
											<p className="text-base leading-relaxed text-foreground">
												&ldquo;{testimonial.quote}&rdquo;
											</p>
											<div className="flex items-center gap-4">
												<div className="relative h-12 w-12 overflow-hidden rounded-full flex-shrink-0">
													<Image
														src={testimonial.image}
														alt={testimonial.author}
														fill
														className="object-cover"
													/>
												</div>
												<div className="space-y-1 min-w-0">
													<p className="text-sm font-medium">
														{testimonial.author}
													</p>
													<p className="text-muted-foreground text-xs">
														{testimonial.role}
													</p>
												</div>
											</div>
										</blockquote>
									</div>
								))}
							</div>
						</div>
					</section>

					{/* How much it costs */}
					<section className="py-16">
						<div className="space-y-8 max-w-2xl">
							<h2 className="text-lg font-semibold leading-tight sm:text-xl tracking-tight">
								How much it costs
							</h2>

							<div className="space-y-6 text-base leading-relaxed">
								<p className="text-foreground">
									Pricing varies based on scope, timeline, and specific needs. Here&apos;s a general guide:
								</p>

								<div className="space-y-4">
									<div className="border border-border/30 rounded-lg p-6 space-y-4">
										<h3 className="text-base font-semibold">
											Technical Leadership & Consulting
										</h3>
										<p className="text-muted-foreground">
											Typically $150 to $250 per hour or project-based
										</p>
										<p className="text-sm text-muted-foreground">
											Factors include scope of engagement, complexity of technical challenges, and timeline. For longer-term engagements, we can discuss retainer arrangements.
										</p>
										<p className="text-sm text-muted-foreground">
											Example projects: Architecture reviews ($2,000 to $5,000), Developer experience audits ($3,000 to $8,000), Technical strategy sessions ($1,500 to $4,000).
										</p>
									</div>

									<div className="border border-border/30 rounded-lg p-6 space-y-4">
										<h3 className="text-base font-semibold">
											Educational Services & Workshops
										</h3>
										<p className="text-muted-foreground">
											Workshops: $3,000 to $8,000 per day
										</p>
										<p className="text-sm text-muted-foreground">
											Curriculum development: $5,000 to $15,000+ depending on scope
										</p>
										<p className="text-sm text-muted-foreground">
											Factors include: number of participants, workshop duration, customization level, and whether materials need to be created. Multi-day workshops or ongoing training programs can be structured as packages.
										</p>
									</div>

									<div className="border border-border/30 rounded-lg p-6 space-y-4">
										<h3 className="text-base font-semibold">
											Educational Product Development
										</h3>
										<p className="text-muted-foreground">
											Pricing varies based on scope
										</p>
										<p className="text-sm text-muted-foreground">
											Typical range: $20,000 to $100,000+
										</p>
										<p className="text-sm text-muted-foreground">
											Factors include: platform complexity, content creation needs, integrations, user management systems, and timeline. Building large-scale educational products requires careful planning and discovery.
										</p>
									</div>
								</div>

								<p className="text-sm text-muted-foreground italic">
									Please consider exploring any learning and professional development funds offered by your employer. If this pricing feels challenging, reach out anyway. We can explore what&apos;s possible and discuss options that work for your budget.
								</p>
							</div>
						</div>
					</section>

					{/* Getting started */}
					<section className="py-16">
						<div className="space-y-8 max-w-2xl">
							<h2 className="text-lg font-semibold leading-tight sm:text-xl tracking-tight">
								Getting started
							</h2>

							<div className="space-y-8">
								<div className="space-y-4">
									<div className="flex items-start gap-4">
										<div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
											<span className="text-sm font-semibold text-primary">1</span>
										</div>
										<div className="space-y-2 flex-1">
											<h3 className="text-base font-semibold">
												Schedule a free 30-minute exploratory call
											</h3>
											<p className="text-sm text-muted-foreground leading-relaxed">
												We&apos;ll connect virtually to explore if we&apos;re a good fit. I&apos;ll share more about my process and expertise, and you can ask any questions about how I can help your team or company. If we&apos;re both excited to work together, we move to the next step.
											</p>
										</div>
									</div>
								</div>

								<div className="space-y-4">
									<div className="flex items-start gap-4">
										<div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
											<span className="text-sm font-semibold text-primary">2</span>
										</div>
										<div className="space-y-2 flex-1">
											<h3 className="text-base font-semibold">
												Define scope and approach
											</h3>
											<p className="text-sm text-muted-foreground leading-relaxed">
												We&apos;ll discuss your specific needs, goals, and constraints. For larger projects, I may provide a discovery phase proposal. For consulting or workshops, we&apos;ll outline the approach and timeline that works for your team.
											</p>
										</div>
									</div>
								</div>

								<div className="space-y-4">
									<div className="flex items-start gap-4">
										<div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
											<span className="text-sm font-semibold text-primary">3</span>
										</div>
										<div className="space-y-2 flex-1">
											<h3 className="text-base font-semibold">
												Begin working together
											</h3>
											<p className="text-sm text-muted-foreground leading-relaxed">
												Whether it&apos;s technical consulting, team workshops, or building educational products, we&apos;ll work together with regular check-ins to ensure we&apos;re meeting your goals and delivering value to your team.
											</p>
										</div>
									</div>
								</div>
							</div>
						</div>
					</section>

					{/* CTA */}
					<section className="py-24">
						<div className="text-center max-w-2xl mx-auto space-y-6">
							<Button asChild size="lg">
								<Link
									href="https://cal.com/laurosilvacom/chat"
									target="_blank"
									rel="noopener noreferrer">
									Schedule a free consultation
									<ArrowRight className="ml-2 h-4 w-4" />
								</Link>
							</Button>
							<p className="text-sm text-muted-foreground">
								Or{' '}
								<Link
									href="/services"
									className="text-primary hover:underline">
									return to services
								</Link>
							</p>
						</div>
					</section>
				</main>
			</Container>
		</>
	)
}

