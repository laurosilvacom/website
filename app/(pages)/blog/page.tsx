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
			<section className="pt-32 lg:pt-40 pb-16 lg:pb-24 border-b border-border/50">
				<Container size="lg">
					<div className="space-y-6">
						<h1 className="text-4xl lg:text-6xl xl:text-7xl font-bold tracking-tight">
							Writing
						</h1>
						<p className="text-lg lg:text-xl text-muted-foreground max-w-2xl">
							Thoughts, ideas, and explorations at the intersection of technology and the outdoor industry.
						</p>
					</div>
				</Container>
			</section>

			<section className="py-16 lg:py-24">
				<Container size="lg">
					<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12">
						{sortedPosts.map((post: any, index: number) => (
							<article
								key={post.slug}
								className="group relative"
								style={{
									animationDelay: `${index * 50}ms`
								}}>
								<Link
									href={`/blog/${post.slug}`}
									className="block h-full">
									<div className="flex flex-col h-full">
										<div className="mb-4">
											<time className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
												{formatDate(post.metadata.publishedAt, false)}
											</time>
										</div>
										<h2 className="text-xl lg:text-2xl font-semibold mb-3 leading-tight group-hover:text-primary transition-colors">
											{post.metadata.title}
										</h2>
										<p className="text-muted-foreground text-sm lg:text-base leading-relaxed flex-grow mb-4 line-clamp-3">
											{post.metadata.summary}
										</p>
										<div className="flex items-center text-sm font-medium text-primary group-hover:gap-2 transition-all">
											Read more
											<ArrowRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
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
