import Link from 'next/link'
import Image from 'next/image'
import Container from '@/components/container'
import {Button} from '@/components/ui/button'
import {ArrowRight} from 'lucide-react'
import {generatePageMetadata} from '@/lib/metadata'

export const metadata = generatePageMetadata(
	'Work',
	'Case studies and projects from my work with Google, O\'Reilly, Sentry, HOKA, egghead, and Test Double. Full-stack development, technical leadership, and developer education.',
	{
		keywords: [
			'case studies',
			'portfolio',
			'full-stack development',
			'technical consulting',
			'developer education',
			'React',
			'Next.js',
			'TypeScript'
		],
		canonical: '/work'
	}
)

const caseStudies = [
	{
		slug: 'google',
		client: 'Google',
		domain: 'google.com',
		title: 'Developer Education Platform',
		summary:
			'Built developer education content and tooling for Google, helping engineers learn and adopt modern web technologies at scale.',
		type: 'Development & Education',
		tags: ['React', 'TypeScript', 'Education', 'Content Engineering'],
		featured: true
	},
	{
		slug: 'oreilly',
		client: "O'Reilly",
		domain: 'oreilly.com',
		title: 'Live Technical Workshops',
		summary:
			'Designed and delivered live technical workshops on React, TypeScript, and modern web development for O\'Reilly\'s global engineering audience.',
		type: 'Developer Training',
		tags: ['Workshops', 'React', 'TypeScript', 'Instructional Design'],
		featured: true
	},
	{
		slug: 'sentry',
		client: 'Sentry',
		domain: 'sentry.io',
		title: 'Developer Experience & Education',
		summary:
			'Created developer education content and contributed to developer experience improvements for Sentry\'s error monitoring platform.',
		type: 'Development & Education',
		tags: ['Developer Experience', 'Education', 'React', 'TypeScript'],
		featured: true
	},
	{
		slug: 'hoka',
		client: 'HOKA',
		domain: 'hoka.com',
		title: 'Full-Stack Product Development',
		summary:
			'Led full-stack development for digital products at HOKA, building performant web experiences for one of the fastest-growing brands in running.',
		type: 'Full-Stack Development',
		tags: ['Next.js', 'Full-Stack', 'E-commerce', 'Performance'],
		featured: true
	},
	{
		slug: 'egghead',
		client: 'egghead',
		domain: 'egghead.io',
		title: 'Developer Courses at Scale',
		summary:
			'Created and published technical courses on modern web development, reaching thousands of developers through egghead\'s learning platform.',
		type: 'Developer Education',
		tags: ['Courses', 'React', 'TypeScript', 'Education'],
		featured: false
	},
	{
		slug: 'test-double',
		client: 'Test Double',
		domain: 'testdouble.com',
		title: 'Software Consulting & Team Augmentation',
		summary:
			'Provided senior engineering consulting and team augmentation, helping client teams ship better software and improve their development practices.',
		type: 'Consulting',
		tags: ['Consulting', 'Architecture', 'Team Augmentation', 'Best Practices'],
		featured: false
	}
]

export default function WorkPage() {
	const featured = caseStudies.filter((s) => s.featured)
	const other = caseStudies.filter((s) => !s.featured)

	return (
		<>
			{/* Hero */}
			<section className="relative flex min-h-[60vh] items-center justify-center px-4 pt-32 pb-20 lg:pt-40">
				<div className="mx-auto max-w-4xl text-center">
					<div className="animate-in fade-in slide-in-from-bottom-4 space-y-8 duration-1000">
						<h1 className="text-4xl leading-[1.05] font-bold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl">
							Work
						</h1>
						<p className="text-muted-foreground mx-auto max-w-2xl text-xl leading-relaxed sm:text-2xl">
							I&apos;ve helped companies like Google, O&apos;Reilly, Sentry,
							and HOKA ship products and level up their engineering teams.
							Here&apos;s a look at some of that work.
						</p>
					</div>
				</div>
			</section>

			{/* Featured Case Studies */}
			<section className="py-16 lg:py-24">
				<Container width="base">
					<div className="space-y-8">
						{featured.map((study) => (
							<Link
								key={study.slug}
								href={`/work/${study.slug}`}
								className="group block">
								<div className="border-border-subtle bg-card hover:border-border rounded-2xl border p-8 transition-all duration-200 lg:p-12">
									<div className="grid items-center gap-8 lg:grid-cols-12">
										<div className="space-y-4 lg:col-span-8">
											<div className="flex items-center gap-3">
												<Image
													src={`https://www.google.com/s2/favicons?domain=${study.domain}&sz=32`}
													alt={study.client}
													width={20}
													height={20}
													className="h-5 w-5"
												/>
												<span className="text-muted-foreground text-sm font-medium">
													{study.client}
												</span>
												<span className="text-muted-foreground text-sm">
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
														className="bg-muted text-muted-foreground rounded-full px-3 py-1 text-xs font-medium">
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
							<h2 className="text-2xl font-bold tracking-tight lg:text-3xl">
								More Work
							</h2>
							<div className="grid gap-8 md:grid-cols-2">
								{other.map((study) => (
									<Link
										key={study.slug}
										href={`/work/${study.slug}`}
										className="group block">
										<div className="border-border-subtle bg-card hover:border-border flex h-full flex-col rounded-2xl border p-8 transition-all duration-200">
											<div className="mb-4 flex items-center gap-2">
												<Image
													src={`https://www.google.com/s2/favicons?domain=${study.domain}&sz=32`}
													alt={study.client}
													width={16}
													height={16}
													className="h-4 w-4"
												/>
												<span className="text-muted-foreground text-sm font-medium">
													{study.client}
												</span>
											</div>
											<h3 className="mb-3 text-xl font-bold">
												{study.title}
											</h3>
											<p className="text-muted-foreground mb-6 grow text-base leading-relaxed">
												{study.summary}
											</p>
											<div className="flex flex-wrap gap-2">
												{study.tags.slice(0, 3).map((tag) => (
													<span
														key={tag}
														className="bg-muted text-muted-foreground rounded-full px-3 py-1 text-xs font-medium">
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

			{/* CTA */}
			<section className="py-24 lg:py-32">
				<Container width="base">
					<div className="bg-card border-border-subtle space-y-8 rounded-3xl border p-12 text-center lg:p-16">
						<div className="space-y-6">
							<h2 className="text-3xl font-bold tracking-tight lg:text-5xl">
								Want similar results?
							</h2>
							<p className="text-muted-foreground mx-auto max-w-2xl text-lg leading-relaxed lg:text-xl">
								I help companies ship better software and build stronger
								engineering teams. Let&apos;s talk about what you need.
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
