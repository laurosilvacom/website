import {ArrowRight} from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import Container from '@/components/container'
import {Button} from '@/components/ui/button'

export default function AthletesPage() {
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
								<h1 className="max-w-5xl text-4xl leading-[1.1] font-bold tracking-tight sm:text-5xl lg:text-7xl xl:text-8xl">
									Custom Platforms
									<br />
									For <span className="text-primary">Pro Athletes</span>
								</h1>

								<div className="text-muted-foreground max-w-2xl space-y-4 text-lg leading-relaxed lg:text-xl">
									<p>
										Custom technology designed to support your brand and connect
										with your community. This goes far beyond a website.
										It&apos;s software that builds lasting relationships.
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
									src="/photos/website-photo-5.jpg"
									alt="Custom athlete platforms"
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

			{/* What I Believe Section */}
			<section className="border-border border-t py-24 lg:py-32">
				<Container size="xl">
					{/* Section Header */}
					<div className="mb-16 lg:mb-24">
						<div className="max-w-3xl">
							<h2 className="mb-6 text-3xl font-bold tracking-tight lg:text-5xl xl:text-6xl">
								What I believe
							</h2>
							<div className="text-muted-foreground space-y-4 text-lg leading-relaxed lg:text-xl">
								<p>
									I believe that pro athletes in the outdoor industry deserve
									technology that matches their dedication and excellence. Too
									often, athletes are offered generic websites or platforms that
									don&apos;t reflect their unique story, values, or the
									community they&apos;ve built.
								</p>
								<p>
									In an industry where authenticity matters, your digital
									presence should be as intentional and high-quality as your
									training. Social media platforms come and go, but a custom
									platform you own? That&apos;s where your brand lives and
									grows. It&apos;s where you can share your journey, educate
									your community, and build something that lasts beyond the next
									algorithm change.
								</p>
								<p>
									I believe in the intersection of technology, education, and
									brand storytelling. Your platform shouldn&apos;t just showcase
									achievements. It should help your community learn, grow, and
									connect with your journey. It should reflect who you are, what
									you stand for, and where you&apos;re going.
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
										src="/photos/website-photo-5.jpg"
										alt="Custom athlete platforms"
										fill
										className="rounded-2xl object-cover transition-transform duration-300 group-hover:scale-[1.02]"
										sizes="(max-width: 1024px) 100vw, 40vw"
									/>
								</div>
							</div>
						</div>

						{/* Content */}
						<div className="space-y-12 lg:col-span-7 lg:space-y-16">
							<div className="space-y-6">
								<p className="text-foreground text-lg leading-relaxed">
									I&apos;m here to build you a platform that grows with your
									career, supports your voice, and creates real connections with
									the people who matter most to your brand.
								</p>
							</div>
						</div>
					</div>
				</Container>
			</section>

			{/* Who I Support Section */}
			<section className="border-border border-t py-24 lg:py-32">
				<Container size="xl">
					{/* Section Header */}
					<div className="mb-16 lg:mb-24">
						<div className="max-w-3xl">
							<h2 className="mb-6 text-3xl font-bold tracking-tight lg:text-5xl xl:text-6xl">
								Who I support
							</h2>
							<p className="text-muted-foreground text-lg leading-relaxed lg:text-xl">
								You might be a good fit if:
							</p>
						</div>
					</div>

					<div className="grid items-start gap-12 lg:grid-cols-12 lg:gap-16">
						{/* Content */}
						<div className="order-2 space-y-12 lg:order-1 lg:col-span-7 lg:space-y-16">
							<div className="group border-border bg-muted hover:bg-card hover:border-border relative space-y-6 overflow-hidden rounded-2xl border p-8 transition-all duration-300 lg:p-10">
								<div className="bg-muted absolute top-0 right-0 h-32 w-32 translate-x-1/2 -translate-y-1/2 rounded-full opacity-0 blur-3xl transition-opacity duration-500 group-hover:opacity-100" />
								<div className="relative z-10">
									<ul className="space-y-6 text-lg leading-relaxed">
										<li className="flex items-start gap-4">
											<div className="bg-primary mt-2 h-2.5 w-2.5 flex-shrink-0 rounded-full" />
											<span className="text-foreground">
												You&apos;re a pro athlete in the outdoor industry
												looking to build or elevate your brand beyond social
												media
											</span>
										</li>
										<li className="flex items-start gap-4">
											<div className="bg-primary mt-2 h-2.5 w-2.5 flex-shrink-0 rounded-full" />
											<span className="text-foreground">
												You want to own your digital presence with world-class
												software, not just a basic website
											</span>
										</li>
										<li className="flex items-start gap-4">
											<div className="bg-primary mt-2 h-2.5 w-2.5 flex-shrink-0 rounded-full" />
											<span className="text-foreground">
												You&apos;re ready to invest in bespoke technology that
												reflects your unique story and values
											</span>
										</li>
										<li className="flex items-start gap-4">
											<div className="bg-primary mt-2 h-2.5 w-2.5 flex-shrink-0 rounded-full" />
											<span className="text-foreground">
												You want to educate and engage your community, not just
												broadcast to them
											</span>
										</li>
										<li className="flex items-start gap-4">
											<div className="bg-primary mt-2 h-2.5 w-2.5 flex-shrink-0 rounded-full" />
											<span className="text-foreground">
												You&apos;re navigating brand partnerships, content
												creation, or building a business around your athletic
												career
											</span>
										</li>
									</ul>
								</div>
							</div>
						</div>

						{/* Image */}
						<div className="order-1 lg:order-2 lg:col-span-5">
							<div className="sticky top-32">
								<div className="group relative aspect-[4/5] lg:aspect-[3/4]">
									<div className="from-muted absolute inset-0 -z-10 rounded-2xl bg-gradient-to-br to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
									<Image
										src="/photos/website-photo-10.jpg"
										alt="Professional athletes"
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

			{/* What We Can Build Section */}
			<section className="border-border border-t py-24 lg:py-32">
				<Container size="xl">
					{/* Section Header */}
					<div className="mb-16 lg:mb-24">
						<div className="max-w-3xl">
							<h2 className="mb-6 text-3xl font-bold tracking-tight lg:text-5xl xl:text-6xl">
								What we can build
							</h2>
							<p className="text-muted-foreground text-lg leading-relaxed lg:text-xl">
								Every platform is custom-built for you, but here&apos;s what we
								typically include:
							</p>
						</div>
					</div>

					<div className="grid gap-8 md:grid-cols-2 lg:gap-12">
						{/* Feature Cards */}
						{[
							{
								title: 'Custom Platform Architecture',
								description:
									'Built from scratch to reflect your brand, not a template'
							},
							{
								title: 'Content Management',
								description:
									'Easy-to-use systems for sharing your journey, training insights, and achievements'
							},
							{
								title: 'Educational Content Integration',
								description:
									'Share knowledge, training methods, and insights that help your community grow'
							},
							{
								title: 'Performance Tracking & Analytics',
								description:
									'Tools to showcase your progress and understand your audience'
							},
							{
								title: 'Community Engagement Features',
								description:
									'Build connections through comments, newsletters, or member areas'
							},
							{
								title: 'Brand Partnership Integration',
								description: 'Seamlessly showcase sponsors and collaborations'
							}
						].map((feature, index) => (
							<div
								key={index}
								className="group border-border bg-muted hover:bg-card hover:border-border relative space-y-4 overflow-hidden rounded-2xl border p-8 transition-all duration-300 lg:p-10">
								<div className="bg-muted absolute top-0 right-0 h-32 w-32 translate-x-1/2 -translate-y-1/2 rounded-full opacity-0 blur-3xl transition-opacity duration-500 group-hover:opacity-100" />
								<div className="relative z-10">
									<div className="mb-4 flex items-center gap-3">
										<div className="bg-primary h-2.5 w-2.5 rounded-full transition-transform group-hover:scale-125" />
										<h3 className="text-xl font-semibold tracking-tight lg:text-2xl">
											{feature.title}
										</h3>
									</div>
									<p className="text-muted-foreground text-base leading-relaxed">
										{feature.description}
									</p>
								</div>
							</div>
						))}
					</div>
				</Container>
			</section>

			{/* Pricing Section */}
			<section className="border-border border-t py-24 lg:py-32">
				<Container size="xl">
					<div className="max-w-5xl space-y-16 lg:space-y-20">
						<div className="space-y-6">
							<h2 className="text-3xl font-bold tracking-tight lg:text-5xl xl:text-6xl">
								How much it costs
							</h2>
							<div className="text-muted-foreground max-w-3xl space-y-4 text-lg leading-relaxed lg:text-xl">
								<p>
									Every platform is unique, and pricing reflects the scope and
									complexity of your needs. To begin, I ask that you commit to a
									discovery phase where we define your vision, technical
									requirements, and desired outcomes.
								</p>
							</div>
						</div>

						<div className="grid gap-12 lg:grid-cols-2">
							<div className="group border-border bg-muted hover:bg-card hover:border-border relative overflow-hidden rounded-2xl border p-10 transition-all duration-300 lg:p-12">
								<div className="bg-muted absolute top-0 right-0 h-32 w-32 translate-x-1/2 -translate-y-1/2 rounded-full opacity-0 blur-3xl transition-opacity duration-500 group-hover:opacity-100" />
								<div className="relative z-10 space-y-6">
									<div className="space-y-3">
										<h3 className="text-2xl font-semibold tracking-tight lg:text-3xl">
											Discovery & Planning Phase
										</h3>
										<p className="text-foreground text-2xl font-bold lg:text-3xl">
											Investment: $2,000
										</p>
									</div>
									<div className="space-y-4 pt-2">
										<p className="text-muted-foreground text-base font-medium">
											What&apos;s included:
										</p>
										<ul className="text-muted-foreground space-y-3 text-base leading-relaxed">
											<li>
												• Discovery Questionnaire to clarify your vision and
												goals
											</li>
											<li>• 2 Strategy Sessions (60 minutes each)</li>
											<li>• Technical requirements & architecture planning</li>
											<li>• Brand narrative & content strategy</li>
											<li>
												• Detailed project proposal with timeline and pricing
											</li>
										</ul>
									</div>
								</div>
							</div>

							<div className="group border-border bg-muted hover:bg-card hover:border-border relative overflow-hidden rounded-2xl border p-10 transition-all duration-300 lg:p-12">
								<div className="bg-muted absolute top-0 right-0 h-32 w-32 translate-x-1/2 -translate-y-1/2 rounded-full opacity-0 blur-3xl transition-opacity duration-500 group-hover:opacity-100" />
								<div className="relative z-10 space-y-6">
									<div className="space-y-3">
										<h3 className="text-2xl font-semibold tracking-tight lg:text-3xl">
											Platform Development
										</h3>
										<p className="text-foreground text-2xl font-bold lg:text-3xl">
											$15,000 to $50,000+
										</p>
									</div>
									<div className="space-y-3 pt-2">
										<p className="text-muted-foreground text-base leading-relaxed">
											Pricing varies based on scope. Factors include: feature
											complexity, content migration, integrations, design
											requirements, and timeline.
										</p>
									</div>
								</div>
							</div>
						</div>

						<div className="pt-8">
							<p className="text-muted-foreground max-w-3xl text-base leading-relaxed italic">
								Please consider exploring any brand partnership or business
								development funds available to you. If this pricing feels
								challenging, reach out anyway. We can explore what&apos;s
								possible.
							</p>
						</div>
					</div>
				</Container>
			</section>

			{/* Getting Started Section */}
			<section className="border-border border-t py-24 lg:py-32">
				<Container size="xl">
					<div className="mx-auto max-w-3xl space-y-12">
						<div className="space-y-6 text-center">
							<h2 className="text-3xl font-bold tracking-tight lg:text-5xl xl:text-6xl">
								Getting Started
							</h2>
						</div>

						<div className="space-y-8">
							{[
								{
									step: '1',
									title: 'Schedule a free 30-minute exploratory call',
									description:
										'We&apos;ll connect virtually to explore if we&apos;re a good fit. I&apos;ll share more about my process, and you can ask any questions about building your platform. If we&apos;re both excited to work together, we move to the next step.'
								},
								{
									step: '2',
									title: 'Complete a discovery questionnaire',
									description:
										'I&apos;ll share a thorough questionnaire for you to complete before our first strategy session. This helps us both understand your vision, goals, and what success looks like for your platform.'
								},
								{
									step: '3',
									title: 'Begin building your platform',
									description:
										'After our discovery phase, we&apos;ll have a clear roadmap. I&apos;ll build your platform with regular check-ins, ensuring it reflects your brand and serves your community. Your platform will evolve with your career.'
								}
							].map((item, index) => (
								<div
									key={index}
									className="group border-border bg-muted hover:bg-card hover:border-border relative overflow-hidden rounded-2xl border p-8 transition-all duration-300 lg:p-10">
									<div className="bg-muted absolute top-0 right-0 h-32 w-32 translate-x-1/2 -translate-y-1/2 rounded-full opacity-0 blur-3xl transition-opacity duration-500 group-hover:opacity-100" />
									<div className="relative z-10 flex items-start gap-6">
										<div className="bg-muted flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full transition-transform group-hover:scale-110">
											<span className="text-primary text-lg font-semibold">
												{item.step}
											</span>
										</div>
										<div className="flex-1 space-y-3">
											<h3 className="text-xl font-semibold tracking-tight">
												{item.title}
											</h3>
											<p className="text-muted-foreground text-base leading-relaxed">
												{item.description}
											</p>
										</div>
									</div>
								</div>
							))}
						</div>
					</div>
				</Container>
			</section>

			{/* CTA Section */}
			<section className="border-border from-background to-background border-t bg-gradient-to-b py-24 lg:py-32">
				<Container size="xl">
					<div className="mx-auto max-w-4xl">
						<div className="border-border bg-muted space-y-8 rounded-3xl border p-12 text-center backdrop-blur-sm lg:p-16">
							<div className="space-y-6">
								<h2 className="text-3xl font-bold tracking-tight lg:text-5xl xl:text-6xl">
									Ready to build your platform?
								</h2>
								<p className="text-muted-foreground mx-auto max-w-2xl text-lg leading-relaxed lg:text-xl">
									Let&apos;s discuss how I can help you create a custom platform
									that supports your brand and connects with your community.
								</p>
							</div>
							<div className="pt-4">
								<Button asChild size="lg" className="group">
									<Link
										href="https://cal.com/laurosilvacom/chat"
										target="_blank"
										rel="noopener noreferrer">
										Schedule a free consultation
										<ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
									</Link>
								</Button>
							</div>
							<p className="text-muted-foreground text-sm">
								Or{' '}
								<Link href="/services" className="text-primary hover:underline">
									return to services
								</Link>
							</p>
						</div>
					</div>
				</Container>
			</section>
		</>
	)
}
