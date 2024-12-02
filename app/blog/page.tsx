import {BlogPosts} from 'app/components/posts'
import Container from 'app/components/container'

export const metadata = {
	title: 'Blog',
	description: 'Read my blog.'
}

export default function Page() {
	return (
		<Container className="mx-auto w-full max-w-screen-lg">
			<main className="mx-auto py-12">
				<section className="mb-20">
					<h1 className="mb-8 text-4xl font-semibold tracking-tight">
						Articles!
					</h1>
				</section>

				<section className="mb-20">
					<BlogPosts />
				</section>
			</main>
		</Container>
	)
}
