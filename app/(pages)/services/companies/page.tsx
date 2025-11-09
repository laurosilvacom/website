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
			{/* Hero Section */}
			<section className="relative flex min-h-[85vh] items-center justify-center overflow-hidden pt-24 pb-16 lg:min-h-[90vh] lg:pt-32 lg:pb-24">
				<div className="from-background via-background/95 to-background pointer-events-none absolute inset-0 bg-gradient-to-b" />

				<Container size="xl" className="relative z-10">
					<div className="mx-auto max-w-4xl space-y-8 text-center lg:space-y-12">
						<div className="inline-flex">
							<div className="bg-primary/10 text-primary border-primary/20 inline-flex items-center gap-2 rounded-full border px-4 py-2">
								<div className="bg-primary h-2 w-2 animate-pulse rounded-full" />
								<span className="text-sm font-medium">
									Available for new projects
								</span>
							</div>
						</div>

						<div className="space-y-6 lg:space-y-8">
							<h1 className="text-4xl leading-[1.1] font-bold tracking-tight sm:text-5xl lg:text-7xl xl:text-8xl">
								Technical Leadership and
								<br />
								<span className="text-primary">Team Development</span>
							</h1>
							<div className="text-muted-foreground mx-auto max-w-3xl space-y-4 text-lg leading-relaxed lg:text-xl">
								<p>
									I bring enterprise-level expertise from{' '}
									<strong className="text-foreground">
										Google, Shopify, O&apos;Reilly, and Sentry
									</strong>{' '}
									to help your team build better products, improve developer
									experience, and create effective learning experiences.
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
			<section className="border-border/50 border-t py-24 lg:py-32">
				<Container size="xl">
					{/* Section Header */}
					<div className="mb-16 lg:mb-24">
						<div className="max-w-3xl">
							<h2 className="mb-6 text-3xl font-bold tracking-tight lg:text-5xl xl:text-6xl">
								What I believe
							</h2>
							<div className="text-muted-foreground space-y-4 text-lg leading-relaxed lg:text-xl">
								<p>
									I believe that great products come from understanding both the
									technology and the people who use it. My years of building
									large-scale, full-stack educational products have taught me
									that effective software isn&apos;t just about clean code.
									It&apos;s about creating experiences that add real value.
								</p>
								<p>
									I&apos;ve worked on projects for companies like{' '}
									<strong className="text-foreground">
										Google, Shopify, O&apos;Reilly, and Sentry
									</strong>
									. I bring that enterprise-level expertise, especially in
									developer experience and educational product development, to
									help companies in the outdoor industry and beyond build better
									products and develop stronger teams.
								</p>
								<p>
									Whether you need technical leadership, team upskilling, or
									help building educational products, I work with you to create
									solutions that are practical, effective, and genuinely useful.
									I understand how to translate complex technical concepts into
									actionable learning experiences, and I know how to make teams
									more efficient through better developer experience.
								</p>
							</div>
						</div>
					</div>

					<div className="grid items-start gap-12 lg:grid-cols-12 lg:gap-16">
						{/* Image */}
						<div className="lg:col-span-5">
							<div className="sticky top-32">
								<div className="group relative aspect-[4/5] lg:aspect-[3/4]">
									<div className="from-primary/5 absolute inset-0 -z-10 rounded-2xl bg-gradient-to-br to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
									<Image
										src="/photos/website-photo-15.jpg"
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
							<div className="space-y-6">
								<p className="text-foreground text-lg leading-relaxed">
									My focus is on bringing enterprise-level expertise to
									companies that want to build better products and develop
									stronger teams.
								</p>
							</div>
						</div>
					</div>
				</Container>
			</section>

			{/* Who I Support Section */}
			<section className="border-border/50 border-t py-24 lg:py-32">
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
							<div className="group border-border/50 bg-card/50 hover:bg-card/70 hover:border-border relative space-y-6 overflow-hidden rounded-2xl border p-8 transition-all duration-300 lg:p-10">
								<div className="bg-primary/5 absolute top-0 right-0 h-32 w-32 translate-x-1/2 -translate-y-1/2 rounded-full opacity-0 blur-3xl transition-opacity duration-500 group-hover:opacity-100" />
								<div className="relative z-10">
									<ul className="space-y-6 text-lg leading-relaxed">
										<li className="flex items-start gap-4">
											<div className="bg-primary mt-2 h-2.5 w-2.5 flex-shrink-0 rounded-full" />
											<span className="text-foreground">
												You need technical leadership or consulting to improve
												your developer experience and build products that scale
											</span>
										</li>
										<li className="flex items-start gap-4">
											<div className="bg-primary mt-2 h-2.5 w-2.5 flex-shrink-0 rounded-full" />
											<span className="text-foreground">
												You want to upskill your team on modern web development
												(React, Next.js, TypeScript) or integrate AI into
												existing applications
											</span>
										</li>
										<li className="flex items-start gap-4">
											<div className="bg-primary mt-2 h-2.5 w-2.5 flex-shrink-0 rounded-full" />
											<span className="text-foreground">
												You&apos;re building educational products or learning
												platforms and need expertise in creating effective
												learning experiences
											</span>
										</li>
										<li className="flex items-start gap-4">
											<div className="bg-primary mt-2 h-2.5 w-2.5 flex-shrink-0 rounded-full" />
											<span className="text-foreground">
												You work with subject matter experts and need help
												translating complex concepts into practical, actionable
												content
											</span>
										</li>
										<li className="flex items-start gap-4">
											<div className="bg-primary mt-2 h-2.5 w-2.5 flex-shrink-0 rounded-full" />
											<span className="text-foreground">
												You&apos;re in the outdoor industry and want to bring
												enterprise-level technical expertise to your products
												and teams
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
									<div className="from-primary/5 absolute inset-0 -z-10 rounded-2xl bg-gradient-to-br to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
									<Image
										src="/photos/website-photo-14.jpg"
										alt="Team development"
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

			{/* What I Offer Section */}
			<section className="border-border/50 border-t py-24 lg:py-32">
				<Container size="xl">
					{/* Section Header */}
					<div className="mb-16 lg:mb-24">
						<div className="max-w-3xl">
							<h2 className="mb-6 text-3xl font-bold tracking-tight lg:text-5xl xl:text-6xl">
								What I offer
							</h2>
						</div>
					</div>

					<div className="grid gap-8 md:grid-cols-2 lg:gap-12">
						{/* Technical Leadership */}
						<div className="group border-border/50 bg-card/50 hover:bg-card/70 hover:border-border relative space-y-6 overflow-hidden rounded-2xl border p-8 transition-all duration-300 lg:p-10">
							<div className="bg-primary/5 absolute top-0 right-0 h-32 w-32 translate-x-1/2 -translate-y-1/2 rounded-full opacity-0 blur-3xl transition-opacity duration-500 group-hover:opacity-100" />
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
										experience, and build products that scale. This includes:
									</p>
									<ul className="space-y-3 pl-4">
										<li className="flex items-start gap-3">
											<span className="text-primary">•</span>
											<span>
												<strong className="text-foreground">
													Architecture planning
												</strong>{' '}
												– Design systems that scale and make sense for your team
											</span>
										</li>
										<li className="flex items-start gap-3">
											<span className="text-primary">•</span>
											<span>
												<strong className="text-foreground">
													Code reviews & technical strategy
												</strong>{' '}
												– Improve code quality and establish best practices
											</span>
										</li>
										<li className="flex items-start gap-3">
											<span className="text-primary">•</span>
											<span>
												<strong className="text-foreground">
													Developer experience consulting
												</strong>{' '}
												– Make your team more efficient through better tools and
												processes
											</span>
										</li>
										<li className="flex items-start gap-3">
											<span className="text-primary">•</span>
											<span>
												<strong className="text-foreground">
													AI integration
												</strong>{' '}
												– Help integrate AI into existing enterprise
												applications in practical ways
											</span>
										</li>
										<li className="flex items-start gap-3">
											<span className="text-primary">•</span>
											<span>
												<strong className="text-foreground">
													Hands-on development
												</strong>{' '}
												– Build features, fix critical issues, or lead
												development when needed
											</span>
										</li>
									</ul>
									<p className="pt-2">
										My expertise comes from years of building large-scale,
										full-stack products at companies like Google, Shopify,
										O&apos;Reilly, and Sentry. I understand how to make
										technical decisions that work for your team and your users.
									</p>
								</div>
								<div className="flex flex-wrap gap-2 pt-6">
									{[
										'Architecture',
										'Code Reviews',
										'Technical Strategy',
										'AI Integration'
									].map((tag) => (
										<span
											key={tag}
											className="bg-primary/10 text-primary border-primary/20 rounded-full border px-3 py-1.5 text-xs font-medium">
											{tag}
										</span>
									))}
								</div>
							</div>
						</div>

						{/* Educational Services */}
						<div className="group border-border/50 bg-card/50 hover:bg-card/70 hover:border-border relative space-y-6 overflow-hidden rounded-2xl border p-8 transition-all duration-300 lg:p-10">
							<div className="bg-primary/5 absolute top-0 right-0 h-32 w-32 translate-x-1/2 -translate-y-1/2 rounded-full opacity-0 blur-3xl transition-opacity duration-500 group-hover:opacity-100" />
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
										focused on full-stack development. My experience building
										large-scale educational products means I understand how to
										create learning experiences that are effective, not just
										informative.
									</p>
									<ul className="space-y-3 pl-4">
										<li className="flex items-start gap-3">
											<span className="text-primary">•</span>
											<span>
												<strong className="text-foreground">
													Remote workshops
												</strong>{' '}
												– Hands-on sessions on React, Next.js, TypeScript, and
												modern web development
											</span>
										</li>
										<li className="flex items-start gap-3">
											<span className="text-primary">•</span>
											<span>
												<strong className="text-foreground">
													Custom curriculum development
												</strong>{' '}
												– Learning paths tailored to your team&apos;s needs and
												goals
											</span>
										</li>
										<li className="flex items-start gap-3">
											<span className="text-primary">•</span>
											<span>
												<strong className="text-foreground">
													Educational content creation
												</strong>{' '}
												– Work with subject matter experts to translate complex
												concepts into practical content
											</span>
										</li>
										<li className="flex items-start gap-3">
											<span className="text-primary">•</span>
											<span>
												<strong className="text-foreground">
													AI integration training
												</strong>{' '}
												– Help your team understand how to integrate AI into
												existing applications
											</span>
										</li>
										<li className="flex items-start gap-3">
											<span className="text-primary">•</span>
											<span>
												<strong className="text-foreground">
													Developer experience workshops
												</strong>{' '}
												– Improve team efficiency through better tools,
												processes, and practices
											</span>
										</li>
									</ul>
									<p className="pt-2">
										I work with subject matter experts to create learning
										experiences that add real value. Whether you&apos;re
										building educational products or upskilling your team, I
										create curriculum that your team can actually use.
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
											className="bg-primary/10 text-primary border-primary/20 rounded-full border px-3 py-1.5 text-xs font-medium">
											{tag}
										</span>
									))}
								</div>
							</div>
						</div>
					</div>
				</Container>
			</section>

			{/* Testimonials Section */}
			<section className="border-border/50 border-t py-24 lg:py-32">
				<Container size="xl">
					{/* Section Header */}
					<div className="mb-16 lg:mb-24">
						<div className="max-w-3xl">
							<h2 className="mb-6 text-3xl font-bold tracking-tight lg:text-5xl xl:text-6xl">
								What clients say
							</h2>
						</div>
					</div>

					<div className="space-y-8">
						<div className="grid gap-8 md:grid-cols-2">
							{testimonials.slice(0, 2).map((testimonial, idx) => (
								<blockquote
									key={idx}
									className="group border-border/50 bg-card/30 hover:bg-card/50 hover:border-border relative space-y-6 overflow-hidden rounded-2xl border p-8 transition-all duration-300 lg:p-10">
									<div className="text-primary/5 absolute top-0 right-0 -mt-4 -mr-4 font-serif text-8xl leading-none select-none">
										&ldquo;
									</div>
									<div className="relative z-10">
										<p className="text-foreground text-lg leading-relaxed">
											{testimonial.quote}
										</p>
										<div className="border-border/30 mt-6 flex items-center gap-4 border-t pt-6">
											<div className="ring-border/50 group-hover:ring-primary/30 relative h-14 w-14 flex-shrink-0 overflow-hidden rounded-full ring-2 transition-all">
												<Image
													src={testimonial.image}
													alt={testimonial.author}
													fill
													className="object-cover"
												/>
											</div>
											<div className="min-w-0 space-y-1">
												<p className="text-base font-semibold">
													{testimonial.author}
												</p>
												<p className="text-muted-foreground text-sm">
													{testimonial.role}
												</p>
											</div>
										</div>
									</div>
								</blockquote>
							))}
						</div>

						{testimonials.slice(2).map((testimonial, idx) => (
							<blockquote
								key={idx + 2}
								className="group border-border/50 bg-card/30 hover:bg-card/50 hover:border-border relative space-y-6 overflow-hidden rounded-2xl border p-8 transition-all duration-300 lg:p-10">
								<div className="text-primary/5 absolute top-0 right-0 -mt-4 -mr-4 font-serif text-8xl leading-none select-none">
									&ldquo;
								</div>
								<div className="relative z-10">
									<p className="text-foreground text-lg leading-relaxed">
										{testimonial.quote}
									</p>
									<div className="border-border/30 mt-6 flex items-center gap-4 border-t pt-6">
										<div className="ring-border/50 group-hover:ring-primary/30 relative h-14 w-14 flex-shrink-0 overflow-hidden rounded-full ring-2 transition-all">
											<Image
												src={testimonial.image}
												alt={testimonial.author}
												fill
												className="object-cover"
											/>
										</div>
										<div className="min-w-0 space-y-1">
											<p className="text-base font-semibold">
												{testimonial.author}
											</p>
											<p className="text-muted-foreground text-sm">
												{testimonial.role}
											</p>
										</div>
									</div>
								</div>
							</blockquote>
						))}
					</div>
				</Container>
			</section>

			{/* Pricing Section */}
			<section className="border-border/50 border-t py-24 lg:py-32">
				<Container size="lg">
					<div className="max-w-3xl space-y-12">
						<div className="space-y-6">
							<h2 className="text-3xl font-bold tracking-tight lg:text-5xl xl:text-6xl">
								How much it costs
							</h2>
							<div className="text-muted-foreground space-y-4 text-lg leading-relaxed">
								<p>
									Pricing varies based on scope, timeline, and specific needs.
									Here&apos;s a general guide:
								</p>
							</div>
						</div>

						<div className="grid gap-8 md:grid-cols-3">
							<div className="group border-border/50 bg-card/50 hover:bg-card/70 hover:border-border relative overflow-hidden rounded-2xl border p-8 transition-all duration-300 lg:p-10">
								<div className="bg-primary/5 absolute top-0 right-0 h-32 w-32 translate-x-1/2 -translate-y-1/2 rounded-full opacity-0 blur-3xl transition-opacity duration-500 group-hover:opacity-100" />
								<div className="relative z-10 space-y-4">
									<h3 className="text-xl font-semibold tracking-tight">
										Technical Leadership & Consulting
									</h3>
									<p className="text-foreground text-lg font-medium">
										$150 to $250 per hour
									</p>
									<p className="text-muted-foreground text-sm">
										Project-based pricing available. Example projects:
										Architecture reviews ($2,000 to $5,000), Developer
										experience audits ($3,000 to $8,000).
									</p>
								</div>
							</div>

							<div className="group border-border/50 bg-card/50 hover:bg-card/70 hover:border-border relative overflow-hidden rounded-2xl border p-8 transition-all duration-300 lg:p-10">
								<div className="bg-primary/5 absolute top-0 right-0 h-32 w-32 translate-x-1/2 -translate-y-1/2 rounded-full opacity-0 blur-3xl transition-opacity duration-500 group-hover:opacity-100" />
								<div className="relative z-10 space-y-4">
									<h3 className="text-xl font-semibold tracking-tight">
										Educational Services & Workshops
									</h3>
									<p className="text-foreground text-lg font-medium">
										$3,000 to $8,000 per day
									</p>
									<p className="text-muted-foreground text-sm">
										Curriculum development: $5,000 to $15,000+ depending on
										scope. Multi-day workshops or ongoing training programs can
										be structured as packages.
									</p>
								</div>
							</div>

							<div className="group border-border/50 bg-card/50 hover:bg-card/70 hover:border-border relative overflow-hidden rounded-2xl border p-8 transition-all duration-300 lg:p-10">
								<div className="bg-primary/5 absolute top-0 right-0 h-32 w-32 translate-x-1/2 -translate-y-1/2 rounded-full opacity-0 blur-3xl transition-opacity duration-500 group-hover:opacity-100" />
								<div className="relative z-10 space-y-4">
									<h3 className="text-xl font-semibold tracking-tight">
										Educational Product Development
									</h3>
									<p className="text-foreground text-lg font-medium">
										$20,000 to $100,000+
									</p>
									<p className="text-muted-foreground text-sm">
										Pricing varies based on platform complexity, content
										creation needs, integrations, user management systems, and
										timeline.
									</p>
								</div>
							</div>
						</div>

						<p className="text-muted-foreground text-sm italic">
							Please consider exploring any learning and professional
							development funds offered by your employer. If this pricing feels
							challenging, reach out anyway. We can explore what&apos;s possible
							and discuss options that work for your budget.
						</p>
					</div>
				</Container>
			</section>

			{/* Getting Started Section */}
			<section className="border-border/50 border-t py-24 lg:py-32">
				<Container size="lg">
					<div className="max-w-3xl space-y-12">
						<div className="space-y-6">
							<h2 className="text-3xl font-bold tracking-tight lg:text-5xl xl:text-6xl">
								Getting started
							</h2>
						</div>

						<div className="space-y-8">
							{[
								{
									step: '1',
									title: 'Schedule a free 30-minute exploratory call',
									description:
										'We&apos;ll connect virtually to explore if we&apos;re a good fit. I&apos;ll share more about my process and expertise, and you can ask any questions about how I can help your team or company. If we&apos;re both excited to work together, we move to the next step.'
								},
								{
									step: '2',
									title: 'Define scope and approach',
									description:
										'We&apos;ll discuss your specific needs, goals, and constraints. For larger projects, I may provide a discovery phase proposal. For consulting or workshops, we&apos;ll outline the approach and timeline that works for your team.'
								},
								{
									step: '3',
									title: 'Begin working together',
									description:
										'Whether it&apos;s technical consulting, team workshops, or building educational products, we&apos;ll work together with regular check-ins to ensure we&apos;re meeting your goals and delivering value to your team.'
								}
							].map((item, index) => (
								<div
									key={index}
									className="group border-border/50 bg-card/50 hover:bg-card/70 hover:border-border relative overflow-hidden rounded-2xl border p-8 transition-all duration-300 lg:p-10">
									<div className="bg-primary/5 absolute top-0 right-0 h-32 w-32 translate-x-1/2 -translate-y-1/2 rounded-full opacity-0 blur-3xl transition-opacity duration-500 group-hover:opacity-100" />
									<div className="relative z-10 flex items-start gap-6">
										<div className="bg-primary/10 flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full transition-transform group-hover:scale-110">
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
			<section className="border-border/50 from-background to-background/95 border-t bg-gradient-to-b py-24 lg:py-32">
				<Container size="lg">
					<div className="mx-auto max-w-4xl">
						<div className="border-border/50 bg-card/30 space-y-8 rounded-3xl border p-12 text-center backdrop-blur-sm lg:p-16">
							<div className="space-y-6">
								<h2 className="text-3xl font-bold tracking-tight lg:text-5xl xl:text-6xl">
									Ready to work together?
								</h2>
								<p className="text-muted-foreground mx-auto max-w-2xl text-lg leading-relaxed lg:text-xl">
									Let&apos;s discuss how I can help your team build better
									products and develop stronger teams.
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
