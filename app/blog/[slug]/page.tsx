import {formatDate, getBlogPosts} from 'app/blog/utils'
import {CustomMDX} from 'app/components/mdx'
import {baseUrl} from 'app/sitemap'
import type {Metadata} from 'next'
import {notFound} from 'next/navigation'
import Container from 'app/components/container'

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

			<header className="relative mx-auto w-full max-w-screen-lg">
				<div className="relative flex w-full flex-col items-center justify-center pt-24 pb-14 sm:pt-32 sm:pb-24">
					<div className="flex flex-grow items-center justify-center">
						<h1 className="w-full max-w-screen-xl px-5 text-center text-3xl font-semibold tracking-tight text-balance sm:text-3xl md:font-bold">
							{post.metadata.title}
						</h1>
					</div>
				</div>
				<div className="text-muted-foreground mx-auto flex w-full max-w-3xl flex-row justify-center gap-5 px-5 pt-8 text-base sm:items-center sm:justify-between sm:gap-10 md:gap-16 lg:px-5">
					<div className="flex flex-shrink-0 flex-col justify-center font-semibold sm:w-auto">
						<span className="font-mono text-xs font-semibold uppercase opacity-75">
							Published
						</span>
						{formatDate(post.metadata.publishedAt)}
					</div>
				</div>
			</header>

			<article className="invert-svg prose dark:prose-invert md:prose-xl prose-code:break-words prose-pre:bg-card prose-pre:leading-relaxed md:prose-code:break-normal mx-auto w-full max-w-3xl px-5 py-8 md:py-16">
				<CustomMDX source={post.content} />
			</article>
		</Container>
	)
}
