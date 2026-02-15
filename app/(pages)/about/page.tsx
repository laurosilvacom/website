import Image from 'next/image'
import Link from 'next/link'
import Container from '@/components/container'
import {Button} from '@/components/ui/button'
import {ArrowRight} from 'lucide-react'
import {generatePageMetadata} from '@/lib/metadata'
import {StructuredData} from '@/components/structured-data'

export const metadata = generatePageMetadata(
	'About',
	'Lauro Silva is a senior full-stack engineer and developer educator based in Portland. Previously with Google, O\'Reilly, Sentry, and HOKA. I build products and teach the teams behind them.',
	{
		keywords: [
			'about',
			'senior full-stack engineer',
			'developer educator',
			'React',
			'Next.js',
			'TypeScript',
			'Portland',
			'freelance engineer'
		],
		canonical: '/about'
	}
)

export default function AboutPage() {
	return (
		<>
			<StructuredData
				type="website"
				title="About - Lauro Silva"
				description="Senior full-stack engineer and developer educator. Previously with Google, O'Reilly, Sentry, and HOKA."
				url="/about"
			/>
			<main>
				{/* Hero Section */}
				<section className="relative flex min-h-[70vh] items-center justify-center px-6 pt-32 pb-24 lg:pt-40 lg:pb-32">
					<div className="mx-auto max-w-4xl text-center">
						<div className="animate-in fade-in slide-in-from-bottom-4 space-y-8 duration-1000">
							<h1 className="text-4xl leading-[1.05] font-bold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl">
								Build & Teach
							</h1>
							<p className="text-muted-foreground mx-auto max-w-2xl text-xl leading-relaxed sm:text-2xl">
								I&apos;m a senior full-stack engineer and developer educator
								based in Portland. I build products and teach the teams behind
								them.
							</p>
						</div>
					</div>
				</section>

				{/* Hero Image */}
				<section className="py-12 lg:py-20">
					<Container width="wide">
						<div className="border-border-subtle animate-in fade-in slide-in-from-bottom-8 relative aspect-video overflow-hidden rounded-3xl border shadow-2xl delay-300 duration-1000">
							<Image
								src="/photos/website-photo-6.jpg"
								alt="Lauro Silva"
								fill
								className="object-cover"
								priority
								sizes="100vw"
							/>
						</div>
					</Container>
				</section>

				{/* Professional Story */}
				<section className="py-24 lg:py-32">
					<Container width="narrow">
						<div className="space-y-12">
							<div className="space-y-3">
								<span className="text-muted-foreground text-sm font-medium">
									My Story
								</span>
								<h2 className="text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
									Engineering & Education
								</h2>
							</div>

							<div className="text-muted-foreground space-y-6 text-lg leading-relaxed">
								<p>
									I&apos;ve spent my career at the intersection of building
									software and teaching others how to build it better. I&apos;m
									a senior full-stack engineer who specializes in React,
									Next.js, TypeScript, and Node.js — and I&apos;m also a
									developer educator who has taught at O&apos;Reilly, egghead,
									and Google.
								</p>
								<p>
									That combination is what makes my work different. When I embed
									with a team to ship a product, I&apos;m not just writing
									code — I&apos;m making the team stronger in the process. When
									I teach a workshop, I&apos;m not just explaining concepts —
									I&apos;m drawing from real production experience to show
									what actually works.
								</p>
								<p>
									I&apos;ve worked with teams at Google, O&apos;Reilly, Sentry,
									HOKA, egghead, and Test Double. These range from building
									developer education platforms at Google, to delivering live
									workshops at O&apos;Reilly, to leading full-stack development
									at HOKA.
								</p>
								<p>
									My approach is practical and hands-on. I believe in building
									software that&apos;s maintainable, thoughtful, and genuinely
									useful. I care about code quality, but I care more about
									shipping things that matter. And I believe the best way to
									learn is by building real things, not watching tutorials.
								</p>
							</div>
						</div>
					</Container>
				</section>

				{/* Technical Expertise */}
				<section className="bg-muted/30 py-24 lg:py-32">
					<Container width="base">
						<div className="space-y-12">
							<div className="space-y-3">
								<span className="text-muted-foreground text-sm font-medium">
									Expertise
								</span>
								<h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
									What I Specialize In
								</h2>
							</div>

							<div className="grid gap-8 md:grid-cols-2">
								<div className="space-y-4">
									<h3 className="text-xl font-bold">Full-Stack Development</h3>
									<p className="text-muted-foreground text-base leading-relaxed">
										React, Next.js, TypeScript, Node.js. I build production
										applications from architecture to deployment. I care about
										performance, maintainability, and developer experience.
									</p>
								</div>
								<div className="space-y-4">
									<h3 className="text-xl font-bold">Developer Education</h3>
									<p className="text-muted-foreground text-base leading-relaxed">
										Workshops, courses, and corporate training. I&apos;ve
										taught at O&apos;Reilly and egghead, and I bring that same
										quality to teams directly. Hands-on, practical, and
										principle-based.
									</p>
								</div>
								<div className="space-y-4">
									<h3 className="text-xl font-bold">Technical Leadership</h3>
									<p className="text-muted-foreground text-base leading-relaxed">
										Architecture reviews, code audits, technical strategy. I
										help teams make better technical decisions and build
										products that scale without over-engineering.
									</p>
								</div>
								<div className="space-y-4">
									<h3 className="text-xl font-bold">AI Integration</h3>
									<p className="text-muted-foreground text-base leading-relaxed">
										Practical AI integration for real applications. I help teams
										adopt AI tools like Claude and GPT-4 in production-ready,
										maintainable ways — not hype, just utility.
									</p>
								</div>
							</div>
						</div>
					</Container>
				</section>

				{/* Beyond Code */}
				<section className="py-24 lg:py-32">
					<Container width="base">
						<div className="grid items-start gap-12 lg:grid-cols-2 lg:gap-16">
							<div className="space-y-8">
								<div className="space-y-3">
									<span className="text-muted-foreground text-sm font-medium">
										Beyond Code
									</span>
									<h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
										What Shapes My Perspective
									</h2>
								</div>

								<div className="text-muted-foreground space-y-6 text-lg leading-relaxed">
									<p>
										I&apos;m a semi-professional trail runner. I race ultras
										and mountain races across the Pacific Northwest. The trails
										have taught me persistence, problem-solving under pressure,
										and the importance of showing up consistently.
									</p>
									<p>
										I also founded{' '}
										<a
											href="https://tierralibre.run"
											target="_blank"
											rel="noopener noreferrer"
											className="text-foreground hover:text-primary underline transition-colors">
											Tierra Libre Run
										</a>
										, a nonprofit that makes trail running more accessible to
										runners of color. We sponsor runners, fund race entries,
										and partner with races across the PNW to create more
										inclusive spaces.
									</p>
									<p>
										These experiences directly inform how I work. Building
										community has taught me that the best products come from
										deeply understanding the people who use them. Running has
										taught me that the best results come from sustained effort,
										not shortcuts.
									</p>
								</div>
							</div>

							<div className="grid gap-4">
								<div className="relative aspect-4/5 overflow-hidden rounded-2xl">
									<Image
										src="/photos/website-photo-7.jpg"
										alt="Lauro trail running"
										fill
										className="object-cover"
										sizes="(max-width: 1024px) 100vw, 50vw"
									/>
								</div>
							</div>
						</div>
					</Container>
				</section>

				{/* Values */}
				<section className="bg-muted/30 py-24 lg:py-32">
					<Container width="narrow">
						<div className="space-y-12">
							<h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
								What I Believe
							</h2>

							<div className="space-y-8">
								<div className="border-border border-b pb-8">
									<h3 className="mb-3 text-xl font-bold">
										Technology should serve people
									</h3>
									<p className="text-muted-foreground text-lg leading-relaxed">
										The best software starts with understanding the humans who
										will use it. I build with empathy, not just efficiency.
									</p>
								</div>
								<div className="border-border border-b pb-8">
									<h3 className="mb-3 text-xl font-bold">
										Ship things that matter
									</h3>
									<p className="text-muted-foreground text-lg leading-relaxed">
										I care about code quality, but I care more about impact.
										Great architecture means nothing if the product never ships.
									</p>
								</div>
								<div className="pb-8">
									<h3 className="mb-3 text-xl font-bold">
										The best way to learn is by building
									</h3>
									<p className="text-muted-foreground text-lg leading-relaxed">
										Whether I&apos;m teaching a workshop or mentoring a junior
										engineer, my approach is always hands-on. Real projects.
										Real code. Real constraints.
									</p>
								</div>
							</div>
						</div>
					</Container>
				</section>

				{/* CTA */}
				<section className="py-24 lg:py-32">
					<Container width="base">
						<div className="bg-card border-border-subtle space-y-8 rounded-3xl border p-12 text-center lg:p-16">
							<div className="space-y-6">
								<h2 className="text-3xl font-bold tracking-tight lg:text-5xl">
									Let&apos;s work together
								</h2>
								<p className="text-muted-foreground mx-auto max-w-2xl text-lg leading-relaxed lg:text-xl">
									Whether you need a senior engineer, technical advisor, or
									workshop instructor — I&apos;d love to hear about what
									you&apos;re building.
								</p>
							</div>
							<div className="flex flex-wrap items-center justify-center gap-4 pt-4">
								<Button asChild size="lg" className="group">
									<Link
										href="https://cal.com/laurosilvacom/chat"
										target="_blank"
										rel="noopener noreferrer">
										Schedule a consultation
										<ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
									</Link>
								</Button>
								<Button asChild size="lg" variant="outline">
									<Link href="/services">View services</Link>
								</Button>
							</div>
						</div>
					</Container>
				</section>
			</main>
		</>
	)
}
