import {ArrowRight, ArrowUpRight} from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import Container from '@/shared/components/container'
import {generatePageMetadata} from '@/shared/lib/metadata'

export const metadata = generatePageMetadata(
	'Services',
	"Full-stack development, technical leadership, and developer training for small and medium companies. React, Next.js, TypeScript. Previously with Google, O'Reilly, Sentry.",
	{
		keywords: [
			'full-stack development',
			'technical consulting',
			'developer training',
			'React workshops',
			'Next.js consulting',
			'TypeScript training',
			'freelance senior engineer',
		],
		canonical: '/services',
	},
)

const services = [
	{
		n: '01',
		title: 'Full-Stack Development',
		headline: 'Ship Production Software',
		desc: 'I embed with your team and build. React, Next.js, TypeScript, Node.js — from architecture to deployment. You get a senior engineer who ships, not just advises.',
		details: [
			{
				label: 'For Companies',
				text: 'Need a senior engineer to join your team and ship? I integrate with your existing workflows and start delivering from week one.',
			},
			{
				label: 'For Agencies',
				text: 'Need senior React/Next.js talent for client projects? I provide white-label development support so you can take on bigger projects.',
			},
		],
		tags: ['React', 'Next.js', 'TypeScript', 'Node.js', 'Full-Stack'],
		link: {href: '/work', label: 'See past work'},
	},
	{
		n: '02',
		title: 'Technical Leadership',
		headline: 'Make Better Decisions',
		desc: 'Architecture reviews, code audits, technical strategy. Senior-level guidance without a full-time hire. I help teams make the right technical decisions at the right time.',
		details: [
			{
				label: 'Architecture & Strategy',
				text: 'Architecture planning, code reviews, technical strategy, and system design.',
			},
			{
				label: 'Fractional CTO',
				text: "For startups that need senior technical leadership but aren't ready for a full-time CTO.",
			},
		],
		tags: ['Architecture', 'Code Audits', 'Strategy'],
		link: {href: '/work', label: 'See past work'},
	},
	{
		n: '03',
		title: 'Developer Training',
		headline: 'Level Up Your Team',
		desc: "Custom workshops and training programs for engineering teams. I've taught at O'Reilly and egghead, and I bring that same quality to your team directly.",
		details: [
			{
				label: 'Team Workshops',
				text: 'Half-day to multi-day workshops on React, Next.js, TypeScript, and AI integration.',
			},
			{
				label: 'Corporate Training',
				text: "Custom training designed for your team's specific needs, codebase, and skill level.",
			},
		],
		tags: ['React', 'TypeScript', 'AI', 'Workshops'],
		link: {href: '/teaching', label: 'Teaching portfolio'},
	},
]

const testimonials = [
	{
		quote:
			'Lauro is a total pro. His guidance helped us create polished onboarding videos and build the capability to create content independently.',
		name: 'Andrew Hedges',
		role: 'Assistiv Labs',
		image:
			'https://res.cloudinary.com/laurosilvacom/image/upload/v1731435976/laurosilvacom/hire-me-page/ok4aceenrvijrjcafxba.jpg',
	},
	{
		quote:
			"An hour with Lauro helped me untangle my thoughts and make a concrete plan. If you need dev content strategy, he's your person.",
		name: 'Jason Lengstorf',
		role: 'Learn With Jason',
		image:
			'https://res.cloudinary.com/laurosilvacom/image/upload/v1731435976/laurosilvacom/hire-me-page/py2kbwptjbxfdqpoepkj.jpg',
	},
	{
		quote:
			'Working with Lauro is always a great experience. His technical guidance and patience make complex projects feel manageable.',
		name: 'Alejandro Nanez',
		role: 'Staff Engineer',
		image:
			'https://res.cloudinary.com/laurosilvacom/image/upload/v1731435976/laurosilvacom/hire-me-page/p3eglqeb7qfvsfzvh3qr.jpg',
	},
]

