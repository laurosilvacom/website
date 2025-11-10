import {ArrowRight, ArrowUpRight} from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import Container from '@/components/container'
import {Button} from '@/components/ui/button'

export default function ServicesOnePagerPage() {
	return (
		<>
			<section className="relative flex min-h-screen items-center overflow-hidden pt-24 pb-16 lg:pt-32 lg:pb-24">
				<Container size="xl" className="relative z-10">
					<div className="mx-auto max-w-4xl space-y-16">
						{/* 1. Main Heading */}
						<div className="space-y-4">
							<h1 className="max-w-5xl text-4xl leading-[1.1] font-bold tracking-tight sm:text-5xl lg:text-7xl xl:text-8xl">
								What I Offer
							</h1>
						</div>

						{/* Divider */}
						<div className="border-border border-t" />

						{/* 2. Narrative Introduction - Hook */}
						<div className="space-y-6">
							<p className="text-muted-foreground text-lg leading-relaxed lg:text-xl">
								I&apos;m a software engineer, community builder, and trail
								runner. I help companies build better products and develop
								stronger teams through technical leadership, developer training,
								and hands-on development. I also build custom platforms for
								professional athletes—complete solutions they own, designed to
								support their brand and connect with their community.
							</p>
							<p className="text-muted-foreground text-lg leading-relaxed lg:text-xl">
								My work is grounded in the belief that technology should serve
								people, not the other way around. I bring enterprise-level
								expertise to the outdoor industry, where I focus on building
								products and teams that actually matter.
							</p>
						</div>

						{/* Divider */}
						<div className="border-border border-t" />

						{/* 3. Companies - Credibility */}
						<div className="space-y-6">
							<h2 className="text-2xl font-bold tracking-tight lg:text-3xl">
								Companies I&apos;ve Worked With
							</h2>
							<div className="flex flex-wrap items-center gap-6">
								<div className="bg-muted border-border hover:bg-accent flex items-center gap-3 rounded-lg border px-4 py-2.5 transition-colors">
									<img
										src="https://www.google.com/s2/favicons?domain=google.com&sz=32"
										alt="Google"
										className="h-5 w-5 shrink-0"
									/>
									<span className="text-sm font-medium">Google</span>
								</div>
								<div className="bg-muted border-border hover:bg-accent flex items-center gap-3 rounded-lg border px-4 py-2.5 transition-colors">
									<img
										src="https://www.google.com/s2/favicons?domain=shopify.com&sz=32"
										alt="Shopify"
										className="h-5 w-5 shrink-0"
									/>
									<span className="text-sm font-medium">Shopify</span>
								</div>
								<div className="bg-muted border-border hover:bg-accent flex items-center gap-3 rounded-lg border px-4 py-2.5 transition-colors">
									<img
										src="https://www.google.com/s2/favicons?domain=oreilly.com&sz=32"
										alt="O'Reilly"
										className="h-5 w-5 shrink-0"
									/>
									<span className="text-sm font-medium">O&apos;Reilly</span>
								</div>
								<div className="bg-muted border-border hover:bg-accent flex items-center gap-3 rounded-lg border px-4 py-2.5 transition-colors">
									<img
										src="https://www.google.com/s2/favicons?domain=sentry.io&sz=32"
										alt="Sentry"
										className="h-5 w-5 shrink-0"
									/>
									<span className="text-sm font-medium">Sentry</span>
								</div>
							</div>
						</div>

						{/* Divider */}
						<div className="border-border border-t" />

						{/* 4. Technologies - Expertise */}
						<div className="space-y-6">
							<h2 className="text-2xl font-bold tracking-tight lg:text-3xl">
								Technologies I Work With
							</h2>
							<div className="flex flex-wrap items-center gap-4">
								<div className="bg-muted border-border hover:bg-accent flex items-center gap-2.5 rounded-lg border px-3.5 py-2 transition-colors">
									<img
										src="https://www.google.com/s2/favicons?domain=react.dev&sz=32"
										alt="React"
										className="h-5 w-5 shrink-0"
									/>
									<span className="text-sm font-medium">React</span>
								</div>
								<div className="bg-muted border-border hover:bg-accent flex items-center gap-2.5 rounded-lg border px-3.5 py-2 transition-colors">
									<img
										src="https://www.google.com/s2/favicons?domain=nextjs.org&sz=32"
										alt="Next.js"
										className="h-5 w-5 shrink-0"
									/>
									<span className="text-sm font-medium">Next.js</span>
								</div>
								<div className="bg-muted border-border hover:bg-accent flex items-center gap-2.5 rounded-lg border px-3.5 py-2 transition-colors">
									<img
										src="https://www.google.com/s2/favicons?domain=typescriptlang.org&sz=32"
										alt="TypeScript"
										className="h-5 w-5 shrink-0"
									/>
									<span className="text-sm font-medium">TypeScript</span>
								</div>
								<div className="bg-muted border-border hover:bg-accent flex items-center gap-2.5 rounded-lg border px-3.5 py-2 transition-colors">
									<img
										src="https://www.google.com/s2/favicons?domain=nodejs.org&sz=32"
										alt="Node.js"
										className="h-5 w-5 shrink-0"
									/>
									<span className="text-sm font-medium">Node.js</span>
								</div>
								<div className="bg-muted border-border hover:bg-accent flex items-center gap-2.5 rounded-lg border px-3.5 py-2 transition-colors">
									<img
										src="https://www.google.com/s2/favicons?domain=tailwindcss.com&sz=32"
										alt="Tailwind CSS"
										className="h-5 w-5 shrink-0"
									/>
									<span className="text-sm font-medium">Tailwind CSS</span>
								</div>
							</div>
						</div>

						{/* Divider */}
						<div className="border-border border-t" />

						{/* 5. Top Projects - Proof/Portfolio */}
						<div className="grid gap-8 md:grid-cols-12 md:gap-12">
							<div className="md:col-span-4">
								<h2 className="text-2xl font-bold tracking-tight lg:text-3xl">
									Top Projects:
								</h2>
							</div>
							<div className="md:col-span-8">
								<ul className="space-y-4 text-base leading-relaxed">
									<li className="group hover:bg-muted/50 flex items-start gap-3 rounded-lg p-3 transition-colors">
										<ArrowUpRight className="text-muted-foreground group-hover:text-primary mt-1.5 h-5 w-5 shrink-0 transition-colors" />
										<div className="flex-1">
											<a
												href="https://tierralibre.run"
												target="_blank"
												rel="noopener noreferrer"
												className="text-foreground hover:text-primary inline-flex items-center gap-2 font-semibold underline transition-colors">
												<img
													src="https://www.google.com/s2/favicons?domain=tierralibre.run&sz=16"
													alt=""
													className="h-5 w-5 shrink-0"
												/>
												Tierra Libre Run
											</a>
											<p className="text-muted-foreground mt-1.5 text-sm leading-relaxed">
												BIPOC-created, BIPOC-led nonprofit platform expanding
												trail running access. Built a complete platform for race
												entry funding, mentorship matching, and community events
												across the Pacific Northwest.
											</p>
										</div>
									</li>
									<li className="group hover:bg-muted/50 flex items-start gap-3 rounded-lg p-3 transition-colors">
										<ArrowUpRight className="text-muted-foreground group-hover:text-primary mt-1.5 h-5 w-5 shrink-0 transition-colors" />
										<div className="flex-1">
											<a
												href="https://outdoorbrandcamp.com"
												target="_blank"
												rel="noopener noreferrer"
												className="text-foreground hover:text-primary inline-flex items-center gap-2 font-semibold underline transition-colors">
												<img
													src="https://www.google.com/s2/favicons?domain=outdoorbrandcamp.com&sz=16"
													alt=""
													className="h-5 w-5 shrink-0"
												/>
												Outdoor Brand Camp
											</a>
											<p className="text-muted-foreground mt-1.5 text-sm leading-relaxed">
												Professional education platform for the outdoor
												industry. Built a comprehensive learning platform with
												exercise-driven workshops, video content, and
												downloadable resources for brand and athlete
												partnerships.
											</p>
										</div>
									</li>
									<li className="group hover:bg-muted/50 flex items-start gap-3 rounded-lg p-3 transition-colors">
										<ArrowUpRight className="text-muted-foreground group-hover:text-primary mt-1.5 h-5 w-5 shrink-0 transition-colors" />
										<div className="flex-1">
											<a
												href="https://sophiaking.run"
												target="_blank"
												rel="noopener noreferrer"
												className="text-foreground hover:text-primary inline-flex items-center gap-2 font-semibold underline transition-colors">
												<img
													src="https://www.google.com/s2/favicons?domain=sophiaking.run&sz=16"
													alt=""
													className="h-5 w-5 shrink-0"
												/>
												Sophie King
											</a>
											<p className="text-muted-foreground mt-1.5 text-sm leading-relaxed">
												Custom platform for elite distance runner and 2024 U.S.
												Marathon Olympic Trials qualifier. Built a complete
												solution for race schedule, media, achievements, and
												brand management.
											</p>
										</div>
									</li>
									<li className="group hover:bg-muted/50 flex items-start gap-3 rounded-lg p-3 transition-colors">
										<ArrowUpRight className="text-muted-foreground group-hover:text-primary mt-1.5 h-5 w-5 shrink-0 transition-colors" />
										<div className="flex-1">
											<a
												href="https://epicreact.dev"
												target="_blank"
												rel="noopener noreferrer"
												className="text-foreground hover:text-primary inline-flex items-center gap-2 font-semibold underline transition-colors">
												<img
													src="https://www.google.com/s2/favicons?domain=epicreact.dev&sz=16"
													alt=""
													className="h-5 w-5 shrink-0"
												/>
												Epic React
											</a>
											<p className="text-muted-foreground mt-1.5 text-sm leading-relaxed">
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

						{/* 6. Photo Grid - Visual Break */}
						<div className="grid gap-4 md:grid-cols-3">
							<div className="border-border relative aspect-3/4 overflow-hidden rounded-lg border shadow-sm transition-shadow hover:shadow-md">
								<Image
									src="/photos/website-photo-2.jpg"
									alt="Lauro Silva"
									fill
									className="object-cover"
									sizes="(max-width: 768px) 100vw, 33vw"
								/>
							</div>
							<div className="border-border relative aspect-3/4 overflow-hidden rounded-lg border shadow-sm transition-shadow hover:shadow-md">
								<Image
									src="/photos/website-photo-3.jpg"
									alt="Lauro Silva"
									fill
									className="object-cover"
									sizes="(max-width: 768px) 100vw, 33vw"
								/>
							</div>
							<div className="border-border relative aspect-3/4 overflow-hidden rounded-lg border shadow-sm transition-shadow hover:shadow-md">
								<Image
									src="/photos/website-photo-4.jpg"
									alt="Lauro Silva"
									fill
									className="object-cover"
									sizes="(max-width: 768px) 100vw, 33vw"
								/>
							</div>
						</div>

						{/* Divider */}
						<div className="border-border border-t" />

						{/* 7. Package Options - The Offering */}
						<div className="space-y-8">
							<h2 className="text-center text-3xl font-bold tracking-tight lg:text-4xl">
								Package Options
							</h2>

							<div className="grid gap-6 md:grid-cols-2">
								{/* For Companies */}
								<div className="border-border bg-card hover:bg-muted/50 hover:border-border group relative rounded-xl border p-8 shadow-sm transition-all duration-300 hover:shadow-md">
									<div className="relative">
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
													Architecture planning, code reviews, technical
													strategy, and hands-on development. I help you
													integrate modern tools and practices from React and
													Next.js to AI integration.
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
								</div>

								{/* For Athletes */}
								<div className="border-border bg-card hover:bg-muted/50 hover:border-border group relative rounded-xl border p-8 shadow-sm transition-all duration-300 hover:shadow-md">
									<div className="relative">
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
													platform fits into your broader content and brand
													goals.
												</p>
											</div>
											<div>
												<h4 className="text-foreground mb-1.5 text-sm font-semibold">
													Platform Management
												</h4>
												<p className="text-muted-foreground text-sm leading-relaxed">
													The platform is designed to grow with you as your
													career evolves. Tailored to your needs: coaching
													content, educational resources, audience building,
													brand management.
												</p>
											</div>
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

						{/* 8. Client Quote - Social Proof */}
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

						{/* 9. CTA - Call to Action */}
						<div className="border-border border-t pt-12 text-center">
							<Button asChild size="lg" className="group">
								<Link
									href="https://cal.com/laurosilvacom/chat"
									target="_blank"
									rel="noopener noreferrer">
									Book a free consultation
									<ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
								</Link>
							</Button>
						</div>
					</div>
				</Container>
			</section>
		</>
	)
}
