import Link from 'next/link'
import Container from '@/shared/components/container'
import {ArrowRight} from 'lucide-react'
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
			<section className="pt-40 pb-24 lg:pt-48 lg:pb-40">
				<Container width="base">
					<div className="animate-in fade-in slide-in-from-bottom-4 space-y-8 duration-1000">
						<h1 className="text-4xl leading-[1.05] font-bold tracking-tight sm:text-5xl lg:text-6xl">
							Work
						</h1>
						<p className="text-muted-foreground max-w-2xl text-xl leading-relaxed sm:text-2xl">
							I&apos;ve helped companies like Google, O&apos;Reilly, Sentry, and HOKA ship
							products and level up their engineering teams.
						</p>
					</div>
				</Container>
			</section>

			{/* Featured Case Studies */}
			<section className="py-16 lg:py-24">
				<Container width="base">
					<div className="space-y-8">
						{featured.map((study) => (
							<Link key={study.slug} href={`/work/${study.slug}`} className="group block">
								<div className="border-border-subtle bg-card hover:border-border rounded-2xl border p-8 transition-all duration-200 lg:p-12">
									<div className="grid items-center gap-8 lg:grid-cols-12">
										<div className="space-y-4 lg:col-span-8">
											<div className="flex items-center gap-2">
												<span className="text-muted-foreground text-sm font-medium">
													{study.client}
												</span>
												<span className="text-muted-foreground text-sm opacity-40">
													·
												</span>
												<span className="text-muted-foreground text-sm">
													{study.type}
												</span>
											</div>
											<h2 className="text-2xl font-bold tracking-tight lg:text-3xl">
												{study.title}
											</h2>
											<p className="text-muted-foreground max-w-2xl text-lg leading-relaxed">
												{study.summary}
											</p>
											<div className="flex flex-wrap gap-2 pt-2">
												{study.tags.map((tag) => (
													<span
														key={tag}
														className="bg-muted text-muted-foreground rounded-full px-3 py-1 font-mono text-xs font-medium">
														{tag}
													</span>
												))}
											</div>
										</div>
										<div className="flex lg:col-span-4 lg:justify-end">
											<span className="text-muted-foreground group-hover:text-foreground flex items-center text-sm font-medium transition-colors">
												View case study
												<ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
											</span>
										</div>
									</div>
								</div>
							</Link>
						))}
					</div>
				</Container>
			</section>

			{/* Other Work */}
			{other.length > 0 && (
				<section className="py-16 lg:py-24">
					<Container width="base">
						<div className="space-y-12">
							<h2 className="text-2xl font-bold tracking-tight lg:text-3xl">More Work</h2>
							<div className="grid gap-8 md:grid-cols-2">
								{other.map((study) => (
									<Link
										key={study.slug}
										href={`/work/${study.slug}`}
										className="group block">
										<div className="border-border-subtle bg-card hover:border-border flex h-full flex-col rounded-2xl border p-8 transition-all duration-200">
											<div className="mb-4">
												<span className="text-muted-foreground text-sm font-medium">
													{study.client}
												</span>
											</div>
											<h3 className="mb-3 text-xl font-bold">{study.title}</h3>
											<p className="text-muted-foreground mb-6 grow text-base leading-relaxed">
												{study.summary}
											</p>
											<div className="flex flex-wrap gap-2">
												{study.tags.slice(0, 3).map((tag) => (
													<span
														key={tag}
														className="bg-muted text-muted-foreground rounded-full px-3 py-1 font-mono text-xs font-medium">
														{tag}
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
			)}
		</>
	)
}
