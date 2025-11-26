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
				<section className="border-border border-b pt-32 pb-24 lg:pt-40 lg:pb-32">
					<Container width="base">
						<div className="mx-auto max-w-4xl space-y-12 text-center">
							<h1 className="text-5xl leading-[1.1] font-bold tracking-tight lg:text-6xl xl:text-7xl">
								Build
								<span className="text-primary"> & </span>Run
							</h1>

							<p className="text-muted-foreground mx-auto max-w-2xl text-xl leading-relaxed">
								I write software, build communities, and run trails. These three
								things aren&apos;t separate parts of my life—they inform and
								strengthen each other.
							</p>
						</div>
					</Container>
				</section>

				{/* Hero Image */}
				<section className="border-border border-b py-16 lg:py-24">
					<Container width="base">
						<div className="relative aspect-16/10 overflow-hidden rounded-2xl lg:aspect-21/9">
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
				<section className="border-border border-b py-24 lg:py-32">
					<Container width="base">
						<div className="mx-auto max-w-3xl space-y-8">
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
				<section className="border-border border-b py-24 lg:py-32">
					<Container width="base">
						<div className="space-y-24">
							{/* Software Engineer */}
							<div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
								<div className="space-y-6">
									<div className="space-y-2">
										<div className="inline-flex items-center gap-2">
											<div className="bg-primary h-2 w-2 rounded-full" />
											<span className="text-muted-foreground text-sm font-medium tracking-wide uppercase">
												01
											</span>
										</div>
										<h2 className="text-3xl font-bold tracking-tight lg:text-4xl">
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
											I&apos;ve worked with teams at Google, O&apos;Reilly,
											Sentry, and HOKA to build better digital experiences. My
											technical expertise is in React, Next.js, TypeScript, and
											Node.js—but more than the tools, I care about building
											software that&apos;s maintainable, thoughtful, and
											genuinely useful.
										</p>
									</div>
								</div>
								<div className="relative aspect-4/5 overflow-hidden rounded-2xl lg:aspect-3/4">
									<Image
										src="/photos/website-photo-9.jpg"
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
											src="/photos/website-photo-4.jpg"
											alt="Community building"
											fill
											className="object-cover"
											sizes="(max-width: 1024px) 100vw, 50vw"
										/>
									</div>
								</div>
								<div className="order-1 space-y-6 lg:order-2">
									<div className="space-y-2">
										<div className="inline-flex items-center gap-2">
											<div className="bg-primary h-2 w-2 rounded-full" />
											<span className="text-muted-foreground text-sm font-medium tracking-wide uppercase">
												02
											</span>
										</div>
										<h2 className="text-3xl font-bold tracking-tight lg:text-4xl">
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
											but it hasn&apos;t always been accessible to runners of
											color.
										</p>
										<p>
											Tierra Libre Run is a nonprofit that makes trail running
											more accessible. We sponsor runners, provide funding for
											race entries, and partner with races across the Pacific
											Northwest to create more inclusive spaces.
										</p>
										<p>
											This work has taught me that building community isn&apos;t
											about grand gestures—it&apos;s about showing up
											consistently, listening deeply, and creating spaces where
											people can bring their whole selves.
										</p>
									</div>
								</div>
							</div>

							{/* Athlete */}
							<div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
								<div className="space-y-6">
									<div className="space-y-2">
										<div className="inline-flex items-center gap-2">
											<div className="bg-primary h-2 w-2 rounded-full" />
											<span className="text-muted-foreground text-sm font-medium tracking-wide uppercase">
												03
											</span>
										</div>
										<h2 className="text-3xl font-bold tracking-tight lg:text-4xl">
											Trail Runner
										</h2>
									</div>
									<div className="text-muted-foreground space-y-4 text-lg leading-relaxed">
										<p>
											I&apos;m a semi-professional trail runner. The trails have
											taught me about persistence, about problem-solving when
											things get hard, and about the importance of showing up
											even when you don&apos;t feel like it.
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
											industry, I&apos;m building as someone who lives in this
											world.
										</p>
									</div>
								</div>
								<div className="relative aspect-4/5 overflow-hidden rounded-2xl lg:aspect-3/4">
									<Image
										src="/photos/website-photo-11.jpg"
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
				<section className="border-border border-b py-24 lg:py-32">
					<Container width="base">
						<div className="grid gap-4 md:grid-cols-3">
							{[
								'/photos/website-photo-2.jpg',
								'/photos/website-photo-3.jpg',
								'/photos/website-photo-4.jpg'
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
				<section className="border-border border-b py-24 lg:py-32">
					<Container width="base">
						<div className="mx-auto max-w-3xl space-y-12">
							<div className="space-y-4">
								<div className="inline-flex items-center gap-2">
									<div className="bg-primary h-2 w-2 rounded-full" />
									<span className="text-muted-foreground text-sm font-medium tracking-wide uppercase">
										What I Believe
									</span>
								</div>
								<h2 className="text-3xl font-bold tracking-tight lg:text-4xl">
									The work should matter
								</h2>
							</div>

							<div className="text-muted-foreground space-y-6 text-lg leading-relaxed">
								<p>
									Technology should serve people, not the other way around. The
									best software I&apos;ve built has always started with
									understanding the humans who will use it—their needs, their
									constraints, their aspirations.
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
									technologist—these aren&apos;t separate things. They&apos;re
									all part of how I see the world and how I build.
								</p>
							</div>
						</div>
					</Container>
				</section>

				{/* Closing */}
				<section className="py-24 lg:py-32">
					<Container width="base">
						<div className="border-border bg-muted/50 mx-auto max-w-3xl space-y-8 rounded-2xl border p-12 text-center lg:p-16">
							<div className="space-y-6">
								<p className="text-foreground text-2xl leading-relaxed font-semibold lg:text-3xl">
									These three roles—engineer, community builder,
									athlete—aren&apos;t separate.
								</p>
								<p className="text-muted-foreground text-lg leading-relaxed lg:text-xl">
									They&apos;re all part of how I approach the world and how I do
									my work. They inform each other, challenge each other, and
									make me better at all of them.
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
