import Link from 'next/link'
import Container from '@/shared/components/container'
import {formatDate, getBlogPosts} from '@/features/blog/server'
import {type BlogPost} from '@/features/blog/server'

export const revalidate = 30

export const metadata = {
	title: 'Writing',
	description:
		'Thoughts, ideas, and explorations at the intersection of technology and the outdoor industry.',
}

export default async function BlogPage() {
	const posts = await getBlogPosts()

	if (!posts) {
		return (
			<section className="py-32">
				<Container>
					<p className="text-muted-foreground">No posts found.</p>
				</Container>
			</section>
		)
	}

	const sortedPosts = posts.sort(
		(a: BlogPost, b: BlogPost) =>
			new Date(b.metadata.publishedAt).getTime() -
			new Date(a.metadata.publishedAt).getTime(),
	)

	return (
		<>
			<section className="pt-32 pb-16 lg:pt-36 lg:pb-20">
				<Container>
					<div className="space-y-4">
						<h1 className="font-serif text-4xl leading-[1.08] font-bold tracking-tight sm:text-5xl lg:text-6xl">
							Writing
						</h1>
						<p className="text-muted-foreground text-base leading-relaxed">
							Thoughts, ideas, and explorations at the intersection of technology and the
							outdoor industry.{' '}
							<Link href="/blog/rss.xml" className="underline underline-offset-4">RSS</Link>
						</p>
					</div>
				</Container>
			</section>

			<section className="pb-24 lg:pb-32">
				<Container>
					<div className="space-y-6">
						{sortedPosts.map((post: BlogPost) => (
							<Link
								key={post.slug}
								href={`/blog/${post.slug}`}
								prefetch
								className="group block transition-opacity hover:opacity-60">
								<p className="text-foreground text-sm font-medium leading-snug">
									{post.metadata.title}
								</p>
								<p className="text-muted-foreground mt-0.5 text-xs">
									{formatDate(post.metadata.publishedAt, false)}
								</p>
							</Link>
						))}
					</div>
				</Container>
			</section>
		</>
	)
}
