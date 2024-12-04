import {Card} from 'app/components/card'
import {formatDate, getBlogPosts} from 'app/blog/utils'
import Container from 'app/components/container'
import {CardGrid} from 'app/components/card-grid'

export const metadata = {
	title: 'Blog',
	description: 'Read my blog.'
}

export default async function Page() {
	const allBlogs = await getBlogPosts()

	return (
		<Container className="mx-auto w-full max-w-screen-lg">
			<main className="mx-auto py-12">
				<section className="mb-20">
					<h1 className="mb-8 text-4xl font-semibold tracking-tight">
						Articles!
					</h1>
				</section>

				<section className="mb-20">
					<CardGrid>
						{allBlogs.map((post) => (
							<Card
								key={post.slug}
								href={`/blog/${post.slug}`}
								title={post.metadata.title}
								description={post.metadata.description}
								icon={post.metadata.icon}
								date={formatDate(post.metadata.publishedAt, false)}
								gradient={post.metadata.gradient}
							/>
						))}
					</CardGrid>
				</section>
			</main>
		</Container>
	)
}
