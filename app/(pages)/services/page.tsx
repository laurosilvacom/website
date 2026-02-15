import {ArrowRight} from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import Container from '@/components/container'
import {Button} from '@/components/ui/button'
import {generatePageMetadata} from '@/lib/metadata'

export const metadata = generatePageMetadata(
	'Services',
	'Full-stack development, technical leadership, and developer training for small and medium companies. React, Next.js, TypeScript. Previously with Google, O\'Reilly, Sentry.',
	{
		keywords: [
			'full-stack development',
			'technical consulting',
			'developer training',
			'React workshops',
			'Next.js consulting',
			'TypeScript training',
			'freelance senior engineer'
		],
		canonical: '/services'
	}
)

export default function ServicesPage() {
	return (
		<>
			{/* Hero Section */}
			<section className="px-6 pt-32 pb-16 lg:pt-40 lg:pb-20">
				<div className="mx-auto max-w-6xl text-center">
					<div className="animate-in fade-in slide-in-from-bottom-4 space-y-8 duration-1000">
						<h1 className="text-4xl leading-[1.05] font-bold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl">
							Ship faster. Build smarter.
							<br />
							Level up your team.
						</h1>
						<p className="text-muted-foreground mx-auto max-w-2xl text-xl leading-relaxed sm:text-2xl">
							I help small and medium companies ship production software, make
							better technical decisions, and build stronger engineering teams.
						</p>
					</div>
					<div className="animate-in fade-in slide-in-from-bottom-4 flex flex-wrap items-center justify-center gap-4 pt-12 delay-150 duration-1000">
						<Button asChild size="lg" className="group">
							<Link
								href="https://cal.com/laurosilvacom/chat"
								target="_blank"
								rel="noopener noreferrer">
								Schedule a consultation
								<ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
							</Link>
						</Button>
						<Button asChild size="lg" variant="outline">
							<Link href="#services">View services</Link>
						</Button>
					</div>
				</div>
			</section>

			{/* Services Overview */}
			<section id="services" className="py-24 lg:py-32">
				<Container width="base">
					<div className="space-y-8">
						{/* Full-Stack Development — Primary */}
						<div className="group border-border-subtle bg-card hover:border-border relative overflow-hidden rounded-3xl border p-12 transition-all duration-200 lg:p-16">
							<div className="space-y-8">
								<div className="space-y-4">
									<div className="inline-flex items-center gap-2">
										<div className="bg-primary h-2 w-2 rounded-full" />
										<span className="text-muted-foreground font-mono text-xs font-medium tracking-wide uppercase">
											Full-Stack Development
										</span>
									</div>
									<h2 className="text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
										Ship Production Software
									</h2>
									<p className="text-muted-foreground max-w-2xl text-lg leading-relaxed">
										I embed with your team and build. React, Next.js,
										TypeScript, Node.js — from architecture to deployment. You
										get a senior engineer who ships, not just advises.
									</p>
								</div>

								<div className="grid gap-6 md:grid-cols-2">
									<div className="space-y-3">
										<h3 className="text-foreground text-lg font-semibold">
											For Companies
										</h3>
										<p className="text-muted-foreground text-base leading-relaxed">
											Need a senior engineer to join your team and ship? I
											integrate with your existing workflows and start
											delivering from week one. Weekly or monthly retainers
											available.
										</p>
									</div>

									<div className="space-y-3">
										<h3 className="text-foreground text-lg font-semibold">
											For Agencies
										</h3>
										<p className="text-muted-foreground text-base leading-relaxed">
											Need senior React/Next.js talent for client projects? I
											provide white-label development support so you can take
											on bigger projects with confidence.
										</p>
									</div>
								</div>

								<div className="border-border flex flex-wrap items-center justify-between gap-6 border-t pt-8">
									<div className="flex flex-wrap gap-2">
										{[
											'React',
											'Next.js',
											'TypeScript',
											'Node.js',
											'Full-Stack'
										].map((tag) => (
											<span
												key={tag}
												className="bg-muted text-muted-foreground font-mono rounded-full px-3 py-1 text-xs font-medium">
												{tag}
											</span>
										))}
									</div>
									<Button
										asChild
										variant="ghost"
										className="group/btn text-primary hover:text-primary">
										<Link href="/work">
											See past work
											<ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover/btn:translate-x-1" />
										</Link>
									</Button>
								</div>
							</div>
						</div>

						{/* Secondary services — side by side */}
						<div className="grid gap-8 md:grid-cols-2">
							{/* Technical Leadership */}
							<div className="group border-border-subtle bg-card hover:border-border relative overflow-hidden rounded-2xl border p-8 transition-all duration-200 lg:p-10">
								<div className="space-y-6">
									<div className="space-y-4">
										<span className="text-muted-foreground font-mono text-xs font-medium tracking-wide uppercase">
											Technical Leadership
										</span>
										<h2 className="text-2xl font-bold tracking-tight lg:text-3xl">
											Make Better Decisions
										</h2>
										<p className="text-muted-foreground text-base leading-relaxed">
											Architecture reviews, code audits, technical strategy.
											Senior-level guidance without a full-time hire. I help
											teams make the right technical decisions at the right
											time.
										</p>
									</div>

									<div className="space-y-4">
										<div className="space-y-2">
											<h3 className="text-foreground text-sm font-semibold">
												Architecture & Strategy
											</h3>
											<p className="text-muted-foreground text-sm leading-relaxed">
												Architecture planning, code reviews, technical
												strategy, and system design.
											</p>
										</div>
										<div className="space-y-2">
											<h3 className="text-foreground text-sm font-semibold">
												Fractional CTO
											</h3>
											<p className="text-muted-foreground text-sm leading-relaxed">
												For startups that need senior technical leadership
												but aren&apos;t ready for a full-time CTO.
											</p>
										</div>
									</div>

									<div className="border-border flex flex-wrap items-center justify-between gap-4 border-t pt-6">
										<div className="flex flex-wrap gap-2">
											{[
												'Architecture',
												'Code Audits',
												'Strategy'
											].map((tag) => (
												<span
													key={tag}
													className="bg-muted text-muted-foreground font-mono rounded-full px-3 py-1 text-xs font-medium">
													{tag}
												</span>
											))}
										</div>
										<Button
											asChild
											variant="ghost"
											size="sm"
											className="group/btn text-primary hover:text-primary">
											<Link href="/work">
												See past work
												<ArrowRight className="ml-2 h-3.5 w-3.5 transition-transform group-hover/btn:translate-x-1" />
											</Link>
										</Button>
									</div>
								</div>
							</div>

							{/* Developer Training */}
							<div className="group border-border-subtle bg-card hover:border-border relative overflow-hidden rounded-2xl border p-8 transition-all duration-200 lg:p-10">
								<div className="space-y-6">
									<div className="space-y-4">
										<span className="text-muted-foreground font-mono text-xs font-medium tracking-wide uppercase">
											Developer Training
										</span>
										<h2 className="text-2xl font-bold tracking-tight lg:text-3xl">
											Level Up Your Team
										</h2>
										<p className="text-muted-foreground text-base leading-relaxed">
											Custom workshops and training programs for engineering
											teams. I&apos;ve taught at O&apos;Reilly and egghead,
											and I bring that same quality to your team directly.
										</p>
									</div>

									<div className="space-y-4">
										<div className="space-y-2">
											<h3 className="text-foreground text-sm font-semibold">
												Team Workshops
											</h3>
											<p className="text-muted-foreground text-sm leading-relaxed">
												Half-day to multi-day workshops on React, Next.js,
												TypeScript, and AI integration.
											</p>
										</div>
										<div className="space-y-2">
											<h3 className="text-foreground text-sm font-semibold">
												Corporate Training
											</h3>
											<p className="text-muted-foreground text-sm leading-relaxed">
												Custom training designed for your team&apos;s
												specific needs, codebase, and skill level.
											</p>
										</div>
									</div>

									<div className="border-border flex flex-wrap items-center justify-between gap-4 border-t pt-6">
										<div className="flex flex-wrap gap-2">
											{[
												'React',
												'TypeScript',
												'AI',
												'Workshops'
											].map((tag) => (
												<span
													key={tag}
													className="bg-muted text-muted-foreground font-mono rounded-full px-3 py-1 text-xs font-medium">
													{tag}
												</span>
											))}
										</div>
										<Button
											asChild
											variant="ghost"
											size="sm"
											className="group/btn text-primary hover:text-primary">
											<Link href="/teaching">
												Teaching portfolio
												<ArrowRight className="ml-2 h-3.5 w-3.5 transition-transform group-hover/btn:translate-x-1" />
											</Link>
										</Button>
									</div>
								</div>
							</div>
						</div>
					</div>
				</Container>
			</section>

			{/* Testimonials */}
			<section className="py-24 lg:py-32">
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

						<div className="grid gap-8 md:grid-cols-3">
							<blockquote className="border-border bg-card space-y-6 rounded-2xl border p-8">
								<p className="text-foreground text-base leading-relaxed">
									&ldquo;Lauro is a total pro. His guidance helped us create
									polished onboarding videos and build the capability to create
									content independently.&rdquo;
								</p>
								<div className="border-border flex items-center gap-3 border-t pt-6">
									<div className="relative h-10 w-10 shrink-0 overflow-hidden rounded-full">
										<Image
											src="https://res.cloudinary.com/laurosilvacom/image/upload/v1731435976/laurosilvacom/hire-me-page/ok4aceenrvijrjcafxba.jpg"
											alt="Andrew Hedges"
											fill
											className="object-cover"
										/>
									</div>
									<div>
										<p className="text-sm font-semibold">Andrew Hedges</p>
										<p className="text-muted-foreground text-xs">
											Assistiv Labs
										</p>
									</div>
								</div>
							</blockquote>

							<blockquote className="border-border bg-card space-y-6 rounded-2xl border p-8">
								<p className="text-foreground text-base leading-relaxed">
									&ldquo;An hour with Lauro helped me untangle my thoughts and
									make a concrete plan. If you need dev content strategy,
									he&apos;s your person.&rdquo;
								</p>
								<div className="border-border flex items-center gap-3 border-t pt-6">
									<div className="relative h-10 w-10 shrink-0 overflow-hidden rounded-full">
										<Image
											src="https://res.cloudinary.com/laurosilvacom/image/upload/v1731435976/laurosilvacom/hire-me-page/py2kbwptjbxfdqpoepkj.jpg"
											alt="Jason Lengstorf"
											fill
											className="object-cover"
										/>
									</div>
									<div>
										<p className="text-sm font-semibold">Jason Lengstorf</p>
										<p className="text-muted-foreground text-xs">
											Learn With Jason
										</p>
									</div>
								</div>
							</blockquote>

							<blockquote className="border-border bg-card space-y-6 rounded-2xl border p-8">
								<p className="text-foreground text-base leading-relaxed">
									&ldquo;Working with Lauro is always a great experience. His
									technical guidance and patience make complex projects feel
									manageable.&rdquo;
								</p>
								<div className="border-border flex items-center gap-3 border-t pt-6">
									<div className="relative h-10 w-10 shrink-0 overflow-hidden rounded-full">
										<Image
											src="https://res.cloudinary.com/laurosilvacom/image/upload/v1731435976/laurosilvacom/hire-me-page/p3eglqeb7qfvsfzvh3qr.jpg"
											alt="Alejandro Nanez"
											fill
											className="object-cover"
										/>
									</div>
									<div>
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

			{/* Technologies & Companies */}
			<section className="bg-muted/30 py-24 lg:py-32">
				<Container width="base">
					<div className="grid gap-16 lg:grid-cols-2">
						<div className="space-y-8">
							<div className="space-y-4">
								<div className="inline-flex items-center gap-2">
									<div className="bg-primary h-2 w-2 rounded-full" />
									<span className="text-muted-foreground font-mono text-xs font-medium tracking-wide uppercase">
										Tech Stack
									</span>
								</div>
								<h2 className="text-2xl font-bold tracking-tight lg:text-3xl">
									Technologies I Work With
								</h2>
							</div>
							<div className="flex flex-wrap gap-3">
								{[
									'React',
									'Next.js',
									'TypeScript',
									'Node.js',
									'Tailwind CSS',
									'Sanity',
									'Vercel',
									'Claude & GPT-4'
								].map((tech) => (
									<div
										key={tech}
										className="border-border bg-card rounded-full border px-4 py-2">
										<span className="text-sm font-medium">{tech}</span>
									</div>
								))}
							</div>
							<p className="text-muted-foreground text-base leading-relaxed">
								Production-ready solutions using battle-tested tools your team
								can maintain long-term.
							</p>
						</div>

						<div className="space-y-8">
							<div className="space-y-4">
								<div className="inline-flex items-center gap-2">
									<div className="bg-primary h-2 w-2 rounded-full" />
									<span className="text-muted-foreground font-mono text-xs font-medium tracking-wide uppercase">
										Experience
									</span>
								</div>
								<h2 className="text-2xl font-bold tracking-tight lg:text-3xl">
									Companies I&apos;ve Worked With
								</h2>
							</div>
							<div className="flex flex-wrap gap-3">
								{[
									'Google',
									"O'Reilly",
									'Sentry',
									'HOKA',
									'egghead',
									'Test Double'
								].map((company) => (
									<div
										key={company}
										className="border-border bg-card rounded-full border px-4 py-2">
										<span className="text-sm font-medium">{company}</span>
									</div>
								))}
							</div>
							<p className="text-muted-foreground text-base leading-relaxed">
								Enterprise-level expertise helping teams build better products
								and stronger engineering capabilities.
							</p>
						</div>
					</div>
				</Container>
			</section>

			{/* CTA */}
			<section className="py-24 lg:py-32">
				<Container width="base">
					<div className="bg-card border-border-subtle space-y-8 rounded-3xl border p-12 text-center lg:p-16">
						<div className="space-y-6">
							<h2 className="text-3xl font-bold tracking-tight lg:text-5xl">
								Ready to work together?
							</h2>
							<p className="text-muted-foreground mx-auto max-w-2xl text-lg leading-relaxed lg:text-xl">
								Let&apos;s discuss how I can help your team ship better
								software, make stronger technical decisions, or level up through
								training.
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
