import {formatDate, getBlogPosts} from 'app/blog/utils'
import {Card} from 'app/components/card'
import {CardGrid} from 'app/components/card-grid'
import Container from 'app/components/container'

export const metadata = {
	title: 'Blog',
	description: 'Read my blog.'
}

export default async function Page() {
	const allBlogs = await getBlogPosts()

	// Sort blogs from newest to oldest
	const sortedBlogs = allBlogs.sort((a, b) => {
		return (
			new Date(b.metadata.publishedAt).getTime() -
			new Date(a.metadata.publishedAt).getTime()
		)
	})

	return (
		<Container className="mx-auto w-full max-w-screen-xl">
			<main className="mx-auto py-12">
				<section className="mb-20">
					<h1 className="mb-8 text-4xl font-semibold tracking-tight">
						Articles
					</h1>
					<div className="text-muted-foreground space-y-4 text-xl">
						<p className="leading-relaxed">
							A collection of technical articles on web development.
						</p>
					</div>
				</section>
				<section className="mb-20">
					<CardGrid>
						{sortedBlogs.map((post) => (
							<Card
								key={post.slug}
								href={`/blog/${post.slug}`}
								title={post.metadata.title}
								description={post.metadata.description}
								icon={post.metadata.icon}
								coverImage={post.metadata.coverImage}
								date={formatDate(post.metadata.publishedAt, false)}
							/>
						))}
					</CardGrid>
				</section>
			</main>
		</Container>
	)
}
