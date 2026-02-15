import {Suspense} from 'react'
import Link from 'next/link'
import Container from '@/shared/components/container'
import {formatDate, getBlogPosts} from '@/features/blog/server'
import {ArrowRight, ArrowUpRight} from 'lucide-react'
import {type BlogPost} from '@/features/blog/server'

async function RecentPosts() {
	const allBlogs = await getBlogPosts()
	const latestPosts = allBlogs
		.sort(
			(a: BlogPost, b: BlogPost) =>
				new Date(b.metadata.publishedAt).getTime() -
				new Date(a.metadata.publishedAt).getTime(),
		)
		.slice(0, 5)

	return (
		<div className="divide-border divide-y">
			{latestPosts.map((post) => (
				<Link
					key={post.slug}
					href={`/blog/${post.slug}`}
					className="group flex items-baseline justify-between gap-6 py-3 transition-opacity hover:opacity-70">
					<span className="text-foreground min-w-0 truncate text-sm">
						{post.metadata.title}
					</span>
					<time className="text-muted-foreground shrink-0 font-mono text-xs tabular-nums">
						{formatDate(post.metadata.publishedAt, false)}
					</time>
				</Link>
			))}
		</div>
	)
}

function PostsFallback() {
	return (
		<div className="divide-border divide-y">
			{Array.from({length: 5}).map((_, i) => (
				<div key={i} className="flex items-center justify-between gap-6 py-3">
					<div className="bg-muted h-4 w-64 animate-pulse rounded" />
					<div className="bg-muted h-3 w-20 animate-pulse rounded" />
				</div>
			))}
		</div>
	)
}

const clients = ['Google', "O'Reilly", 'Sentry', 'HOKA', 'egghead', 'Test Double']

const work = [
	{
		client: 'Google',
		role: 'Developer Education Platform',
		type: 'Development & Education',
		href: '/work/google',
	},
	{
		client: "O'Reilly",
		role: 'Live Technical Workshops',
		type: 'Developer Training',
		href: '/work/oreilly',
	},
	{
		client: 'Sentry',
		role: 'Developer Experience & Education',
		type: 'Development & Education',
		href: '/work/sentry',
	},
	{
		client: 'HOKA',
		role: 'Full-Stack Product Development',
		type: 'Full-Stack Development',
		href: '/work/hoka',
	},
]

