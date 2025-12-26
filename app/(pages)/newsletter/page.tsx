import {type Metadata} from 'next'
import Container from '@/components/container'
import {NewsletterForm} from '@/components/newsletter-form'
import {createMetadata} from '@/lib/metadata'
import {baseUrl} from '@/app/sitemap'

export const metadata: Metadata = createMetadata({
	title: 'Newsletter',
	description:
		'Get updates on software, trails, and community. Subscribe to receive the latest posts and insights.',
	canonical: `${baseUrl}/newsletter`
})

export default function NewsletterPage() {
	return (
		<>
			{/* Hero Section */}
			<section className="relative flex min-h-[75vh] items-center justify-center px-6 pt-32 pb-24 lg:pt-40 lg:pb-32">
				<div className="mx-auto max-w-3xl text-center">
					<div className="animate-in fade-in slide-in-from-bottom-4 space-y-12 duration-1000">
						<h1 className="text-4xl leading-[1.05] font-bold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl">
							Newsletter
						</h1>
						<p className="text-muted-foreground mx-auto max-w-2xl text-xl leading-relaxed">
							I write about building software for the outdoor industry, lessons
							from the trails, and what I'm learning about growing inclusive
							communities. Subscribers get new posts and occasional insights
							that don't make it to the blog.
						</p>
					</div>
					<div className="animate-in fade-in slide-in-from-bottom-4 pt-12 delay-150 duration-1000">
						<NewsletterForm />
					</div>
				</div>
			</section>

			{/* What You'll Get Section */}
			<section className="bg-muted py-24 lg:py-32">
				<Container width="base">
					<h2 className="text-foreground mb-16 text-center text-2xl font-bold tracking-tight sm:text-3xl lg:text-4xl">
						What you'll get
					</h2>

					<div className="mx-auto grid max-w-5xl gap-12 md:grid-cols-3">
						<div className="space-y-4">
							<h3 className="text-foreground text-xl font-bold">
								New posts in your inbox
							</h3>
							<p className="text-muted-foreground text-base leading-relaxed">
								Every time I publish something new, you'll be the first to know.
								No algorithms, no feeds - just direct delivery of new content.
							</p>
						</div>

						<div className="space-y-4">
							<h3 className="text-foreground text-xl font-bold">
								Exclusive insights
							</h3>
							<p className="text-muted-foreground text-base leading-relaxed">
								Occasional thoughts, lessons, and discoveries that don't make it
								to the blog but are worth sharing with the community.
							</p>
						</div>

						<div className="space-y-4">
							<h3 className="text-foreground text-xl font-bold">
								No spam, ever
							</h3>
							<p className="text-muted-foreground text-base leading-relaxed">
								I only email when I have something worth sharing. Your inbox is
								sacred, and I respect that. Unsubscribe anytime with one click.
							</p>
						</div>
					</div>
				</Container>
			</section>
		</>
	)
}
