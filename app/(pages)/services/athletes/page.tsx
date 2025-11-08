import {ArrowRight} from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import Container from '@/components/container'
import {Button} from '@/components/ui/button'

export default function AthletesPage() {
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
									Custom Software Platforms for Professional Athletes
								</h1>
								<p className="text-base leading-relaxed sm:text-lg text-muted-foreground">
									Custom technology designed to support your brand and connect with your community. This goes far beyond a website. It&apos;s software that builds lasting relationships.
								</p>
							</div>
						</div>
					</section>

					{/* Photo */}
					<section className="py-12">
						<div className="max-w-2xl">
							<div className="relative w-full aspect-[4/3] rounded-lg overflow-hidden shadow-lg">
								<Image
									src="/photos/website-photo-5.jpg"
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
									I believe that pro athletes in the outdoor industry deserve technology that matches their dedication and excellence. Too often, athletes are offered generic websites or platforms that don&apos;t reflect their unique story, values, or the community they&apos;ve built.
								</p>

								<p className="text-muted-foreground">
									In an industry where authenticity matters, your digital presence should be as intentional and high-quality as your training. Social media platforms come and go, but a custom platform you own? That&apos;s where your brand lives and grows. It&apos;s where you can share your journey, educate your community, and build something that lasts beyond the next algorithm change.
								</p>

								<p className="text-muted-foreground">
									I believe in the intersection of technology, education, and brand storytelling. Your platform shouldn&apos;t just showcase achievements. It should help your community learn, grow, and connect with your journey. It should reflect who you are, what you stand for, and where you&apos;re going.
								</p>

								<p className="text-foreground">
									I&apos;m here to build you a platform that grows with your career, supports your voice, and creates real connections with the people who matter most to your brand.
								</p>
							</div>
						</div>
					</section>

					{/* Photo */}
					<section className="py-12">
						<div className="max-w-2xl">
							<div className="relative w-full aspect-[4/3] rounded-lg overflow-hidden shadow-lg">
								<Image
									src="/photos/website-photo-10.jpg"
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
										You&apos;re a pro athlete in the outdoor industry looking to build or elevate your brand beyond social media
									</span>
								</li>
								<li className="flex items-start gap-3">
									<div className="h-1.5 w-1.5 rounded-full bg-primary mt-2 flex-shrink-0" />
									<span className="text-foreground">
										You want to own your digital presence with world-class software, not just a basic website
									</span>
								</li>
								<li className="flex items-start gap-3">
									<div className="h-1.5 w-1.5 rounded-full bg-primary mt-2 flex-shrink-0" />
									<span className="text-foreground">
										You&apos;re ready to invest in bespoke technology that reflects your unique story and values
									</span>
								</li>
								<li className="flex items-start gap-3">
									<div className="h-1.5 w-1.5 rounded-full bg-primary mt-2 flex-shrink-0" />
									<span className="text-foreground">
										You want to educate and engage your community, not just broadcast to them
									</span>
								</li>
								<li className="flex items-start gap-3">
									<div className="h-1.5 w-1.5 rounded-full bg-primary mt-2 flex-shrink-0" />
									<span className="text-foreground">
										You&apos;re navigating brand partnerships, content creation, or building a business around your athletic career
									</span>
								</li>
							</ul>
						</div>
					</section>

					{/* What we can cover */}
					<section className="py-16">
						<div className="space-y-8 max-w-2xl">
							<h2 className="text-lg font-semibold leading-tight sm:text-xl tracking-tight">
								What we can build
							</h2>

							<p className="text-base leading-relaxed text-muted-foreground mb-6">
								Every platform is custom-built for you, but here&apos;s what we typically include:
							</p>

							<ul className="space-y-4 text-base leading-relaxed">
								<li className="flex items-start gap-3">
									<div className="h-1.5 w-1.5 rounded-full bg-primary mt-2 flex-shrink-0" />
									<span className="text-foreground">
										<strong>Custom platform architecture</strong> – Built from scratch to reflect your brand, not a template
									</span>
								</li>
								<li className="flex items-start gap-3">
									<div className="h-1.5 w-1.5 rounded-full bg-primary mt-2 flex-shrink-0" />
									<span className="text-foreground">
										<strong>Content management</strong> – Easy-to-use systems for sharing your journey, training insights, and achievements
									</span>
								</li>
								<li className="flex items-start gap-3">
									<div className="h-1.5 w-1.5 rounded-full bg-primary mt-2 flex-shrink-0" />
									<span className="text-foreground">
										<strong>Educational content integration</strong> – Share knowledge, training methods, and insights that help your community grow
									</span>
								</li>
								<li className="flex items-start gap-3">
									<div className="h-1.5 w-1.5 rounded-full bg-primary mt-2 flex-shrink-0" />
									<span className="text-foreground">
										<strong>Performance tracking & analytics</strong> – Tools to showcase your progress and understand your audience
									</span>
								</li>
								<li className="flex items-start gap-3">
									<div className="h-1.5 w-1.5 rounded-full bg-primary mt-2 flex-shrink-0" />
									<span className="text-foreground">
										<strong>Community engagement features</strong> – Build connections through comments, newsletters, or member areas
									</span>
								</li>
								<li className="flex items-start gap-3">
									<div className="h-1.5 w-1.5 rounded-full bg-primary mt-2 flex-shrink-0" />
									<span className="text-foreground">
										<strong>Brand partnership integration</strong> – Seamlessly showcase sponsors and collaborations
									</span>
								</li>
								<li className="flex items-start gap-3">
									<div className="h-1.5 w-1.5 rounded-full bg-primary mt-2 flex-shrink-0" />
									<span className="text-foreground">
										<strong>Ongoing support & evolution</strong> – Your platform grows with your career, adapting to new goals and opportunities
									</span>
								</li>
							</ul>
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
									Every platform is unique, and pricing reflects the scope and complexity of your needs. To begin, I ask that you commit to a discovery phase where we define your vision, technical requirements, and desired outcomes.
								</p>

								<div className="space-y-4">
									<div className="border border-border/30 rounded-lg p-6 space-y-4">
										<h3 className="text-base font-semibold">
											Discovery & Planning Phase
										</h3>
										<p className="text-muted-foreground">
											Investment: $2,000
										</p>
										<p className="text-sm text-muted-foreground">
											What&apos;s included:
										</p>
										<ul className="space-y-2 text-sm text-muted-foreground pl-4">
											<li>• Discovery Questionnaire to clarify your vision and goals</li>
											<li>• 2 Strategy Sessions (60 minutes each)</li>
											<li>• Technical requirements & architecture planning</li>
											<li>• Brand narrative & content strategy</li>
											<li>• Detailed project proposal with timeline and pricing</li>
										</ul>
									</div>

									<div className="border border-border/30 rounded-lg p-6 space-y-4">
										<h3 className="text-base font-semibold">
											Platform Development
										</h3>
										<p className="text-muted-foreground">
											Pricing varies based on scope
										</p>
										<p className="text-sm text-muted-foreground">
											Typical range: $15,000 - $50,000+
										</p>
										<p className="text-sm text-muted-foreground">
											Factors include: feature complexity, content migration, integrations, design requirements, and timeline.
										</p>
									</div>
								</div>

								<p className="text-sm text-muted-foreground italic">
									Please consider exploring any brand partnership or business development funds available to you. If this pricing feels challenging, reach out anyway. We can explore what&apos;s possible.
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
												We&apos;ll connect virtually to explore if we&apos;re a good fit. I&apos;ll share more about my process, and you can ask any questions about building your platform. If we&apos;re both excited to work together, we move to the next step.
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
												Complete a discovery questionnaire
											</h3>
											<p className="text-sm text-muted-foreground leading-relaxed">
												I&apos;ll share a thorough questionnaire for you to complete before our first strategy session. This helps us both understand your vision, goals, and what success looks like for your platform.
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
												Begin building your platform
											</h3>
											<p className="text-sm text-muted-foreground leading-relaxed">
												After our discovery phase, we&apos;ll have a clear roadmap. I&apos;ll build your platform with regular check-ins, ensuring it reflects your brand and serves your community. Your platform will evolve with your career.
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

