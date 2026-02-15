import Link from 'next/link'
import Container from '@/shared/components/container'
import {ArrowRight, ArrowUpRight} from 'lucide-react'
import {generatePageMetadata} from '@/shared/lib/metadata'

export const metadata = generatePageMetadata(
	'Work',
	"Case studies and projects from my work with Google, O'Reilly, Sentry, HOKA, egghead, and Test Double. Full-stack development, technical leadership, and developer education.",
	{
		keywords: [
			'case studies',
			'portfolio',
			'full-stack development',
			'technical consulting',
			'developer education',
			'React',
			'Next.js',
			'TypeScript',
		],
		canonical: '/work',
	},
)

const caseStudies = [
	{
		slug: 'google',
		client: 'Google',
		title: 'Developer Education Platform',
		summary:
			'Built developer education content and tooling for Google, helping engineers learn and adopt modern web technologies at scale.',
		type: 'Development & Education',
		tags: ['React', 'TypeScript', 'Education', 'Content Engineering'],
		featured: true,
	},
	{
		slug: 'oreilly',
		client: "O'Reilly",
		title: 'Live Technical Workshops',
		summary:
			"Designed and delivered live technical workshops on React, TypeScript, and modern web development for O'Reilly's global engineering audience.",
		type: 'Developer Training',
		tags: ['Workshops', 'React', 'TypeScript', 'Instructional Design'],
		featured: true,
	},
	{
		slug: 'sentry',
		client: 'Sentry',
		title: 'Developer Experience & Education',
		summary:
			"Created developer education content and contributed to developer experience improvements for Sentry's error monitoring platform.",
		type: 'Development & Education',
		tags: ['Developer Experience', 'Education', 'React', 'TypeScript'],
		featured: true,
	},
	{
		slug: 'hoka',
		client: 'HOKA',
		title: 'Full-Stack Product Development',
		summary:
			'Led full-stack development for digital products at HOKA, building performant web experiences for one of the fastest-growing brands in running.',
		type: 'Full-Stack Development',
		tags: ['Next.js', 'Full-Stack', 'E-commerce', 'Performance'],
		featured: true,
	},
	{
		slug: 'egghead',
		client: 'egghead',
		title: 'Developer Courses at Scale',
		summary:
			"Created and published technical courses on modern web development, reaching thousands of developers through egghead's learning platform.",
		type: 'Developer Education',
		tags: ['Courses', 'React', 'TypeScript', 'Education'],
		featured: false,
	},
	{
		slug: 'test-double',
		client: 'Test Double',
		title: 'Software Consulting & Team Augmentation',
		summary:
			'Provided senior engineering consulting and team augmentation, helping client teams ship better software and improve their development practices.',
		type: 'Consulting',
		tags: ['Consulting', 'Architecture', 'Team Augmentation', 'Best Practices'],
		featured: false,
	},
]

export default function WorkPage() {
	const featured = caseStudies.filter((s) => s.featured)
	const other = caseStudies.filter((s) => !s.featured)

	return (
		<>
			{/* Header */}
			<section className="pt-40 pb-20 lg:pt-48 lg:pb-24">
				<Container width="base">
					<div className="animate-in fade-in slide-in-from-bottom-4 max-w-2xl space-y-4 duration-1000">
						<h1 className="text-4xl leading-[1.08] font-bold tracking-tight sm:text-5xl lg:text-6xl">
							Work
						</h1>
						<p className="text-muted-foreground max-w-xl text-lg leading-relaxed">
							I&apos;ve helped companies like Google, O&apos;Reilly, Sentry,
							and HOKA ship products and level up their engineering teams.
						</p>
					</div>
				</Container>
			</section>

			{/* Stats */}
			<section className="border-border border-y">
				<Container width="base">
					<div className="grid grid-cols-2 divide-x divide-border sm:grid-cols-4">
						{[
							{label: 'Clients', value: '6+'},
							{label: 'Years', value: '8+'},
							{label: 'Focus', value: 'Full-Stack'},
							{label: 'Stack', value: 'React / Next.js'},
						].map((stat) => (
							<div key={stat.label} className="px-4 py-5 first:pl-0 sm:px-6">
								<p className="text-foreground text-sm font-semibold">{stat.value}</p>
								<p className="text-muted-foreground text-xs">{stat.label}</p>
							</div>
						))}
					</div>
				</Container>
			</section>

			{/* Featured Case Studies */}
			<section className="py-16 lg:py-20">
				<Container width="base">
					<h2 className="text-sm font-semibold uppercase tracking-wider">
						Featured
					</h2>
					<div className="mt-6 space-y-4">
						{featured.map((study) => (
							<Link
								key={study.slug}
								href={`/work/${study.slug}`}
								className="group block">
								<div className="border-border hover:bg-muted/40 rounded-xl border p-6 transition-all duration-200 lg:p-8">
									<div className="flex items-start justify-between gap-6">
										<div className="min-w-0 space-y-3">
											<div className="text-muted-foreground flex items-center gap-2 text-xs">
												<span className="font-medium">{study.client}</span>
												<span className="opacity-40">·</span>
												<span>{study.type}</span>
											</div>
											<h3 className="text-foreground text-lg font-bold tracking-tight">
												{study.title}
											</h3>
											<p className="text-muted-foreground max-w-xl text-sm leading-relaxed">
												{study.summary}
											</p>
											<div className="flex flex-wrap gap-1.5 pt-1">
												{study.tags.map((tag) => (
													<span
														key={tag}
														className="bg-muted text-muted-foreground rounded px-2 py-0.5 font-mono text-[10px] font-medium">
														{tag}
													</span>
												))}
											</div>
										</div>
										<ArrowRight className="text-muted-foreground mt-1 h-4 w-4 shrink-0 opacity-0 transition-opacity group-hover:opacity-100" />
									</div>
								</div>
							</Link>
						))}
					</div>
				</Container>
			</section>

			{/* Other Work */}
			{other.length > 0 && (
				<section className="border-border border-t py-16 lg:py-20">
					<Container width="base">
						<h2 className="text-sm font-semibold uppercase tracking-wider">
							More Work
						</h2>
						<div className="divide-border mt-4 divide-y">
							{other.map((study) => (
								<Link
									key={study.slug}
									href={`/work/${study.slug}`}
									className="group flex items-center justify-between gap-4 py-4 transition-opacity hover:opacity-70">
									<div className="min-w-0">
										<span className="text-foreground text-sm font-medium">
											{study.title}
										</span>
										<p className="text-muted-foreground text-xs">
											{study.client} · {study.type}
										</p>
									</div>
									<ArrowRight className="text-muted-foreground h-3.5 w-3.5 shrink-0 opacity-0 transition-opacity group-hover:opacity-100" />
								</Link>
							))}
						</div>
					</Container>
				</section>
			)}

			{/* CTA */}
			<section className="border-border border-t py-16 lg:py-20">
				<Container width="base">
					<div className="flex flex-col items-start gap-4 sm:flex-row sm:items-center sm:justify-between">
						<div>
							<p className="text-foreground text-sm font-medium">
								Interested in working together?
							</p>
							<p className="text-muted-foreground text-sm">
								I&apos;m available for new development engagements and technical consulting.
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
