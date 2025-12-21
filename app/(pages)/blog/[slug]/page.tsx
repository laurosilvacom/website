import Link from 'next/link'
import {notFound} from 'next/navigation'
import {type Metadata} from 'next'
import Container from '@/components/container'
import {PortableText} from '@/components/portable-text'
import {StructuredData} from '@/components/structured-data'
import {generateBlogPostMetadata, defaultOgImageUrl} from '@/lib/metadata'
import {baseUrl} from '@/app/sitemap'
import {formatDate, getBlogPostBySlug, getBlogPostSlugs} from '@/lib/blog'
import Image from 'next/image'
import {highlightCode} from '@/lib/highlight-code'
import {Button} from '@/components/ui/button'

export const revalidate = 300 // Revalidate every 5 minutes

interface Params {
	slug: string
}

interface Props {
	params: Promise<Params>
}

export async function generateStaticParams() {
	const slugs = await getBlogPostSlugs()
	return slugs.map((slug) => ({slug}))
}

export async function generateMetadata(props: Props): Promise<Metadata | null> {
	const params = await props.params
	if (!params || !params.slug) return null

	const post = await getBlogPostBySlug(params.slug)
	if (!post) return null

	const {title, publishedAt, summary, tags} = post.metadata
	const heroUrl = post.heroImage?.asset?.url

	return generateBlogPostMetadata(
		title,
		summary,
		params.slug,
		publishedAt,
		tags,
		heroUrl
	)
}

export default async function BlogPost({params}: Props) {
	const {slug} = await params
	const post = await getBlogPostBySlug(slug)

	if (!post) {
		notFound()
	}

	// Pre-highlight all code blocks server-side
	const processedBlocks = await Promise.all(
		post.content.map(async (block: any) => {
			if (block._type === 'code' && block.code) {
				const highlightedHTML = await highlightCode(
					block.code,
					block.language || 'plaintext'
				)
				return {...block, highlightedHTML}
			}
			return block
		})
	)

	// Robust reading time calculation
	const readingTime =
		(post as any).readingTime ||
		(post.metadata as any).readingTime ||
		Math.ceil(JSON.stringify(post.content).length / 1500) ||
		5

	const heroUrl = post.heroImage?.asset?.url
	const heroAlt = post.heroImage?.alt || post.metadata.title

	return (
		<>
			<StructuredData
				type="article"
				title={post.metadata.title}
				description={post.metadata.summary}
				image={heroUrl ?? defaultOgImageUrl}
				datePublished={post.metadata.publishedAt}
				dateModified={post.metadata.publishedAt}
				author="Lauro Silva"
				url={`${baseUrl}/blog/${post.slug}`}
			/>

			<article>
				{/* Header Section - Wider and cleaner (Substack style) */}
				<header className="pt-24 pb-12 lg:pt-32 lg:pb-16">
					<Container width="base">
						<div className="mx-auto max-w-4xl space-y-8 text-center">
							<div className="text-muted-foreground flex items-center justify-center gap-3 text-sm font-medium uppercase tracking-widest">
								<time dateTime={post.metadata.publishedAt}>
									{formatDate(post.metadata.publishedAt)}
								</time>
								<span>&middot;</span>
								<span>{readingTime} min read</span>
							</div>

							<h1 className="text-foreground text-balance text-4xl font-bold leading-[1.1] tracking-tight sm:text-5xl lg:text-6xl">
								{post.metadata.title}
							</h1>

							<p className="text-muted-foreground text-balance mx-auto max-w-2xl text-xl leading-relaxed md:text-2xl">
								{post.metadata.summary}
							</p>

							{/* Author block could go here */}
						</div>
					</Container>

					{/* Hero Image - Optimized for LCP */}
					{heroUrl && (
						<Container width="base" className="mt-12 lg:mt-16">
							<div className="bg-muted relative aspect-[2/1] w-full overflow-hidden rounded-xl shadow-sm">
								<Image
									src={heroUrl}
									alt={heroAlt}
									fill
									priority
									className="object-cover"
									sizes="(min-width: 1280px) 1200px, (min-width: 1024px) 960px, 100vw"
								/>
							</div>
							{(post.heroImage as any)?.caption && (
								<figcaption className="text-muted-foreground mt-4 text-center text-sm">
									{(post.heroImage as any).caption}
								</figcaption>
							)}
						</Container>
					)}
				</header>

				{/* Content Section - Narrow for readability */}
				<section className="pb-24 lg:pb-32">
					<Container width="narrow">
						<div className="prose prose-lg mx-auto">
							<PortableText blocks={processedBlocks} />
						</div>
					</Container>
				</section>
			</article>

			<section className="bg-muted/30 border-border border-t py-16 lg:py-24">
				<Container width="narrow">
					<div className="flex flex-col items-center justify-between gap-8 md:flex-row">
						<div className="max-w-md space-y-2 text-center md:text-left">
							<h3 className="text-2xl font-bold">Have questions?</h3>
							<p className="text-muted-foreground">
								Feel free to reach out on LinkedIn or send me an email.
							</p>
						</div>
						<div className="flex gap-4">
							<Button asChild size="lg">
								<a
									href="https://www.linkedin.com/in/laurosilvacom/"
									target="_blank"
									rel="noopener noreferrer">
									Follow on LinkedIn
								</a>
							</Button>
						</div>
					</div>
				</Container>
			</section>
		</>
	)
}
