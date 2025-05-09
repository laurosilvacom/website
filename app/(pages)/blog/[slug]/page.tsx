import Link from 'next/link'
import {notFound} from 'next/dist/client/components/not-found'
import Image from 'next/image'
import {type Metadata} from 'next/types'
import Container from 'app/components/container'
import {CustomMDX} from 'app/components/mdx'
import {TableOfContents} from 'app/components/toc'
import {baseUrl} from 'app/sitemap'
import {formatDate, getBlogPosts} from '../utils'

interface BlogHeaderProps {
	date: string
	readingTime: string | undefined
	icon?: string
	title: string
	description?: string
	coverImage?: string
	tags?: string[] // Added tags property
}

const BlogHeader = ({
	date,
	readingTime,
	icon,
	title,
	coverImage,
	description,
	tags
}: BlogHeaderProps) => {
	return (
		<header className="mx-auto w-full max-w-4xl">
			{/* Title and Description Section - preserved original layout */}
			<div className="space-y-6">
				{/* Eyebrow - Icon and Date */}
				<div className="flex items-center justify-between">
					{icon && (
						<div className="bg-secondary/30 rounded-lg p-2">
							<Image
								src={icon}
								alt={`${title} icon`}
								width={24}
								height={24}
								className="h-10 w-10 object-contain"
							/>
						</div>
					)}
					<time className="text-muted-foreground text-sm font-medium">
						{formatDate(date)}
					</time>
				</div>

				{/* Title - preserved original sizing */}
				<h1 className="text-foreground text-3xl font-bold sm:text-4xl md:text-5xl lg:text-6xl">
					{title}
				</h1>

				{/* Description and Meta - kept original structure */}
				<div className="space-y-3">
					{description && (
						<p className="text-muted-foreground text-lg md:text-xl">
							{description}
						</p>
					)}

					{/* Meta information section */}
					<div className="flex flex-wrap items-center gap-4">
						{/* Reading time */}
						{readingTime && (
							<div className="text-muted-foreground flex items-center gap-2 text-sm">
								<svg
									xmlns="http://www.w3.org/2000/svg"
									className="h-4 w-4"
									fill="none"
									viewBox="0 0 24 24"
									stroke="currentColor">
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										strokeWidth={2}
										d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
									/>
								</svg>
								<span>{readingTime}</span>
							</div>
						)}
					</div>

					{/* Tags section - separated from reading time for better visual hierarchy */}
					{tags && tags.length > 0 && (
						<div className="mt-3 flex flex-wrap gap-2">
							{tags.map((tag) => (
								<Link
									key={tag}
									href={`/tags/${encodeURIComponent(tag)}`}
									className="bg-primary/10 text-primary hover:bg-primary/20 border-primary/20 inline-flex items-center gap-1 rounded-md border px-3 py-1 text-sm font-medium transition-colors duration-200">
									<span className="text-xs">#</span>
									{tag}
								</Link>
							))}
						</div>
					)}
				</div>
			</div>

			{/* Cover Image Section - maintained original positioning */}
			{coverImage && (
				<div className="relative -mx-4 mt-10 aspect-[4/2] overflow-hidden sm:-mx-6 lg:mx-0 lg:mt-12 lg:rounded-lg">
					<Image
						src={coverImage}
						alt={`Cover image for ${title}`}
						fill
						priority
						className="object-cover object-center"
					/>
				</div>
			)}
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
	// Metadata generation unchanged
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
			{/* Schema markup unchanged */}
			<script
				type="application/ld+json"
				suppressHydrationWarning
				dangerouslySetInnerHTML={{
					__html: JSON.stringify({
						'@context': 'https://schema.org',
						'@type': 'BlogPosting',
						headline: post!.metadata.title,
						datePublished: post!.metadata.publishedAt,
						dateModified: post!.metadata.publishedAt,
						description: post!.metadata.summary,
						image: post!.metadata.image
							? `${baseUrl}${post!.metadata.image}`
							: `${baseUrl}/og?title=${encodeURIComponent(post!.metadata.title)}`,
						url: `${baseUrl}/blog/${post!.slug}`,
						author: {
							'@type': 'Person',
							name: 'Lauro Silva'
						}
					})
				}}
			/>

			{/* Maintained original layout structure for proper alignment */}
			<div className="mx-auto flex w-full max-w-screen-xl px-5 sm:px-10 lg:px-0">
				<div className="w-full py-12">
					{/* Content grid - preserved original column settings */}
					<div className="grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_340px] lg:gap-x-[clamp(2rem,6vw,6rem)]">
						{/* Main content */}
						<div className="min-w-0">
							{/* Header section */}
							<div className="relative mb-16">
								<BlogHeader
									date={post!.metadata.publishedAt}
									readingTime={post!.metadata.readingTime}
									icon={post!.metadata.icon}
									title={post!.metadata.title}
									description={post!.metadata.description}
									coverImage={post!.metadata.coverImage}
									tags={post!.metadata.tags} // Pass tags to the BlogHeader component
								/>

								{/* Mobile TOC - kept original placement */}
								<div className="mt-10 lg:hidden">
									<div className="border-border bg-card mt-2 overflow-hidden rounded-xl border">
										<div className="p-4">
											<TableOfContents />
										</div>
									</div>
								</div>
							</div>

							{/* Article content - maintained prose settings */}
							<article className="prose prose-lg text-foreground !max-w-none">
								<CustomMDX source={post!.content} />
							</article>
						</div>

						{/* Desktop TOC - kept original positioning */}
						<aside className="hidden lg:block">
							<div className="sticky top-24">
								<div className="border-border bg-card overflow-hidden rounded-xl border">
									<div className="p-6">
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
