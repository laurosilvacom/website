import {ArrowRight} from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import Container from '@/components/container'
import {Button} from '@/components/ui/button'

export default function AthletesPage() {
	return (
		<>
			{/* Hero Section */}
			<section className="border-border border-b pt-32 pb-24 lg:pt-40 lg:pb-32">
				<Container width="base">
					<div className="mx-auto max-w-4xl space-y-12 text-center">
						{/* Status Badge */}
						<div className="inline-flex">
							<div className="bg-muted text-primary border-border inline-flex items-center gap-2 rounded-full border px-4 py-2">
								<div className="bg-primary h-2 w-2 animate-pulse rounded-full" />
								<span className="text-sm font-medium">
									Available for new projects
								</span>
							</div>
						</div>

						{/* Heading and Description */}
						<div className="space-y-8">
							<h1 className="text-5xl leading-[1.1] font-bold tracking-tight lg:text-6xl xl:text-7xl">
								Your Brand,
								<br />
								<span className="text-primary">Your Platform</span>
							</h1>

							<p className="text-muted-foreground mx-auto max-w-2xl text-xl leading-relaxed">
								Custom platforms built specifically for professional athletes.
								Not templates. Not rentals. Complete solutions you own that grow
								with your career and connect with your community.
							</p>
						</div>

						{/* CTA */}
						<div className="pt-4">
							<Button asChild size="lg" className="group">
								<Link
									href="https://cal.com/laurosilvacom/chat"
									target="_blank"
									rel="noopener noreferrer">
									Schedule a consultation
									<ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
								</Link>
							</Button>
						</div>
					</div>
				</Container>
			</section>

			{/* Hero Image */}
			<section className="border-border border-b py-16 lg:py-24">
				<Container width="base">
					<div className="relative aspect-16/10 overflow-hidden rounded-2xl lg:aspect-21/9">
						<Image
							src="/photos/website-photo-12.jpg"
							alt="Custom athlete platforms"
							fill
							className="object-cover"
							style={{objectPosition: 'center middle'}}
							priority
							sizes="100vw"
						/>
					</div>
				</Container>
			</section>

			{/* Philosophy */}
			<section className="border-border border-b py-24 lg:py-32">
				<Container width="base">
					<div className="space-y-8">
						<div className="space-y-4">
							<div className="inline-flex items-center gap-2">
								<div className="bg-primary h-2 w-2 rounded-full" />
								<span className="text-muted-foreground text-sm font-medium tracking-wide uppercase">
									Philosophy
								</span>
							</div>
							<h2 className="text-3xl font-bold tracking-tight lg:text-4xl">
								What I believe
							</h2>
						</div>

						<div className="text-muted-foreground space-y-6 text-lg leading-relaxed">
							<p>
								I believe that pro athletes in the outdoor industry deserve
								better digital platforms. Not template sites. Not generic
								solutions. Custom technology built specifically to support your
								career and connect with your community in authentic ways.
							</p>
							<p>
								Your platform should reflect your story, support your goals, and
								grow with your career. It should be something you own, something
								you control, and something that serves you—not the other way
								around.
							</p>
							<p>
								I build platforms that matter. Technology that helps you connect
								more deeply with your audience, share what you care about, and
								build a sustainable career doing what you love.
							</p>
						</div>
					</div>
				</Container>
			</section>

			{/* Who I Work With */}
			<section className="border-border border-b py-24 lg:py-32">
				<Container width="base">
					<div className="space-y-12">
						<div className="space-y-4">
							<div className="inline-flex items-center gap-2">
								<div className="bg-primary h-2 w-2 rounded-full" />
								<span className="text-muted-foreground text-sm font-medium tracking-wide uppercase">
									Who I Work With
								</span>
							</div>
							<h2 className="text-3xl font-bold tracking-tight lg:text-4xl">
								You might be a good fit if
							</h2>
						</div>

						<div className="grid gap-8 md:grid-cols-2">
							<div className="border-border bg-muted/50 space-y-4 rounded-2xl border p-8">
								<div className="bg-primary/10 text-primary inline-flex h-12 w-12 items-center justify-center rounded-xl">
									<svg
										xmlns="http://www.w3.org/2000/svg"
										fill="none"
										viewBox="0 0 24 24"
										strokeWidth={2}
										stroke="currentColor"
										className="h-6 w-6">
										<path
											strokeLinecap="round"
											strokeLinejoin="round"
											d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
										/>
									</svg>
								</div>
								<h3 className="text-xl font-semibold">
									You&apos;re a professional athlete
								</h3>
								<p className="text-muted-foreground leading-relaxed">
									You compete in trail running, climbing, cycling, or other
									outdoor sports. You&apos;re building a career and need
									technology that supports your brand.
								</p>
							</div>

							<div className="border-border bg-muted/50 space-y-4 rounded-2xl border p-8">
								<div className="bg-primary/10 text-primary inline-flex h-12 w-12 items-center justify-center rounded-xl">
									<svg
										xmlns="http://www.w3.org/2000/svg"
										fill="none"
										viewBox="0 0 24 24"
										strokeWidth={2}
										stroke="currentColor"
										className="h-6 w-6">
										<path
											strokeLinecap="round"
											strokeLinejoin="round"
											d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
										/>
									</svg>
								</div>
								<h3 className="text-xl font-semibold">
									You want to own your platform
								</h3>
								<p className="text-muted-foreground leading-relaxed">
									You&apos;re ready to invest in custom technology that you
									control. Not a template, not a rental—something built
									specifically for you.
								</p>
							</div>

							<div className="border-border bg-muted/50 space-y-4 rounded-2xl border p-8">
								<div className="bg-primary/10 text-primary inline-flex h-12 w-12 items-center justify-center rounded-xl">
									<svg
										xmlns="http://www.w3.org/2000/svg"
										fill="none"
										viewBox="0 0 24 24"
										strokeWidth={2}
										stroke="currentColor"
										className="h-6 w-6">
										<path
											strokeLinecap="round"
											strokeLinejoin="round"
											d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
										/>
									</svg>
								</div>
								<h3 className="text-xl font-semibold">
									You value authentic connection
								</h3>
								<p className="text-muted-foreground leading-relaxed">
									You want technology that helps you connect more deeply with
									your community, not just collect followers. Real relationships
									matter.
								</p>
							</div>

							<div className="border-border bg-muted/50 space-y-4 rounded-2xl border p-8">
								<div className="bg-primary/10 text-primary inline-flex h-12 w-12 items-center justify-center rounded-xl">
									<svg
										xmlns="http://www.w3.org/2000/svg"
										fill="none"
										viewBox="0 0 24 24"
										strokeWidth={2}
										stroke="currentColor"
										className="h-6 w-6">
										<path
											strokeLinecap="round"
											strokeLinejoin="round"
											d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
										/>
									</svg>
								</div>
								<h3 className="text-xl font-semibold">
									You&apos;re thinking long-term
								</h3>
								<p className="text-muted-foreground leading-relaxed">
									You&apos;re building a career, not just chasing short-term
									gains. You need a platform that can grow and evolve with you
									over time.
								</p>
							</div>
						</div>
					</div>
				</Container>
			</section>

			{/* What We Build */}
			<section className="border-border border-b py-24 lg:py-32">
				<Container width="base">
					<div className="space-y-12">
						<div className="space-y-4">
							<div className="inline-flex items-center gap-2">
								<div className="bg-primary h-2 w-2 rounded-full" />
								<span className="text-muted-foreground text-sm font-medium tracking-wide uppercase">
									What We Build
								</span>
							</div>
							<h2 className="text-3xl font-bold tracking-tight lg:text-4xl">
								Your platform, built for you
							</h2>
							<p className="text-muted-foreground max-w-3xl text-lg leading-relaxed">
								Every platform is custom-built for your specific needs. Here are
								some of the things we typically include:
							</p>
						</div>

						<div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
							{[
								{
									title: 'Race Schedule & Results',
									description:
										'Showcase your upcoming races, past performances, and achievements. Keep your community updated on where and when they can follow you.'
								},
								{
									title: 'Media & Press Kit',
									description:
										'Professional media resources for sponsors and press. High-quality images, race stats, biography, and brand assets all in one place.'
								},
								{
									title: 'Blog & Storytelling',
									description:
										'Share your journey through writing. Race reports, training updates, personal stories. Your voice, your platform.'
								},
								{
									title: 'Sponsor Showcase',
									description:
										'Highlight the brands that support you. Build stronger relationships with current sponsors and attract new partnerships.'
								},
								{
									title: 'Training & Coaching',
									description:
										'Offer coaching services, training plans, or educational content. Share your expertise and build additional revenue streams.'
								},
								{
									title: 'Community Features',
									description:
										'Newsletter signup, social media integration, and ways for your community to connect with you and support your journey.'
								}
							].map((feature, index) => (
								<div
									key={index}
									className="border-border bg-muted/50 space-y-3 rounded-2xl border p-6">
									<h3 className="text-lg font-semibold">{feature.title}</h3>
									<p className="text-muted-foreground text-sm leading-relaxed">
										{feature.description}
									</p>
								</div>
							))}
						</div>

						<div className="border-border bg-primary/5 rounded-2xl border p-8">
							<div className="space-y-4">
								<h3 className="text-xl font-semibold">
									Plus Strategy & Consulting
								</h3>
								<p className="text-muted-foreground leading-relaxed">
									Beyond the technical build, I provide consulting on content
									strategy, brand narrative, and how your platform fits into
									your broader career goals. We work together to create
									something that serves your needs now and can grow with you in
									the future.
								</p>
							</div>
						</div>
					</div>
				</Container>
			</section>

			{/* Process */}
			<section className="border-border border-b py-24 lg:py-32">
				<Container width="base">
					<div className="space-y-12">
						<div className="space-y-4">
							<div className="inline-flex items-center gap-2">
								<div className="bg-primary h-2 w-2 rounded-full" />
								<span className="text-muted-foreground text-sm font-medium tracking-wide uppercase">
									Process
								</span>
							</div>
							<h2 className="text-3xl font-bold tracking-tight lg:text-4xl">
								How we work together
							</h2>
						</div>

						<div className="space-y-6">
							{[
								{
									number: '01',
									title: 'Discovery',
									description:
										"We start with a conversation. I want to understand your story, your goals, and what success looks like for you. What do you need from your platform? What's your content strategy? How does this fit into your broader career?"
								},
								{
									number: '02',
									title: 'Strategy',
									description:
										'Together we define the platform architecture, content structure, and technical approach. I provide recommendations based on what I know works, but ultimately we build what serves your specific needs.'
								},
								{
									number: '03',
									title: 'Development',
									description:
										'I build your platform using modern web technologies. Throughout development, we stay in close communication. You see progress regularly and have input on how things work and feel.'
								},
								{
									number: '04',
									title: 'Launch & Support',
									description:
										'We launch your platform and I provide training on how to manage and update it. You own everything—code, content, domain. I stay available for ongoing support as your needs evolve.'
								}
							].map((step, index) => (
								<div
									key={index}
									className="border-border bg-muted/50 grid gap-6 rounded-2xl border p-8 md:grid-cols-12">
									<div className="md:col-span-2">
										<span className="text-primary/40 text-5xl font-bold">
											{step.number}
										</span>
									</div>
									<div className="space-y-3 md:col-span-10">
										<h3 className="text-xl font-semibold">{step.title}</h3>
										<p className="text-muted-foreground leading-relaxed">
											{step.description}
										</p>
									</div>
								</div>
							))}
						</div>
					</div>
				</Container>
			</section>

			{/* Testimonials */}
			<section className="border-border border-b py-24 lg:py-32">
				<Container width="base">
					<div className="space-y-12">
						<div className="space-y-4">
							<div className="inline-flex items-center gap-2">
								<div className="bg-primary h-2 w-2 rounded-full" />
								<span className="text-muted-foreground text-sm font-medium tracking-wide uppercase">
									What Athletes Say
								</span>
							</div>
						</div>

						<div className="grid gap-8 md:grid-cols-2">
							<blockquote className="border-border bg-muted/50 space-y-6 rounded-2xl border p-8">
								<div className="text-primary">
									<svg
										xmlns="http://www.w3.org/2000/svg"
										fill="currentColor"
										viewBox="0 0 24 24"
										className="h-8 w-8">
										<path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
									</svg>
								</div>
								<p className="text-foreground text-base leading-relaxed lg:text-lg">
									Lauro&apos;s expertise bridges technology and brand strategy.
									He understands how to connect technical excellence with
									authentic storytelling.
								</p>
								<div className="border-border flex items-center gap-3 border-t pt-6">
									<div className="relative h-12 w-12 shrink-0 overflow-hidden rounded-full">
										<Image
											src="https://res.cloudinary.com/laurosilvacom/image/upload/v1731436030/laurosilvacom/hire-me-page/ru1j6csfgvj2af4b1dn6.webp"
											alt="Emily Schmitz"
											fill
											className="object-cover"
										/>
									</div>
									<div className="space-y-1">
										<p className="text-sm font-semibold">Emily Schmitz</p>
										<p className="text-muted-foreground text-xs">
											HOKA Athlete
										</p>
									</div>
								</div>
							</blockquote>

							<blockquote className="border-border bg-muted/50 space-y-6 rounded-2xl border p-8">
								<div className="text-primary">
									<svg
										xmlns="http://www.w3.org/2000/svg"
										fill="currentColor"
										viewBox="0 0 24 24"
										className="h-8 w-8">
										<path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
									</svg>
								</div>
								<p className="text-foreground text-base leading-relaxed lg:text-lg">
									Lauro is an incredible engineer with a deep understanding of
									how to leverage technology for social good. His expertise has
									been invaluable.
								</p>
								<div className="border-border flex items-center gap-3 border-t pt-6">
									<div className="relative h-12 w-12 shrink-0 overflow-hidden rounded-full">
										<Image
											src="https://res.cloudinary.com/laurosilvacom/image/upload/v1731435977/laurosilvacom/hire-me-page/gbwkf4uzwmxomngxhkj6.png"
											alt="Anya Yeager"
											fill
											className="object-cover"
										/>
									</div>
									<div className="space-y-1">
										<p className="text-sm font-semibold">Anya Yeager</p>
										<p className="text-muted-foreground text-xs">
											LOTUS Humanitarian
										</p>
									</div>
								</div>
							</blockquote>
						</div>
					</div>
				</Container>
			</section>

			{/* CTA */}
			<section className="py-24 lg:py-32">
				<Container width="base">
					<div className="border-border bg-muted/50 space-y-8 rounded-2xl border p-12 text-center lg:p-16">
						<div className="space-y-6">
							<h2 className="text-3xl font-bold tracking-tight lg:text-5xl">
								Ready to build your platform?
							</h2>
							<p className="text-muted-foreground mx-auto max-w-2xl text-lg leading-relaxed lg:text-xl">
								Let&apos;s discuss how I can help you create a custom platform
								that supports your brand and connects with your community.
							</p>
						</div>
						<div className="pt-4">
							<Button asChild size="lg" className="group">
								<Link
									href="https://cal.com/laurosilvacom/chat"
									target="_blank"
									rel="noopener noreferrer">
									Schedule a free consultation
									<ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
								</Link>
							</Button>
						</div>
					</div>
				</Container>
			</section>
		</>
	)
}
