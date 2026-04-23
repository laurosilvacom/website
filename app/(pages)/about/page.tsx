import Link from 'next/link'
import Container from '@/shared/components/container'
import {generatePageMetadata} from '@/shared/lib/metadata'
import {StructuredData} from '@/shared/components/structured-data'

export const metadata = generatePageMetadata(
	'About',
	'Lauro Silva is a software engineer, community builder, and trail runner working at the intersection of technology, education, and the outdoor industry.',
	{
		keywords: [
			'about',
			'software engineer',
			'community builder',
			'trail runner',
			'outdoor industry',
			'Tierra Libre Run',
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
				description="Software engineer, community builder, and trail runner working at the intersection of technology, education, and the outdoor industry."
				url="/about"
			/>
			<main>
				{/* Header */}
				<section className="pt-28 pb-12 lg:pt-32 lg:pb-16">
					<Container>
						<div className="space-y-4">
							<h1 className="text-2xl font-normal tracking-tight sm:text-3xl">
								Build & Run
							</h1>
							<p className="text-muted-foreground text-base leading-relaxed">
								I write software, build communities, and run trails. These three things
								aren't separate parts of my life — they inform and strengthen each other.
							</p>
						</div>
					</Container>
				</section>

				{/* Software Engineer */}
				<section className="pb-16 lg:pb-20">
					<Container>
						<h2 className="text-foreground text-xs font-medium uppercase tracking-widest mb-6">
							Software Engineer
						</h2>
						<div className="text-muted-foreground mt-4 space-y-4 text-sm leading-relaxed">
							<p>
								I build products for the outdoor industry. My focus is on creating
								software that helps brands, athletes, and communities connect more
								meaningfully with their audiences.
							</p>
							<p>
								I've worked with teams at Google, O'Reilly, and Sentry to build better
								digital experiences. My technical expertise is in React, Next.js,
								TypeScript, and Node.js — but more than the tools, I care about building
								software that's maintainable, thoughtful, and genuinely useful.
							</p>
						</div>
					</Container>
				</section>

				{/* Community Builder */}
				<section className="pb-16 lg:pb-20">
					<Container>
						<h2 className="text-foreground text-xs font-medium uppercase tracking-widest mb-6">
							Community Builder
						</h2>
						<div className="text-muted-foreground mt-4 space-y-4 text-sm leading-relaxed">
							<p>
								I started{' '}
								<a
									href="https://tierralibre.run"
									target="_blank"
									rel="noopener noreferrer"
									className="text-foreground underline underline-offset-4 transition-opacity hover:opacity-70">
									Tierra Libre Run
								</a>{' '}
								because I saw a gap. Trail running is an incredible sport, but it hasn't
								always been accessible to runners of color.
							</p>
							<p>
								Tierra Libre Run is a nonprofit that makes trail running more accessible.
								We sponsor runners, provide funding for race entries, and partner with
								races across the Pacific Northwest to create more inclusive spaces.
							</p>
							<p>
								This work has taught me that building community isn't about grand gestures
								— it's about showing up consistently, listening deeply, and creating
								spaces where people can bring their whole selves.
							</p>
						</div>
					</Container>
				</section>

				{/* Trail Runner */}
				<section className="pb-16 lg:pb-20">
					<Container>
						<h2 className="text-foreground text-xs font-medium uppercase tracking-widest mb-6">Trail Runner</h2>
						<div className="text-muted-foreground mt-4 space-y-4 text-sm leading-relaxed">
							<p>
								I'm a semi-professional trail runner. The trails have taught me about
								persistence, about problem-solving when things get hard, and about the
								importance of showing up even when you don't feel like it.
							</p>
							<p>
								Running has given me a deep appreciation for the outdoor industry and the
								communities it serves. I understand firsthand what athletes need from the
								products and platforms they use.
							</p>
							<p>
								This perspective directly informs my work. When I build platforms for
								athletes or create products for the outdoor industry, I'm building as
								someone who lives in this world.
							</p>
						</div>
					</Container>
				</section>

				{/* Closing */}
				<section className="pb-16 lg:pb-20">
					<Container>
						<div className="max-w-xl space-y-4">
							<p className="text-foreground text-sm leading-relaxed">
								These three roles — engineer, community builder, athlete — aren't
								separate. They're all part of how I approach the world and how I do my
								work.
							</p>
							<Link
								href="/work"
								className="text-foreground inline-block text-sm font-medium underline underline-offset-4 transition-opacity hover:opacity-70">
								See how I can help →
							</Link>
						</div>
					</Container>
				</section>
			</main>
		</>
	)
}
