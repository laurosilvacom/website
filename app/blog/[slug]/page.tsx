import {formatDate, getBlogPosts} from 'app/blog/utils'
import {CustomMDX} from 'app/components/mdx'
import {baseUrl} from 'app/sitemap'
import type {Metadata} from 'next'
import {notFound} from 'next/navigation'
import Container from 'app/components/container'
import Image from 'next/image'

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
		image
	} = post.metadata

	const ogImage = image
		? `${baseUrl}${image}`
		: `${baseUrl}/og?title=${encodeURIComponent(title)}`

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
		<Container className="mx-auto w-full">
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

			<div className="relative">
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
				{/* Header content */}
				<header className="relative mx-auto w-full max-w-3xl pt-16 pb-12 md:pt-24 md:pb-16">
					{/* Icon */}
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

					{/* Title */}
					<h1 className="text-foreground mb-8 text-4xl font-bold tracking-tight md:text-5xl">
						{post.metadata.title}
					</h1>

					{/* Meta info */}
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
						<span>5 min read</span>
					</div>

					{/* Description */}
					{post.metadata.description && (
						<p className="text-muted-foreground mt-8 text-xl leading-relaxed">
							{post.metadata.description}
						</p>
					)}
				</header>
			</div>

			<article className="prose dark:prose-invert md:prose-lg prose-code:break-words mx-auto w-full max-w-3xl">
				<CustomMDX source={post.content} />
			</article>
		</Container>
	)
}
