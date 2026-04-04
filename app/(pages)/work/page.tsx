import Link from 'next/link'
import Image from 'next/image'
import Container from '@/shared/components/container'
import {ArrowRight} from 'lucide-react'
import {generatePageMetadata} from '@/shared/lib/metadata'
import {getCaseStudies} from '@/features/work/server'

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

const testimonials = [
	{
		quote:
			'Lauro is a total pro. His guidance helped us create polished onboarding videos and build the capability to create content independently.',
		name: 'Andrew Hedges',
		role: 'Assistiv Labs',
	},
	{
		quote:
			"An hour with Lauro helped me untangle my thoughts and make a concrete plan. If you need dev content strategy, he's your person.",
		name: 'Jason Lengstorf',
		role: 'Learn With Jason',
	},
	{
		quote:
			'Working with Lauro is always a great experience. His technical guidance and patience make complex projects feel manageable.',
		name: 'Alejandro Nanez',
		role: 'Staff Engineer',
	},
]

export default async function WorkPage() {
	const caseStudies = await getCaseStudies()
	return (
		<>
			{/* Header */}
			<section className="pt-32 pb-16 lg:pt-36 lg:pb-20">
				<Container>
					<div className="space-y-4">
						<h1 className="font-serif text-3xl leading-[1.1] font-bold tracking-tight sm:text-4xl lg:text-5xl">
							Work
						</h1>
						<p className="text-muted-foreground text-base leading-relaxed">
							I take on a small number of projects at a time. Development, leadership, and
							training for engineering teams.
						</p>
					</div>
				</Container>
			</section>

			{/* Case Studies */}
			<section className="pb-16 lg:pb-20">
				<Container>
					<div className="space-y-1">
						{caseStudies.map((study) => (
							<Link
								key={study.slug}
								href={`/work/${study.slug}`}
								className="group flex items-center justify-between gap-4 py-4 transition-opacity hover:opacity-70">
								<div className="min-w-0 space-y-1">
									<span className="text-foreground flex items-center gap-2 text-sm font-medium">
										{study.domain && (
											<Image
												src={`https://www.google.com/s2/favicons?domain=${study.domain}&sz=64`}
												alt=""
												width={14}
												height={14}
												unoptimized
												className="h-3.5 w-3.5 rounded-sm opacity-50 grayscale group-hover:opacity-100 group-hover:grayscale-0"
											/>
										)}
										{study.client}
									</span>
									<p className="text-muted-foreground text-xs">
										{study.title} · {study.type}
									</p>
								</div>
								<ArrowRight className="text-muted-foreground h-3.5 w-3.5 shrink-0 opacity-0 transition-opacity group-hover:opacity-100" />
							</Link>
						))}
					</div>
				</Container>
			</section>

			{/* Testimonials */}
			<section className="pb-16 lg:pb-20">
				<Container>
					<div className="space-y-6">
						{testimonials.map((t) => (
							<div key={t.name} className="py-4">
								<p className="text-foreground text-sm leading-relaxed">
									&ldquo;{t.quote}&rdquo;
								</p>
								<p className="text-muted-foreground mt-2 text-xs">
									<span className="text-foreground font-medium">{t.name}</span>
									{' · '}
									{t.role}
								</p>
							</div>
						))}
					</div>
				</Container>
			</section>

			{/* Contact */}
			<section className="pb-16 lg:pb-20">
				<Container>
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
