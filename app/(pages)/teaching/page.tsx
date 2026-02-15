import Link from 'next/link'
import Container from '@/shared/components/container'
import {ArrowRight, ArrowUpRight} from 'lucide-react'
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
		type: 'Live Workshops',
		description:
			"Live, interactive workshops on React, TypeScript, and modern web development for O'Reilly's global engineering audience.",
		href: '/work/oreilly',
	},
	{
		name: 'egghead.io',
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
			<section className="pt-40 pb-20 lg:pt-48 lg:pb-24">
				<Container width="base">
					<div className="animate-in fade-in slide-in-from-bottom-4 max-w-2xl space-y-4 duration-1000">
						<h1 className="text-4xl leading-[1.08] font-bold tracking-tight sm:text-5xl lg:text-6xl">
							Teaching
						</h1>
						<p className="text-muted-foreground max-w-xl text-lg leading-relaxed">
							I teach engineering teams to build better software. From half-day
							workshops to multi-week programs. Previously at O&apos;Reilly and
							egghead.
						</p>
						<div className="flex items-center gap-4 pt-2">
							<Link
								href="https://cal.com/laurosilvacom/chat"
								target="_blank"
								rel="noopener noreferrer"
								className="bg-primary text-primary-foreground hover:bg-primary/90 inline-flex items-center gap-2 rounded-lg px-4 py-2.5 text-sm font-medium transition-colors">
								Book training
								<ArrowUpRight className="h-3.5 w-3.5" />
							</Link>
							<Link
								href="/workshops/prompt-engineering-for-everyone"
								className="text-muted-foreground hover:text-foreground inline-flex items-center gap-1.5 text-sm font-medium transition-colors">
								Current workshop
								<ArrowRight className="h-3.5 w-3.5" />
							</Link>
						</div>
					</div>
				</Container>
			</section>

			{/* Formats */}
			<section className="border-border border-y">
				<Container width="base">
					<div className="grid grid-cols-3 divide-x divide-border">
						{[
							{label: 'Half-day', value: 'Workshop'},
							{label: 'Multi-day', value: 'Intensive'},
							{label: 'Ongoing', value: 'Mentorship'},
						].map((item) => (
							<div key={item.label} className="px-4 py-5 first:pl-0 sm:px-6">
								<p className="text-foreground text-sm font-semibold">{item.value}</p>
								<p className="text-muted-foreground text-xs">{item.label}</p>
							</div>
						))}
					</div>
				</Container>
			</section>

			{/* Current Offerings */}
			{currentOfferings.length > 0 && (
				<section className="py-16 lg:py-20">
					<Container width="base">
						<h2 className="text-sm font-semibold uppercase tracking-wider">
							Available Now
						</h2>
						<div className="divide-border mt-4 divide-y">
							{currentOfferings.map((offering) => (
								<Link
									key={offering.title}
									href={offering.href}
									className="group flex items-center justify-between gap-4 py-4 transition-opacity hover:opacity-70">
									<div className="min-w-0 space-y-1">
										<div className="flex items-center gap-2">
											<span className="text-foreground text-sm font-medium">
												{offering.title}
											</span>
											<span className="bg-primary/10 text-primary rounded-full px-2 py-0.5 text-[10px] font-medium">
												{offering.status}
											</span>
										</div>
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
			<section className="border-border border-t py-16 lg:py-20">
				<Container width="base">
					<h2 className="text-sm font-semibold uppercase tracking-wider">
						Where I&apos;ve Taught
					</h2>
					<div className="divide-border mt-4 divide-y">
						{platforms.map((platform) => (
							<Link
								key={platform.name}
								href={platform.href}
								className="group flex items-center justify-between gap-4 py-4 transition-opacity hover:opacity-70">
								<div className="min-w-0 space-y-1">
									<span className="text-foreground text-sm font-medium">
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
			<section className="border-border border-t py-16 lg:py-20">
				<Container width="base">
					<h2 className="text-sm font-semibold uppercase tracking-wider">
						Workshop Topics
					</h2>
					<p className="text-muted-foreground mt-1 max-w-lg text-sm">
						Every workshop is customized to your team&apos;s needs. These are
						the areas I cover.
					</p>
					<div className="divide-border mt-6 divide-y">
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
								<span className="text-muted-foreground shrink-0 font-mono text-[10px]">
									{topic.level}
								</span>
							</div>
						))}
					</div>
				</Container>
			</section>

			{/* How It Works */}
			<section className="border-border border-t py-16 lg:py-20">
				<Container width="base">
					<h2 className="text-sm font-semibold uppercase tracking-wider">
						How It Works
					</h2>
					<div className="mt-6 grid gap-8 sm:grid-cols-3">
						{[
							{
								n: '01',
								title: 'Discovery',
								desc: "We discuss your team's skills, codebase, and goals. I design the workshop around your specific context.",
							},
							{
								n: '02',
								title: 'Delivery',
								desc: 'Hands-on workshops where your team builds real things. Practical exercises, not slides and lectures.',
							},
							{
								n: '03',
								title: 'Follow-Up',
								desc: 'Post-workshop support — questions, code reviews, and guidance as your team applies what they learned.',
							},
						].map((step) => (
							<div key={step.n} className="space-y-2">
								<span className="text-muted-foreground font-mono text-[10px]">
									{step.n}
								</span>
								<h3 className="text-foreground text-sm font-semibold">{step.title}</h3>
								<p className="text-muted-foreground text-xs leading-relaxed">
									{step.desc}
								</p>
							</div>
						))}
					</div>
				</Container>
			</section>

			{/* CTA */}
			<section className="border-border border-t py-16 lg:py-20">
				<Container width="base">
					<div className="flex flex-col items-start gap-4 sm:flex-row sm:items-center sm:justify-between">
						<div>
							<p className="text-foreground text-sm font-medium">
								Level up your engineering team
							</p>
							<p className="text-muted-foreground text-sm">
								From half-day workshops to week-long intensives.
							</p>
						</div>
						<Link
							href="https://cal.com/laurosilvacom/chat"
							target="_blank"
							rel="noopener noreferrer"
							className="bg-primary text-primary-foreground hover:bg-primary/90 inline-flex shrink-0 items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium transition-colors">
							Book training
							<ArrowUpRight className="h-3.5 w-3.5" />
						</Link>
					</div>
				</Container>
			</section>
		</>
	)
}
