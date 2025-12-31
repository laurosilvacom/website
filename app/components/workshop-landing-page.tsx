'use client'

import {Badge} from '@/components/ui/badge'
import {Button} from '@/components/ui/button'
import {Card, CardContent} from '@/components/ui/card'
import type {SanityModule, SanityProductContributor} from '@/lib/sanity/types'
import {Sparkles, Clock, Users, Award} from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import {PortableText, type PortableTextBlock} from '@portabletext/react'
import {WorkshopNewsletterBar} from '@/components/workshop-newsletter-bar'

interface WorkshopLandingPageProps {
	workshop: SanityModule
}

export function WorkshopLandingPage({workshop}: WorkshopLandingPageProps) {
	const landingDescription =
		workshop.wipLandingPageDescription || workshop.shortDescription || ''

	return (
		<div className="relative min-h-screen pb-32">
			{/* Hero Section */}
			<section className="relative">
				<div className="mx-auto max-w-7xl px-4 pt-20 pb-12 sm:px-6 lg:px-8 lg:pt-32 lg:pb-20">
					<div className="text-center">
						<div className="animate-in fade-in slide-in-from-bottom-4 duration-1000">
							<Link
								href="/workshops"
								className="text-muted-foreground hover:text-foreground mb-6 inline-flex items-center gap-2 text-xs font-medium tracking-wider uppercase transition-colors">
								{workshop.audience &&
								workshop.audience.length > 0 &&
								workshop.audience[0]
									? `For ${workshop.audience[0].title}`
									: 'Pro Workshop'}
							</Link>

							<div className="mb-6 flex justify-center">
								<Badge
									variant="outline"
									className="bg-accent text-accent-foreground border-border px-4 py-1.5">
									<Sparkles className="mr-1.5 h-3.5 w-3.5" />
									Coming Soon
								</Badge>
							</div>

							<h1 className="text-foreground mx-auto mb-6 max-w-4xl text-5xl font-bold tracking-tight sm:text-6xl lg:text-7xl">
								{workshop.title}
							</h1>

							{workshop.shortDescription && (
								<p className="text-muted-foreground mx-auto mb-12 max-w-2xl text-lg leading-relaxed sm:text-xl">
									{workshop.shortDescription}
								</p>
							)}
						</div>

						{/* Contributors */}
						{workshop.contributors && workshop.contributors.length > 0 && (
							<div className="animate-in fade-in slide-in-from-bottom-4 mb-12 flex justify-center delay-150 duration-1000">
								<div className="flex items-center gap-2">
									<span className="text-muted-foreground text-sm font-medium">
										Taught by
									</span>
									<div className="flex items-center gap-3">
										{workshop.contributors.map(
											(contributorData: SanityProductContributor) => {
												if (!contributorData.contributor) {
													return null
												}

												return (
													<div
														key={contributorData.contributor._id}
														className="flex items-center gap-2">
														<div className="bg-muted ring-background flex h-10 w-10 shrink-0 items-center justify-center overflow-hidden rounded-full ring-2">
															{contributorData.contributor.picture?.asset
																?.url ? (
																<Image
																	src={
																		contributorData.contributor.picture.asset
																			.url
																	}
																	alt={contributorData.contributor.name}
																	width={40}
																	height={40}
																	className="h-10 w-10 rounded-full object-cover"
																/>
															) : (
																<span className="text-muted-foreground text-sm font-semibold">
																	{contributorData.contributor.name
																		.charAt(0)
																		.toUpperCase()}
																</span>
															)}
														</div>
														<span className="text-foreground text-sm font-medium">
															{contributorData.contributor.name}
														</span>
													</div>
												)
											}
										)}
									</div>
								</div>
							</div>
						)}

						{/* CTA Button */}
						<div className="animate-in fade-in slide-in-from-bottom-4 flex justify-center delay-300 duration-1000">
							<Button
								size="lg"
								onClick={() => {
									const formElement = document.getElementById('signup-form')
									formElement?.scrollIntoView({
										behavior: 'smooth',
										block: 'center'
									})
								}}
								className="h-14 px-8 text-base font-semibold shadow-lg">
								Get Early Access
							</Button>
						</div>
					</div>
				</div>
			</section>

			{/* Workshop Image */}
			{workshop.image?.asset?.url && (
				<section className="relative py-12 lg:py-20">
					<div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
						<Card className="animate-in fade-in slide-in-from-bottom-8 overflow-hidden rounded-2xl shadow-xl delay-500 duration-1000">
							<div className="bg-muted relative aspect-video w-full">
								<Image
									src={workshop.image.asset.url}
									alt={workshop.title}
									width={1200}
									height={675}
									className="h-full w-full rounded-2xl object-cover"
									sizes="(max-width: 1280px) 100vw, 1200px"
									priority
								/>
							</div>
						</Card>
					</div>
				</section>
			)}

			{/* Main Content - Single Column Layout */}
			<section className="relative py-12 lg:py-20">
				<div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
					{landingDescription && (
						<div className="animate-in fade-in slide-in-from-bottom-4 mb-12 duration-1000">
							<div className="text-muted-foreground prose prose-lg dark:prose-invert prose-p:text-muted-foreground prose-p:leading-relaxed prose-headings:text-foreground max-w-none">
								{Array.isArray(landingDescription) ? (
									<PortableText
										value={landingDescription as PortableTextBlock[]}
									/>
								) : (
									<p className="text-lg leading-relaxed">
										{landingDescription}
									</p>
								)}
							</div>
						</div>
					)}
				</div>
			</section>

			<div id="signup-form" className="sr-only" />

			<WorkshopNewsletterBar
				workshopSlug={workshop.slug.current}
				audienceId={workshop.resendAudienceId}
				preface="Get early access"
				ctaLabel="Join the Waitlist"
				scrollOffset={400}
			/>
		</div>
	)
}
