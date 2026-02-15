import {ArrowUpRight} from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import Container from '@/shared/components/container'
import {generatePageMetadata} from '@/shared/lib/metadata'

export const metadata = generatePageMetadata(
	'Services',
	"Full-stack development, technical leadership, and developer training. React, Next.js, TypeScript. Previously with Google, O'Reilly, Sentry.",
	{
		keywords: [
			'full-stack development',
			'technical consulting',
			'developer training',
			'React workshops',
			'Next.js consulting',
			'TypeScript training',
		],
		canonical: '/services',
	},
)

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
							Work with me
						</h1>
						<p className="text-muted-foreground max-w-xl text-lg leading-relaxed">
							I take on a small number of projects at a time.
						</p>
					</div>
				</Container>
			</section>

			{/* What I Do — stated, not pitched */}
			<section className="border-border border-t py-16 lg:py-20">
				<Container width="base">
					<div className="divide-border divide-y">
						{[
							{
								title: 'Development',
								desc: 'Production software with your team. React, Next.js, TypeScript, Node.js.',
								href: '/work',
							},
							{
								title: 'Leadership',
								desc: 'Architecture reviews, technical strategy, code audits.',
								href: '/work',
							},
							{
								title: 'Training',
								desc: 'Workshops for engineering teams. React, TypeScript, AI.',
								href: '/teaching',
							},
						].map((item) => (
							<Link
								key={item.title}
								href={item.href}
								className="group flex items-center justify-between gap-6 py-5 transition-opacity hover:opacity-70">
								<div className="min-w-0">
									<span className="text-foreground text-sm font-medium">
										{item.title}
									</span>
									<p className="text-muted-foreground text-xs">
										{item.desc}
									</p>
								</div>
								<ArrowUpRight className="text-muted-foreground h-3.5 w-3.5 shrink-0 opacity-0 transition-opacity group-hover:opacity-100" />
							</Link>
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
						</div>
						<div>
							<h2 className="text-sm font-semibold uppercase tracking-wider">
								Previously
							</h2>
							<div className="mt-4 flex flex-wrap gap-1.5">
								{[
									{name: 'Google', domain: 'google.com'},
									{name: "O'Reilly", domain: 'oreilly.com'},
									{name: 'Sentry', domain: 'sentry.io'},
									{name: 'HOKA', domain: 'hoka.com'},
									{name: 'egghead', domain: 'egghead.io'},
									{name: 'Test Double', domain: 'testdouble.com'},
								].map((company) => (
									<span
										key={company.name}
										className="group border-border flex items-center gap-1.5 rounded-md border px-2.5 py-1 text-xs font-medium">
										<Image
											src={`https://www.google.com/s2/favicons?domain=${company.domain}&sz=64`}
											alt=""
											width={12}
											height={12}
											unoptimized
											className="h-3 w-3 rounded-sm opacity-50 grayscale group-hover:opacity-100 group-hover:grayscale-0"
										/>
										{company.name}
									</span>
								))}
							</div>
						</div>
					</div>
				</Container>
			</section>

			{/* Contact — quiet, one line */}
			<section className="border-border border-t py-16 lg:py-20">
				<Container width="base">
					<p className="text-muted-foreground text-sm">
						<a
							href="mailto:hello@laurosilva.com"
							className="text-foreground underline underline-offset-4 transition-opacity hover:opacity-70">
							hello@laurosilva.com
						</a>
						{' · '}
						<a
							href="https://cal.com/laurosilvacom/chat"
							target="_blank"
							rel="noopener noreferrer"
							className="text-foreground underline underline-offset-4 transition-opacity hover:opacity-70">
							Schedule a conversation
						</a>
					</p>
				</Container>
			</section>
		</>
	)
}
