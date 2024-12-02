import {formatDate, getBlogPosts} from 'app/blog/utils'
import {ArrowRight} from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'

export async function BlogPosts() {
	const allBlogs = await getBlogPosts()

	return (
		<div className="grid w-full grid-cols-1 gap-6 sm:grid-cols-2">
			{allBlogs
				.sort(
					(a, b) =>
						new Date(b.metadata.publishedAt).getTime() -
						new Date(a.metadata.publishedAt).getTime()
				)
				.map((post) => (
					<Link
						key={post.slug}
						href={`/blog/${post.slug}`}
						aria-label={`Read more about ${post.metadata.title}`}
						className="group">
						<article className="border-border bg-card hover:bg-accent relative flex h-full flex-col overflow-hidden rounded-xl border transition-all duration-200">
							{/* Main content area with flex-grow to push footer down */}
							<div className="flex-grow p-6 sm:p-8">
								{post.metadata.icon && (
									<div className="mb-4">
										<Image
											src={post.metadata.icon}
											alt={`${post.metadata.title} icon`}
											width={32}
											height={32}
											quality={100}
											className="rounded-[calc(var(--radius)/2)]"
										/>
									</div>
								)}

								<h2 className="text-card-foreground mb-2 text-xl font-bold tracking-tight sm:text-2xl">
									{post.metadata.title}
								</h2>

								{post.metadata.description && (
									<p className="text-muted-foreground line-clamp-3 text-base leading-relaxed">
										{post.metadata.description}
									</p>
								)}
							</div>

							{/* Footer area always at bottom */}
							<div className="border-border border-t p-6 sm:p-8">
								<div className="flex items-center justify-between">
									<time
										dateTime={post.metadata.publishedAt}
										className="text-muted-foreground text-sm font-medium">
										{formatDate(post.metadata.publishedAt, false)}
									</time>
									<div className="flex items-center gap-2">
										<span className="text-muted-foreground text-sm font-medium">
											Read more
										</span>
										<ArrowRight className="text-primary h-4 w-4 transition-all duration-200 group-hover:translate-x-1" />
									</div>
								</div>
							</div>
						</article>
					</Link>
				))}
		</div>
	)
}
