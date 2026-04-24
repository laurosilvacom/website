import Link from 'next/link'
import Image from 'next/image'
import Container from '@/shared/components/container'
import {ArrowRight} from 'lucide-react'
import {generatePageMetadata} from '@/shared/lib/metadata'
import {getCaseStudies} from '@/features/work/server'

export const metadata = generatePageMetadata(
	'Work',
	"Full-stack development, technical leadership, and developer training. Case studies from Google, O'Reilly, Sentry, egghead, and Test Double.",
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
			'Lauro is a total pro. His guidance for our team helped us not only create a polished set of onboarding videos, it helped us build the capability to create additional content on our own in the future.',
		name: 'Andrew Hedges',
		role: 'Assistiv Labs',
		image:
			'https://res.cloudinary.com/laurosilvacom/image/upload/v1731435976/laurosilvacom/hire-me-page/ok4aceenrvijrjcafxba.jpg',
		category: 'education' as const,
	},
	{
		quote:
			"Shout out to @laurosilvacom — I've been feeling overwhelmed by all the things I want to do (and it's caused me to get tied up in knots instead of shipping) An hour with Lauro helped me untangle my thoughts and make a concrete plan. If you need dev content strategy, hit him up!",
		name: 'Jason Lengstorf',
		role: 'Learn With Jason',
		image:
			'https://res.cloudinary.com/laurosilvacom/image/upload/v1731435976/laurosilvacom/hire-me-page/py2kbwptjbxfdqpoepkj.jpg',
		category: 'education' as const,
	},
	{
		quote:
			'Lauro played a crucial role in the early days of Total TypeScript - helping shape the project as a whole and providing critical feedback. Absolute rockstar.',
		name: 'Matt Pocock',
		role: 'Total TypeScript',
		image:
			'https://res.cloudinary.com/laurosilvacom/image/upload/v1731435977/laurosilvacom/hire-me-page/d2czubfk8lipnflorffc.jpg',
		category: 'education' as const,
	},
	{
		quote:
			"Lauro has an exceptional grasp of developer education. He understands that if you want developers to truly tune in, you need to think beyond the code. Lauro's ability to bridge that gap has been so helpful.",
		name: 'Amanda Quinn',
		role: "O'Reilly Media",
		image:
			'https://res.cloudinary.com/laurosilvacom/image/upload/v1731435976/laurosilvacom/hire-me-page/sfb3bpsb8cyawhjckqzp.jpg',
		category: 'education' as const,
	},
	{
		quote:
			"Lauro introduced me to the world of creating courses and I couldn't be happier for that. I've learned a lot from him, but I feel like I barely scratched the surface of his knowledge and expertise. If I need help around content creation, I wouldn't think twice about hiring him.",
		name: 'Lazar Nikolov',
		role: 'Developer Advocate',
		image:
			'https://res.cloudinary.com/laurosilvacom/image/upload/v1731435976/laurosilvacom/hire-me-page/feghewn8upq5agudmjue.jpg',
		category: 'education' as const,
	},
	{
		quote:
			"@laurosilvacom is the reason my TypeScript course even exists. He is one of the best in the industry in terms of creating high-quality education and content. If your team needs an expert, he's your person.",
		name: 'Joe Previte',
		role: 'TypeScript Engineer',
		image:
			'https://res.cloudinary.com/laurosilvacom/image/upload/v1731435977/laurosilvacom/hire-me-page/qvv2x8w69azainacmu9d.jpg',
		category: 'education' as const,
	},
	{
		quote:
			'Lauro is an incredible engineer with a deep understanding of how to leverage technology for social good. Their expertise has been invaluable in advancing our mission.',
		name: 'Anya Yeager',
		role: 'LOTUS Humanitarian',
		image:
			'https://res.cloudinary.com/laurosilvacom/image/upload/v1731435977/laurosilvacom/hire-me-page/gbwkf4uzwmxomngxhkj6.png',
		category: 'engineering' as const,
	},

	{
		quote: "Thanks for all your help and patience @laurosilvacom - you're the real MVP.",
		name: 'Alejandro Nanez',
		role: 'Staff Engineer',
		image:
			'https://res.cloudinary.com/laurosilvacom/image/upload/v1731435976/laurosilvacom/hire-me-page/p3eglqeb7qfvsfzvh3qr.jpg',
		category: 'engineering' as const,
	},
	{
		quote:
			"We couldn't do it without you @laurosilvacom! You and the rest of the team provide such an awesome support system! Thanks so much to you all!",
		name: 'Erin Doyle',
		role: 'SRE / Platform Engineer',
		image:
			'https://res.cloudinary.com/laurosilvacom/image/upload/v1731435977/laurosilvacom/hire-me-page/bk8b2qxymdq5hzrx41yo.jpg',
		category: 'engineering' as const,
	},
	{
		quote:
			'Working with @laurosilvacom is always a good experience. Thanks for the help and guidance...the course will be awesome!',
		name: 'Matías Hernández',
		role: 'JavaScript Engineer',
		image:
			'https://res.cloudinary.com/laurosilvacom/image/upload/v1731435977/laurosilvacom/hire-me-page/vtnslxxf2ahtn0qmp39c.jpg',
		category: 'engineering' as const,
	},
]

export default async function WorkPage() {
	const caseStudies = await getCaseStudies()
	return (
		<>
			{/* Header */}
			<section className="pt-28 pb-12 lg:pt-32 lg:pb-16">
				<Container>
					<div className="space-y-4">
						<h1 className="text-2xl font-normal tracking-tight sm:text-3xl">
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
					<div className="mb-8 flex items-center justify-between">
						<h2 className="text-foreground text-xs font-medium uppercase tracking-widest">Testimonials</h2>
						<Link
							href="/work/testimonials"
							className="text-muted-foreground hover:text-foreground text-xs transition-colors">
							View all
						</Link>
					</div>
					<div className="space-y-6">
						{testimonials.slice(0, 5).map((t) => (
							<div key={t.name} className="flex gap-3 py-3">
								<div className="relative h-8 w-8 shrink-0 overflow-hidden rounded-full">
									<Image
										src={t.image}
										alt={t.name}
										fill
										sizes="32px"
										className="object-cover"
									/>
								</div>
								<div className="min-w-0">
									<p className="text-foreground text-sm leading-relaxed">
										&ldquo;{t.quote}&rdquo;
									</p>
									<p className="text-muted-foreground mt-2 text-xs">
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
							Schedule a conversation
						</a>
					</p>
				</Container>
			</section>
		</>
	)
}
