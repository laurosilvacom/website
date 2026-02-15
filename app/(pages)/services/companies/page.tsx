import {ArrowRight} from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import Container from '@/components/container'
import {Button} from '@/components/ui/button'
import {generatePageMetadata} from '@/lib/metadata'

export const metadata = generatePageMetadata(
	'Services for Companies',
	'Full-stack development, technical leadership, and developer training for companies. React, Next.js, TypeScript. Previously with Google, O\'Reilly, Sentry, HOKA.',
	{
		keywords: [
			'full-stack development',
			'technical consulting',
			'developer training',
			'React',
			'Next.js',
			'TypeScript',
			'freelance senior engineer'
		],
		canonical: '/services/companies'
	}
)

export default function CompaniesPage() {
	return (
		<>
			{/* Hero Section */}
			<section className="relative flex min-h-[85vh] items-center justify-center px-6 pt-32 pb-24 lg:pt-40 lg:pb-32">
				<div className="mx-auto max-w-6xl text-center">
					<div className="animate-in fade-in slide-in-from-bottom-4 space-y-12 duration-1000">
						<div className="inline-flex">
							<div className="bg-muted border-border inline-flex items-center gap-2 rounded-full border px-4 py-2">
								<div className="bg-primary h-2 w-2 animate-pulse rounded-full" />
								<span className="text-sm font-medium">
									Available for new projects
								</span>
							</div>
						</div>
						<h1 className="text-4xl leading-[1.05] font-bold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl">
							Build Products That
							<br />
							Actually Ship
						</h1>
						<p className="text-muted-foreground mx-auto max-w-2xl text-xl leading-relaxed sm:text-2xl">
							Technical leadership, hands-on development, and team training to
							help you make better decisions, ship faster, and build products
							that work.
						</p>
					</div>
					<div className="animate-in fade-in slide-in-from-bottom-4 pt-12 delay-150 duration-1000">
						<Button asChild size="lg" className="group">
							<Link
								href="https://cal.com/laurosilvacom/chat"
								target="_blank"
								rel="noopener noreferrer">
								Schedule a consultation
								<ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
							</Link>
						</Button>
					</div>
				</div>
			</section>

			{/* Hero Image */}
			<section className="py-12 lg:py-20">
				<Container width="base">
					<div className="border-border-subtle relative aspect-video overflow-hidden rounded-3xl border shadow-2xl">
						<Image
							src="/photos/website-photo-4.jpg"
							alt="Technical leadership"
							fill
							className="object-cover"
							style={{objectPosition: 'center top'}}
							priority
							sizes="100vw"
						/>
					</div>
				</Container>
			</section>

			{/* Philosophy */}
			<section className="py-24 lg:py-32">
				<Container width="base">
					<div className="space-y-8">
						<div className="space-y-4">
							<div className="inline-flex items-center gap-2">
								<div className="bg-primary h-2 w-2 rounded-full" />
								<span className="text-muted-foreground font-mono text-xs font-medium tracking-wide uppercase">
									Philosophy
								</span>
							</div>
							<h2 className="text-3xl font-bold tracking-tight lg:text-4xl">
								What I believe
							</h2>
						</div>

						<div className="text-muted-foreground space-y-6 text-lg leading-relaxed">
							<p>
								Great products come from understanding both the technology and
								the people who use it. The best engineering teams aren&apos;t
								just technically skilled — they understand how to build software
								that solves real problems.
							</p>
							<p>
								My approach is practical and hands-on. I&apos;ve worked with
								teams at Google, O&apos;Reilly, Sentry, and HOKA building
								products that scale. I bring that experience to help your team
								make better decisions, ship faster, and build products that
								actually matter.
							</p>
							<p>
								Technology should serve people. The work should be intentional.
								The teams should be strong. That&apos;s what I focus on.
							</p>
						</div>
					</div>
				</Container>
			</section>

			{/* Who I Work With */}
			<section className="border-border border-b py-24 lg:py-32">
				<Container width="base">
					<div className="space-y-12">
						<div className="space-y-4">
							<div className="inline-flex items-center gap-2">
								<div className="bg-primary h-2 w-2 rounded-full" />
								<span className="text-muted-foreground font-mono text-xs font-medium tracking-wide uppercase">
									Who I Work With
								</span>
							</div>
							<h2 className="text-3xl font-bold tracking-tight lg:text-4xl">
								You might be a good fit if
							</h2>
						</div>

						<div className="grid gap-8 md:grid-cols-2">
							<div className="border-border bg-card space-y-4 rounded-2xl border p-8">
								<h3 className="text-xl font-semibold">
									You need senior engineering talent
								</h3>
								<p className="text-muted-foreground leading-relaxed">
									Your team needs a senior full-stack engineer who can hit the
									ground running. I embed with your team, understand your
									codebase, and start shipping from week one.
								</p>
							</div>

							<div className="border-border bg-card space-y-4 rounded-2xl border p-8">
								<h3 className="text-xl font-semibold">
									You need technical leadership
								</h3>
								<p className="text-muted-foreground leading-relaxed">
									You need someone to help guide technical decisions, improve
									your architecture, or provide hands-on development for complex
									problems.
								</p>
							</div>

							<div className="border-border bg-card space-y-4 rounded-2xl border p-8">
								<h3 className="text-xl font-semibold">
									You want to level up your team
								</h3>
								<p className="text-muted-foreground leading-relaxed">
									Your team needs training on modern tools like React, Next.js,
									TypeScript, or AI integration. You want learning that sticks,
									not just information dumps.
								</p>
							</div>

							<div className="border-border bg-card space-y-4 rounded-2xl border p-8">
								<h3 className="text-xl font-semibold">
									You value practical expertise
								</h3>
								<p className="text-muted-foreground leading-relaxed">
									You want someone who&apos;s built products at scale, worked
									with large teams, and understands how to ship software that
									actually works.
								</p>
							</div>
						</div>
					</div>
				</Container>
			</section>

			{/* What I Offer */}
			<section className="border-border border-b py-24 lg:py-32">
				<Container width="base">
					<div className="space-y-12">
						<div className="space-y-4">
							<div className="inline-flex items-center gap-2">
								<div className="bg-primary h-2 w-2 rounded-full" />
								<span className="text-muted-foreground font-mono text-xs font-medium tracking-wide uppercase">
									What I Offer
								</span>
							</div>
							<h2 className="text-3xl font-bold tracking-tight lg:text-4xl">
								How I can help
							</h2>
							<p className="text-muted-foreground max-w-3xl text-lg leading-relaxed">
								I provide technical leadership, developer training, and
								hands-on development. Here&apos;s what that looks like:
							</p>
						</div>

						<div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
							{[
								{
									title: 'Architecture Planning',
									description:
										'Help you make better technical decisions about architecture, technology choices, and how to build products that scale.'
								},
								{
									title: 'Code Reviews',
									description:
										'Review your codebase, identify issues, and provide actionable recommendations for improvement.'
								},
								{
									title: 'Technical Strategy',
									description:
										'Work with your team to develop technical strategy that aligns with your business goals and constraints.'
								},
								{
									title: 'React & Next.js Training',
									description:
										'Workshops and training on modern React, Next.js, and TypeScript. Practical, hands-on learning that your team can apply immediately.'
								},
								{
									title: 'AI Integration',
									description:
										'Help your team integrate AI tools like Claude and GPT-4 into your existing applications in practical, production-ready ways.'
								},
								{
									title: 'Developer Experience',
									description:
										'Improve your development workflows, tooling, and processes so your team can ship faster and with more confidence.'
								},
								{
									title: 'Educational Content',
									description:
										'Create custom curriculum, workshops, and training materials tailored to your team\'s specific needs and skill level.'
								},
								{
									title: 'Hands-on Development',
									description:
										'Jump in and write code when you need an extra pair of hands on complex features or critical projects.'
								},
								{
									title: 'Team Consulting',
									description:
										'Work with your leadership to improve team structure, processes, and how you approach product development.'
								}
							].map((feature, index) => (
								<div
									key={index}
									className="border-border bg-card space-y-3 rounded-2xl border p-6">
									<h3 className="text-lg font-semibold">{feature.title}</h3>
									<p className="text-muted-foreground text-sm leading-relaxed">
										{feature.description}
									</p>
								</div>
							))}
						</div>

						<div className="border-border bg-primary/5 rounded-2xl border p-8">
							<div className="space-y-4">
								<h3 className="text-xl font-semibold">
									Enterprise Experience, Startup Speed
								</h3>
								<p className="text-muted-foreground leading-relaxed">
									I bring enterprise-level expertise from Google, O&apos;Reilly,
									Sentry, and HOKA to help your team build better products. I
									understand both the technical challenges of building at scale
									and the urgency of shipping fast.
								</p>
							</div>
						</div>
					</div>
				</Container>
			</section>

			{/* Process */}
			<section className="border-border border-b py-24 lg:py-32">
				<Container width="base">
					<div className="space-y-12">
						<div className="space-y-4">
							<div className="inline-flex items-center gap-2">
								<div className="bg-primary h-2 w-2 rounded-full" />
								<span className="text-muted-foreground font-mono text-xs font-medium tracking-wide uppercase">
									Process
								</span>
							</div>
							<h2 className="text-3xl font-bold tracking-tight lg:text-4xl">
								How we work together
							</h2>
						</div>

						<div className="space-y-6">
							{[
								{
									number: '01',
									title: 'Discovery',
									description:
										'We start with a conversation to understand your needs, challenges, and goals. What are you trying to build? What problems are you facing? What does success look like?'
								},
								{
									number: '02',
									title: 'Proposal',
									description:
										'I provide a clear proposal outlining how I can help, the timeline, and the investment. No surprises. Everything is transparent and straightforward.'
								},
								{
									number: '03',
									title: 'Engagement',
									description:
										'We work together based on your needs. This could be a short-term consulting engagement, ongoing technical leadership, or a structured training program for your team.'
								},
								{
									number: '04',
									title: 'Results',
									description:
										'You get practical results. Better technical decisions. Stronger team capabilities. Products that ship. Knowledge that sticks. Real impact on your business.'
								}
							].map((step, index) => (
								<div
									key={index}
									className="border-border bg-card grid gap-6 rounded-2xl border p-8 md:grid-cols-12">
									<div className="md:col-span-2">
										<span className="text-primary/40 text-5xl font-bold">
											{step.number}
										</span>
									</div>
									<div className="space-y-3 md:col-span-10">
										<h3 className="text-xl font-semibold">{step.title}</h3>
										<p className="text-muted-foreground leading-relaxed">
											{step.description}
										</p>
									</div>
								</div>
							))}
						</div>
					</div>
				</Container>
			</section>

			{/* Testimonials */}
			<section className="border-border border-b py-24 lg:py-32">
				<Container width="base">
					<div className="space-y-12">
						<div className="space-y-4">
							<div className="inline-flex items-center gap-2">
								<div className="bg-primary h-2 w-2 rounded-full" />
								<span className="text-muted-foreground font-mono text-xs font-medium tracking-wide uppercase">
									What Clients Say
								</span>
							</div>
						</div>

						<div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
							<blockquote className="border-border bg-card space-y-6 rounded-2xl border p-8">
								<div className="text-primary">
									<svg
										xmlns="http://www.w3.org/2000/svg"
										fill="currentColor"
										viewBox="0 0 24 24"
										className="h-8 w-8">
										<path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
									</svg>
								</div>
								<p className="text-foreground text-base leading-relaxed lg:text-lg">
									Lauro is a total pro. His guidance helped us create polished
									onboarding videos and build the capability to create content
									independently.
								</p>
								<div className="border-border flex items-center gap-3 border-t pt-6">
									<div className="relative h-12 w-12 shrink-0 overflow-hidden rounded-full">
										<Image
											src="https://res.cloudinary.com/laurosilvacom/image/upload/v1731435976/laurosilvacom/hire-me-page/ok4aceenrvijrjcafxba.jpg"
											alt="Andrew Hedges"
											fill
											className="object-cover"
										/>
									</div>
									<div className="space-y-1">
										<p className="text-sm font-semibold">Andrew Hedges</p>
										<p className="text-muted-foreground text-xs">
											Assistiv Labs
										</p>
									</div>
								</div>
							</blockquote>

							<blockquote className="border-border bg-card space-y-6 rounded-2xl border p-8">
								<div className="text-primary">
									<svg
										xmlns="http://www.w3.org/2000/svg"
										fill="currentColor"
										viewBox="0 0 24 24"
										className="h-8 w-8">
										<path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
									</svg>
								</div>
								<p className="text-foreground text-base leading-relaxed lg:text-lg">
									An hour with Lauro helped me untangle my thoughts and make a
									concrete plan. If you need dev content strategy, he&apos;s
									your person.
								</p>
								<div className="border-border flex items-center gap-3 border-t pt-6">
									<div className="relative h-12 w-12 shrink-0 overflow-hidden rounded-full">
										<Image
											src="https://res.cloudinary.com/laurosilvacom/image/upload/v1731435976/laurosilvacom/hire-me-page/py2kbwptjbxfdqpoepkj.jpg"
											alt="Jason Lengstorf"
											fill
											className="object-cover"
										/>
									</div>
									<div className="space-y-1">
										<p className="text-sm font-semibold">Jason Lengstorf</p>
										<p className="text-muted-foreground text-xs">
											Learn With Jason
										</p>
									</div>
								</div>
							</blockquote>

							<blockquote className="border-border bg-card space-y-6 rounded-2xl border p-8">
								<div className="text-primary">
									<svg
										xmlns="http://www.w3.org/2000/svg"
										fill="currentColor"
										viewBox="0 0 24 24"
										className="h-8 w-8">
										<path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
									</svg>
								</div>
								<p className="text-foreground text-base leading-relaxed lg:text-lg">
									Working with Lauro is always a great experience. His technical
									guidance and patience make complex projects feel manageable.
								</p>
								<div className="border-border flex items-center gap-3 border-t pt-6">
									<div className="relative h-12 w-12 shrink-0 overflow-hidden rounded-full">
										<Image
											src="https://res.cloudinary.com/laurosilvacom/image/upload/v1731435976/laurosilvacom/hire-me-page/p3eglqeb7qfvsfzvh3qr.jpg"
											alt="Alejandro Nanez"
											fill
											className="object-cover"
										/>
									</div>
									<div className="space-y-1">
										<p className="text-sm font-semibold">Alejandro Nanez</p>
										<p className="text-muted-foreground text-xs">
											Staff Engineer
										</p>
									</div>
								</div>
							</blockquote>
						</div>
					</div>
				</Container>
			</section>

			{/* CTA */}
			<section className="py-24 lg:py-32">
				<Container width="base">
					<div className="border-border bg-card space-y-8 rounded-3xl border p-12 text-center lg:p-16">
						<div className="space-y-6">
							<h2 className="text-3xl font-bold tracking-tight lg:text-5xl">
								Ready to work together?
							</h2>
							<p className="text-muted-foreground mx-auto max-w-2xl text-lg leading-relaxed lg:text-xl">
								Let&apos;s discuss how I can help your team build better
								products and develop stronger engineering capabilities.
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
					</div>
				</Container>
			</section>
		</>
	)
}
