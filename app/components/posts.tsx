import {formatDate, getBlogPosts} from 'app/blog/utils'
import {ArrowRight} from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'

export async function BlogPosts() {
	const allBlogs = await getBlogPosts()

	return (
		<div className="space-y-8">
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
						className="group block">
						<div className="bg-card relative overflow-hidden rounded-3xl shadow-xl transition-all duration-300 hover:scale-[1.02]">
							{/* Content Section */}
							<div className="p-12">
								{/* Icon Section */}
								{post.metadata.icon && (
									<div className="flex items-center space-x-4">
										<Image
											src={post.metadata.icon}
											alt={`${post.metadata.title} icon`}
											width={30}
											height={30}
											quality={100}
											className="h-8 w-8 rounded"
										/>
									</div>
								)}

								{/* Title */}
								<h2 className="text-foreground mt-6 text-xl font-bold">
									{post.metadata.title}
								</h2>

								{/* Description - if you have one */}
								{post.metadata.description && (
									<p className="text-muted-foreground mt-4 line-clamp-3 text-lg leading-snug">
										{post.metadata.description}
									</p>
								)}
							</div>

							{/* Footer */}
							<div className="border-border flex items-center justify-between border-t p-12 pt-6">
								<span className="text-muted-foreground text-lg">
									{formatDate(post.metadata.publishedAt, false)}
								</span>
								<ArrowRight className="text-muted-foreground group-hover:text-primary h-6 w-6 transition-transform duration-200 group-hover:translate-x-1" />
							</div>
						</div>
					</Link>
				))}
		</div>
	)
}