export default function ServicesPage() {
	return (
		<>
			{/* Header */}
			<section className="pt-40 pb-20 lg:pt-48 lg:pb-24">
				<Container width="base">
					<div className="animate-in fade-in slide-in-from-bottom-4 max-w-2xl space-y-4 duration-1000">
						<h1 className="text-4xl leading-[1.08] font-bold tracking-tight sm:text-5xl lg:text-6xl">
							Services
						</h1>
						<p className="text-muted-foreground max-w-xl text-lg leading-relaxed">
							Full-stack development, technical leadership, and developer
							training for small and medium companies.
						</p>
						<div className="flex items-center gap-4 pt-2">
							<Link
								href="https://cal.com/laurosilvacom/chat"
								target="_blank"
								rel="noopener noreferrer"
								className="bg-primary text-primary-foreground hover:bg-primary/90 inline-flex items-center gap-2 rounded-lg px-4 py-2.5 text-sm font-medium transition-colors">
								Schedule a consultation
								<ArrowUpRight className="h-3.5 w-3.5" />
							</Link>
							<Link
								href="/work"
								className="text-muted-foreground hover:text-foreground inline-flex items-center gap-1.5 text-sm font-medium transition-colors">
								See past work
								<ArrowRight className="h-3.5 w-3.5" />
							</Link>
						</div>
					</div>
				</Container>
			</section>

			{/* Services */}
			<section id="services" className="border-border border-t py-16 lg:py-20">
				<Container width="base">
					<h2 className="text-sm font-semibold uppercase tracking-wider">
						What I Offer
					</h2>
					<div className="divide-border mt-6 divide-y">
						{services.map((service) => (
							<div key={service.n} className="py-6 first:pt-0 last:pb-0">
								<div className="flex items-start justify-between gap-6">
									<div className="min-w-0 space-y-2">
										<div className="text-muted-foreground flex items-center gap-2 text-xs">
											<span className="font-mono">{service.n}</span>
											<span className="opacity-40">·</span>
											<span className="font-medium uppercase tracking-wider">
												{service.title}
											</span>
										</div>
										<h3 className="text-foreground text-base font-bold tracking-tight">
											{service.headline}
										</h3>
										<p className="text-muted-foreground max-w-xl text-sm leading-relaxed">
											{service.desc}
										</p>
										<div className="flex flex-wrap gap-1.5 pt-1">
											{service.tags.map((tag) => (
												<span
													key={tag}
													className="bg-muted text-muted-foreground rounded px-2 py-0.5 font-mono text-[10px] font-medium">
													{tag}
												</span>
											))}
										</div>
									</div>
									<Link
										href={service.link.href}
										className="text-muted-foreground hover:text-foreground mt-5 hidden shrink-0 items-center gap-1 text-xs font-medium transition-colors sm:flex">
										{service.link.label}
										<ArrowRight className="h-3 w-3" />
									</Link>
								</div>
							</div>
						))}
					</div>
				</Container>
			</section>

			{/* Testimonials */}
			<section className="border-border border-t py-16 lg:py-20">
				<Container width="base">
					<h2 className="text-sm font-semibold uppercase tracking-wider">
						What Clients Say
					</h2>
					<div className="divide-border mt-6 divide-y">
						{testimonials.map((t) => (
							<div key={t.name} className="flex gap-4 py-6 first:pt-0 last:pb-0">
								<div className="relative h-10 w-10 shrink-0 overflow-hidden rounded-full">
									<Image
										src={t.image}
										alt={t.name}
										fill
										className="object-cover"
									/>
								</div>
								<div className="min-w-0 space-y-2">
									<p className="text-foreground text-sm leading-relaxed">
										&ldquo;{t.quote}&rdquo;
									</p>
									<p className="text-muted-foreground text-xs">
										<span className="text-foreground font-medium">{t.name}</span>
										{' · '}
										{t.role}
									</p>
								</div>
							</div>
						))}
					</div>
				</Container>
			</section>

			{/* Stack + Experience */}
			<section className="border-border border-t py-16 lg:py-20">
				<Container width="base">
					<div className="grid gap-12 sm:grid-cols-2">
						<div>
							<h2 className="text-sm font-semibold uppercase tracking-wider">
								Tech Stack
							</h2>
							<div className="mt-4 flex flex-wrap gap-1.5">
								{[
									'React',
									'Next.js',
									'TypeScript',
									'Node.js',
									'Tailwind CSS',
									'Sanity',
									'Vercel',
									'Claude & GPT-4',
								].map((tech) => (
									<span
										key={tech}
										className="border-border rounded-md border px-2.5 py-1 text-xs font-medium">
										{tech}
									</span>
								))}
							</div>
							<p className="text-muted-foreground mt-4 text-sm leading-relaxed">
								Production-ready solutions using battle-tested tools your team
								can maintain long-term.
							</p>
						</div>
						<div>
							<h2 className="text-sm font-semibold uppercase tracking-wider">
								Experience
							</h2>
							<div className="mt-4 flex flex-wrap gap-1.5">
								{[
									'Google',
									"O'Reilly",
									'Sentry',
									'HOKA',
									'egghead',
									'Test Double',
								].map((company) => (
									<span
										key={company}
										className="border-border rounded-md border px-2.5 py-1 text-xs font-medium">
										{company}
									</span>
								))}
							</div>
							<p className="text-muted-foreground mt-4 text-sm leading-relaxed">
								Enterprise-level expertise helping teams build better products
								and stronger engineering capabilities.
							</p>
						</div>
					</div>
				</Container>
			</section>

			{/* CTA */}
			<section className="border-border border-t py-16 lg:py-20">
				<Container width="base">
					<div className="flex flex-col items-start gap-4 sm:flex-row sm:items-center sm:justify-between">
						<div>
							<p className="text-foreground text-sm font-medium">
								Ready to work together?
							</p>
							<p className="text-muted-foreground text-sm">
								Let&apos;s discuss how I can help your team ship better software.
							</p>
						</div>
						<Link
							href="https://cal.com/laurosilvacom/chat"
							target="_blank"
							rel="noopener noreferrer"
							className="bg-primary text-primary-foreground hover:bg-primary/90 inline-flex shrink-0 items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium transition-colors">
							Schedule a call
							<ArrowUpRight className="h-3.5 w-3.5" />
						</Link>
					</div>
				</Container>
			</section>
		</>
	)
}
