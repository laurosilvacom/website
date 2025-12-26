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
			<section className="relative flex min-h-[60vh] items-center justify-center px-4 pt-32 pb-20 lg:pt-40">
				<div className="mx-auto max-w-3xl text-center">
					<div className="animate-in fade-in slide-in-from-bottom-4 space-y-6 duration-1000">
						<h1 className="text-4xl leading-[1.05] font-bold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl">
							Writing
						</h1>
						<p className="text-muted-foreground mx-auto max-w-2xl text-xl leading-relaxed">
							Thoughts, ideas, and explorations at the intersection of
							technology and the outdoor industry.
						</p>
					</div>
				</div>
			</section>

			<section className="py-12 lg:py-20">
				<Container width="wide">
					{/* Featured Post - Large Hero */}
					{sortedPosts[0] && (
						<article className="group mb-16 lg:mb-24">
							<Link href={`/blog/${sortedPosts[0].slug}`} className="block">
								<div className="grid items-center gap-8 lg:grid-cols-2 lg:gap-16">
									<div className="border-border-subtle relative aspect-4/3 overflow-hidden rounded-3xl border">
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
										<div className="text-muted-foreground text-sm font-medium">
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

										<h1 className="text-foreground text-2xl leading-[1.1] font-bold tracking-tight transition-colors sm:text-3xl lg:text-4xl">
											{sortedPosts[0].metadata.title}
										</h1>

										<p className="text-muted-foreground text-lg leading-relaxed lg:text-xl">
											{sortedPosts[0].metadata.summary}
										</p>

										<div className="flex items-center gap-2 font-medium">
											<span>Read article</span>
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
						<div className="space-y-3">
							<h2 className="text-foreground text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
								Recent Posts
							</h2>
						</div>

						<div className="grid gap-8 md:grid-cols-2 lg:gap-12">
							{sortedPosts.slice(1, 5).map((post: BlogPost, index: number) => {
								const heroUrl = post.heroImage?.asset?.url
								const heroAlt = post.heroImage?.alt || post.metadata.title
								const hasImage = !!heroUrl

								return (
									<article key={post.slug} className="group relative">
										<Link href={`/blog/${post.slug}`} className="block h-full">
											<div className="border-border-subtle bg-card hover:border-border flex h-full flex-col rounded-2xl border p-6 transition-all duration-200">
												<div className="mb-4">
													<time
														className="text-muted-foreground text-sm font-medium"
														dateTime={post.metadata.publishedAt}>
														{formatDate(post.metadata.publishedAt)}
													</time>
												</div>
												<h3 className="mb-3 text-xl leading-tight font-bold transition-colors sm:text-2xl">
													{post.metadata.title}
												</h3>
												<p className="text-muted-foreground mb-6 line-clamp-3 grow text-base leading-relaxed">
													{post.metadata.summary}
												</p>
												<div className="flex items-center text-sm font-medium transition-all group-hover:gap-2">
													Read more
													<svg
														className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1"
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
							<div className="space-y-3">
								<h2 className="text-foreground text-2xl font-bold tracking-tight sm:text-3xl lg:text-4xl">
									More Posts
								</h2>
							</div>

							<div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
								{sortedPosts.slice(5).map((post: BlogPost) => (
									<article key={post.slug} className="group">
										<Link
											href={`/blog/${post.slug}`}
											className="block space-y-4">
											<div className="text-muted-foreground text-sm font-medium">
												<time dateTime={post.metadata.publishedAt}>
													{formatDate(post.metadata.publishedAt)}
												</time>
											</div>
											<h3 className="text-foreground line-clamp-2 text-xl leading-tight font-bold transition-colors">
												{post.metadata.title}
											</h3>
											<div className="text-sm font-medium opacity-0 transition-opacity duration-300 group-hover:opacity-100">
												Read article →
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
