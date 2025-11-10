import Image from 'next/image'
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
				<section className="pt-32 lg:pt-40 pb-16 lg:pb-24 border-b border-border">
					<Container size="lg">
						<div className="max-w-3xl space-y-8">
							<div className="space-y-6">
								<h1 className="text-3xl lg:text-5xl xl:text-6xl font-bold leading-tight tracking-tight">
									Building at the intersection of code, community, and trails
								</h1>
								<div className="space-y-4 text-lg lg:text-xl leading-relaxed text-muted-foreground">
									<p>
										I&apos;m Lauro Silva. I write software, build communities, and run trails. These three things aren&apos;t separate parts of my life. They inform and strengthen each other in ways that continue to surprise me.
									</p>
									<p>
										The same curiosity that drives me to understand how systems work in code also pushes me to understand how communities form and grow. The discipline and problem-solving I learn on long trail runs translates directly to how I approach building products. And the values I hold as an athlete, accessibility, inclusion, and genuine connection, are the same values I bring to my work.
									</p>
								</div>
							</div>
						</div>
					</Container>
				</section>

				{/* Photo */}
				<section className="py-16 lg:py-24 border-b border-border">
					<Container size="lg">
						<div className="max-w-3xl">
							<div className="relative w-full aspect-[4/3] lg:aspect-[16/10] rounded-2xl overflow-hidden">
								<Image
									src="/photos/website-photo-6.jpg"
									alt="Lauro Silva"
									fill
									className="object-cover"
									sizes="(max-width: 1024px) 100vw, 80vw"
								/>
							</div>
						</div>
					</Container>
				</section>

				{/* Values Section */}
				<section className="py-24 lg:py-32">
					<Container size="lg">
						<div className="max-w-3xl space-y-12">
							<div className="space-y-6">
								<h2 className="text-3xl lg:text-5xl xl:text-6xl font-bold tracking-tight">
									What I believe
								</h2>
								<div className="space-y-4 text-lg leading-relaxed text-muted-foreground">
									<p>
										Technology should serve people, not the other way around. The best software I&apos;ve built has always started with understanding the humans who will use it. Their needs, their constraints, their aspirations.
									</p>
									<p>
										I believe in building things that matter. That means working with organizations and people who are trying to make the outdoor industry more accessible, more inclusive, and more connected. It means writing code that solves real problems, not just technical ones.
									</p>
									<p>
										And I believe that the best work happens when you bring your whole self to it. My identity as a runner of color, as someone who has built community from the ground up, and as a technologist. These aren&apos;t separate things. They&apos;re all part of how I see the world and how I build.
									</p>
								</div>
							</div>
						</div>
					</Container>
				</section>

				{/* Software Engineer Section */}
				<section className="py-24 lg:py-32 border-t border-border">
					<Container size="lg">
						<div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-start">
							<div className="lg:col-span-7 space-y-12">
								<div className="space-y-6">
									<h2 className="text-3xl lg:text-5xl xl:text-6xl font-bold tracking-tight">
										As a software engineer
									</h2>
									<div className="space-y-4 text-lg leading-relaxed text-muted-foreground">
										<p>
											I build products for the outdoor industry. My focus is on creating software that helps brands, athletes, and communities connect more meaningfully with their audiences.
										</p>
										<p>
											I&apos;ve worked with teams at <strong className="text-foreground">Google, O&apos;Reilly, Sentry, and HOKA</strong> to build better digital experiences. I&apos;ve created learning platforms like &quot;Outdoor Brand Camp&quot; and community products that bring people together around shared passions.
										</p>
										<p>
											My technical expertise is in React, Next.js, TypeScript, and Node.js. But more than the tools, I care about building software that&apos;s maintainable, thoughtful, and genuinely useful. I understand that great products come from understanding both the technology and the people who use it.
										</p>
									</div>
								</div>
							</div>
							<div className="lg:col-span-5">
								<div className="sticky top-32">
									<div className="relative aspect-[4/5] lg:aspect-[3/4] group">
										<div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-muted to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10" />
										<Image
											src="/photos/website-photo-9.jpg"
											alt="Software engineering"
											fill
											className="object-cover rounded-2xl transition-transform duration-300 group-hover:scale-[1.02]"
											sizes="(max-width: 1024px) 100vw, 40vw"
										/>
									</div>
								</div>
							</div>
						</div>
					</Container>
				</section>

				{/* Community Builder Section */}
				<section className="py-24 lg:py-32 border-t border-border">
					<Container size="lg">
						<div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-start">
							<div className="lg:col-span-5 order-2 lg:order-1">
								<div className="sticky top-32">
									<div className="relative aspect-[4/5] lg:aspect-[3/4] group">
										<div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-muted to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10" />
										<Image
											src="/photos/website-photo-4.jpg"
											alt="Community building"
											fill
											className="object-cover rounded-2xl transition-transform duration-300 group-hover:scale-[1.02]"
											sizes="(max-width: 1024px) 100vw, 40vw"
										/>
									</div>
								</div>
							</div>
							<div className="lg:col-span-7 order-1 lg:order-2 space-y-12">
								<div className="space-y-6">
									<h2 className="text-3xl lg:text-5xl xl:text-6xl font-bold tracking-tight">
										As a community builder
									</h2>
									<div className="space-y-4 text-lg leading-relaxed text-muted-foreground">
										<p>
											I started Tierra Libre Run because I saw a gap. Trail running is an incredible sport, but it hasn&apos;t always been accessible to runners of color. The barriers are real. Financial constraints, lack of representation, simply not knowing where to start.
										</p>
										<p>
											Tierra Libre Run is a nonprofit that makes trail running more accessible. We sponsor runners, provide funding for race entries, offer community support, and partner with races across the Pacific Northwest to create more inclusive spaces.
										</p>
										<p>
											This work has taught me that building community isn&apos;t about grand gestures. It&apos;s about showing up consistently, listening deeply, and creating spaces where people can bring their whole selves. The same principles apply to building software products. The best communities, like the best products, are built with intention and care.
										</p>
									</div>
								</div>
							</div>
						</div>
					</Container>
				</section>

				{/* Athlete Section */}
				<section className="py-24 lg:py-32 border-t border-border">
					<Container size="lg">
						<div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-start">
							<div className="lg:col-span-7 space-y-12">
								<div className="space-y-6">
									<h2 className="text-3xl lg:text-5xl xl:text-6xl font-bold tracking-tight">
										As an athlete
									</h2>
									<div className="space-y-4 text-lg leading-relaxed text-muted-foreground">
										<p>
											I&apos;m a semi-professional trail runner. The trails have taught me about persistence, about problem-solving when things get hard, and about the importance of showing up even when you don&apos;t feel like it.
										</p>
										<p>
											Running has also given me a deep appreciation for the outdoor industry and the communities it serves. I understand firsthand what athletes need from the products and platforms they use. I know what it feels like to train for months for a race, to balance training with work, and to navigate the complexities of being a runner of color in a space that hasn&apos;t always felt welcoming.
										</p>
										<p>
											This perspective directly informs my work. When I build platforms for athletes or create products for the outdoor industry, I&apos;m not just building as a technologist. I&apos;m building as someone who lives in this world, who understands its nuances, and who cares deeply about making it better.
										</p>
									</div>
								</div>
							</div>
							<div className="lg:col-span-5">
								<div className="sticky top-32">
									<div className="relative aspect-[4/5] lg:aspect-[3/4] group">
										<div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-muted to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10" />
										<Image
											src="/photos/website-photo-11.jpg"
											alt="Trail running"
											fill
											className="object-cover rounded-2xl transition-transform duration-300 group-hover:scale-[1.02]"
											sizes="(max-width: 1024px) 100vw, 40vw"
										/>
									</div>
								</div>
							</div>
						</div>
					</Container>
				</section>

				{/* Closing Section */}
				<section className="py-24 lg:py-32 border-t border-border">
					<Container size="lg">
						<div className="max-w-3xl space-y-6 text-lg lg:text-xl leading-relaxed text-muted-foreground">
							<p>
								These three roles, engineer, community builder, athlete, aren&apos;t separate. They&apos;re all part of how I approach the world and how I do my work. They inform each other, challenge each other, and make me better at all of them.
							</p>
							<p>
								If you&apos;re working on something in the outdoor industry, if you&apos;re building community, or if you&apos;re trying to create technology that serves people better, I&apos;d love to hear about it. Let&apos;s talk.
							</p>
						</div>
					</Container>
				</section>
			</main>
		</>
	)
}

