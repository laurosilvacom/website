import {type Metadata} from 'next'
import Image from 'next/image'
import {notFound} from 'next/navigation'
import {formatDate, getBlogPosts} from 'app/blog/utils'
import Container from 'app/components/container'
import {CustomMDX} from 'app/components/mdx'
import {TableOfContents} from 'app/components/toc'
import {baseUrl} from 'app/sitemap'

interface BlogHeaderProps {
	author: string
	date: string
	readingTime: string | undefined
	icon?: string
	title: string
	description?: string
}

const BlogHeader = ({
	author,
	date,
	readingTime,
	icon,
	title,
	description
}: BlogHeaderProps) => {
	return (
		<header className="mx-auto max-w-4xl space-y-10">
			{/* Title and Icon Section */}
			<div className="space-y-6">
				{icon && (
					<div className="inline-block">
						<div className="border-muted bg-card rounded-2xl border p-4">
							<Image
								src={icon}
								alt={`${title} icon`}
								width={48}
								height={48}
								quality={100}
								className="h-12 w-12 object-contain"
							/>
						</div>
					</div>
				)}
				<h1 className="text-foreground text-4xl leading-tight font-bold tracking-tight md:text-5xl lg:text-6xl">
					{title}
				</h1>
				{description && (
					<p className="text-muted-foreground text-2xl leading-relaxed">
						{description}
					</p>
				)}
			</div>

			{/* Author and Meta Section */}
			<div className="border-muted flex items-center gap-4 border-t pt-6">
				<div className="bg-card h-16 w-16 overflow-hidden rounded-full border-3">
					<Image
						src="/heroavatar.jpg"
						alt={author}
						width={98}
						height={98}
						className="h-full w-full object-cover"
						priority
					/>
				</div>
				<div className="flex flex-col gap-1">
					<span className="text-foreground font-medium">{author}</span>
					<div className="text-muted-foreground flex items-center text-lg">
						<time dateTime={date}>{formatDate(date)}</time>
						<span className="mx-2">•</span>
						<span>{readingTime}</span>
					</div>
				</div>
			</div>
		</header>
	)
}

interface PageMetadata extends Metadata {
	title: string
	description: string
	openGraph: {
		title: string
		description: string
		type: string
		publishedTime: string
		url: string
		images: {url: string}[]
	}
	twitter: {
		card: string
		title: string
		description: string
		images: string[]
	}
}

interface Params {
	slug: string
}

interface Props {
	params: Promise<Params>
}

export async function generateStaticParams() {
	const posts = await getBlogPosts()
	return posts.map((post) => ({
		slug: post.slug
	}))
}

export async function generateMetadata(
	props: Props
): Promise<PageMetadata | null> {
	const params = await props.params
	if (!params || !params.slug) return null

	const posts = await getBlogPosts()
	const post = posts.find((post) => post.slug === params.slug)
	if (!post) return null

	const {
		title,
		publishedAt: publishedTime,
		summary: description,
		image,
		icon
	} = post.metadata

	const ogImage = image
		? `${baseUrl}${image}`
		: `${baseUrl}/og?title=${encodeURIComponent(title)}${
				icon ? `&icon=${encodeURIComponent(icon)}` : ''
			}`

	return {
		title,
		description,
		openGraph: {
			title,
			description,
			type: 'article',
			publishedTime,
			url: `${baseUrl}/blog/${post.slug}`,
			images: [{url: ogImage}]
		},
		twitter: {
			card: 'summary_large_image',
			title,
			description,
			images: [ogImage]
		}
	}
}

export default async function Blog(props: Props) {
	const params = await props.params
	const posts = await getBlogPosts()
	const post = posts.find((post) => post.slug === params.slug)

	if (!post) {
		notFound()
	}

	return (
		<Container className="m-auto min-h-screen">
			{/* Schema markup remains the same */}
			<script
				type="application/ld+json"
				suppressHydrationWarning
				dangerouslySetInnerHTML={{
					__html: JSON.stringify({
						'@context': 'https://schema.org',
						'@type': 'BlogPosting',
						headline: post.metadata.title,
						datePublished: post.metadata.publishedAt,
						dateModified: post.metadata.publishedAt,
						description: post.metadata.summary,
						image: post.metadata.image
							? `${baseUrl}${post.metadata.image}`
							: `${baseUrl}/og?title=${encodeURIComponent(post.metadata.title)}`,
						url: `${baseUrl}/blog/${post.slug}`,
						author: {
							'@type': 'Person',
							name: 'Lauro Silva'
						}
					})
				}}
			/>

			<div className="mx-auto flex w-full max-w-screen-xl px-5 sm:px-10 lg:px-0">
				<div className="w-full py-12">
					{/* Content grid */}
					<div className="grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_340px] lg:gap-x-[clamp(2rem,6vw,6rem)]">
						{/* Main content */}
						<div className="min-w-0">
							{/* Header section */}
							<div className="relative mb-16">
								<BlogHeader
									author="Lauro Silva"
									date={post.metadata.publishedAt}
									readingTime={post.metadata.readingTime}
									icon={post.metadata.icon}
									title={post.metadata.title}
									description={post.metadata.description}
								/>

								{/* Mobile TOC */}
								<div className="mt-10 lg:hidden">
									<details className="group">
										<summary className="border-muted bg-card cursor-pointer rounded-2xl border shadow-sm backdrop-blur-xl">
											<div className="flex items-center justify-between p-4">
												<span className="text-base font-medium">
													On this page
												</span>
												<svg
													className="text-muted-foreground h-5 w-5 transform transition-transform duration-300 ease-out group-open:rotate-180"
													fill="none"
													viewBox="0 0 24 24"
													stroke="currentColor">
													<path
														strokeLinecap="round"
														strokeLinejoin="round"
														strokeWidth={2}
														d="M19 9l-7 7-7-7"
													/>
												</svg>
											</div>
										</summary>

										<div className="border-muted bg-card mt-2 overflow-hidden rounded-2xl border shadow-sm backdrop-blur-xl">
											<div className="p-4">
												<TableOfContents />
											</div>
										</div>
									</details>
								</div>
							</div>

							{/* Article content */}
							<article className="prose sm:prose-lg md:prose-xl lg:prose-2xl dark:prose-invert prose-headings:scroll-mt-24 prose-headings:font-bold prose-h2:text-2xl sm:prose-h2:text-3xl md:prose-h2:text-4xl prose-h2:leading-tight prose-p:text-muted-foreground prose-p:leading-relaxed prose-ul:text-muted-foreground prose-ol:text-muted-foreground prose-li:text-muted-foreground prose-li:leading-relaxed prose-a:text-primary prose-a:no-underline hover:prose-a:underline mx-auto max-w-none px-4 sm:px-6 md:px-8 lg:max-w-[65ch] lg:px-0">
								<CustomMDX source={post.content} />
							</article>
						</div>

						{/* Desktop TOC */}
						<aside className="hidden lg:block">
							<div className="sticky top-24">
								<div className="border-muted bg-card overflow-hidden rounded-2xl border shadow-sm backdrop-blur-xl">
									<div className="p-6">
										<h3 className="mb-4 text-base font-medium">On this page</h3>
										<TableOfContents />
									</div>
								</div>
							</div>
						</aside>
					</div>
				</div>
			</div>
		</Container>
	)
}
