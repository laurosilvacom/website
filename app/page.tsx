import {Suspense} from 'react'
import {ArrowRight} from 'lucide-react'
import Image from 'next/image'
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
				<section className="py-16 lg:py-24">
					<div className="flex flex-col items-center space-y-14">
						<div className="relative w-full max-w-2xl aspect-[4/3] lg:aspect-[16/10]">
							<Image
								src="/photos/website-photo-1.jpg"
								alt="Lauro Silva"
								fill
								className="rounded-2xl object-cover shadow-lg"
								priority
								sizes="(max-width: 1024px) 100vw, 80vw"
							/>
						</div>
						<div className="space-y-7 w-full max-w-2xl mx-auto">
							<div className="space-y-4">
								<h1 className="text-xl font-semibold leading-tight sm:text-2xl tracking-tight">
									Cultivating ideas in the open, learning in public
								</h1>
								<p className="text-foreground text-base leading-relaxed sm:text-lg">
									I&apos;m Lauro Silva. This is a digital garden where I share my work, writing, and learning process at the intersection of technology and the outdoor industry. Ideas evolve here. Some are polished, others are works in progress. This is learning in public.
								</p>
								<p className="text-muted-foreground text-sm leading-relaxed">
									I work as a software engineer building cutting-edge technology for the outdoor industry, help professional athletes use technology to build brands and communities, and build communities in the trail running space.
								</p>
							</div>
							<div className="pt-2">
								<Button asChild size="lg">
									<Link href="/blog">
										Explore the garden
										<ArrowRight className="ml-2 h-4 w-4" />
									</Link>
								</Button>
							</div>
						</div>
					</div>
				</section>

				<section className="py-12">
					<div className="space-y-10">
						<div className="flex items-center justify-between">
							<h2 className="text-lg font-semibold leading-tight tracking-tight">Recent Writings</h2>
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
