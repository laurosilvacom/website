import Link from 'next/link'
import Container from '@/components/container'
import {Button} from '@/components/ui/button'
import {ArrowRight, ExternalLink} from 'lucide-react'
import {generatePageMetadata} from '@/lib/metadata'

export const metadata = generatePageMetadata(
	'Teaching',
	'Workshops, courses, and corporate training on React, Next.js, TypeScript, and AI integration. Previously taught at O\'Reilly and egghead.',
	{
		keywords: [
			'developer workshops',
			'React training',
			'Next.js workshops',
			'TypeScript training',
			'corporate developer training',
			'AI integration workshops',
			'developer education'
		],
		canonical: '/teaching'
	}
)

const platforms = [
	{
		name: "O'Reilly Media",
		type: 'Live Workshops',
		description:
			'Designed and delivered live, interactive workshops on React, TypeScript, and modern web development to O\'Reilly\'s global audience of professional engineers.',
		topics: ['React Fundamentals', 'Advanced TypeScript', 'Modern Web Development'],
		href: '/work/oreilly'
	},
	{
		name: 'egghead.io',
		type: 'Video Courses',
		description:
			'Created concise, practical video courses on modern web development. Focused on patterns and techniques developers can apply immediately in production.',
		topics: ['React Patterns', 'TypeScript', 'Web Development'],
		href: '/work/egghead'
	}
]

const workshopTopics = [
	{
		title: 'React & Next.js',
		description:
			'From fundamentals to advanced patterns. Server components, app router, data fetching, caching strategies, and production architecture.',
		level: 'Beginner to Advanced'
	},
	{
		title: 'TypeScript for Teams',
		description:
			'Practical TypeScript patterns that improve code quality and developer experience. Type-safe APIs, generics, utility types, and migration strategies.',
		level: 'Intermediate to Advanced'
	},
	{
		title: 'AI Integration',
		description:
			'How to integrate AI tools like Claude and GPT-4 into existing applications. Prompt engineering, API patterns, and production best practices.',
		level: 'Intermediate'
	},
	{
		title: 'Architecture & System Design',
		description:
			'How to structure applications that scale. Monorepos, micro-frontends, API design, and the patterns that make large codebases manageable.',
		level: 'Senior'
	},
	{
		title: 'Testing Strategies',
		description:
			'Practical testing that actually catches bugs. Unit tests, integration tests, E2E testing, and how to build a testing culture that sticks.',
		level: 'Intermediate to Advanced'
	},
	{
		title: 'Developer Experience',
		description:
			'Improve your team\'s development workflows, tooling, CI/CD pipelines, and code review practices to ship faster with more confidence.',
		level: 'All Levels'
	}
]

const currentOfferings = [
	{
		title: 'Prompt Engineering for Everyone',
		description:
			'Practical techniques to get consistent, high-quality results from AI tools like ChatGPT, Claude, Copilot, and Cursor — without guessing, hype, or trial and error.',
		status: 'Available Now',
		href: '/workshops/prompt-engineering-for-everyone'
	}
]

