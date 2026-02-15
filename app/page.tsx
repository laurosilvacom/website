import {Suspense} from 'react'
import Link from 'next/link'
import Image from 'next/image'
import Container from '@/shared/components/container'
import {formatDate, getBlogPosts} from '@/features/blog/server'
import {ArrowRight} from 'lucide-react'
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

const clients = [
	{name: 'Google', domain: 'google.com'},
	{name: "O'Reilly", domain: 'oreilly.com'},
	{name: 'Sentry', domain: 'sentry.io'},
	{name: 'HOKA', domain: 'hoka.com'},
	{name: 'egghead', domain: 'egghead.io'},
	{name: 'Test Double', domain: 'testdouble.com'},
]

const work = [
	{
		client: 'Google',
		domain: 'google.com',
		role: 'Developer Education Platform',
		type: 'Development & Education',
		href: '/work/google',
	},
	{
		client: "O'Reilly",
		domain: 'oreilly.com',
		role: 'Live Technical Workshops',
		type: 'Developer Training',
		href: '/work/oreilly',
	},
	{
		client: 'Sentry',
		domain: 'sentry.io',
		role: 'Developer Experience & Education',
		type: 'Development & Education',
		href: '/work/sentry',
	},
	{
		client: 'HOKA',
		domain: 'hoka.com',
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
							Senior full-stack engineer and developer educator. Building
							products and teaching the teams behind them.
						</p>
					</div>
				</Container>
			</section>

			{/* Hero Image */}
			<section className="border-border border-t py-10 lg:py-14">
				<Container width="base">
					<div className="relative aspect-21/9 overflow-hidden rounded-xl">
						<Image
							src="/photos/website-photo-1.jpg"
							alt="Lauro Silva"
							fill
							priority
							className="object-cover object-top"
							sizes="(min-width: 1024px) 1080px, 100vw"
						/>
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
						{clients.map((client) => (
							<span
								key={client.name}
								className="group flex items-center gap-2">
								<Image
									src={`https://www.google.com/s2/favicons?domain=${client.domain}&sz=64`}
									alt=""
									width={16}
									height={16}
									unoptimized
									className="h-4 w-4 rounded-sm opacity-50 grayscale group-hover:opacity-100 group-hover:grayscale-0"
								/>
								<span className="text-foreground/80 text-sm font-medium">
									{client.name}
								</span>
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
								desc: 'Production software with React, Next.js, TypeScript. Architecture to deployment.',
								href: '/work',
							},
							{
								n: '02',
								title: 'Lead',
								desc: 'Architecture reviews, technical strategy, code audits. The decisions that shape products.',
								href: '/work',
							},
							{
								n: '03',
								title: 'Teach',
								desc: "Workshops and training for engineering teams. O'Reilly, egghead, Google.",
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
								<ArrowRight className="text-muted-foreground mt-6 h-3.5 w-3.5 opacity-0 transition-opacity group-hover:opacity-100" />
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
									<p className="text-muted-foreground flex items-center gap-1.5 text-xs">
										<Image
											src={`https://www.google.com/s2/favicons?domain=${item.domain}&sz=64`}
											alt=""
											width={12}
											height={12}
											unoptimized
											className="h-3 w-3 rounded-sm opacity-50 grayscale group-hover:opacity-100 group-hover:grayscale-0"
										/>
										{item.client}
									</p>
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

		</>
	)
}
