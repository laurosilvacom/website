import {BlogPosts} from 'app/components/posts'
import Container from 'app/components/container'

export const metadata = {
	title: 'Blog',
	description: 'Read my blog.'
}

export default function Page() {
	return (
		<Container className="mx-auto w-full max-w-screen-lg">
			<h1 className="mb-8 text-4xl font-semibold tracking-tight">Articles</h1>
			<BlogPosts />
		</Container>
	)
}
