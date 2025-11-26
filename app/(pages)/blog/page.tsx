import Link from 'next/link'
import Container from '@/components/container'
import {formatDate, getBlogPosts} from '@/lib/blog'
import {ArrowRight} from 'lucide-react'

export const metadata = {
	title: 'Writing',
	description: 'All writings and thoughts from Lauro Silva'
}

export default async function BlogPage() {
	const posts = await getBlogPosts()
	const sortedPosts = posts.sort(
		(a: any, b: any) =>
			new Date(b.metadata.publishedAt).getTime() -
			new Date(a.metadata.publishedAt).getTime()
	)

	return (
		<>
			<section className="border-border border-b pt-32 pb-16 lg:pt-40 lg:pb-24">
				<Container width="wide">
					<div className="space-y-6">
						<h1 className="text-4xl font-bold tracking-tight lg:text-6xl xl:text-7xl">
							Writing
						</h1>
						<p className="text-muted-foreground text-lg lg:text-xl">
							Thoughts, ideas, and explorations at the intersection of
							technology and the outdoor industry.
						</p>
					</div>
				</Container>
			</section>

			<section className="py-16 lg:py-24">
				<Container width="wide">
					<div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3 lg:gap-12">
						{sortedPosts.map((post: any, index: number) => (
							<article
								key={post.slug}
								className="group relative"
								style={{
									animationDelay: `${index * 50}ms`
								}}>
								<Link href={`/blog/${post.slug}`} className="block h-full">
									<div className="flex h-full flex-col">
										<div className="mb-4">
											<time className="text-muted-foreground text-xs font-medium tracking-wider uppercase">
												{formatDate(post.metadata.publishedAt, false)}
											</time>
										</div>
										<h2 className="group-hover:text-primary mb-3 text-xl leading-tight font-semibold transition-colors lg:text-2xl">
											{post.metadata.title}
										</h2>
										<p className="text-muted-foreground mb-4 line-clamp-3 flex-grow text-sm leading-relaxed lg:text-base">
											{post.metadata.summary}
										</p>
										<div className="text-primary flex items-center text-sm font-medium transition-all group-hover:gap-2">
											Read more
											<ArrowRight className="h-4 w-4 opacity-0 transition-opacity group-hover:opacity-100" />
										</div>
									</div>
								</Link>
							</article>
						))}
					</div>
				</Container>
			</section>
		</>
	)
}
