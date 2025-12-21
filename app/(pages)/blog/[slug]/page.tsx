import {notFound} from 'next/navigation'
import {type Metadata} from 'next'
import Container from '@/components/container'
import {PortableText} from '@/components/portable-text'
import {StructuredData} from '@/components/structured-data'
import {generateBlogPostMetadata, defaultOgImageUrl} from '@/lib/metadata'
import {baseUrl} from '@/app/sitemap'
import {formatDate, getBlogPostBySlug, getBlogPostSlugs} from '@/lib/blog'
import {getImageClass} from '@/lib/image-utils'
import Image from 'next/image'
import {highlightCode} from '@/lib/highlight-code'
import {Button} from '@/components/ui/button'

export const revalidate = 30

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

			<article className="bg-background">
				{/* Header Section - Title and Information */}
				<header className="py-16 sm:py-20 lg:py-32">
					<Container width="wide">
						<div className="mx-auto max-w-4xl space-y-6 text-center sm:space-y-8">
							<div className="text-muted-foreground text-sm font-medium tracking-wider uppercase">
								<time dateTime={post.metadata.publishedAt}>
									{formatDate(post.metadata.publishedAt)}
								</time>
								<span className="mx-3">•</span>
								<span>{readingTime} min read</span>
							</div>

							<h1 className="text-foreground text-3xl leading-tight font-bold tracking-tight text-balance sm:text-4xl sm:leading-[1.05] lg:text-6xl">
								{post.metadata.title}
							</h1>

							<p className="text-muted-foreground mx-auto max-w-3xl text-lg leading-relaxed text-balance sm:text-xl lg:text-2xl">
								{post.metadata.summary}
							</p>

							{post.metadata.tags && post.metadata.tags.length > 0 && (
								<div className="flex flex-wrap items-center justify-center gap-3">
									{post.metadata.tags.slice(0, 3).map((tag) => (
										<span
											key={tag}
											className="bg-muted text-muted-foreground rounded-full border px-4 py-2 text-sm font-medium">
											{tag}
										</span>
									))}
								</div>
							)}
						</div>
					</Container>
				</header>

				{/* Cover Image Section */}
				{heroUrl && (
					<section className="py-8 sm:py-12 lg:py-16">
						<Container width="wide">
							<div className="mx-auto max-w-5xl">
								<div className="relative aspect-video overflow-hidden rounded-2xl">
									<Image
										src={heroUrl}
										alt={heroAlt}
										fill
										priority
										className={`object-cover ${getImageClass('EDITORIAL_BW')}`}
										sizes="(min-width: 1024px) 1000px, 100vw"
									/>
								</div>
								{(post.heroImage as any)?.caption && (
									<figcaption className="text-muted-foreground mx-auto mt-4 max-w-3xl text-center text-sm italic">
										{(post.heroImage as any).caption}
									</figcaption>
								)}
							</div>
						</Container>
					</section>
				)}

				{/* Content Section */}
				<section className="py-16 sm:py-20 lg:py-24">
					<Container width="wide">
						<div className="mx-auto max-w-3xl px-6 sm:px-8 lg:px-12">
							<div className="prose prose-lg prose-xl max-w-none">
								<PortableText blocks={processedBlocks} />
							</div>
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
