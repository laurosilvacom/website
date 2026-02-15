import {Suspense} from 'react'
import Link from 'next/link'
import Container from '@/shared/components/container'
import {Button} from '@/shared/ui/button'
import {formatDate, getBlogPosts} from '@/features/blog/server'
import {ArrowRight} from 'lucide-react'
import {type BlogPost} from '@/features/blog/server'

async function BlogPosts() {
	const allBlogs = await getBlogPosts()
	const latestPosts = allBlogs
		.sort(
			(a: BlogPost, b: BlogPost) =>
				new Date(b.metadata.publishedAt).getTime() -
				new Date(a.metadata.publishedAt).getTime(),
		)
		.slice(0, 6)

	return (
		<div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3 lg:gap-12">
			{latestPosts.map((post, index) => (
				<article
					key={post.slug}
					className="group relative"
					style={{
						animationDelay: `${index * 100}ms`,
					}}>
					<Link href={`/blog/${post.slug}`} className="block h-full">
						<div className="border-border-subtle bg-card hover:border-border flex h-full flex-col rounded-2xl border p-6 transition-all duration-200">
							<div className="mb-4">
								<time className="text-muted-foreground text-sm font-medium">
									{formatDate(post.metadata.publishedAt, false)}
								</time>
							</div>
							<h3 className="mb-3 text-2xl leading-tight font-bold transition-colors">
								{post.metadata.title}
							</h3>
							<p className="text-muted-foreground mb-6 line-clamp-3 grow text-base leading-relaxed">
								{post.metadata.summary}
							</p>
							<div className="flex items-center text-sm font-medium transition-all group-hover:gap-2">
								Read more
								<ArrowRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />
							</div>
						</div>
					</Link>
				</article>
			))}
		</div>
	)
}

function BlogPostsFallback() {
	return (
		<div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3 lg:gap-12">
			{Array.from({length: 6}).map((_, i) => (
				<div key={i} className="space-y-4">
					<div className="bg-muted h-4 w-24 animate-pulse rounded" />
					<div className="bg-muted h-8 w-full animate-pulse rounded" />
					<div className="bg-muted h-20 w-full animate-pulse rounded" />
				</div>
			))}
		</div>
	)
}

const clients = ['Google', "O'Reilly", 'Sentry', 'HOKA', 'egghead', 'Test Double']

const caseStudies = [
	{
		client: 'Google',
		title: 'Developer Education Platform',
		summary:
			'Built developer education content and tooling for Google, helping engineers learn and adopt modern web technologies at scale.',
		tags: ['React', 'TypeScript', 'Education'],
		href: '/work/google',
	},
	{
		client: "O'Reilly",
		title: 'Live Workshops for Engineers',
		summary:
			"Designed and delivered live technical workshops on React, TypeScript, and modern web development for O'Reilly's engineering audience.",
		tags: ['Workshops', 'React', 'TypeScript'],
		href: '/work/oreilly',
	},
	{
		client: 'HOKA',
		title: 'Full-Stack Product Development',
		summary:
			'Led full-stack development for digital products at HOKA, building performant web experiences for one of the fastest-growing brands in running.',
		tags: ['Next.js', 'Full-Stack', 'E-commerce'],
		href: '/work/hoka',
	},
]

