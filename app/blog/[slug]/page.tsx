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
		<header className="mx-auto max-w-4xl space-y-8">
			{/* Title and Icon Section */}
			<div className="space-y-4">
				{icon && (
					<div className="inline-block">
						<Image
							src={icon}
							alt={`${title} icon`}
							width={64}
							height={64}
							quality={100}
							className="rounded-lg"
						/>
					</div>
				)}
				<h1 className="text-4xl font-bold tracking-tight md:text-5xl lg:text-6xl">
					{title}
				</h1>
				{description && (
					<p className="text-muted-foreground text-lg leading-relaxed md:text-xl">
						{description}
					</p>
				)}
			</div>

			{/* Author and Meta Section */}
			<div className="border-border flex items-center gap-4 border-t pt-6">
				<div className="h-12 w-12 flex-shrink-0 overflow-hidden rounded-full">
					<Image
						src="/heroavatar.jpg"
						alt={author}
						width={48}
						height={48}
						className="h-full w-full object-cover"
						priority
					/>
				</div>
				<div className="flex flex-col gap-1">
					<span className="font-medium">{author}</span>
					<div className="text-muted-foreground flex items-center text-sm">
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

	const gradient = post.metadata.gradient || '#FFF0F5'

	return (
		<Container className="m-auto min-h-screen">
			{/* Gradient background - contained to header */}
			<div
				className="absolute inset-x-0 -top-10 -z-10 h-[400px] rounded-b-[30px] opacity-15 dark:opacity-10"
				style={{
					background: `radial-gradient(60% 80% at 50% 0%, ${gradient} 0%, transparent 100%)`
				}}
				aria-hidden="true"
			/>
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
				<div className="w-full py-10">
					{/* Content grid */}
					<div className="grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_340px] lg:gap-x-[clamp(2rem,6vw,6rem)]">
						{/* Main content */}
						<div className="min-w-0">
							{/* Header section with gradient */}
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
								<div className="mb-10 lg:hidden">
									<details className="group">
										<summary className="relative cursor-pointer overflow-hidden rounded-xl">
											{/* Frosted glass effect layers */}
											<div className="absolute inset-0 backdrop-blur-xl" />
											<div className="absolute inset-0 bg-white/[0.2] dark:bg-black/[0.2]" />
											<div className="absolute inset-0 rounded-xl border border-white/[0.1] dark:border-white/[0.05]" />

											<div className="relative flex items-center justify-between p-4">
												<span className="text-base font-medium text-white/90 dark:text-white/90">
													On this page
												</span>
												<svg
													className="h-5 w-5 transform text-white/70 transition-transform duration-200 group-open:rotate-180"
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

										<div className="relative mt-2 overflow-hidden rounded-xl">
											{/* Frosted glass effect layers */}
											<div className="absolute inset-0 backdrop-blur-xl" />
											<div className="absolute inset-0 bg-white/[0.2] dark:bg-black/[0.2]" />
											<div className="absolute inset-0 rounded-xl border border-white/[0.1] dark:border-white/[0.05]" />
											{/* Bottom edge highlight */}
											<div className="absolute inset-x-0 -bottom-px h-px bg-gradient-to-r from-transparent via-white/15 to-transparent" />

											<div className="relative px-6 py-4">
												<TableOfContents />
											</div>
										</div>
									</details>
								</div>
							</div>

							{/* Article content - clean background */}
							<article className="prose prose-lg dark:prose-invert prose-headings:scroll-mt-24 max-w-none">
								<CustomMDX source={post.content} />
							</article>
						</div>

						{/* Desktop TOC */}
						<aside className="hidden lg:block">
							<div className="sticky top-24">
								<div className="relative overflow-hidden rounded-xl">
									{/* Frosted glass effect layers */}
									<div className="absolute inset-0 backdrop-blur-xl" />
									<div className="absolute inset-0 bg-white/[0.2] dark:bg-black/[0.2]" />
									<div className="absolute inset-0 rounded-xl border border-white/[0.1] dark:border-white/[0.05]" />
									{/* Bottom edge highlight */}
									<div className="absolute inset-x-0 -bottom-px h-px bg-gradient-to-r from-transparent via-white/15 to-transparent" />

									{/* Content */}
									<div className="relative p-6">
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
