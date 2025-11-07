import {Suspense} from 'react'
import {ArrowRight} from 'lucide-react'
import Link from 'next/link'
import Container from '@/components/container'
import {Button} from '@/components/ui/button'
import {Card} from '@/components/card'
import {TagFooter} from '@/components/tag-footer'
import {formatDate, getBlogPosts} from '@/lib/blog'

async function BlogPosts() {
	const allBlogs = await getBlogPosts()
	const latestPosts = allBlogs
		.sort(
			(a, b) =>
				new Date(b.metadata.publishedAt).getTime() -
				new Date(a.metadata.publishedAt).getTime()
		)
		.slice(0, 6)

	return (
		<div className="space-y-10">
			{latestPosts.map((post) => (
				<Card
					key={post.slug}
					href={`/blog/${post.slug}`}
					title={post.metadata.title}
					description={post.metadata.summary}
					date={formatDate(post.metadata.publishedAt, false)}
					footer={
						post.metadata.tags && post.metadata.tags.length > 0 ? (
							<TagFooter tags={post.metadata.tags} />
						) : undefined
					}
				/>
			))}
		</div>
	)
}

function BlogPostsFallback() {
	return (
		<div className="space-y-10">
			{Array.from({length: 3}).map((_, i) => (
				<div key={i} className="space-y-2.5 pb-10">
					<div className="bg-muted h-4 w-24 animate-pulse rounded" />
					<div className="bg-muted h-6 w-full animate-pulse rounded" />
					<div className="bg-muted h-4 w-3/4 animate-pulse rounded" />
				</div>
			))}
		</div>
	)
}

export default async function Page() {
	return (
		<Container>
			<main>
				<section className="py-24">
					<div className="space-y-6">
						<h1 className="text-2xl font-semibold leading-tight sm:text-3xl">
							Learn, build, and grow as a developer
						</h1>
						<p className="text-muted-foreground text-lg leading-relaxed">
							Technical insights and real experiences. Great software comes from understanding both the code and the people who write it.
						</p>
						<div className="pt-2">
							<Button asChild size="lg">
								<Link href="/blog">
									Read writing
									<ArrowRight className="ml-2 h-4 w-4" />
								</Link>
							</Button>
						</div>
					</div>
				</section>

				<section className="py-16 mt-16">
					<div className="space-y-10">
						<div className="flex items-center justify-between">
							<h2 className="text-xl font-semibold leading-tight">Recent Writings</h2>
							<Button variant="ghost" asChild>
								<Link href="/blog">
									View all
									<ArrowRight className="ml-2 h-4 w-4" />
								</Link>
							</Button>
						</div>

						<Suspense fallback={<BlogPostsFallback />}>
							<BlogPosts />
						</Suspense>
					</div>
				</section>
			</main>
		</Container>
	)
}
