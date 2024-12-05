import {formatDate, getBlogPosts} from 'app/blog/utils'
import {CustomMDX} from 'app/components/mdx'
import {baseUrl} from 'app/sitemap'
import type {Metadata} from 'next'
import {notFound} from 'next/navigation'
import Container from 'app/components/container'
import Image from 'next/image'
import {TableOfContents} from 'app/components/toc'

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

	if (!params || !params.slug) {
		return null
	}

	const posts = await getBlogPosts()
	const post = posts.find((post) => post.slug === params.slug)

	if (!post) {
		return null
	}

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
			images: [
				{
					url: ogImage
				}
			]
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
		<Container>
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
							: `/og?title=${encodeURIComponent(post.metadata.title)}`,
						url: `${baseUrl}/blog/${post.slug}`,
						author: {
							'@type': 'Person',
							name: 'My Portfolio'
						}
					})
				}}
			/>

			<div className="relative mx-auto max-w-[1600px] px-6 py-10">
				{/* Background gradient */}
				<div className="absolute inset-0 -z-10" aria-hidden="true">
					<div
						className="absolute top-0 h-[300px] w-full opacity-[0.15] dark:opacity-[0.08]"
						style={{
							background: `
                radial-gradient(
                    50% 100% at 50% 0%,
                    ${gradient} 0%,
                    transparent 100%
                )
              `
						}}
					/>
				</div>

				{/* Main layout grid */}
				<div className="relative grid grid-cols-1 gap-8 lg:grid-cols-[250px_1fr] xl:grid-cols-[300px_1fr]">
					{/* Left sidebar - ToC */}
					<div className="hidden lg:block">
						<div className="sticky top-24">
							{/* Author info */}
							<div className="mb-8">
								<div className="mb-4 flex items-center gap-4">
									<div className="h-12 w-12 overflow-hidden rounded-full">
										<Image
											src="/heroavatar.jpg"
											alt="Lauro Silva"
											width={100}
											height={100}
											className="object-cover"
											priority
										/>
									</div>
									<div>
										<div className="text-foreground font-medium">
											Lauro Silva
										</div>
										<time className="text-muted-foreground text-sm">
											{formatDate(post.metadata.publishedAt)}
										</time>
									</div>
								</div>
								<div className="text-muted-foreground text-sm">
									{post.metadata.readingTime}
								</div>
							</div>

							{/* Table of Contents */}
							<TableOfContents />
						</div>
					</div>

					{/* Main content */}
					<div className="m-auto max-w-screen-md min-w-0">
						{/* Header for mobile */}
						<div className="mb-8 lg:hidden">
							<div className="text-muted-foreground flex items-center gap-4 text-sm">
								<div className="h-8 w-8 overflow-hidden rounded-full">
									<Image
										src="/heroavatar.jpg"
										alt="Lauro Silva"
										width={100}
										height={100}
										className="object-cover"
										priority
									/>
								</div>
								<span className="font-medium">Lauro Silva</span>
								<span>•</span>
								<time dateTime={post.metadata.publishedAt}>
									{formatDate(post.metadata.publishedAt)}
								</time>
								<span>•</span>
								<span>{post.metadata.readingTime}</span>
							</div>
						</div>

						{/* Article header */}
						<header className="mb-12">
							{post.metadata.icon && (
								<div className="mb-8">
									<Image
										src={post.metadata.icon}
										alt={`${post.metadata.title} icon`}
										width={52}
										height={52}
										quality={100}
										className="rounded-lg"
									/>
								</div>
							)}

							<h1 className="text-foreground mb-8 text-4xl font-bold tracking-tight md:text-5xl">
								{post.metadata.title}
							</h1>

							{post.metadata.description && (
								<p className="text-muted-foreground text-xl leading-relaxed">
									{post.metadata.description}
								</p>
							)}
						</header>

						{/* Article content */}
						<article className="prose prose-lg dark:prose-invert prose-code:break-words w-full">
							<CustomMDX source={post.content} />
						</article>
					</div>
				</div>
			</div>
		</Container>
	)
}
