import Link from 'next/link'
import {BlogPosts} from 'app/components/posts'
import Container from 'app/components/container'

export default function Page() {
	return (
		<Container className="mx-auto w-full max-w-screen-lg">
			<main className="mx-auto py-12">
				<section className="mb-20">
					<h1 className="mb-8 text-4xl font-semibold tracking-tight">
						Welcome!
					</h1>
					<p className="text-muted-foreground mb-6 text-xl leading-relaxed">
						{`I'm a Vim enthusiast and tab advocate, finding unmatched efficiency in. This extends to my support for static typing, where its
          early error detection ensures cleaner code, and my preference for dark
          mode, which eases long coding sessions by reducing eye strain.`}
					</p>
					<p className="text-muted-foreground text-xl leading-relaxed">
						{`On this site, you can check out all the `}
						<Link
							href="/blog"
							className="text-primary hover:text-primary-foreground underline transition-colors">
							articles
						</Link>
						{` I've written or learn more `}
						<Link
							href="/about"
							className="text-primary hover:text-primary-foreground underline transition-colors">
							about me
						</Link>
						{`.`}
					</p>
				</section>

				<section className="mb-20">
					<h2 className="mb-8 text-4xl font-semibold tracking-tight">
						Articles
					</h2>

					<BlogPosts />

					<div className="mt-10">
						<Link
							href="/blog"
							className="text-primary hover:text-primary-foreground font-medium underline transition-colors">
							View All Articles
						</Link>
					</div>
				</section>
			</main>
		</Container>
	)
}
