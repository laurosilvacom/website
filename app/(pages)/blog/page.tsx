import Link from 'next/link'
import Container from '@/components/container'
import {formatDate, getBlogPosts} from '@/lib/blog'
import {type BlogPost} from '@/lib/blog'
import {getImageClass} from '@/lib/image-utils'
import Image from 'next/image'

export const revalidate = 30

export const metadata = {
	title: 'Writing',
	description:
		'Thoughts, ideas, and explorations at the intersection of technology and the outdoor industry.'
}

export default async function BlogPage() {
	const posts = await getBlogPosts()

	// Fix TS issue: Handle potential undefined/null return
	if (!posts) {
		return (
			<section className="py-32">
				<Container width="narrow">
					<p className="text-muted-foreground text-center">No posts found.</p>
				</Container>
			</section>
		)
	}

	const sortedPosts = posts.sort(
		(a: BlogPost, b: BlogPost) =>
			new Date(b.metadata.publishedAt).getTime() -
			new Date(a.metadata.publishedAt).getTime()
	)

	return (
		<>
			<section className="border-border border-b pt-32 pb-16 lg:pt-40 lg:pb-24">
				<Container width="narrow">
					<div className="space-y-6 text-center">
						<h1 className="text-4xl font-bold tracking-tight lg:text-5xl">
							Writing
						</h1>
						<p className="text-muted-foreground mx-auto max-w-lg text-lg leading-relaxed">
							Thoughts, ideas, and explorations at the intersection of
							technology and the outdoor industry.
						</p>
					</div>
				</Container>
			</section>

			<section className="py-16 lg:py-24">
				<Container width="wide">
					{/* Featured Post - Large Hero */}
					{sortedPosts[0] && (
						<article className="group mb-16 lg:mb-24">
							<Link href={`/blog/${sortedPosts[0].slug}`} className="block">
								<div className="grid items-center gap-8 lg:grid-cols-2 lg:gap-12">
									<div className="relative aspect-4/3 overflow-hidden rounded-2xl">
										<Image
											src={sortedPosts[0].heroImage?.asset?.url || ''}
											alt={
												sortedPosts[0].heroImage?.alt ||
												sortedPosts[0].metadata.title
											}
											fill
											className="object-cover brightness-[0.95] contrast-[1.4] grayscale transition-transform duration-700 group-hover:scale-105"
											sizes="(min-width: 1024px) 600px, 100vw"
											priority
										/>
										<div className="absolute inset-0 bg-linear-to-t from-black/60 via-black/20 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
									</div>

									<div className="space-y-6">
										<div className="text-muted-foreground text-sm font-medium tracking-wider uppercase">
											<time dateTime={sortedPosts[0].metadata.publishedAt}>
												{formatDate(sortedPosts[0].metadata.publishedAt)}
											</time>
											{sortedPosts[0].metadata.readingTime && (
												<>
													<span className="mx-2">•</span>
													<span>
														{sortedPosts[0].metadata.readingTime} min read
													</span>
												</>
											)}
										</div>

										<h1 className="text-foreground group-hover:text-primary text-3xl leading-[1.1] font-bold tracking-tight transition-colors lg:text-5xl">
											{sortedPosts[0].metadata.title}
										</h1>

										<p className="text-muted-foreground text-lg leading-relaxed lg:text-xl">
											{sortedPosts[0].metadata.summary}
										</p>

										<div className="text-primary flex items-center gap-2 font-medium">
											<span>Read featured story</span>
											<svg
												className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-1"
												fill="none"
												viewBox="0 0 24 24"
												stroke="currentColor">
												<path
													strokeLinecap="round"
													strokeLinejoin="round"
													strokeWidth={2}
													d="M9 5l7 7-7 7"
												/>
											</svg>
										</div>
									</div>
								</div>
							</Link>
						</article>
					)}

					{/* Secondary Posts Grid */}
					<div className="space-y-12">
						<div className="flex items-center justify-between">
							<h2 className="text-foreground text-2xl font-bold tracking-tight">
								Recent Stories
							</h2>
							<div className="bg-border ml-8 h-px flex-1" />
						</div>

						<div className="grid gap-8 md:grid-cols-2 lg:gap-12">
							{sortedPosts.slice(1, 5).map((post: BlogPost, index: number) => {
								const heroUrl = post.heroImage?.asset?.url
								const heroAlt = post.heroImage?.alt || post.metadata.title
								const hasImage = !!heroUrl

								return (
									<article
										key={post.slug}
										className="group bg-card border-border hover:border-primary/20 hover:shadow-primary/5 relative flex overflow-hidden rounded-xl border transition-all duration-300 hover:shadow-lg">
										<Link href={`/blog/${post.slug}`} className="flex w-full">
											{hasImage && (
												<div className="bg-muted relative aspect-square w-32 shrink-0 overflow-hidden sm:w-40">
													<Image
														src={heroUrl}
														alt={heroAlt}
														fill
														className={`object-cover ${getImageClass('FEATURED_HERO')}`}
														sizes="(min-width: 768px) 160px, 128px"
													/>
												</div>
											)}

											<div className="flex flex-1 flex-col p-6">
												<div className="text-muted-foreground mb-2 text-xs font-medium tracking-wider uppercase">
													<time dateTime={post.metadata.publishedAt}>
														{formatDate(post.metadata.publishedAt)}
													</time>
												</div>

												<h3 className="text-card-foreground group-hover:text-primary mb-2 line-clamp-2 text-lg leading-tight font-bold transition-colors">
													{post.metadata.title}
												</h3>

												<p className="text-muted-foreground mb-auto line-clamp-2 text-sm leading-relaxed">
													{post.metadata.summary}
												</p>

												<div className="text-primary mt-3 flex items-center gap-1 text-xs font-medium">
													<span>Read more</span>
													<svg
														className="h-3 w-3 transition-transform duration-300 group-hover:translate-x-1"
														fill="none"
														viewBox="0 0 24 24"
														stroke="currentColor">
														<path
															strokeLinecap="round"
															strokeLinejoin="round"
															strokeWidth={2}
															d="M9 5l7 7-7 7"
														/>
													</svg>
												</div>
											</div>
										</Link>
									</article>
								)
							})}
						</div>
					</div>

					{/* More Posts - Minimal Grid */}
					{sortedPosts.length > 5 && (
						<div className="mt-20 space-y-8">
							<div className="flex items-center justify-between">
								<h2 className="text-foreground text-xl font-bold tracking-tight">
									Archive
								</h2>
								<div className="bg-border ml-8 h-px flex-1" />
							</div>

							<div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
								{sortedPosts.slice(5).map((post: BlogPost) => (
									<article key={post.slug} className="group text-center">
										<Link
											href={`/blog/${post.slug}`}
											className="block space-y-3">
											<div className="text-muted-foreground text-sm font-medium">
												<time dateTime={post.metadata.publishedAt}>
													{formatDate(post.metadata.publishedAt)}
												</time>
											</div>

											<h3 className="text-foreground group-hover:text-primary line-clamp-2 text-lg leading-tight font-bold transition-colors">
												{post.metadata.title}
											</h3>

											<div className="text-primary text-sm font-medium opacity-0 transition-opacity duration-300 group-hover:opacity-100">
												Read →
											</div>
										</Link>
									</article>
								))}
							</div>
						</div>
					)}
				</Container>
			</section>
		</>
	)
}