export default async function Page() {
	return (
		<>
			{/* Hero Section */}
			<section className="px-4 pt-32 pb-16 lg:pt-40 lg:pb-20">
				<div className="mx-auto max-w-5xl text-center">
					<div className="animate-in fade-in slide-in-from-bottom-4 space-y-8 duration-1000">
						<h1 className="text-4xl leading-[1.05] font-bold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl">
							I build products and
							<br />
							teach the teams
							<br />
							behind them.
						</h1>
						<p className="text-muted-foreground mx-auto max-w-2xl text-xl leading-relaxed sm:text-2xl">
							Senior full-stack engineer and developer educator. I help companies ship
							better software and level up their engineering teams.
						</p>
					</div>
					<div className="animate-in fade-in slide-in-from-bottom-4 flex flex-wrap items-center justify-center gap-4 pt-12 delay-150 duration-1000">
						<Button asChild size="lg" className="group">
							<Link href="/work">
								See my work
								<ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
							</Link>
						</Button>
						<Button asChild size="lg" variant="outline">
							<Link
								href="https://cal.com/laurosilvacom/chat"
								target="_blank"
								rel="noopener noreferrer">
								Hire me
							</Link>
						</Button>
					</div>
					<div className="animate-in fade-in slide-in-from-bottom-4 pt-10 delay-200 duration-1000">
						<p className="text-muted-foreground text-sm font-medium">
							{clients.map((name, i) => (
								<span key={name}>
									{name}
									{i < clients.length - 1 && <span className="mx-2.5 opacity-30">·</span>}
								</span>
							))}
						</p>
					</div>
				</div>
			</section>

			{/* What I Do */}
			<section className="py-16 lg:py-20">
				<Container width="base">
					<div className="grid gap-12 md:grid-cols-3 md:gap-16">
						<div className="group space-y-4">
							<span className="text-muted-foreground font-mono text-xs font-medium">
								01
							</span>
							<h3 className="text-2xl font-bold">Build</h3>
							<p className="text-muted-foreground text-lg leading-relaxed">
								I embed with your team and ship production software. React, Next.js,
								TypeScript, Node.js. From architecture to deployment.
							</p>
						</div>

						<div className="group space-y-4">
							<span className="text-muted-foreground font-mono text-xs font-medium">
								02
							</span>
							<h3 className="text-2xl font-bold">Lead</h3>
							<p className="text-muted-foreground text-lg leading-relaxed">
								Architecture reviews, technical strategy, code audits. Senior guidance
								without a full-time hire. I help teams make better decisions.
							</p>
						</div>

						<div className="group space-y-4">
							<span className="text-muted-foreground font-mono text-xs font-medium">
								03
							</span>
							<h3 className="text-2xl font-bold">Teach</h3>
							<p className="text-muted-foreground text-lg leading-relaxed">
								Workshops and training for engineering teams. React, Next.js, TypeScript,
								AI integration. Previously taught at O&apos;Reilly and egghead.
							</p>
						</div>
					</div>
				</Container>
			</section>

			{/* Featured Work */}
			<section className="bg-muted/30 py-24 lg:py-32">
				<Container width="base">
					<div className="space-y-16">
						<div className="flex items-end justify-between">
							<div className="space-y-3">
								<h2 className="text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
									Selected Work
								</h2>
								<p className="text-muted-foreground text-lg">
									Recent projects and engagements
								</p>
							</div>
							<Button variant="ghost" asChild className="hidden lg:flex">
								<Link href="/work">
									View all
									<ArrowRight className="ml-2 h-4 w-4" />
								</Link>
							</Button>
						</div>

						<div className="grid gap-8 md:grid-cols-3">
							{caseStudies.map((study) => (
								<Link key={study.client} href={study.href} className="group block">
									<div className="border-border-subtle bg-card hover:border-border flex h-full flex-col rounded-2xl border p-8 transition-all duration-200">
										<span className="text-muted-foreground mb-3 text-sm font-medium">
											{study.client}
										</span>
										<h3 className="mb-3 text-xl font-bold">{study.title}</h3>
										<p className="text-muted-foreground mb-6 grow text-base leading-relaxed">
											{study.summary}
										</p>
										<div className="flex flex-wrap gap-2">
											{study.tags.map((tag) => (
												<span
													key={tag}
													className="bg-muted text-muted-foreground rounded-full px-3 py-1 font-mono text-xs font-medium">
													{tag}
												</span>
											))}
										</div>
									</div>
								</Link>
							))}
						</div>

						<div className="pt-4 lg:hidden">
							<Button variant="outline" asChild className="w-full">
								<Link href="/work">
									View all work
									<ArrowRight className="ml-2 h-4 w-4" />
								</Link>
							</Button>
						</div>
					</div>
				</Container>
			</section>

			{/* Recent Writings */}
			<section className="py-24 lg:py-32">
				<Container width="wide">
					<div className="space-y-16">
						<div className="flex items-end justify-between">
							<div className="space-y-3">
								<h2 className="text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
									Technical Writing
								</h2>
								<p className="text-muted-foreground text-lg">
									Deep dives into architecture, full-stack patterns, and engineering
									leadership
								</p>
							</div>
							<Button variant="ghost" asChild className="hidden lg:flex">
								<Link href="/blog">
									View all
									<ArrowRight className="ml-2 h-4 w-4" />
								</Link>
							</Button>
						</div>

						<Suspense fallback={<BlogPostsFallback />}>
							<BlogPosts />
						</Suspense>

						<div className="pt-8 lg:hidden">
							<Button variant="outline" asChild className="w-full">
								<Link href="/blog">
									View all posts
									<ArrowRight className="ml-2 h-4 w-4" />
								</Link>
							</Button>
						</div>
					</div>
				</Container>
			</section>

			{/* CTA */}
			<section className="py-24 lg:py-32">
				<Container width="narrow">
					<div className="text-center">
						<p className="text-muted-foreground text-lg leading-relaxed">
							Have a project in mind?{' '}
							<a
								href="https://cal.com/laurosilvacom/chat"
								target="_blank"
								rel="noopener noreferrer"
								className="text-foreground underline underline-offset-4 transition-colors hover:opacity-70">
								Let&apos;s talk
							</a>
							{' · '}
							<Link
								href="/services"
								className="text-foreground underline underline-offset-4 transition-colors hover:opacity-70">
								View services
							</Link>
						</p>
					</div>
				</Container>
			</section>
		</>
	)
}
