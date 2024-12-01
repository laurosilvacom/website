import Link from 'next/link'
import {BlogPosts} from 'app/components/posts'

export default function Page() {
	return (
		<main className="bg-background text-foreground mx-auto py-12">
			<section className="mb-20">
				<h1 className="mb-8 text-4xl font-semibold tracking-tight">
					My Portfolio
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
				<h2 className="mb-8 text-4xl font-semibold tracking-tight">Articles</h2>
				<BlogPosts />
				<div className="mt-10">
					<Link
						href="/blog"
						className="text-primary hover:text-primary-foreground font-medium underline transition-colors">
						View All Articles
					</Link>
				</div>
			</section>

			<section className="mb-20">
				<h2 className="mb-8 text-4xl font-semibold tracking-tight">Projects</h2>
				<div className="grid grid-cols-1 gap-12 md:grid-cols-2">
					{/* Example Project */}
					<div className="bg-card rounded-default p-8 shadow-sm transition-shadow hover:shadow-lg">
						<h3 className="mb-4 text-2xl font-semibold">Project Title</h3>
						<p className="text-muted-foreground mb-6">
							Brief description of the project.
						</p>
						<Link
							href="/projects/project-slug"
							className="text-primary hover:text-primary-foreground font-medium underline transition-colors">
							Learn More
						</Link>
					</div>
					{/* Add more project cards as needed */}
				</div>
				<div className="mt-10">
					<Link
						href="/projects"
						className="text-primary hover:text-primary-foreground font-medium underline transition-colors">
						View All Projects
					</Link>
				</div>
			</section>
		</main>
	)
}
