import Link from 'next/link'
import Container from '@/shared/components/container'
import {generatePageMetadata} from '@/shared/lib/metadata'
import {StructuredData} from '@/shared/components/structured-data'
import {Button} from '@/shared/ui/button'

export const metadata = generatePageMetadata(
	'About',
	'Lauro Silva is a senior software engineer and developer educator focused on helping teams ship better software and improve engineering capability.',
	{
		keywords: [
			'about',
			'software engineer',
			'developer educator',
			'technical leadership',
			'React',
			'Next.js',
			'TypeScript',
		],
		canonical: '/about',
	},
)

export default function AboutPage() {
	return (
		<>
			<StructuredData
				type="website"
				title="About - Lauro Silva"
				description="Senior software engineer and developer educator helping teams ship better software through delivery and training."
				url="/about"
			/>
			<main>
				{/* Header */}
				<section className="pt-28 pb-12 lg:pt-32 lg:pb-16">
					<Container>
						<div className="space-y-4">
							<h1 className="type-page-title">
								About
							</h1>
							<p className="type-page-intro">
								I&apos;m a senior software engineer and developer educator. I work with
								teams that need both strong execution and stronger engineering capability.
							</p>
						</div>
					</Container>
				</section>

				{/* Professional focus */}
				<section className="pb-16 lg:pb-20">
					<Container>
						<h2 className="type-section-label mb-6">
							Professional Focus
						</h2>
						<div className="type-body-sm mt-4 space-y-4">
							<p>
								I help product teams and agencies ship production-ready web applications.
								My core stack is React, Next.js, TypeScript, and Node.js.
							</p>
							<p>
								I&apos;ve collaborated with teams connected to Google, O&apos;Reilly, and
								Sentry. I focus on architecture decisions, delivery quality, and
								sustainable codebases.
							</p>
						</div>
					</Container>
				</section>

				{/* Education approach */}
				<section className="pb-16 lg:pb-20">
					<Container>
						<h2 className="type-section-label mb-6">
							Developer Education
						</h2>
						<div className="type-body-sm mt-4 space-y-4">
							<p>
								I design practical training for engineering teams: workshops, coaching,
								and implementation support that teams can apply immediately.
							</p>
							<p>
								My teaching work is grounded in real product development, so the guidance
								is tactical, current, and tied to shipping outcomes.
							</p>
						</div>
					</Container>
				</section>

				{/* Perspective */}
				<section className="pb-16 lg:pb-20">
					<Container>
						<h2 className="type-section-label mb-6">
							Domain Perspective
						</h2>
						<div className="type-body-sm mt-4 space-y-4">
							<p>
								Outside software, I&apos;m active in trail running communities and outdoor
								initiatives. That perspective helps when building products for performance
								and outdoor audiences.
							</p>
							<p>
								I bring that same mindset to engineering: consistency, clear feedback
								loops, and long-term progress over short-term noise.
							</p>
						</div>
					</Container>
				</section>

				{/* Closing */}
				<section className="pb-16 lg:pb-20">
					<Container>
						<div className="max-w-xl space-y-4">
							<p className="type-item-title leading-relaxed">
								If you need a partner who can both build software and level up your team,
								let&apos;s talk.
							</p>
							<Button
								asChild
								variant="link"
								size="sm"
								className="type-link-muted text-foreground inline-block h-auto px-0 transition-opacity hover:opacity-70">
								<Link href="/work">See case studies →</Link>
							</Button>
						</div>
					</Container>
				</section>
			</main>
		</>
	)
}
