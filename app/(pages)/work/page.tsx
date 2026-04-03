import Link from 'next/link'
import Image from 'next/image'
import Container from '@/shared/components/container'
import {ArrowRight, ArrowUpRight} from 'lucide-react'
import {generatePageMetadata} from '@/shared/lib/metadata'

export const metadata = generatePageMetadata(
	'Work',
	"Full-stack development, technical leadership, and developer training. Case studies from Google, O'Reilly, Sentry, HOKA, egghead, and Test Double.",
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
		domain: 'google.com',
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
		domain: 'oreilly.com',
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
		domain: 'sentry.io',
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
		domain: 'hoka.com',
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
		domain: 'egghead.io',
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
		domain: 'testdouble.com',
		title: 'Software Consulting & Team Augmentation',
		summary:
			'Provided senior engineering consulting and team augmentation, helping client teams ship better software and improve their development practices.',
		type: 'Consulting',
		tags: ['Consulting', 'Architecture', 'Team Augmentation', 'Best Practices'],
		featured: false,
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

export default function WorkPage() {
	const featured = caseStudies.filter((s) => s.featured)
	const other = caseStudies.filter((s) => !s.featured)

	return (
		<>
			{/* Header */}
			<section className="pt-40 pb-20 lg:pt-48 lg:pb-24">
				<Container width="base">
					<div className="animate-in fade-in slide-in-from-bottom-4 max-w-2xl space-y-4 duration-1000">
						<h1 className="font-serif text-4xl leading-[1.08] font-bold tracking-tight sm:text-5xl lg:text-6xl">
							Work
						</h1>
						<p className="text-muted-foreground max-w-xl text-base leading-relaxed">
							I take on a small number of projects at a time. Development, leadership, and
							training for engineering teams.
						</p>
					</div>
				</Container>
			</section>

			{/* What I Do */}
			<section className="border-border border-b py-16 lg:py-20">
				<Container width="base">
					<div className="divide-border divide-y">
						{[
							{
								title: 'Development',
								desc: 'Production software with your team. React, Next.js, TypeScript, Node.js.',
							},
							{
								title: 'Leadership',
								desc: 'Architecture reviews, technical strategy, code audits.',
							},
							{
								title: 'Training',
								desc: 'Workshops for engineering teams. React, TypeScript, AI.',
								href: '/teaching',
							},
						].map((item) => (
							<div
								key={item.title}
								className="flex items-center justify-between gap-6 py-5">
								<div className="min-w-0">
									<span className="text-foreground text-sm font-medium">
										{item.title}
									</span>
									<p className="text-muted-foreground text-xs">{item.desc}</p>
								</div>
								{item.href && (
									<Link href={item.href} className="transition-opacity hover:opacity-70">
										<ArrowUpRight className="text-muted-foreground h-3.5 w-3.5 shrink-0" />
									</Link>
								)}
							</div>
						))}
					</div>
				</Container>
			</section>

			{/* Featured Case Studies */}
			<section className="py-16 lg:py-20">
				<Container width="base">
					<h2 className="font-mono text-xs font-medium tracking-wider uppercase">
						Featured
					</h2>
					<div className="mt-6 space-y-4">
						{featured.map((study) => (
							<Link key={study.slug} href={`/work/${study.slug}`} className="group block">
								<div className="border-border hover:bg-muted/40 rounded-xl border p-6 transition-all duration-200 lg:p-8">
									<div className="flex items-start justify-between gap-6">
										<div className="min-w-0 space-y-3">
											<div className="text-muted-foreground flex items-center gap-2 text-xs">
												<Image
													src={`https://www.google.com/s2/favicons?domain=${study.domain}&sz=64`}
													alt=""
													width={14}
													height={14}
													unoptimized
													className="h-3.5 w-3.5 rounded-sm opacity-50 grayscale group-hover:opacity-100 group-hover:grayscale-0"
												/>
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
														className="bg-muted text-muted-foreground rounded px-2 py-0.5 font-mono text-xs font-medium">
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
						<h2 className="font-mono text-xs font-medium tracking-wider uppercase">
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
										<p className="text-muted-foreground flex items-center gap-1.5 text-xs">
											<Image
												src={`https://www.google.com/s2/favicons?domain=${study.domain}&sz=64`}
												alt=""
												width={12}
												height={12}
												unoptimized
												className="h-3 w-3 rounded-sm opacity-50 grayscale group-hover:opacity-100 group-hover:grayscale-0"
											/>
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

			{/* Testimonials */}
			<section className="border-border border-t py-16 lg:py-20">
				<Container width="base">
					<h2 className="font-mono text-xs font-medium tracking-wider uppercase">
						What Clients Say
					</h2>
					<div className="divide-border mt-6 divide-y">
						{testimonials.map((t) => (
							<div key={t.name} className="flex gap-4 py-6 first:pt-0 last:pb-0">
								<div className="relative h-10 w-10 shrink-0 overflow-hidden rounded-full">
									<Image src={t.image} alt={t.name} fill className="object-cover" />
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
							<h2 className="font-mono text-xs font-medium tracking-wider uppercase">
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
							<h2 className="font-mono text-xs font-medium tracking-wider uppercase">
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

			{/* Contact */}
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
