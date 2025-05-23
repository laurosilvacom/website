import {
	formatDate,
	getBlogPosts,
	extractTagsFromPosts
} from '@/app/(pages)/blog/utils'
import Container from '@/app/components/container'
import {Card} from '@/app/components/card'
import {CardGrid} from '@/app/components/card-grid'
import {BlogSearch} from '@/app/components/blog-search'
import {Suspense} from 'react'
import {TagFooter} from '@/app/components/tag-footer'
import Link from 'next/link'
import {generatePageMetadata} from '@/app/lib/metadata'
import {StructuredData} from '@/app/components/structured-data'

export const metadata = generatePageMetadata(
	'Blog',
	'A collection of technical articles on web development, programming tutorials, and developer insights. Learn about JavaScript, TypeScript, React, Next.js, and more.',
	{
		keywords: [
			'blog',
			'articles',
			'tutorials',
			'web development',
			'programming',
			'developer blog',
			'technical writing'
		],
		canonical: '/blog'
	}
)

// Define detailed interfaces
interface ExtendedMetadata {
	title: string
	publishedAt: string
	summary: string
	description?: string
	icon?: string
	coverImage?: string
	tags?: string[]
	readingTime?: string
	image?: string
	gradient?: [string, string] | string
}

interface BlogPost {
	slug: string
	metadata: ExtendedMetadata
	content: string
}

// Extend the Next.js params type
interface BlogPageProps {
	searchParams: Promise<{
		q?: string
		tag?: string
		sort?: string
	}>
}

export default async function Page({searchParams}: BlogPageProps) {
	// Properly await searchParams
	const {q, tag, sort} = await searchParams

	// Use the awaited values
	const searchQuery = q?.toLowerCase() || ''
	const tagFilter = tag || ''
	const sortOption = sort || 'relevance'

	const allBlogs = (await getBlogPosts()) as BlogPost[]
	const allTags = extractTagsFromPosts(allBlogs)

	// Filter blogs
	let filteredBlogs = [...allBlogs]

	// Apply search query
	if (searchQuery) {
		filteredBlogs = filteredBlogs.filter((post) => {
			const titleMatch = post.metadata.title.toLowerCase().includes(searchQuery)
			const descriptionMatch =
				post.metadata.description?.toLowerCase()?.includes(searchQuery) || false
			const summaryMatch = post.metadata.summary
				.toLowerCase()
				.includes(searchQuery)
			const contentMatch = post.content.toLowerCase().includes(searchQuery)

			return titleMatch || descriptionMatch || summaryMatch || contentMatch
		})
	}

	// Apply tag filter
	if (tagFilter && tagFilter !== 'all') {
		filteredBlogs = filteredBlogs.filter((post) =>
			post.metadata.tags?.includes(tagFilter)
		)
	}

	// Sort blogs - explicitly based on sortOption
	if (sortOption === 'newest') {
		// Sort by newest
		filteredBlogs.sort((a, b) => {
			return (
				new Date(b.metadata.publishedAt).getTime() -
				new Date(a.metadata.publishedAt).getTime()
			)
		})
	} else {
		// Sort by relevance if there's a search query, otherwise by newest
		if (searchQuery) {
			filteredBlogs.sort((a, b) => {
				// Title matches get highest priority
				const aTitle = a.metadata.title.toLowerCase().includes(searchQuery)
					? 2
					: 0
				const bTitle = b.metadata.title.toLowerCase().includes(searchQuery)
					? 2
					: 0

				// Description/summary matches get medium priority
				const aDesc =
					a.metadata.description?.toLowerCase().includes(searchQuery) ||
					a.metadata.summary.toLowerCase().includes(searchQuery)
						? 1
						: 0
				const bDesc =
					b.metadata.description?.toLowerCase().includes(searchQuery) ||
					b.metadata.summary.toLowerCase().includes(searchQuery)
						? 1
						: 0

				const aScore = aTitle + aDesc
				const bScore = bTitle + bDesc

				if (aScore !== bScore) {
					return bScore - aScore // Higher score first
				}

				// If same relevance, sort by date (newest first)
				return (
					new Date(b.metadata.publishedAt).getTime() -
					new Date(a.metadata.publishedAt).getTime()
				)
			})
		} else {
			// No search query, just sort by date
			filteredBlogs.sort((a, b) => {
				return (
					new Date(b.metadata.publishedAt).getTime() -
					new Date(a.metadata.publishedAt).getTime()
				)
			})
		}
	}

	return (
		<Container className="mx-auto w-full max-w-screen-xl">
			<StructuredData 
				type="website"
				title="Blog - Technical Articles and Tutorials"
				description="A collection of technical articles on web development, programming tutorials, and developer insights."
				url="/blog"
			/>
			<main className="mx-auto py-12">
				<section className="mb-10">
					<h1 className="mb-4 text-4xl font-semibold tracking-tight">
						Articles
					</h1>
					<div className="text-muted-foreground space-y-4 text-xl">
						<p className="leading-relaxed">
							A collection of technical articles on web development.
						</p>
					</div>
				</section>

				{/* Search section with fixed height to prevent layout shifts */}
				<section className="mb-12">
					<Suspense
						fallback={
							<div className="bg-muted h-[130px] animate-pulse rounded-md"></div>
						}>
						<div className="min-h-[130px]">
							<BlogSearch
								allTags={allTags}
								totalPosts={allBlogs.length}
								filteredCount={filteredBlogs.length}
							/>
						</div>
					</Suspense>
				</section>

				<section>
					{filteredBlogs.length > 0 ? (
						<CardGrid>
							{filteredBlogs.map((post) => (
								<Card
									key={post.slug}
									href={`/blog/${post.slug}`}
									title={post.metadata.title}
									description={
										post.metadata.description || post.metadata.summary
									}
									icon={post.metadata.icon}
									date={formatDate(post.metadata.publishedAt, false)}
									footer={
										post.metadata.tags && post.metadata.tags.length > 0 ? (
											<TagFooter tags={post.metadata.tags} />
										) : undefined
									}
								/>
							))}
						</CardGrid>
					) : (
						<div className="bg-muted/30 rounded-lg p-10 text-center">
							<h3 className="mb-2 text-xl font-medium">No articles found</h3>
							<p className="text-muted-foreground mb-4">
								No articles match your current search criteria.
							</p>
							<Link
								href="/blog"
								className="ring-offset-background focus-visible:ring-ring bg-primary text-primary-foreground hover:bg-primary/90 inline-flex h-10 items-center justify-center rounded-md px-4 py-2 text-sm font-medium transition-colors focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50">
								Clear Filters
							</Link>
						</div>
					)}
				</section>
			</main>
		</Container>
	)
}
