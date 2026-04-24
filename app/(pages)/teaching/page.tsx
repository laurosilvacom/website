import Link from 'next/link'
import Image from 'next/image'
import Container from '@/shared/components/container'
import {ArrowRight} from 'lucide-react'
import {generatePageMetadata} from '@/shared/lib/metadata'

export const metadata = generatePageMetadata(
	'Teaching',
	"Workshops, courses, and corporate training on React, Next.js, TypeScript, and AI integration. Previously taught at O'Reilly and egghead.",
	{
		keywords: [
			'developer workshops',
			'React training',
			'Next.js workshops',
			'TypeScript training',
			'corporate developer training',
			'AI integration workshops',
			'developer education',
		],
		canonical: '/teaching',
	},
)

const platforms = [
	{
		name: "O'Reilly Media",
		domain: 'oreilly.com',
		type: 'Live Workshops',
		description:
			"Live, interactive workshops on React, TypeScript, and modern web development for O'Reilly's global engineering audience.",
	},
	{
		name: 'egghead.io',
		domain: 'egghead.io',
		type: 'Video Courses',
		description:
			'Concise, practical video courses on modern web development. Patterns and techniques developers can apply immediately.',
	},
]

const currentOfferings = [
	{
		title: 'Prompt Engineering for Everyone',
		description:
			'Practical techniques to get consistent, high-quality results from AI tools like ChatGPT, Claude, Copilot, and Cursor.',
		status: 'Available Now',
		href: '/workshops/prompt-engineering-for-everyone',
	},
]


export default function TeachingPage() {
	return (
		<>
			{/* Header */}
			<section className="pt-28 pb-12 lg:pt-32 lg:pb-16">
				<Container>
					<div className="space-y-4">
						<h1 className="text-2xl font-normal tracking-tight sm:text-3xl">
							Teaching
						</h1>
						<p className="text-muted-foreground text-base leading-relaxed">
							I help engineering teams improve delivery quality through practical training.
							From focused workshops to multi-week enablement programs.
						</p>
						<p className="text-muted-foreground text-sm leading-relaxed">
							If you&apos;re looking for individual self-paced learning, visit the{' '}
							<Link href="/workshops" className="text-foreground underline underline-offset-4">
								workshop library
							</Link>
							.
						</p>
					</div>
				</Container>
			</section>

			{/* Where I've Taught */}
			<section className="pb-16 lg:pb-20">
				<Container>
					<h2 className="text-foreground text-xs font-medium uppercase tracking-widest mb-6">
						Where I&apos;ve Taught
					</h2>
					<div className="space-y-1">
						{platforms.map((platform) => (
							<div
								key={platform.name}
								className="flex items-baseline justify-between gap-4 py-4">
								<div className="min-w-0 space-y-1">
									<span className="text-foreground flex items-center gap-2 text-sm font-medium">
										<Image
											src={`https://www.google.com/s2/favicons?domain=${platform.domain}&sz=64`}
											alt=""
											width={14}
											height={14}
											unoptimized
											className="h-3.5 w-3.5 rounded-sm opacity-50 grayscale"
										/>
										{platform.name}
									</span>
									<p className="text-muted-foreground text-xs">
										{platform.type} · {platform.description}
									</p>
								</div>
							</div>
						))}
					</div>
				</Container>
			</section>

			{/* Self-paced offerings */}
			{currentOfferings.length > 0 && (
				<section className="pb-16 lg:pb-20">
					<Container>
						<div className="mb-6 flex items-center justify-between">
							<h2 className="text-foreground text-xs font-medium uppercase tracking-widest">
								Self-paced Courses
							</h2>
							<Link
								href="/workshops"
								className="text-muted-foreground hover:text-foreground text-xs transition-colors">
								View all
							</Link>
						</div>
						<div className="space-y-1">
							{currentOfferings.map((offering) => (
								<Link
									key={offering.title}
									href={offering.href}
									className="group flex items-center justify-between gap-4 py-4 transition-opacity hover:opacity-70">
									<div className="min-w-0 space-y-1">
										<span className="text-foreground text-sm font-medium">
											{offering.title}
										</span>
										<p className="text-muted-foreground text-xs">
											{offering.description}
										</p>
									</div>
									<ArrowRight className="text-muted-foreground h-3.5 w-3.5 shrink-0 opacity-0 transition-opacity group-hover:opacity-100" />
								</Link>
							))}
						</div>
					</Container>
				</section>
			)}

			{/* Contact */}
			<section className="pb-16 lg:pb-20">
				<Container>
					<p className="text-muted-foreground text-sm">
						<a
							href="mailto:me@laurosilva.com"
							className="text-foreground underline underline-offset-4 transition-opacity hover:opacity-70">
							me@laurosilva.com
						</a>
						{' · '}
						<a
							href="https://cal.com/laurosilvacom/chat"
							target="_blank"
							rel="noopener noreferrer"
							className="text-foreground underline underline-offset-4 transition-opacity hover:opacity-70">
							Schedule a training conversation
						</a>
					</p>
				</Container>
			</section>
		</>
	)
}
