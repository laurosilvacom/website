import {Suspense} from 'react'
import Link from 'next/link'
import Container from '@/shared/components/container'
import {formatDate, getBlogPosts} from '@/features/blog/server'
import {type BlogPost} from '@/features/blog/server'
import {getCaseStudies} from '@/features/work/server'
import {ArrowRight} from 'lucide-react'

async function BlogPosts() {
	const allBlogs = await getBlogPosts()
	const latestPosts = allBlogs
		.sort(
			(a: BlogPost, b: BlogPost) =>
				new Date(b.metadata.publishedAt).getTime() -
				new Date(a.metadata.publishedAt).getTime(),
		)
		.slice(0, 3)

	return (
		<div className="space-y-6">
			{latestPosts.map((post) => (
				<Link
					key={post.slug}
					href={`/blog/${post.slug}`}
					className="group block transition-opacity hover:opacity-60">
					<p className="text-foreground text-sm leading-snug font-medium">
						{post.metadata.title}
					</p>
					<p className="text-muted-foreground mt-0.5 text-xs">
						{formatDate(post.metadata.publishedAt, false)}
					</p>
				</Link>
			))}
		</div>
	)
}

async function SelectedWork() {
	const caseStudies = await getCaseStudies()
	const featuredStudies = caseStudies.slice(0, 4)

	return (
		<div className="space-y-1">
			{featuredStudies.map((study) => (
				<Link
					key={study.slug}
					href={`/work/${study.slug}`}
					className="group flex items-center justify-between gap-4 py-4 transition-opacity hover:opacity-70">
					<div className="min-w-0 space-y-1">
						<p className="text-foreground text-sm font-medium">{study.client}</p>
						<p className="text-muted-foreground text-xs">
							{study.title} · {study.type}
						</p>
					</div>
					<ArrowRight className="text-muted-foreground h-3.5 w-3.5 shrink-0 opacity-0 transition-opacity group-hover:opacity-100" />
				</Link>
			))}
		</div>
	)
}

function BlogPostsFallback() {
	return (
		<div className="space-y-6">
			{Array.from({length: 3}).map((_, i) => (
				<div key={i}>
					<div className="bg-muted h-4 w-48 animate-pulse rounded" />
				</div>
			))}
		</div>
	)
}

function SelectedWorkFallback() {
	return (
		<div className="space-y-6">
			{Array.from({length: 4}).map((_, i) => (
				<div key={i}>
					<div className="bg-muted h-4 w-56 animate-pulse rounded" />
				</div>
			))}
		</div>
	)
}

export default async function Page() {
	return (
		<>
			{/* Header */}
			<section className="pt-28 pb-12 lg:pt-32 lg:pb-16">
				<Container>
					<div className="space-y-4">
						<h1 className="text-2xl font-normal tracking-tight sm:text-3xl">
							Senior software engineer and developer educator
						</h1>
						<p className="text-muted-foreground text-base leading-relaxed">
							I help teams ship better software and level up their engineers through
							hands-on delivery, technical leadership, and practical training.
						</p>
					</div>
				</Container>
			</section>

			{/* Selected Work */}
			<section className="pb-16 lg:pb-20">
				<Container>
					<div className="mb-6 flex items-center justify-between">
						<h2 className="text-foreground text-xs font-medium uppercase tracking-widest">
							Selected Work
						</h2>
						<Link
							href="/work"
							className="text-muted-foreground hover:text-foreground text-xs transition-colors">
							All case studies
						</Link>
					</div>
					<Suspense fallback={<SelectedWorkFallback />}>
						<SelectedWork />
					</Suspense>
				</Container>
			</section>

			{/* Recent Writing */}
			<section className="pb-16 lg:pb-20">
				<Container>
					<div className="mb-6 flex items-center justify-between">
						<h2 className="text-foreground text-xs font-medium uppercase tracking-widest">
							Recent Writing
						</h2>
						<Link
							href="/blog"
							className="text-muted-foreground hover:text-foreground text-xs transition-colors">
							All posts
						</Link>
					</div>
					<Suspense fallback={<BlogPostsFallback />}>
						<BlogPosts />
					</Suspense>
				</Container>
			</section>
		</>
	)
}
