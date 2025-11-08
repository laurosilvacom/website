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
		<Container>
			<StructuredData
				type="website"
				title="About - Lauro Silva"
				description="Software engineer, community builder, and trail runner working at the intersection of technology, education, and the outdoor industry."
				url="/about"
			/>
			<main>
				{/* Hero Section */}
				<section className="py-24">
					<div className="space-y-8 max-w-2xl">
						<div className="space-y-6">
							<h1 className="text-xl font-semibold leading-tight sm:text-2xl tracking-tight">
								Building at the intersection of code, community, and trails
							</h1>
							<div className="space-y-4">
								<p className="text-base leading-relaxed sm:text-lg text-foreground">
									I&apos;m Lauro Silva. I write software, build communities, and run trails. These three things aren&apos;t separate parts of my life. They inform and strengthen each other in ways that continue to surprise me.
								</p>
								<p className="text-base leading-relaxed sm:text-lg text-muted-foreground">
									The same curiosity that drives me to understand how systems work in code also pushes me to understand how communities form and grow. The discipline and problem-solving I learn on long trail runs translates directly to how I approach building products. And the values I hold as an athlete, accessibility, inclusion, and genuine connection, are the same values I bring to my work.
								</p>
							</div>
						</div>
					</div>
				</section>

				{/* Photo */}
				<section className="py-12">
					<div className="max-w-2xl">
						<div className="relative w-full aspect-[4/3] rounded-lg overflow-hidden">
							<Image
								src="/photos/website-photo-6.jpg"
								alt="Lauro Silva"
								fill
								className="object-cover"
								sizes="(max-width: 768px) 100vw, 680px"
							/>
						</div>
					</div>
				</section>

				{/* Values Section */}
				<section className="py-24">
					<div className="space-y-16 max-w-2xl">
						<div className="space-y-6">
							<h2 className="text-lg font-semibold leading-tight sm:text-xl tracking-tight">
								What I believe
							</h2>
							<div className="space-y-4">
								<p className="text-base leading-relaxed text-foreground">
									Technology should serve people, not the other way around. The best software I&apos;ve built has always started with understanding the humans who will use it. Their needs, their constraints, their aspirations.
								</p>
								<p className="text-base leading-relaxed text-muted-foreground">
									I believe in building things that matter. That means working with organizations and people who are trying to make the outdoor industry more accessible, more inclusive, and more connected. It means writing code that solves real problems, not just technical ones.
								</p>
								<p className="text-base leading-relaxed text-muted-foreground">
									And I believe that the best work happens when you bring your whole self to it. My identity as a runner of color, as someone who has built community from the ground up, and as a technologist. These aren&apos;t separate things. They&apos;re all part of how I see the world and how I build.
								</p>
							</div>
						</div>
					</div>
				</section>

				{/* Software Engineer Section */}
				<section className="py-24">
					<div className="space-y-16 max-w-2xl">
						<div className="relative">
							<div className="absolute left-0 top-0 bottom-0 w-1 bg-primary/20 rounded-full" />
							<div className="pl-8 space-y-12">
								<div className="space-y-6">
									<h2 className="text-lg font-semibold leading-tight sm:text-xl tracking-tight">
										As a software engineer
									</h2>
									<div className="space-y-4">
										<p className="text-base leading-relaxed text-foreground">
											I build products for the outdoor industry. My focus is on creating software that helps brands, athletes, and communities connect more meaningfully with their audiences.
										</p>
										<p className="text-base leading-relaxed text-muted-foreground">
											I&apos;ve worked with teams at Google, O&apos;Reilly, Sentry, and HOKA to build better digital experiences. I&apos;ve created learning platforms like &quot;Outdoor Brand Camp&quot; and community products that bring people together around shared passions.
										</p>
										<p className="text-base leading-relaxed text-muted-foreground">
											My technical expertise is in React, Next.js, TypeScript, and Node.js. But more than the tools, I care about building software that&apos;s maintainable, thoughtful, and genuinely useful. I understand that great products come from understanding both the technology and the people who use it.
										</p>
									</div>
								</div>

								{/* Photo */}
								<div className="relative w-full aspect-[4/3] rounded-lg overflow-hidden">
									<Image
										src="/photos/website-photo-9.jpg"
										alt=""
										fill
										className="object-cover"
										sizes="(max-width: 768px) 100vw, 680px"
									/>
								</div>
							</div>
						</div>
					</div>
				</section>

				{/* Community Builder Section */}
				<section className="py-24">
					<div className="space-y-16 max-w-2xl">
						<div className="relative">
							<div className="absolute left-0 top-0 bottom-0 w-1 bg-primary/20 rounded-full" />
							<div className="pl-8 space-y-12">
								<div className="space-y-6">
									<h2 className="text-lg font-semibold leading-tight sm:text-xl tracking-tight">
										As a community builder
									</h2>
									<div className="space-y-4">
										<p className="text-base leading-relaxed text-foreground">
											I started Tierra Libre Run because I saw a gap. Trail running is an incredible sport, but it hasn&apos;t always been accessible to runners of color. The barriers are real. Financial constraints, lack of representation, simply not knowing where to start.
										</p>
										<p className="text-base leading-relaxed text-muted-foreground">
											Tierra Libre Run is a nonprofit that makes trail running more accessible. We sponsor runners, provide funding for race entries, offer community support, and partner with races across the Pacific Northwest to create more inclusive spaces.
										</p>
										<p className="text-base leading-relaxed text-muted-foreground">
											This work has taught me that building community isn&apos;t about grand gestures. It&apos;s about showing up consistently, listening deeply, and creating spaces where people can bring their whole selves. The same principles apply to building software products. The best communities, like the best products, are built with intention and care.
										</p>
									</div>
								</div>

								{/* Photo */}
								<div className="relative w-full aspect-[4/3] rounded-lg overflow-hidden">
									<Image
										src="/photos/website-photo-4.jpg"
										alt=""
										fill
										className="object-cover"
										sizes="(max-width: 768px) 100vw, 680px"
									/>
								</div>
							</div>
						</div>
					</div>
				</section>

				{/* Athlete Section */}
				<section className="py-24">
					<div className="space-y-16 max-w-2xl">
						<div className="relative">
							<div className="absolute left-0 top-0 bottom-0 w-1 bg-primary/20 rounded-full" />
							<div className="pl-8 space-y-12">
								<div className="space-y-6">
									<h2 className="text-lg font-semibold leading-tight sm:text-xl tracking-tight">
										As an athlete
									</h2>
									<div className="space-y-4">
										<p className="text-base leading-relaxed text-foreground">
											I&apos;m a semi-professional trail runner. The trails have taught me about persistence, about problem-solving when things get hard, and about the importance of showing up even when you don&apos;t feel like it.
										</p>
										<p className="text-base leading-relaxed text-muted-foreground">
											Running has also given me a deep appreciation for the outdoor industry and the communities it serves. I understand firsthand what athletes need from the products and platforms they use. I know what it feels like to train for months for a race, to balance training with work, and to navigate the complexities of being a runner of color in a space that hasn&apos;t always felt welcoming.
										</p>
										<p className="text-base leading-relaxed text-muted-foreground">
											This perspective directly informs my work. When I build platforms for athletes or create products for the outdoor industry, I&apos;m not just building as a technologist. I&apos;m building as someone who lives in this world, who understands its nuances, and who cares deeply about making it better.
										</p>
									</div>
								</div>

								{/* Photo */}
								<div className="relative w-full aspect-[4/3] rounded-lg overflow-hidden">
									<Image
										src="/photos/website-photo-11.jpg"
										alt=""
										fill
										className="object-cover"
										sizes="(max-width: 768px) 100vw, 680px"
									/>
								</div>
							</div>
						</div>
					</div>
				</section>

				{/* Closing Section */}
				<section className="py-24">
					<div className="space-y-8 max-w-2xl">
						<div className="space-y-4">
							<p className="text-base leading-relaxed sm:text-lg text-foreground">
								These three roles, engineer, community builder, athlete, aren&apos;t separate. They&apos;re all part of how I approach the world and how I do my work. They inform each other, challenge each other, and make me better at all of them.
							</p>
							<p className="text-base leading-relaxed sm:text-lg text-muted-foreground">
								If you&apos;re working on something in the outdoor industry, if you&apos;re building community, or if you&apos;re trying to create technology that serves people better, I&apos;d love to hear about it. Let&apos;s talk.
							</p>
						</div>
					</div>
				</section>
			</main>
		</Container>
	)
}

