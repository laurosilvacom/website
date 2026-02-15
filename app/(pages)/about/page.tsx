import Image from 'next/image'
import Link from 'next/link'
import Container from '@/shared/components/container'
import {generatePageMetadata} from '@/shared/lib/metadata'
import {StructuredData} from '@/shared/components/structured-data'
import {ArrowUpRight} from 'lucide-react'

export const metadata = generatePageMetadata(
	'About',
	"Lauro Silva is a senior full-stack engineer and developer educator based in Portland. Previously with Google, O'Reilly, Sentry, and HOKA. I build products and teach the teams behind them.",
	{
		keywords: [
			'about',
			'senior full-stack engineer',
			'developer educator',
			'React',
			'Next.js',
			'TypeScript',
			'Portland',
			'freelance engineer',
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
				description="Senior full-stack engineer and developer educator. Previously with Google, O'Reilly, Sentry, and HOKA."
				url="/about"
			/>

			{/* Header */}
			<section className="pt-40 pb-20 lg:pt-48 lg:pb-24">
				<Container width="base">
					<div className="animate-in fade-in slide-in-from-bottom-4 space-y-4 duration-1000">
						<h1 className="text-4xl leading-[1.08] font-bold tracking-tight sm:text-5xl lg:text-6xl">
							About
						</h1>
						<p className="text-muted-foreground max-w-xl text-lg leading-relaxed">
							Senior full-stack engineer and developer educator based in Portland.
							I build products and teach the teams behind them.
						</p>
						<div className="flex items-center gap-4 pt-2">
							<a
								href="https://cal.com/laurosilvacom/chat"
								target="_blank"
								rel="noopener noreferrer"
								className="bg-primary text-primary-foreground hover:bg-primary/90 inline-flex items-center gap-2 rounded-lg px-4 py-2.5 text-sm font-medium transition-colors">
								Get in touch
								<ArrowUpRight className="h-3.5 w-3.5" />
							</a>
							<a
								href="https://www.linkedin.com/in/laurosilvacom/"
								target="_blank"
								rel="noopener noreferrer"
								className="text-muted-foreground hover:text-foreground inline-flex items-center gap-1.5 text-sm font-medium transition-colors">
								LinkedIn
								<ArrowUpRight className="h-3.5 w-3.5" />
							</a>
						</div>
					</div>
				</Container>
			</section>

			{/* Quick facts */}
			<section className="border-border border-y">
				<Container width="base">
					<div className="divide-border grid grid-cols-2 divide-x sm:grid-cols-4">
						{[
							{label: 'Based in', value: 'Portland, OR'},
							{label: 'Focus', value: 'React · Next.js'},
							{label: 'Role', value: 'Engineer + Educator'},
							{label: 'Status', value: 'Available'},
						].map((item) => (
							<div key={item.label} className="px-4 py-5 first:pl-0 sm:px-6">
								<p className="text-foreground text-sm font-semibold">{item.value}</p>
								<p className="text-muted-foreground text-xs">{item.label}</p>
							</div>
						))}
					</div>
				</Container>
			</section>

			{/* Photo */}
			<section className="border-border border-b py-10 lg:py-14">
				<Container width="base">
					<div className="relative aspect-video overflow-hidden rounded-xl">
						<Image
							src="/photos/website-photo-6.jpg"
							alt="Lauro Silva"
							fill
							className="object-cover"
							priority
							sizes="(min-width: 1024px) 680px, 100vw"
						/>
					</div>
				</Container>
			</section>

			{/* Story */}
			<section className="border-border border-b py-16 lg:py-20">
				<Container width="base">
					<h2 className="text-sm font-semibold uppercase tracking-wider">
						My Story
					</h2>
					<div className="text-muted-foreground mt-4 max-w-xl space-y-4 text-sm leading-relaxed">
						<p>
							I&apos;ve spent my career at the intersection of building software and
							teaching others how to build it better. I&apos;m a senior full-stack
							engineer who specializes in React, Next.js, TypeScript, and Node.js —
							and I&apos;m also a developer educator who has taught at O&apos;Reilly,
							egghead, and Google.
						</p>
						<p>
							That combination is what makes my work different. When I embed with a
							team to ship a product, I&apos;m not just writing code — I&apos;m making
							the team stronger in the process. When I teach a workshop, I&apos;m not
							just explaining concepts — I&apos;m drawing from real production
							experience.
						</p>
						<p>
							I&apos;ve worked with teams at Google, O&apos;Reilly, Sentry, HOKA,
							egghead, and Test Double — from building developer education platforms to
							delivering live workshops to leading full-stack development.
						</p>
					</div>
				</Container>
			</section>

			{/* Expertise */}
			<section className="border-border border-b py-16 lg:py-20">
				<Container width="base">
					<h2 className="text-sm font-semibold uppercase tracking-wider">
						Expertise
					</h2>
					<div className="divide-border mt-4 divide-y">
						{[
							{
								title: 'Full-Stack Development',
								desc: 'React, Next.js, TypeScript, Node.js. Production applications from architecture to deployment.',
							},
							{
								title: 'Developer Education',
								desc: "Workshops, courses, and corporate training. Taught at O'Reilly and egghead.",
							},
							{
								title: 'Technical Leadership',
								desc: 'Architecture reviews, code audits, technical strategy for teams that want to scale.',
							},
							{
								title: 'AI Integration',
								desc: 'Practical AI integration with Claude and GPT-4 in production-ready, maintainable ways.',
							},
						].map((item) => (
							<div key={item.title} className="py-3">
								<span className="text-foreground text-sm font-medium">
									{item.title}
								</span>
								<p className="text-muted-foreground text-xs">{item.desc}</p>
							</div>
						))}
					</div>
				</Container>
			</section>

			{/* Beyond Code */}
			<section className="border-border border-b py-16 lg:py-20">
				<Container width="base">
					<div className="grid items-start gap-10 lg:grid-cols-2">
						<div>
							<h2 className="text-sm font-semibold uppercase tracking-wider">
								Beyond Code
							</h2>
							<div className="text-muted-foreground mt-4 max-w-md space-y-4 text-sm leading-relaxed">
								<p>
									I&apos;m a semi-professional trail runner. I race ultras and mountain
									races across the Pacific Northwest. The trails have taught me
									persistence, problem-solving under pressure, and showing up
									consistently.
								</p>
								<p>
									I also founded{' '}
									<a
										href="https://tierralibre.run"
										target="_blank"
										rel="noopener noreferrer"
										className="text-foreground underline underline-offset-4 transition-colors hover:opacity-70">
										Tierra Libre Run
									</a>
									, a nonprofit that makes trail running more accessible to runners of
									color. We sponsor runners, fund race entries, and partner with races
									to create more inclusive spaces.
								</p>
							</div>
						</div>
						<div className="relative aspect-4/5 overflow-hidden rounded-xl">
							<Image
								src="/photos/website-photo-7.jpg"
								alt="Lauro trail running"
								fill
								className="object-cover"
								sizes="(max-width: 1024px) 100vw, 50vw"
							/>
						</div>
					</div>
				</Container>
			</section>

			{/* Values */}
			<section className="border-border border-b py-16 lg:py-20">
				<Container width="base">
					<h2 className="text-sm font-semibold uppercase tracking-wider">
						What I Believe
					</h2>
					<div className="divide-border mt-4 divide-y">
						{[
							{
								title: 'Technology should serve people',
								desc: 'The best software starts with understanding the humans who will use it.',
							},
							{
								title: 'Ship things that matter',
								desc: 'Great architecture means nothing if the product never ships.',
							},
							{
								title: 'The best way to learn is by building',
								desc: 'Real projects. Real code. Real constraints.',
							},
						].map((item) => (
							<div key={item.title} className="py-3">
								<span className="text-foreground text-sm font-medium">
									{item.title}
								</span>
								<p className="text-muted-foreground text-xs">{item.desc}</p>
							</div>
						))}
					</div>
				</Container>
			</section>

			{/* CTA */}
			<section className="py-16 lg:py-20">
				<Container width="base">
					<div className="flex flex-col items-start gap-4 sm:flex-row sm:items-center sm:justify-between">
						<div>
							<p className="text-foreground text-sm font-medium">
								Interested in working together?
							</p>
							<p className="text-muted-foreground text-sm">
								I&apos;m always open to hearing about new projects.
							</p>
						</div>
						<a
							href="https://cal.com/laurosilvacom/chat"
							target="_blank"
							rel="noopener noreferrer"
							className="bg-primary text-primary-foreground hover:bg-primary/90 inline-flex shrink-0 items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium transition-colors">
							Get in touch
							<ArrowUpRight className="h-3.5 w-3.5" />
						</a>
					</div>
				</Container>
			</section>
		</>
	)
}
