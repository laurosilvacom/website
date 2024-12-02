import Link from 'next/link'
import {BlogPosts} from 'app/components/posts'
import Container from 'app/components/container'

export default function Page() {
	return (
		<Container className="mx-auto w-full max-w-screen-lg">
			<main className="mx-auto space-y-20 py-12">
				<section>
					<h1 className="text-foreground mb-6 text-4xl font-bold tracking-tight">
						Welcome!
					</h1>
					<p className="text-muted-foreground text-xl leading-relaxed">
						{`I'm a Vim enthusiast and tab advocate, finding unmatched efficiency in. This extends to my support for static typing, where its
            early error detection ensures cleaner code, and my preference for dark
            mode, which eases long coding sessions by reducing eye strain.`}
					</p>
				</section>

				<section>
					<h2 className="text-foreground mb-8 text-3xl font-semibold tracking-tight">
						Articles
					</h2>

					<div className="space-y-8">
						<BlogPosts />

						<Link
							href="/blog"
							className="group text-primary hover:text-primary/70 mt-10 inline-flex items-center transition-colors">
							<span className="font-base">View All</span>
							<svg
								className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1"
								xmlns="http://www.w3.org/2000/svg"
								fill="none"
								viewBox="0 0 24 24"
								stroke="currentColor">
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									strokeWidth={2}
									d="M9 5l7 7-7 7"
								/>
							</svg>
						</Link>
					</div>
				</section>
			</main>
		</Container>
	)
}
