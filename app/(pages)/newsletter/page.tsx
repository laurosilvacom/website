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
			<section className="pt-32 pb-16">
				<Container width="base">
					<div className="flex flex-col items-center text-center">
						{/* Illustration */}
						<div className="mb-12 sm:mb-16">
							<img
								src="/newsletter-icon.png"
								alt=""
								role="presentation"
								className="h-40 w-40 animate-[float_3s_ease-in-out_infinite] object-contain sm:h-48 sm:w-48"
								style={{filter: 'none'}}
							/>
						</div>

						{/* Heading */}
						<h1
							className="text-foreground mb-6 max-w-3xl text-3xl leading-tight font-bold sm:text-4xl lg:text-5xl"
							style={{
								fontFamily: 'Elan ITC Std, serif',
								letterSpacing: '-0.04em'
							}}>
							The Newsletter
						</h1>

						{/* Subheading */}
						<p className="text-foreground/80 mb-12 max-w-2xl text-base leading-relaxed sm:mb-16 sm:text-lg">
							I write about building software for the outdoor industry, lessons
							from the trails, and what I'm learning about growing inclusive
							communities. Subscribers get new posts and occasional insights
							that don't make it to the blog.
						</p>

						{/* Newsletter Form */}
						<NewsletterForm />
					</div>
				</Container>
			</section>

			{/* What You'll Get Section */}
			<section className="border-border border-t py-16 lg:py-24">
				<Container width="base">
					<h2
						className="text-foreground mb-12 text-center text-2xl font-bold sm:text-3xl"
						style={{
							fontFamily: 'Elan ITC Std, serif',
							letterSpacing: '-0.035em'
						}}>
						What you'll get
					</h2>

					<div className="mx-auto grid max-w-5xl gap-8 sm:gap-12 md:grid-cols-3">
						<div>
							<h3
								className="text-foreground mb-3 text-lg font-semibold sm:text-xl"
								style={{
									fontFamily: 'Elan ITC Std, serif',
									letterSpacing: '-0.025em'
								}}>
								New posts in your inbox
							</h3>
							<p className="text-foreground/80 text-[15px] leading-relaxed">
								Every time I publish something new, you'll be the first to know.
								No algorithms, no feeds—just direct delivery of new content.
							</p>
						</div>

						<div>
							<h3
								className="text-foreground mb-3 text-lg font-semibold sm:text-xl"
								style={{
									fontFamily: 'Elan ITC Std, serif',
									letterSpacing: '-0.025em'
								}}>
								Exclusive insights
							</h3>
							<p className="text-foreground/80 text-[15px] leading-relaxed">
								Occasional thoughts, lessons, and discoveries that don't make it
								to the blog but are worth sharing with the community.
							</p>
						</div>

						<div>
							<h3
								className="text-foreground mb-3 text-lg font-semibold sm:text-xl"
								style={{
									fontFamily: 'Elan ITC Std, serif',
									letterSpacing: '-0.025em'
								}}>
								No spam, ever
							</h3>
							<p className="text-foreground/80 text-[15px] leading-relaxed">
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
