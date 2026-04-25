import {type Metadata} from 'next'
import Link from 'next/link'
import Container from '@/shared/components/container'
import {NewsletterForm} from '@/features/newsletter/components/newsletter-form'
import {createMetadata} from '@/shared/lib/metadata'
import {baseUrl} from '@/app/sitemap'
import {Button} from '@/shared/ui/button'

export const metadata: Metadata = createMetadata({
	title: 'Newsletter',
	description:
		'Get updates on software engineering, developer education, and practical team workflows.',
	canonical: `${baseUrl}/newsletter`,
})

export default function NewsletterPage() {
	return (
		<>
			{/* Header */}
			<section className="pt-28 pb-12 lg:pt-32 lg:pb-16">
				<Container>
					<div className="space-y-4">
						<h1 className="type-page-title">
							Newsletter
						</h1>
						<p className="type-page-intro">
							Updates on building production software, developer education, and better
							engineering workflows. Subscribers get practical notes that don&apos;t make
							it to the blog.
						</p>
						<div className="flex items-center gap-4 pt-2">
							<Button
								asChild
								variant="link"
								size="sm"
								className="type-link-muted h-auto px-0">
								<Link href="/blog">Read the blog</Link>
							</Button>
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
					<h2 className="type-section-label mb-6">
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
								<span className="type-item-title">{item.title}</span>
								<p className="type-meta">{item.desc}</p>
							</div>
						))}
					</div>
				</Container>
			</section>
		</>
	)
}