export default function TeachingPage() {
	return (
		<>
			{/* Hero */}
			<section className="px-4 pt-32 pb-12 lg:pt-40 lg:pb-16">
				<div className="mx-auto max-w-4xl text-center">
					<div className="animate-in fade-in slide-in-from-bottom-4 space-y-6 duration-1000">
						<h1 className="text-4xl leading-[1.05] font-bold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl">
							Workshops & Training
						</h1>
						<p className="text-muted-foreground mx-auto max-w-2xl text-xl leading-relaxed sm:text-2xl">
							I teach engineering teams to build better software. From half-day
							workshops to multi-week training programs. Previously taught at
							O&apos;Reilly and egghead.
						</p>
						<div className="flex flex-wrap items-center justify-center gap-4 pt-4">
							<Button asChild size="lg" className="group">
								<Link
									href="https://cal.com/laurosilvacom/chat"
									target="_blank"
									rel="noopener noreferrer">
									Book training for your team
									<ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
								</Link>
							</Button>
						</div>
					</div>
				</div>
			</section>

			{/* Current Offerings */}
			{currentOfferings.length > 0 && (
				<section className="py-16 lg:py-24">
					<Container width="base">
						<div className="space-y-12">
							<div className="space-y-4">
								<div className="inline-flex items-center gap-2">
									<div className="bg-primary h-2 w-2 rounded-full" />
									<span className="text-muted-foreground font-mono text-xs font-medium tracking-wide uppercase">
										Current Offerings
									</span>
								</div>
								<h2 className="text-2xl font-bold tracking-tight lg:text-3xl">
									Available Now
								</h2>
							</div>

							{currentOfferings.map((offering) => (
								<Link
									key={offering.title}
									href={offering.href}
									className="group block">
									<div className="border-border bg-card hover:border-primary/50 rounded-2xl border p-8 transition-all duration-200 lg:p-12">
										<div className="flex items-start justify-between gap-8">
											<div className="space-y-4">
												<div className="inline-flex">
													<span className="bg-primary/10 text-primary rounded-full px-3 py-1 text-xs font-medium">
														{offering.status}
													</span>
												</div>
												<h3 className="text-2xl font-bold lg:text-3xl">
													{offering.title}
												</h3>
												<p className="text-muted-foreground max-w-2xl text-lg leading-relaxed">
													{offering.description}
												</p>
											</div>
											<ArrowRight className="text-muted-foreground group-hover:text-foreground mt-2 h-5 w-5 shrink-0 transition-all group-hover:translate-x-1" />
										</div>
									</div>
								</Link>
							))}
						</div>
					</Container>
				</section>
			)}

			{/* Past Teaching Work */}
			<section className="bg-muted/30 py-24 lg:py-32">
				<Container width="base">
					<div className="space-y-12">
						<div className="space-y-4">
							<div className="inline-flex items-center gap-2">
								<div className="bg-primary h-2 w-2 rounded-full" />
								<span className="text-muted-foreground font-mono text-xs font-medium tracking-wide uppercase">
									Teaching Experience
								</span>
							</div>
							<h2 className="text-2xl font-bold tracking-tight lg:text-3xl">
								Where I&apos;ve Taught
							</h2>
						</div>

						<div className="grid gap-8 md:grid-cols-2">
							{platforms.map((platform) => (
								<Link
									key={platform.name}
									href={platform.href}
									className="group block">
									<div className="border-border bg-card hover:border-border flex h-full flex-col rounded-2xl border p-8 transition-all duration-200">
										<div className="mb-2 flex items-center justify-between">
											<span className="text-muted-foreground text-sm font-medium">
												{platform.type}
											</span>
											<ExternalLink className="text-muted-foreground h-4 w-4" />
										</div>
										<h3 className="mb-3 text-xl font-bold">
											{platform.name}
										</h3>
										<p className="text-muted-foreground mb-6 grow text-base leading-relaxed">
											{platform.description}
										</p>
										<div className="flex flex-wrap gap-2">
											{platform.topics.map((topic) => (
												<span
													key={topic}
													className="bg-muted text-muted-foreground font-mono rounded-full px-3 py-1 text-xs font-medium">
													{topic}
												</span>
											))}
										</div>
									</div>
								</Link>
							))}
						</div>
					</div>
				</Container>
			</section>

			{/* Topics Available */}
			<section className="py-24 lg:py-32">
				<Container width="base">
					<div className="space-y-12">
						<div className="space-y-4">
							<div className="inline-flex items-center gap-2">
								<div className="bg-primary h-2 w-2 rounded-full" />
								<span className="text-muted-foreground font-mono text-xs font-medium tracking-wide uppercase">
									Workshop Topics
								</span>
							</div>
							<h2 className="text-2xl font-bold tracking-tight lg:text-3xl">
								What I Can Teach Your Team
							</h2>
							<p className="text-muted-foreground max-w-2xl text-lg leading-relaxed">
								Every workshop is customized to your team&apos;s specific
								needs, codebase, and skill level. Here are the topics I cover.
							</p>
						</div>

						<div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
							{workshopTopics.map((topic) => (
								<div
									key={topic.title}
									className="border-border bg-card space-y-4 rounded-2xl border p-8">
									<div className="space-y-2">
										<h3 className="text-lg font-bold">{topic.title}</h3>
										<span className="text-muted-foreground text-xs font-medium">
											{topic.level}
										</span>
									</div>
									<p className="text-muted-foreground text-sm leading-relaxed">
										{topic.description}
									</p>
								</div>
							))}
						</div>
					</div>
				</Container>
			</section>

			{/* How It Works */}
			<section className="bg-muted/30 py-24 lg:py-32">
				<Container width="base">
					<div className="space-y-12">
						<div className="space-y-4">
							<h2 className="text-2xl font-bold tracking-tight lg:text-3xl">
								How Corporate Training Works
							</h2>
						</div>

						<div className="grid gap-8 md:grid-cols-3">
							<div className="space-y-4">
								<span className="text-muted-foreground font-mono text-xs font-medium">
									01
								</span>
								<h3 className="text-lg font-bold">Discovery</h3>
								<p className="text-muted-foreground text-base leading-relaxed">
									We talk about your team&apos;s current skills, your codebase,
									and what you want to achieve. I design the workshop around
									your specific context.
								</p>
							</div>

							<div className="space-y-4">
								<span className="text-muted-foreground font-mono text-xs font-medium">
									02
								</span>
								<h3 className="text-lg font-bold">Delivery</h3>
								<p className="text-muted-foreground text-base leading-relaxed">
									Hands-on workshops where your team builds real things. Not
									slides and lectures — practical exercises using patterns they
									can apply to your actual codebase.
								</p>
							</div>

							<div className="space-y-4">
								<span className="text-muted-foreground font-mono text-xs font-medium">
									03
								</span>
								<h3 className="text-lg font-bold">Follow-Up</h3>
								<p className="text-muted-foreground text-base leading-relaxed">
									After the workshop, I provide follow-up support to help your
									team apply what they learned. Questions, code reviews, and
									guidance as they put it into practice.
								</p>
							</div>
						</div>
					</div>
				</Container>
			</section>

			{/* CTA */}
			<section className="py-24 lg:py-32">
				<Container width="narrow">
					<div className="space-y-6 text-center">
						<h2 className="text-2xl font-bold tracking-tight lg:text-3xl">
							Level up your engineering team
						</h2>
						<p className="text-muted-foreground mx-auto max-w-xl text-lg leading-relaxed">
							From half-day workshops to week-long intensives.{' '}
							<a
								href="https://cal.com/laurosilvacom/chat"
								target="_blank"
								rel="noopener noreferrer"
								className="text-foreground underline underline-offset-4 transition-colors hover:opacity-70">
								Book training for your team
							</a>
						</p>
					</div>
				</Container>
			</section>
		</>
	)
}
