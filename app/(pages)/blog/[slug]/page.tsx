import Link from 'next/link'
import {notFound} from 'next/navigation'
import {type Metadata} from 'next'
import Container from '@/components/container'
import {CustomMDX} from '@/components/mdx'
import {TableOfContents} from '@/components/toc'
import {StructuredData} from '@/components/structured-data'
import {generateBlogPostMetadata} from '@/lib/metadata'
import {baseUrl} from '@/app/sitemap'
import {formatDate, getBlogPosts} from '@/lib/blog'

interface BlogHeaderProps {
	date: string
	readingTime: string | undefined
	title: string
	summary: string
	tags?: string[]
}

function BlogHeader({
	date,
	readingTime,
	title,
	summary,
	tags
}: BlogHeaderProps) {
	return (
		<header className="mb-14 space-y-7">
			<div className="space-y-5">
				<div className="space-y-4">
					<time className="text-muted-foreground text-sm">
						{formatDate(date)}
					</time>
					<h1 className="text-2xl font-semibold leading-tight text-foreground sm:text-3xl">
						{title}
					</h1>
					<p className="text-muted-foreground text-lg leading-relaxed sm:text-xl">
						{summary}
					</p>
				</div>

				<div className="flex flex-wrap items-center gap-5 text-sm text-muted-foreground">
					{readingTime && <span>{readingTime}</span>}
					{tags && tags.length > 0 && (
						<div className="flex flex-wrap gap-2.5">
							{tags.map((tag) => (
								<Link
									key={tag}
									href={`/tags/${encodeURIComponent(tag)}`}
									className="hover:text-foreground transition-colors">
									#{tag}
								</Link>
							))}
						</div>
					)}
				</div>
			</div>
		</header>
	)
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
): Promise<Metadata | null> {
	const params = await props.params
	if (!params || !params.slug) return null

	const posts = await getBlogPosts()
	const post = posts.find((post) => post.slug === params.slug)
	if (!post) return null

	const {
		title,
		publishedAt,
		summary,
		tags
	} = post.metadata

	return generateBlogPostMetadata(
		title,
		summary,
		params.slug,
		publishedAt,
		tags
	)
}

export default async function Blog(props: Props) {
	const params = await props.params
	const posts = await getBlogPosts()
	const post = posts.find((p) => p.slug === params.slug)

	if (!post) {
		notFound()
	}

	return (
		<Container>
			<StructuredData
				type="article"
				title={post.metadata.title}
				description={post.metadata.summary}
				image={`${baseUrl}/og?title=${encodeURIComponent(post.metadata.title)}`}
				datePublished={post.metadata.publishedAt}
				dateModified={post.metadata.publishedAt}
				author="Lauro Silva"
				url={`${baseUrl}/blog/${post.slug}`}
			/>

			<article className="py-16">
				<BlogHeader
					date={post.metadata.publishedAt}
					readingTime={post.metadata.readingTime}
					title={post.metadata.title}
					summary={post.metadata.summary}
					tags={post.metadata.tags}
				/>

				<div className="mb-10">
					<TableOfContents />
				</div>

				<div className="prose max-w-none">
					<CustomMDX source={post.content} />
				</div>
			</article>
		</Container>
	)
}
