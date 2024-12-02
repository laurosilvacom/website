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

			<div className="bg-[radial-gradient(ellipse_at_top,#FFF0F5_0,transparent_75%)] dark:bg-[radial-gradient(ellipse_at_top,#1c1415_0,transparent_75%)]">
				<header className="relative mx-auto w-full max-w-3xl py-24 md:py-32">
					<div className="space-y-8">
						{/* Title Section with Icon */}
						<div className="space-y-4">
							{post.metadata.icon && (
								<Image
									src={post.metadata.icon}
									alt={`${post.metadata.title} icon`}
									width={52}
									height={52}
									quality={100}
									className="rounded-[calc(var(--radius)/2)]"
								/>
							)}
							<h1 className="text-foreground text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
								{post.metadata.title}
							</h1>
						</div>

						{/* Metadata Section */}
						<div className="border-border/40 space-y-6">
							{/* Author */}
							<div className="flex items-center gap-4">
								<div className="h-10 w-10 overflow-hidden rounded-full">
									<Image
										src="/heroavatar.jpg"
										alt="Lauro Silva"
										width={100}
										height={100}
										className="object-cover"
										priority
									/>
								</div>
								<div className="flex flex-col">
									<span className="text-foreground font-medium">
										Lauro Silva
									</span>
									<span className="text-muted-foreground text-sm">
										JavaScript Engineer
									</span>
								</div>
							</div>

							{/* Date and Reading Time */}
							<div className="text-muted-foreground flex items-center gap-6 text-sm">
								<div className="flex items-center gap-2">
									<time dateTime={post.metadata.publishedAt}>
										{formatDate(post.metadata.publishedAt)}
									</time>
								</div>
								<div className="flex items-center gap-2">
									<span>{'5 min read'}</span>
								</div>
							</div>
						</div>
					</div>
				</header>
			</div>

			<article className="prose dark:prose-invert md:prose-lg prose-code:break-words mx-auto w-full max-w-3xl">
				<CustomMDX source={post.content} />
			</article>
		</Container>
	)
}