export default async function Page() {
	return (
		<>
			{/* Hero */}
			<section className="pt-40 pb-20 lg:pt-48 lg:pb-24">
				<Container width="base">
					<div className="animate-in fade-in slide-in-from-bottom-4 max-w-3xl space-y-6 duration-1000">
						<h1 className="text-4xl leading-[1.08] font-bold tracking-tight sm:text-5xl lg:text-6xl">
							Ship products.
							<br />
							Level up teams.
						</h1>
						<p className="text-muted-foreground max-w-xl text-lg leading-relaxed">
							Senior full-stack engineer and developer educator. I help
							companies ship better software and level up their engineering
							teams.
						</p>
						<div className="flex flex-wrap items-center gap-4 pt-2">
							<Link
								href="/work"
								className="bg-primary text-primary-foreground hover:bg-primary/90 inline-flex items-center gap-2 rounded-lg px-4 py-2.5 text-sm font-medium transition-colors">
								See my work
								<ArrowRight className="h-3.5 w-3.5" />
							</Link>
							<Link
								href="https://cal.com/laurosilvacom/chat"
								target="_blank"
								rel="noopener noreferrer"
								className="text-muted-foreground hover:text-foreground inline-flex items-center gap-1.5 text-sm font-medium transition-colors">
								Schedule a call
								<ArrowUpRight className="h-3.5 w-3.5" />
							</Link>
						</div>
					</div>
				</Container>
			</section>

			{/* Clients */}
			<section className="border-border border-y">
				<Container width="base">
					<div className="flex flex-wrap items-center gap-x-8 gap-y-2 py-5">
						<span className="text-muted-foreground text-xs font-medium uppercase tracking-wider">
							Worked with
						</span>
						{clients.map((name) => (
							<span
								key={name}
								className="text-foreground/80 text-sm font-medium">
								{name}
							</span>
						))}
					</div>
				</Container>
			</section>

			{/* What I Do */}
			<section className="py-16 lg:py-20">
				<Container width="base">
					<div className="grid gap-px overflow-hidden rounded-xl border border-border md:grid-cols-3">
						{[
							{
								n: '01',
								title: 'Build',
								desc: 'I embed with your team and ship production software. React, Next.js, TypeScript, Node.js — architecture to deployment.',
								href: '/services',
							},
							{
								n: '02',
								title: 'Lead',
								desc: 'Architecture reviews, technical strategy, code audits. Senior guidance without a full-time hire.',
								href: '/services',
							},
							{
								n: '03',
								title: 'Teach',
								desc: 'Workshops and training for engineering teams. Previously taught at O\u2019Reilly and egghead.',
								href: '/teaching',
							},
						].map((item) => (
							<Link
								key={item.n}
								href={item.href}
								className="group bg-card hover:bg-muted/40 flex flex-col justify-between p-6 transition-colors lg:p-8">
								<div>
									<span className="text-muted-foreground font-mono text-[10px] font-medium">
										{item.n}
									</span>
									<h3 className="mt-3 text-lg font-bold">{item.title}</h3>
									<p className="text-muted-foreground mt-2 text-sm leading-relaxed">
										{item.desc}
									</p>
								</div>
								<div className="text-muted-foreground group-hover:text-foreground mt-6 flex items-center gap-1 text-xs font-medium transition-colors">
									Learn more
									<ArrowRight className="h-3 w-3 transition-transform group-hover:translate-x-0.5" />
								</div>
							</Link>
						))}
					</div>
				</Container>
			</section>

			{/* Selected Work */}
			<section className="pb-16 lg:pb-20">
				<Container width="base">
					<div className="flex items-baseline justify-between">
						<h2 className="text-sm font-semibold uppercase tracking-wider">
							Selected Work
						</h2>
						<Link
							href="/work"
							className="text-muted-foreground hover:text-foreground text-xs font-medium transition-colors">
							View all →
						</Link>
					</div>
					<div className="divide-border mt-4 divide-y">
						{work.map((item) => (
							<Link
								key={item.client}
								href={item.href}
								className="group flex items-center justify-between gap-4 py-4 transition-opacity hover:opacity-70">
								<div className="min-w-0">
									<span className="text-foreground text-sm font-medium">
										{item.role}
									</span>
									<p className="text-muted-foreground text-xs">{item.client}</p>
								</div>
								<div className="flex shrink-0 items-center gap-3">
									<span className="text-muted-foreground hidden text-xs sm:inline">
										{item.type}
									</span>
									<ArrowRight className="text-muted-foreground h-3.5 w-3.5 opacity-0 transition-opacity group-hover:opacity-100" />
								</div>
							</Link>
						))}
					</div>
				</Container>
			</section>

			{/* Writing */}
			<section className="border-border border-t py-16 lg:py-20">
				<Container width="base">
					<div className="flex items-baseline justify-between">
						<h2 className="text-sm font-semibold uppercase tracking-wider">
							Writing
						</h2>
						<Link
							href="/blog"
							className="text-muted-foreground hover:text-foreground text-xs font-medium transition-colors">
							View all →
						</Link>
					</div>
					<div className="mt-4">
						<Suspense fallback={<PostsFallback />}>
							<RecentPosts />
						</Suspense>
					</div>
				</Container>
			</section>

			{/* CTA */}
			<section className="border-border border-t py-16 lg:py-20">
				<Container width="base">
					<div className="flex flex-col items-start gap-4 sm:flex-row sm:items-center sm:justify-between">
						<div>
							<p className="text-foreground text-sm font-medium">
								Have a project in mind?
							</p>
							<p className="text-muted-foreground text-sm">
								I&apos;m available for new engagements and team training.
							</p>
						</div>
						<div className="flex items-center gap-4">
							<Link
								href="/services"
								className="text-muted-foreground hover:text-foreground text-sm font-medium transition-colors">
								Services
							</Link>
							<Link
								href="https://cal.com/laurosilvacom/chat"
								target="_blank"
								rel="noopener noreferrer"
								className="bg-primary text-primary-foreground hover:bg-primary/90 inline-flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium transition-colors">
								Let&apos;s talk
								<ArrowUpRight className="h-3.5 w-3.5" />
							</Link>
						</div>
					</div>
				</Container>
			</section>
		</>
	)
}
