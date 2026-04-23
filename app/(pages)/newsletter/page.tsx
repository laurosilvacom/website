import {type Metadata} from 'next'
import Link from 'next/link'
import Container from '@/shared/components/container'
import {NewsletterForm} from '@/features/newsletter/components/newsletter-form'
import {createMetadata} from '@/shared/lib/metadata'
import {baseUrl} from '@/app/sitemap'

export const metadata: Metadata = createMetadata({
	title: 'Newsletter',
	description:
		'Get updates on software, trails, and community. Subscribe to receive the latest posts and insights.',
	canonical: `${baseUrl}/newsletter`,
})

export default function NewsletterPage() {
	return (
		<>
			{/* Header */}
			<section className="pt-28 pb-12 lg:pt-32 lg:pb-16">
				<Container>
					<div className="space-y-4">
						<h1 className="text-2xl font-normal tracking-tight sm:text-3xl">
							Newsletter
						</h1>
						<p className="text-muted-foreground text-base leading-relaxed">
							Updates on building software, lessons from the trails, and things I&apos;m
							learning about growing inclusive communities. Subscribers get content that
							doesn&apos;t make it to the blog.
						</p>
						<div className="flex items-center gap-4 pt-2 text-sm">
							<Link
								href="/blog"
								className="text-muted-foreground hover:text-foreground underline underline-offset-4 transition-colors">
								Read the blog
							</Link>
						</div>
					</div>
				</Container>
			</section>

			{/* Subscribe */}
			<section className="pb-16 lg:pb-20">
				<Container>
					<div>
						<NewsletterForm />
					</div>
				</Container>
			</section>

			{/* What You Get */}
			<section className="pb-16 lg:pb-20">
				<Container>
					<h2 className="text-foreground text-xs font-medium uppercase tracking-widest mb-6">
						What You&apos;ll Get
					</h2>
					<div className="space-y-3">
						{[
							{
								title: 'New posts in your inbox',
								desc: 'Every time I publish something new, you get it first. No algorithms, no feeds — direct delivery.',
							},
							{
								title: 'Exclusive insights',
								desc: "Occasional thoughts, lessons, and discoveries that don't make it to the blog.",
							},
							{
								title: 'No spam, ever',
								desc: 'I only email when I have something worth sharing. Unsubscribe anytime with one click.',
							},
						].map((item) => (
							<div key={item.title} className="py-3">
								<span className="text-foreground text-sm font-medium">{item.title}</span>
								<p className="text-muted-foreground text-xs">{item.desc}</p>
							</div>
						))}
					</div>
				</Container>
			</section>
		</>
	)
}
