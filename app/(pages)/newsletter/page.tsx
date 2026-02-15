import {type Metadata} from 'next'
import Link from 'next/link'
import Container from '@/shared/components/container'
import {NewsletterForm} from '@/features/newsletter/components/newsletter-form'
import {createMetadata} from '@/shared/lib/metadata'
import {baseUrl} from '@/app/sitemap'
import {ArrowRight} from 'lucide-react'
import {Button} from '@/shared/ui/button'

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
			<section className="pt-40 pb-20 lg:pt-48 lg:pb-24">
				<Container width="base">
					<div className="animate-in fade-in slide-in-from-bottom-4 max-w-2xl space-y-4 duration-1000">
						<h1 className="text-4xl leading-[1.08] font-bold tracking-tight sm:text-5xl lg:text-6xl">
							Newsletter
						</h1>
						<p className="text-muted-foreground max-w-xl text-lg leading-relaxed">
							Updates on building software, lessons from the trails, and things
							I&apos;m learning about growing inclusive communities. Subscribers
							get content that doesn&apos;t make it to the blog.
						</p>
						<div className="flex items-center gap-3 pt-2">
							<Button asChild variant="ghost">
								<Link href="/blog">
									Read the blog
									<ArrowRight />
								</Link>
							</Button>
						</div>
					</div>
				</Container>
			</section>

			{/* Subscribe */}
			<section className="border-border border-t py-16 lg:py-20">
				<Container width="base">
					<h2 className="text-sm font-semibold uppercase tracking-wider">
						Subscribe
					</h2>
					<div className="mt-6">
						<NewsletterForm />
					</div>
				</Container>
			</section>

			{/* What You Get */}
			<section className="border-border border-t py-16 lg:py-20">
				<Container width="base">
					<h2 className="text-sm font-semibold uppercase tracking-wider">
						What You&apos;ll Get
					</h2>
					<div className="divide-border mt-4 divide-y">
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
								<span className="text-foreground text-sm font-medium">
									{item.title}
								</span>
								<p className="text-muted-foreground text-xs">{item.desc}</p>
							</div>
						))}
					</div>
				</Container>
			</section>
		</>
	)
}
