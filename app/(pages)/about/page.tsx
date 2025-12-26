import Image from 'next/image'
import Link from 'next/link'
import Container from '@/components/container'
import {generatePageMetadata} from '@/lib/metadata'
import {StructuredData} from '@/components/structured-data'

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
			'Tierra Libre Run'
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
				description="Software engineer, community builder, and trail runner working at the intersection of technology, education, and the outdoor industry."
				url="/about"
			/>
			<main>
				{/* Hero Section */}
				<section className="relative flex min-h-[85vh] items-center justify-center px-6 pt-32 pb-24 lg:pt-40 lg:pb-32">
					<div className="mx-auto max-w-4xl text-center">
						<div className="animate-in fade-in slide-in-from-bottom-4 space-y-12 duration-1000">
							<h1 className="text-4xl leading-[1.05] font-bold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl">
								Build & Run
							</h1>
							<p className="text-muted-foreground mx-auto max-w-2xl text-xl leading-relaxed sm:text-2xl">
								I write software, build communities, and run trails. These three
								things aren't separate parts of my life - they inform and
								strengthen each other.
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

				{/* Introduction */}
				<section className="py-24 lg:py-32">
					<Container width="base">
						<div className="mx-auto max-w-3xl">
							<p className="text-foreground text-2xl leading-relaxed lg:text-3xl">
								The same curiosity that drives me to understand how systems work
								in code also pushes me to understand how communities form and
								grow. The discipline I learn on long trail runs translates
								directly to how I approach building products.
							</p>
						</div>
					</Container>
				</section>

				{/* Three Pillars */}
				<section className="bg-muted/30 py-24 lg:py-32">
					<Container width="base">
						<div className="space-y-24">
							{/* Software Engineer */}
							<div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
								<div className="space-y-6">
									<div className="space-y-3">
										<span className="text-muted-foreground text-sm font-medium">
											01
										</span>
										<h2 className="text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
											Software Engineer
										</h2>
									</div>
									<div className="text-muted-foreground space-y-4 text-lg leading-relaxed">
										<p>
											I build products for the outdoor industry. My focus is on
											creating software that helps brands, athletes, and
											communities connect more meaningfully with their
											audiences.
										</p>
										<p>
											I've worked with teams at Google, O'Reilly, Sentry, and
											HOKA to build better digital experiences. My technical
											expertise is in React, Next.js, TypeScript, and Node.js -
											but more than the tools, I care about building software
											that's maintainable, thoughtful, and genuinely useful.
										</p>
									</div>
								</div>
								<div className="relative aspect-4/5 overflow-hidden rounded-2xl lg:aspect-3/4">
									<Image
										src="/photos/website-photo-1.jpg"
										alt="Software engineering"
										fill
										className="object-cover"
										sizes="(max-width: 1024px) 100vw, 50vw"
									/>
								</div>
							</div>

							{/* Community Builder */}
							<div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
								<div className="order-2 space-y-6 lg:order-1">
									<div className="relative aspect-4/5 overflow-hidden rounded-2xl lg:aspect-3/4">
										<Image
											src="/photos/website-photo-16.jpg"
											alt="Community building"
											fill
											className="object-cover"
											sizes="(max-width: 1024px) 100vw, 50vw"
										/>
									</div>
								</div>
								<div className="order-1 space-y-6 lg:order-2">
									<div className="space-y-3">
										<span className="text-muted-foreground text-sm font-medium">
											02
										</span>
										<h2 className="text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
											Community Builder
										</h2>
									</div>
									<div className="text-muted-foreground space-y-4 text-lg leading-relaxed">
										<p>
											I started{' '}
											<a
												href="https://tierralibre.run"
												target="_blank"
												rel="noopener noreferrer"
												className="text-foreground hover:text-primary underline transition-colors">
												Tierra Libre Run
											</a>{' '}
											because I saw a gap. Trail running is an incredible sport,
											but it hasn't always been accessible to runners of color.
										</p>
										<p>
											Tierra Libre Run is a nonprofit that makes trail running
											more accessible. We sponsor runners, provide funding for
											race entries, and partner with races across the Pacific
											Northwest to create more inclusive spaces.
										</p>
										<p>
											This work has taught me that building community isn't
											about grand gestures - it's about showing up consistently,
											listening deeply, and creating spaces where people can
											bring their whole selves.
										</p>
									</div>
								</div>
							</div>

							{/* Athlete */}
							<div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
								<div className="space-y-6">
									<div className="space-y-3">
										<span className="text-muted-foreground text-sm font-medium">
											03
										</span>
										<h2 className="text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
											Trail Runner
										</h2>
									</div>
									<div className="text-muted-foreground space-y-4 text-lg leading-relaxed">
										<p>
											I'm a semi-professional trail runner. The trails have
											taught me about persistence, about problem-solving when
											things get hard, and about the importance of showing up
											even when you don't feel like it.
										</p>
										<p>
											Running has given me a deep appreciation for the outdoor
											industry and the communities it serves. I understand
											firsthand what athletes need from the products and
											platforms they use.
										</p>
										<p>
											This perspective directly informs my work. When I build
											platforms for athletes or create products for the outdoor
											industry, I'm building as someone who lives in this world.
										</p>
									</div>
								</div>
								<div className="relative aspect-4/5 overflow-hidden rounded-2xl lg:aspect-3/4">
									<Image
										src="/photos/website-photo-7.jpg"
										alt="Trail running"
										fill
										className="object-cover"
										sizes="(max-width: 1024px) 100vw, 50vw"
									/>
								</div>
							</div>
						</div>
					</Container>
				</section>

				{/* Photo Grid */}
				<section className="py-24 lg:py-32">
					<Container width="base">
						<div className="grid gap-4 md:grid-cols-3">
							{[
								'/photos/website-photo-2.jpg',
								'/photos/website-photo-17.jpg',
								'/photos/website-photo-18.jpg'
							].map((src, idx) => (
								<div
									key={src}
									className="relative aspect-3/4 overflow-hidden rounded-2xl">
									<Image
										src={src}
										alt={`Lauro Silva ${idx + 1}`}
										fill
										className="object-cover"
										sizes="(max-width: 768px) 100vw, 33vw"
									/>
								</div>
							))}
						</div>
					</Container>
				</section>

				{/* Values */}
				<section className="bg-muted/30 py-24 lg:py-32">
					<Container width="base">
						<div className="mx-auto max-w-3xl space-y-12">
							<div className="space-y-4">
								<span className="text-muted-foreground text-sm font-medium">
									What I Believe
								</span>
								<h2 className="text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
									The work should matter
								</h2>
							</div>

							<div className="text-muted-foreground space-y-6 text-lg leading-relaxed">
								<p>
									Technology should serve people, not the other way around. The
									best software I've built has always started with understanding
									the humans who will use it - their needs, their constraints,
									their aspirations.
								</p>
								<p>
									I believe in building things that matter. That means working
									with organizations and people who are trying to make the
									outdoor industry more accessible, more inclusive, and more
									connected. It means writing code that solves real problems,
									not just technical ones.
								</p>
								<p>
									And I believe that the best work happens when you bring your
									whole self to it. My identity as a runner of color, as someone
									who has built community from the ground up, and as a
									technologist - these aren't separate things. They're all part
									of how I see the world and how I build.
								</p>
							</div>
						</div>
					</Container>
				</section>

				{/* Closing */}
				<section className="py-24 lg:py-32">
					<Container width="base">
						<div className="bg-card border-border-subtle mx-auto max-w-3xl space-y-8 rounded-3xl border p-12 text-center lg:p-16">
							<div className="space-y-6">
								<p className="text-foreground text-2xl leading-relaxed font-semibold lg:text-3xl">
									These three roles - engineer, community builder, athlete -
									aren't separate.
								</p>
								<p className="text-muted-foreground text-lg leading-relaxed lg:text-xl">
									They're all part of how I approach the world and how I do my
									work. They inform each other, challenge each other, and make
									me better at all of them.
								</p>
							</div>
							<div className="pt-4">
								<Link
									href="/services"
									className="text-primary text-lg font-medium hover:underline">
									See how I can help →
								</Link>
							</div>
						</div>
					</Container>
				</section>
			</main>
		</>
	)
}
