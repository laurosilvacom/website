import {ArrowRight} from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import Container from '@/components/container'
import {Button} from '@/components/ui/button'

export default function ServicesPage() {
	return (
		<>
			{/* Hero Section */}
			<section className="border-border border-b pt-32 pb-24 lg:pt-40 lg:pb-32">
				<Container width="base">
					<div className="mx-auto max-w-4xl space-y-12 text-center">
						{/* Status Badge */}
						<div className="inline-flex">
							<div className="bg-muted text-primary border-border inline-flex items-center gap-2 rounded-full border px-4 py-2">
								<div className="bg-primary h-2 w-2 animate-pulse rounded-full" />
								<span className="text-sm font-medium">
									Available for new projects
								</span>
							</div>
						</div>

						{/* Heading */}
						<div className="space-y-8">
							<h1 className="text-5xl leading-[1.1] font-bold tracking-tight lg:text-6xl xl:text-7xl">
								Building Better Products
								<br />
								<span className="text-primary">For the Outdoor Industry</span>
							</h1>
							<p className="text-muted-foreground mx-auto max-w-2xl text-xl leading-relaxed">
								I help companies strengthen their engineering teams and develop
								better products. I also build custom platforms for professional
								athletes—complete solutions they own.
							</p>
						</div>

						{/* CTA */}
						<div className="flex flex-wrap items-center justify-center gap-4 pt-4">
							<Button asChild size="lg" className="group">
								<Link
									href="https://cal.com/laurosilvacom/chat"
									target="_blank"
									rel="noopener noreferrer">
									Schedule a consultation
									<ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
								</Link>
							</Button>
							<Button asChild size="lg" variant="ghost">
								<Link href="#services">View services</Link>
							</Button>
						</div>
					</div>
				</Container>
			</section>

			{/* Services Overview */}
			<section id="services" className="border-border border-t py-24 lg:py-32">
				<Container width="base">
					<div className="space-y-16">
						{/* For Companies */}
						<div className="group border-border hover:border-primary/20 from-background to-muted/30 relative overflow-hidden rounded-2xl border bg-gradient-to-br p-12 transition-all duration-300 lg:p-16">
							<div className="space-y-8">
								<div className="space-y-4">
									<div className="inline-flex items-center gap-2">
										<div className="bg-primary h-2 w-2 rounded-full" />
										<span className="text-muted-foreground text-sm font-medium tracking-wide uppercase">
											For Companies
										</span>
									</div>
									<h2 className="text-3xl font-bold tracking-tight lg:text-5xl">
										Ship Faster, Build Smarter
									</h2>
									<p className="text-muted-foreground max-w-2xl text-lg leading-relaxed">
										Technical leadership and developer training to help your
										team make better decisions, improve your stack, and deliver
										products that actually work.
									</p>
								</div>

								<div className="grid gap-6 md:grid-cols-2">
									<div className="space-y-3">
										<h3 className="text-foreground text-lg font-semibold">
											Technical Leadership
										</h3>
										<p className="text-muted-foreground text-base leading-relaxed">
											Architecture planning, code reviews, technical strategy,
											and hands-on development. I help teams make better
											decisions and build products that scale.
										</p>
									</div>

									<div className="space-y-3">
										<h3 className="text-foreground text-lg font-semibold">
											Developer Training
										</h3>
										<p className="text-muted-foreground text-base leading-relaxed">
											Workshops and curriculum focused on React, Next.js,
											TypeScript, and AI integration. Educational content that's
											effective, not just informative.
										</p>
									</div>
								</div>

								<div className="border-border flex flex-wrap items-center justify-between gap-6 border-t pt-8">
									<div className="flex flex-wrap gap-2">
										{[
											'React',
											'Next.js',
											'TypeScript',
											'Architecture',
											'AI Integration'
										].map((tag) => (
											<span
												key={tag}
												className="bg-muted text-muted-foreground rounded-full px-3 py-1 text-xs font-medium">
												{tag}
											</span>
										))}
									</div>
									<Button
										asChild
										variant="ghost"
										className="group/btn text-primary hover:text-primary">
										<Link href="/services/companies">
											Learn more
											<ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover/btn:translate-x-1" />
										</Link>
									</Button>
								</div>
							</div>
						</div>

						{/* For Athletes */}
						<div className="group border-border hover:border-primary/20 from-background to-muted/30 relative overflow-hidden rounded-2xl border bg-gradient-to-br p-12 transition-all duration-300 lg:p-16">
							<div className="space-y-8">
								<div className="space-y-4">
									<div className="inline-flex items-center gap-2">
										<div className="bg-primary h-2 w-2 rounded-full" />
										<span className="text-muted-foreground text-sm font-medium tracking-wide uppercase">
											For Athletes
										</span>
									</div>
									<h2 className="text-3xl font-bold tracking-tight lg:text-5xl">
										Your Platform, Your Rules
									</h2>
									<p className="text-muted-foreground max-w-2xl text-lg leading-relaxed">
										Custom platforms built for professional athletes. Not
										templates. Not rentals. Complete solutions you own that grow
										with your career.
									</p>
								</div>

								<div className="grid gap-6 md:grid-cols-2">
									<div className="space-y-3">
										<h3 className="text-foreground text-lg font-semibold">
											Custom Development
										</h3>
										<p className="text-muted-foreground text-base leading-relaxed">
											Built specifically to reflect your story and support your
											content strategy. Not templates. Complete solutions you
											own.
										</p>
									</div>

									<div className="space-y-3">
										<h3 className="text-foreground text-lg font-semibold">
											Strategy & Support
										</h3>
										<p className="text-muted-foreground text-base leading-relaxed">
											Marketing strategy, content planning, and how the platform
											fits into your broader brand goals. Built to grow with
											your career.
										</p>
									</div>
								</div>

								<div className="border-border flex flex-wrap items-center justify-between gap-6 border-t pt-8">
									<div className="flex flex-wrap gap-2">
										{[
											'Trail Running',
											'Climbing',
											'Cycling',
											'Brand Strategy',
											'Community'
										].map((tag) => (
											<span
												key={tag}
												className="bg-muted text-muted-foreground rounded-full px-3 py-1 text-xs font-medium">
												{tag}
											</span>
										))}
									</div>
									<Button
										asChild
										variant="ghost"
										className="group/btn text-primary hover:text-primary">
										<Link href="/services/athletes">
											Learn more
											<ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover/btn:translate-x-1" />
										</Link>
									</Button>
								</div>
							</div>
						</div>
					</div>
				</Container>
			</section>

			{/* Technologies & Companies */}
			<section className="border-border border-t py-24 lg:py-32">
				<Container width="base">
					<div className="grid gap-16 lg:grid-cols-2">
						{/* Technologies */}
						<div className="space-y-8">
							<div className="space-y-4">
								<div className="inline-flex items-center gap-2">
									<div className="bg-primary h-2 w-2 rounded-full" />
									<span className="text-muted-foreground text-sm font-medium tracking-wide uppercase">
										Tech Stack
									</span>
								</div>
								<h2 className="text-2xl font-bold tracking-tight lg:text-3xl">
									Technologies I Work With
								</h2>
							</div>

							<div className="flex flex-wrap gap-3">
								{[
									{name: 'React', domain: 'react.dev'},
									{name: 'Next.js', domain: 'nextjs.org'},
									{name: 'TypeScript', domain: 'typescriptlang.org'},
									{name: 'Node.js', domain: 'nodejs.org'},
									{name: 'Tailwind CSS', domain: 'tailwindcss.com'},
									{name: 'Sanity', domain: 'sanity.io'},
									{name: 'Vercel', domain: 'vercel.com'}
								].map((tech) => (
									<div
										key={tech.name}
										className="border-border bg-muted/50 flex items-center gap-2 rounded-full border px-4 py-2">
										<img
											src={`https://www.google.com/s2/favicons?domain=${tech.domain}&sz=16`}
											alt={tech.name}
											className="h-4 w-4"
										/>
										<span className="text-sm font-medium">{tech.name}</span>
									</div>
								))}
								<div className="border-border bg-muted/50 flex items-center gap-2 rounded-full border px-4 py-2">
									<span className="text-sm font-medium">Claude & GPT-4</span>
								</div>
							</div>

							<p className="text-muted-foreground text-base leading-relaxed">
								Practical, production-ready solutions using battle-tested tools
								your team can maintain long-term.
							</p>
						</div>

						{/* Companies */}
						<div className="space-y-8">
							<div className="space-y-4">
								<div className="inline-flex items-center gap-2">
									<div className="bg-primary h-2 w-2 rounded-full" />
									<span className="text-muted-foreground text-sm font-medium tracking-wide uppercase">
										Experience
									</span>
								</div>
								<h2 className="text-2xl font-bold tracking-tight lg:text-3xl">
									Companies I&apos;ve Worked With
								</h2>
							</div>

							<div className="flex flex-wrap gap-3">
								{[
									{name: 'Google', domain: 'google.com'},
									{name: "O'Reilly", domain: 'oreilly.com'},
									{name: 'Sentry', domain: 'sentry.io'},
									{name: 'HOKA', domain: 'hoka.com'},
									{name: 'egghead', domain: 'egghead.io'},
									{name: 'Test Double', domain: 'testdouble.com'}
								].map((company) => (
									<div
										key={company.name}
										className="border-border bg-muted/50 flex items-center gap-2 rounded-full border px-4 py-2">
										<img
											src={`https://www.google.com/s2/favicons?domain=${company.domain}&sz=16`}
											alt={company.name}
											className="h-4 w-4"
										/>
										<span className="text-sm font-medium">{company.name}</span>
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
			<section className="border-border border-t py-24 lg:py-32">
				<Container width="base">
					<div className="border-border bg-muted/50 space-y-8 rounded-2xl border p-12 text-center lg:p-16">
						<div className="space-y-6">
							<h2 className="text-3xl font-bold tracking-tight lg:text-5xl">
								Ready to work together?
							</h2>
							<p className="text-muted-foreground mx-auto max-w-2xl text-lg leading-relaxed lg:text-xl">
								Let&apos;s discuss how I can help your team build better
								products or create a custom platform that supports your brand.
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
