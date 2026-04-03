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
		href: '/work/oreilly',
	},
	{
		name: 'egghead.io',
		domain: 'egghead.io',
		type: 'Video Courses',
		description:
			'Concise, practical video courses on modern web development. Patterns and techniques developers can apply immediately.',
		href: '/work/egghead',
	},
]

const workshopTopics = [
	{
		title: 'React & Next.js',
		level: 'Beginner to Advanced',
		desc: 'Server components, app router, data fetching, caching, production architecture.',
	},
	{
		title: 'TypeScript for Teams',
		level: 'Intermediate to Advanced',
		desc: 'Type-safe APIs, generics, utility types, migration strategies.',
	},
	{
		title: 'AI Integration',
		level: 'Intermediate',
		desc: 'Claude, GPT-4, prompt engineering, API patterns, production best practices.',
	},
	{
		title: 'Architecture & System Design',
		level: 'Senior',
		desc: 'Monorepos, micro-frontends, API design, scaling patterns.',
	},
	{
		title: 'Testing Strategies',
		level: 'Intermediate to Advanced',
		desc: 'Unit, integration, E2E testing. Building a testing culture that sticks.',
	},
	{
		title: 'Developer Experience',
		level: 'All Levels',
		desc: 'Workflows, tooling, CI/CD, code review practices.',
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
			<section className="pt-32 pb-16 lg:pt-36 lg:pb-20">
				<Container>
					<div className="space-y-4">
						<h1 className="font-serif text-4xl leading-[1.08] font-bold tracking-tight sm:text-5xl lg:text-6xl">
							Teaching
						</h1>
						<p className="text-muted-foreground text-base leading-relaxed">
							I teach engineering teams to build better software. From half-day
							workshops to multi-week programs. Previously at O&apos;Reilly and
							egghead.
						</p>
					</div>
				</Container>
			</section>

			{/* Current Offerings */}
			{currentOfferings.length > 0 && (
				<section className="pb-12 lg:pb-16">
					<Container>
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

			{/* Where I've Taught */}
			<section className="pb-12 lg:pb-16">
				<Container>
					<h2 className="text-foreground mb-4 text-sm font-semibold">
						Where I&apos;ve Taught
					</h2>
					<div className="space-y-1">
						{platforms.map((platform) => (
							<Link
								key={platform.name}
								href={platform.href}
								className="group flex items-center justify-between gap-4 py-4 transition-opacity hover:opacity-70">
								<div className="min-w-0 space-y-1">
									<span className="text-foreground flex items-center gap-2 text-sm font-medium">
										<Image
											src={`https://www.google.com/s2/favicons?domain=${platform.domain}&sz=64`}
											alt=""
											width={14}
											height={14}
											unoptimized
											className="h-3.5 w-3.5 rounded-sm opacity-50 grayscale group-hover:opacity-100 group-hover:grayscale-0"
										/>
										{platform.name}
									</span>
									<p className="text-muted-foreground text-xs">
										{platform.type} · {platform.description}
									</p>
								</div>
								<ArrowRight className="text-muted-foreground h-3.5 w-3.5 shrink-0 opacity-0 transition-opacity group-hover:opacity-100" />
							</Link>
						))}
					</div>
				</Container>
			</section>

			{/* Topics */}
			<section className="pb-16 lg:pb-20">
				<Container>
					<h2 className="text-foreground mb-4 text-sm font-semibold">
						Workshop Topics
					</h2>
					<div className="space-y-1">
						{workshopTopics.map((topic) => (
							<div
								key={topic.title}
								className="flex items-baseline justify-between gap-4 py-3">
								<div className="min-w-0">
									<span className="text-foreground text-sm font-medium">
										{topic.title}
									</span>
									<p className="text-muted-foreground text-xs">{topic.desc}</p>
								</div>
								<span className="text-muted-foreground shrink-0 font-mono text-xs">
									{topic.level}
								</span>
							</div>
						))}
					</div>
				</Container>
			</section>
		</>
	)
}
