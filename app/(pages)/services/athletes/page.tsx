import {ArrowRight} from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import Container from '@/components/container'
import {Button} from '@/components/ui/button'

export default function AthletesPage() {
	return (
		<>
			{/* Hero Section */}
			<section className="relative min-h-[85vh] lg:min-h-[90vh] flex items-center justify-center pt-24 lg:pt-32 pb-16 lg:pb-24 overflow-hidden">
				<div className="absolute inset-0 bg-gradient-to-b from-background via-background to-background pointer-events-none" />
				
				<Container size="xl" className="relative z-10">
					<div className="max-w-4xl mx-auto space-y-8 lg:space-y-12 text-center">
						<div className="inline-flex">
							<div className="bg-muted text-primary inline-flex items-center gap-2 rounded-full px-4 py-2 border border-border">
								<div className="bg-primary h-2 w-2 rounded-full animate-pulse" />
								<span className="text-sm font-medium">
									Available for new projects
								</span>
							</div>
						</div>

						<div className="space-y-6 lg:space-y-8">
							<h1 className="text-4xl sm:text-5xl lg:text-7xl xl:text-8xl font-bold leading-[1.1] tracking-tight">
								Custom Software Platforms
								<br />
								<span className="text-primary">for Professional Athletes</span>
							</h1>
							<div className="space-y-4 text-lg lg:text-xl leading-relaxed text-muted-foreground max-w-3xl mx-auto">
								<p>
									Custom technology designed to support your brand and connect with your community. This goes far beyond a website. It&apos;s software that builds lasting relationships.
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

			{/* What I Believe Section */}
			<section className="py-24 lg:py-32 border-t border-border">
				<Container size="xl">
					{/* Section Header */}
					<div className="mb-16 lg:mb-24">
						<div className="max-w-3xl">
							<h2 className="text-3xl lg:text-5xl xl:text-6xl font-bold tracking-tight mb-6">
								What I believe
							</h2>
							<div className="space-y-4 text-lg lg:text-xl leading-relaxed text-muted-foreground">
								<p>
									I believe that pro athletes in the outdoor industry deserve technology that matches their dedication and excellence. Too often, athletes are offered generic websites or platforms that don&apos;t reflect their unique story, values, or the community they&apos;ve built.
								</p>
								<p>
									In an industry where authenticity matters, your digital presence should be as intentional and high-quality as your training. Social media platforms come and go, but a custom platform you own? That&apos;s where your brand lives and grows. It&apos;s where you can share your journey, educate your community, and build something that lasts beyond the next algorithm change.
								</p>
								<p>
									I believe in the intersection of technology, education, and brand storytelling. Your platform shouldn&apos;t just showcase achievements. It should help your community learn, grow, and connect with your journey. It should reflect who you are, what you stand for, and where you&apos;re going.
								</p>
							</div>
						</div>
					</div>

					<div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-start">
						{/* Image */}
						<div className="lg:col-span-5">
							<div className="sticky top-32">
								<div className="relative aspect-[4/5] lg:aspect-[3/4] group">
									<div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-muted to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10" />
									<Image
										src="/photos/website-photo-5.jpg"
										alt="Custom athlete platforms"
										fill
										className="object-cover rounded-2xl transition-transform duration-300 group-hover:scale-[1.02]"
										sizes="(max-width: 1024px) 100vw, 40vw"
									/>
								</div>
							</div>
						</div>

						{/* Content */}
						<div className="lg:col-span-7 space-y-12 lg:space-y-16">
							<div className="space-y-6">
								<p className="text-lg leading-relaxed text-foreground">
									I&apos;m here to build you a platform that grows with your career, supports your voice, and creates real connections with the people who matter most to your brand.
								</p>
							</div>
						</div>
					</div>
				</Container>
			</section>

			{/* Who I Support Section */}
			<section className="py-24 lg:py-32 border-t border-border">
				<Container size="xl">
					{/* Section Header */}
					<div className="mb-16 lg:mb-24">
						<div className="max-w-3xl">
							<h2 className="text-3xl lg:text-5xl xl:text-6xl font-bold tracking-tight mb-6">
								Who I support
							</h2>
							<p className="text-lg lg:text-xl leading-relaxed text-muted-foreground">
								You might be a good fit if:
							</p>
						</div>
					</div>

					<div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-start">
						{/* Content */}
						<div className="lg:col-span-7 space-y-12 lg:space-y-16 order-2 lg:order-1">
							<div className="group relative space-y-6 p-8 lg:p-10 rounded-2xl border border-border bg-muted hover:bg-card hover:border-border transition-all duration-300 overflow-hidden">
								<div className="absolute top-0 right-0 w-32 h-32 bg-muted rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 -translate-y-1/2 translate-x-1/2" />
								<div className="relative z-10">
									<ul className="space-y-6 text-lg leading-relaxed">
										<li className="flex items-start gap-4">
											<div className="h-2.5 w-2.5 rounded-full bg-primary mt-2 flex-shrink-0" />
											<span className="text-foreground">
												You&apos;re a pro athlete in the outdoor industry looking to build or elevate your brand beyond social media
											</span>
										</li>
										<li className="flex items-start gap-4">
											<div className="h-2.5 w-2.5 rounded-full bg-primary mt-2 flex-shrink-0" />
											<span className="text-foreground">
												You want to own your digital presence with world-class software, not just a basic website
											</span>
										</li>
										<li className="flex items-start gap-4">
											<div className="h-2.5 w-2.5 rounded-full bg-primary mt-2 flex-shrink-0" />
											<span className="text-foreground">
												You&apos;re ready to invest in bespoke technology that reflects your unique story and values
											</span>
										</li>
										<li className="flex items-start gap-4">
											<div className="h-2.5 w-2.5 rounded-full bg-primary mt-2 flex-shrink-0" />
											<span className="text-foreground">
												You want to educate and engage your community, not just broadcast to them
											</span>
										</li>
										<li className="flex items-start gap-4">
											<div className="h-2.5 w-2.5 rounded-full bg-primary mt-2 flex-shrink-0" />
											<span className="text-foreground">
												You&apos;re navigating brand partnerships, content creation, or building a business around your athletic career
											</span>
										</li>
									</ul>
								</div>
							</div>
						</div>

						{/* Image */}
						<div className="lg:col-span-5 order-1 lg:order-2">
							<div className="sticky top-32">
								<div className="relative aspect-[4/5] lg:aspect-[3/4] group">
									<div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-muted to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10" />
									<Image
										src="/photos/website-photo-10.jpg"
										alt="Professional athletes"
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

			{/* What We Can Build Section */}
			<section className="py-24 lg:py-32 border-t border-border">
				<Container size="xl">
					{/* Section Header */}
					<div className="mb-16 lg:mb-24">
						<div className="max-w-3xl">
							<h2 className="text-3xl lg:text-5xl xl:text-6xl font-bold tracking-tight mb-6">
								What we can build
							</h2>
							<p className="text-lg lg:text-xl leading-relaxed text-muted-foreground">
								Every platform is custom-built for you, but here&apos;s what we typically include:
							</p>
						</div>
					</div>

					<div className="grid md:grid-cols-2 gap-8 lg:gap-12">
						{/* Feature Cards */}
						{[
							{
								title: 'Custom Platform Architecture',
								description: 'Built from scratch to reflect your brand, not a template'
							},
							{
								title: 'Content Management',
								description: 'Easy-to-use systems for sharing your journey, training insights, and achievements'
							},
							{
								title: 'Educational Content Integration',
								description: 'Share knowledge, training methods, and insights that help your community grow'
							},
							{
								title: 'Performance Tracking & Analytics',
								description: 'Tools to showcase your progress and understand your audience'
							},
							{
								title: 'Community Engagement Features',
								description: 'Build connections through comments, newsletters, or member areas'
							},
							{
								title: 'Brand Partnership Integration',
								description: 'Seamlessly showcase sponsors and collaborations'
							}
						].map((feature, index) => (
							<div
								key={index}
								className="group relative space-y-4 p-8 lg:p-10 rounded-2xl border border-border bg-muted hover:bg-card hover:border-border transition-all duration-300 overflow-hidden">
								<div className="absolute top-0 right-0 w-32 h-32 bg-muted rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 -translate-y-1/2 translate-x-1/2" />
								<div className="relative z-10">
									<div className="flex items-center gap-3 mb-4">
										<div className="h-2.5 w-2.5 rounded-full bg-primary group-hover:scale-125 transition-transform" />
										<h3 className="text-xl lg:text-2xl font-semibold tracking-tight">
											{feature.title}
										</h3>
									</div>
									<p className="text-base leading-relaxed text-muted-foreground">
										{feature.description}
									</p>
								</div>
							</div>
						))}
					</div>
				</Container>
			</section>

			{/* Pricing Section */}
			<section className="py-24 lg:py-32 border-t border-border">
				<Container size="lg">
					<div className="max-w-3xl space-y-12">
						<div className="space-y-6">
							<h2 className="text-3xl lg:text-5xl xl:text-6xl font-bold tracking-tight">
								How much it costs
							</h2>
							<div className="space-y-4 text-lg leading-relaxed text-muted-foreground">
								<p>
									Every platform is unique, and pricing reflects the scope and complexity of your needs. To begin, I ask that you commit to a discovery phase where we define your vision, technical requirements, and desired outcomes.
								</p>
							</div>
						</div>

						<div className="grid md:grid-cols-2 gap-8">
							<div className="group relative p-8 lg:p-10 rounded-2xl border border-border bg-muted hover:bg-card hover:border-border transition-all duration-300 overflow-hidden">
								<div className="absolute top-0 right-0 w-32 h-32 bg-muted rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 -translate-y-1/2 translate-x-1/2" />
								<div className="relative z-10 space-y-4">
									<h3 className="text-xl lg:text-2xl font-semibold tracking-tight">
										Discovery & Planning Phase
									</h3>
									<p className="text-lg font-medium text-foreground">
										Investment: $2,000
									</p>
									<p className="text-sm text-muted-foreground">
										What&apos;s included:
									</p>
									<ul className="space-y-2 text-sm text-muted-foreground">
										<li>• Discovery Questionnaire to clarify your vision and goals</li>
										<li>• 2 Strategy Sessions (60 minutes each)</li>
										<li>• Technical requirements & architecture planning</li>
										<li>• Brand narrative & content strategy</li>
										<li>• Detailed project proposal with timeline and pricing</li>
									</ul>
								</div>
							</div>

							<div className="group relative p-8 lg:p-10 rounded-2xl border border-border bg-muted hover:bg-card hover:border-border transition-all duration-300 overflow-hidden">
								<div className="absolute top-0 right-0 w-32 h-32 bg-muted rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 -translate-y-1/2 translate-x-1/2" />
								<div className="relative z-10 space-y-4">
									<h3 className="text-xl lg:text-2xl font-semibold tracking-tight">
										Platform Development
									</h3>
									<p className="text-lg font-medium text-foreground">
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
						</div>

						<p className="text-sm text-muted-foreground italic">
							Please consider exploring any brand partnership or business development funds available to you. If this pricing feels challenging, reach out anyway. We can explore what&apos;s possible.
						</p>
					</div>
				</Container>
			</section>

			{/* Getting Started Section */}
			<section className="py-24 lg:py-32 border-t border-border">
				<Container size="lg">
					<div className="max-w-3xl space-y-12">
						<div className="space-y-6">
							<h2 className="text-3xl lg:text-5xl xl:text-6xl font-bold tracking-tight">
								Getting started
							</h2>
						</div>

						<div className="space-y-8">
							{[
								{
									step: '1',
									title: 'Schedule a free 30-minute exploratory call',
									description: 'We&apos;ll connect virtually to explore if we&apos;re a good fit. I&apos;ll share more about my process, and you can ask any questions about building your platform. If we&apos;re both excited to work together, we move to the next step.'
								},
								{
									step: '2',
									title: 'Complete a discovery questionnaire',
									description: 'I&apos;ll share a thorough questionnaire for you to complete before our first strategy session. This helps us both understand your vision, goals, and what success looks like for your platform.'
								},
								{
									step: '3',
									title: 'Begin building your platform',
									description: 'After our discovery phase, we&apos;ll have a clear roadmap. I&apos;ll build your platform with regular check-ins, ensuring it reflects your brand and serves your community. Your platform will evolve with your career.'
								}
							].map((item, index) => (
								<div key={index} className="group relative p-8 lg:p-10 rounded-2xl border border-border bg-muted hover:bg-card hover:border-border transition-all duration-300 overflow-hidden">
									<div className="absolute top-0 right-0 w-32 h-32 bg-muted rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 -translate-y-1/2 translate-x-1/2" />
									<div className="relative z-10 flex items-start gap-6">
										<div className="flex-shrink-0 w-12 h-12 rounded-full bg-muted flex items-center justify-center group-hover:scale-110 transition-transform">
											<span className="text-lg font-semibold text-primary">{item.step}</span>
										</div>
										<div className="space-y-3 flex-1">
											<h3 className="text-xl font-semibold tracking-tight">
												{item.title}
											</h3>
											<p className="text-base text-muted-foreground leading-relaxed">
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
			<section className="py-24 lg:py-32 border-t border-border bg-gradient-to-b from-background to-background">
				<Container size="lg">
					<div className="max-w-4xl mx-auto">
						<div className="p-12 lg:p-16 rounded-3xl border border-border bg-muted backdrop-blur-sm text-center space-y-8">
							<div className="space-y-6">
								<h2 className="text-3xl lg:text-5xl xl:text-6xl font-bold tracking-tight">
									Ready to build your platform?
								</h2>
								<p className="text-lg lg:text-xl text-muted-foreground leading-relaxed max-w-2xl mx-auto">
									Let&apos;s discuss how I can help you create a custom platform that supports your brand and connects with your community.
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
							<p className="text-sm text-muted-foreground">
								Or{' '}
								<Link
									href="/services"
									className="text-primary hover:underline">
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
