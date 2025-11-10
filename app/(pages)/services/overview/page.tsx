import {ArrowRight} from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import Container from '@/components/container'
import {Button} from '@/components/ui/button'

export default function ServicesOverviewPage() {
	return (
		<>
			<section className="relative flex min-h-screen items-center overflow-hidden pt-24 pb-16 lg:pt-32 lg:pb-24">
				<Container size="xl" className="relative z-10">
					<div className="mx-auto max-w-4xl space-y-16">
						{/* Narrative Introduction */}
						<div className="space-y-6">
							<p className="text-muted-foreground text-lg leading-relaxed lg:text-xl">
								Lauro Silva is a software engineer, community builder, and trail
								runner working at the intersection of technology, education, and
								the outdoor industry. He uses code and technical leadership to
								help companies build better products and develop stronger teams.
								He builds custom platforms for professional athletes—complete
								solutions they own, designed to support their brand and connect
								with their community.
							</p>
							<p className="text-muted-foreground text-lg leading-relaxed lg:text-xl">
								His work lives at the intersection of enterprise expertise and
								outdoor focus, grounded in the belief that technology should
								serve people, not the other way around. He&apos;s worked with
								teams at Google, Shopify, O&apos;Reilly, and Sentry, and now
								brings all that expertise to the outdoor industry.
							</p>
						</div>

						{/* Divider */}
						<div className="border-border border-t" />

						{/* Photo Grid */}
						<div className="grid gap-4 md:grid-cols-3">
							<div className="relative aspect-3/4 overflow-hidden rounded-lg">
								<Image
									src="/photos/website-photo-1.jpg"
									alt="Lauro Silva"
									fill
									className="object-cover"
									sizes="(max-width: 768px) 100vw, 33vw"
								/>
							</div>
							<div className="relative aspect-3/4 overflow-hidden rounded-lg">
								<Image
									src="/photos/website-photo-6.jpg"
									alt="Lauro Silva"
									fill
									className="object-cover"
									sizes="(max-width: 768px) 100vw, 33vw"
								/>
							</div>
							<div className="relative aspect-3/4 overflow-hidden rounded-lg">
								<Image
									src="/photos/website-photo-7.jpg"
									alt="Lauro Silva"
									fill
									className="object-cover"
									sizes="(max-width: 768px) 100vw, 33vw"
								/>
							</div>
						</div>

						{/* Divider */}
						<div className="border-border border-t" />

						{/* Top Projects */}
						<div className="grid gap-8 md:grid-cols-12 md:gap-12">
							<div className="md:col-span-4">
								<h2 className="text-2xl font-bold tracking-tight lg:text-3xl">
									Top Projects:
								</h2>
							</div>
							<div className="md:col-span-8">
								<ul className="space-y-4 text-base leading-relaxed">
									<li className="flex items-start gap-3">
										<span className="text-primary mt-1.5 shrink-0">•</span>
										<div>
											<a
												href="https://tierralibre.run"
												target="_blank"
												rel="noopener noreferrer"
												className="text-foreground hover:text-primary font-semibold underline transition-colors">
												Tierra Libre Run
											</a>
											<p className="text-muted-foreground mt-1 text-sm">
												BIPOC-created, BIPOC-led nonprofit platform expanding
												trail running access. Built a complete platform for race
												entry funding, mentorship matching, and community events
												across the Pacific Northwest.
											</p>
										</div>
									</li>
									<li className="flex items-start gap-3">
										<span className="text-primary mt-1.5 shrink-0">•</span>
										<div>
											<a
												href="https://outdoorbrandcamp.com"
												target="_blank"
												rel="noopener noreferrer"
												className="text-foreground hover:text-primary font-semibold underline transition-colors">
												Outdoor Brand Camp
											</a>
											<p className="text-muted-foreground mt-1 text-sm">
												Professional education platform for the outdoor
												industry. Built a comprehensive learning platform with
												exercise-driven workshops, video content, and
												downloadable resources for brand and athlete
												partnerships.
											</p>
										</div>
									</li>
									<li className="flex items-start gap-3">
										<span className="text-primary mt-1.5 shrink-0">•</span>
										<div>
											<a
												href="https://sophiaking.run"
												target="_blank"
												rel="noopener noreferrer"
												className="text-foreground hover:text-primary font-semibold underline transition-colors">
												Sophie King
											</a>
											<p className="text-muted-foreground mt-1 text-sm">
												Custom platform for elite distance runner and 2024 U.S.
												Marathon Olympic Trials qualifier. Built a complete
												solution for race schedule, media, achievements, and
												brand management.
											</p>
										</div>
									</li>
									<li className="flex items-start gap-3">
										<span className="text-primary mt-1.5 shrink-0">•</span>
										<div>
											<a
												href="https://epicreact.dev"
												target="_blank"
												rel="noopener noreferrer"
												className="text-foreground hover:text-primary font-semibold underline transition-colors">
												Epic React
											</a>
											<p className="text-muted-foreground mt-1 text-sm">
												Master React 19 with code-focused workshops by Kent C.
												Dodds. Built an interactive learning platform with
												self-paced workshops, 243 exercises, progress tracking,
												and comprehensive video content for professional web
												developers.
											</p>
										</div>
									</li>
								</ul>
							</div>
						</div>

						{/* Divider */}
						<div className="border-border border-t" />

						{/* Package Options */}
						<div className="space-y-8">
							<h2 className="text-center text-3xl font-bold tracking-tight lg:text-4xl">
								Package Options
							</h2>

							<div className="grid gap-8 md:grid-cols-2">
								{/* For Companies */}
								<div className="border-border bg-background rounded-xl border p-8">
									<h3 className="mb-4 text-center text-xl font-bold tracking-tight lg:text-2xl">
										For Companies
									</h3>
									<p className="text-muted-foreground mb-6 text-center text-base leading-relaxed">
										Technical leadership, developer training, and developer
										experience consulting to help your team build better
										products and develop stronger teams.
									</p>
									<div className="space-y-4">
										<div>
											<h4 className="text-foreground mb-1.5 text-sm font-semibold">
												Technical Leadership & Consulting
											</h4>
											<p className="text-muted-foreground text-sm leading-relaxed">
												Architecture planning, code reviews, technical strategy,
												and hands-on development. I help you integrate modern
												tools and practices from React and Next.js to AI
												integration.
											</p>
										</div>
										<div>
											<h4 className="text-foreground mb-1.5 text-sm font-semibold">
												Developer Training
											</h4>
											<p className="text-muted-foreground text-sm leading-relaxed">
												Remote workshops, custom curriculum development, and
												educational content creation. Focused on full-stack
												development with React, Next.js, and TypeScript.
											</p>
										</div>
										<div>
											<h4 className="text-foreground mb-1.5 text-sm font-semibold">
												Developer Experience Consulting
											</h4>
											<p className="text-muted-foreground text-sm leading-relaxed">
												I help teams improve their developer experience by
												integrating modern tools and practices in ways that
												actually work for your team and your users.
											</p>
										</div>
									</div>
								</div>

								{/* For Athletes */}
								<div className="border-border bg-background rounded-xl border p-8">
									<h3 className="mb-4 text-center text-xl font-bold tracking-tight lg:text-2xl">
										For Athletes
									</h3>
									<p className="text-muted-foreground mb-6 text-center text-base leading-relaxed">
										Custom platforms you own. Complete solutions designed to
										support your brand and connect with your community.
									</p>
									<div className="space-y-4">
										<div>
											<h4 className="text-foreground mb-1.5 text-sm font-semibold">
												Custom Platform Development
											</h4>
											<p className="text-muted-foreground text-sm leading-relaxed">
												Custom platforms built with React and modern web
												technologies. Not templates. Built specifically to
												reflect your story, support your content strategy, and
												connect with your community.
											</p>
										</div>
										<div>
											<h4 className="text-foreground mb-1.5 text-sm font-semibold">
												Content Strategy
											</h4>
											<p className="text-muted-foreground text-sm leading-relaxed">
												I provide consulting on marketing strategy and how the
												platform fits into your broader content and brand goals.
											</p>
										</div>
										<div>
											<h4 className="text-foreground mb-1.5 text-sm font-semibold">
												Brand Management
											</h4>
											<p className="text-muted-foreground text-sm leading-relaxed">
												The platform is designed to grow with you as your career
												evolves. Tailored to your needs: coaching content,
												educational resources, audience building, brand
												management.
											</p>
										</div>
									</div>
								</div>
							</div>

							<div className="pt-4 text-center">
								<p className="text-muted-foreground text-sm italic">
									*Also available for bespoke projects tailored to fit your
									brand&apos;s unique needs.
								</p>
							</div>
						</div>

						{/* Divider */}
						<div className="border-border border-t" />

						{/* Client Quote */}
						<div className="border-border bg-muted relative rounded-2xl border p-8 lg:p-10">
							<div className="text-muted absolute -top-4 -right-4 font-serif text-8xl leading-none select-none">
								&ldquo;
							</div>
							<div className="relative z-10">
								<p className="text-foreground text-lg leading-relaxed italic lg:text-xl">
									Lauro&apos;s expertise bridges technology and brand strategy.
									He understands how to connect technical excellence with
									authentic storytelling.
								</p>
								<div className="border-border mt-6 flex items-center gap-4 border-t pt-6">
									<div className="ring-border relative h-12 w-12 shrink-0 overflow-hidden rounded-full ring-2">
										<Image
											src="https://res.cloudinary.com/laurosilvacom/image/upload/v1731436030/laurosilvacom/hire-me-page/ru1j6csfgvj2af4b1dn6.webp"
											alt="Emily Schmitz"
											fill
											className="object-cover"
										/>
									</div>
									<div className="min-w-0 space-y-0.5">
										<p className="text-base font-semibold">Emily Schmitz</p>
										<p className="text-muted-foreground text-sm">
											HOKA Athlete
										</p>
									</div>
								</div>
							</div>
						</div>

						{/* CTA */}
						<div className="border-border border-t pt-12 text-center">
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
		</>
	)
}
