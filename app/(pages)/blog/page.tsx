import Container from '@/components/container'
import {BlogPostsByDate} from '@/components/blog-posts-by-date'
import {generatePageMetadata} from '@/lib/metadata'
import {StructuredData} from '@/components/structured-data'
import {getBlogPosts} from '@/lib/blog'

export const metadata = generatePageMetadata(
	'Blog',
	'A collection of technical writing on web development, programming tutorials, and developer insights. Learn about JavaScript, TypeScript, React, Next.js, and more.',
	{
		keywords: [
			'blog',
			'writings',
			'tutorials',
			'web development',
			'programming',
			'developer blog',
			'technical writing'
		],
		canonical: '/blog'
	}
)

export default async function Page() {
	const allBlogs = await getBlogPosts()

	return (
		<Container>
			<StructuredData
				type="website"
				title="Blog - Technical Writing and Tutorials"
				description="A collection of technical writing on web development, programming tutorials, and developer insights."
				url="/blog"
			/>
			<main className="py-16">
				<section className="mb-14">
					<h1 className="mb-3 text-2xl font-semibold leading-tight">
						Writing
					</h1>
					<p className="text-muted-foreground text-lg leading-relaxed">
						Technical writing on web development, programming, and software engineering.
					</p>
				</section>

				<section>
					<BlogPostsByDate posts={allBlogs} />
				</section>
			</main>
		</Container>
	)
}
