import {Suspense} from 'react'
import Link from 'next/link'
import Container from '@/shared/components/container'
import {formatDate, getBlogPosts} from '@/features/blog/server'
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

function BlogPostsFallback() {
	return (
		<div className="space-y-6">
			{Array.from({length: 6}).map((_, i) => (
				<div key={i}>
					<div className="bg-muted h-4 w-48 animate-pulse rounded" />
				</div>
			))}
		</div>
	)
}

export default async function Page() {
	return (
		<>
			{/* Header */}
			<section className="pt-32 pb-16 lg:pt-36 lg:pb-20">
				<Container>
					<div className="space-y-4">
						<h1 className="font-heading text-3xl font-semibold leading-tight tracking-tight sm:text-4xl lg:text-5xl">
							Lauro Silva
						</h1>
						<p className="text-muted-foreground text-base leading-relaxed">
							Senior software engineer helping agencies deliver client work and product
							teams build production-ready web apps. React, Next.js, TypeScript.
						</p>
						<div className="flex items-center gap-4 pt-2">
							<Link
								href="https://cal.com/laurosilvacom/chat"
								target="_blank"
								rel="noopener noreferrer"
								className="text-foreground text-sm font-medium underline underline-offset-4 transition-opacity hover:opacity-70">
								Book a call
							</Link>
							<Link
								href="/work"
								className="text-muted-foreground text-sm font-medium underline underline-offset-4 transition-opacity hover:opacity-70">
								View work
							</Link>
						</div>
					</div>
				</Container>
			</section>

			{/* Recent Posts */}
			<section className="pb-16 lg:pb-20">
				<Container>
					<div>
						<Suspense fallback={<BlogPostsFallback />}>
							<BlogPosts />
						</Suspense>
					</div>
				</Container>
			</section>
		</>
	)
}
