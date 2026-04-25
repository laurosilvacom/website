'use client'

import type {
	SanityModule,
	SanityProductContributor,
} from '@/shared/integrations/sanity/types'
import {Button} from '@/shared/ui/button'
import {ArrowUpRight, Mail} from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import {PortableText, type PortableTextBlock} from '@portabletext/react'
import {WorkshopNewsletterBar} from '@/features/workshop/components/workshop-newsletter-bar'
import Container from '@/shared/components/container'
import {Avatar, AvatarFallback, AvatarImage} from '@/shared/ui/avatar'
import {Separator} from '@/shared/ui/separator'

interface WorkshopLandingPageProps {
	workshop: SanityModule
}

export function WorkshopLandingPage({workshop}: WorkshopLandingPageProps) {
	const landingDescription =
		workshop.wipLandingPageDescription || workshop.shortDescription || ''

	const audienceLabel =
		workshop.audience && workshop.audience.length > 0 && workshop.audience[0]
			? workshop.audience[0].title
			: null

	const lessonCount = workshop.emailLessons?.length

	return (
		<div className="relative min-h-screen">
			{/* Header */}
			<section className="pt-28 pb-12 lg:pt-32 lg:pb-16">
				<Container>
					<div className="space-y-4">
						<div className="flex items-center gap-2">
							<Button asChild variant="link" size="sm" className="type-link-muted h-auto px-0">
								<Link href="/workshops">Workshops</Link>
							</Button>
							{audienceLabel && (
								<>
									<span className="type-meta">/</span>
									<span className="type-meta">
										For {audienceLabel}
									</span>
								</>
							)}
						</div>
						<h1 className="type-page-title">
							{workshop.title}
						</h1>
						{workshop.shortDescription && (
							<p className="type-page-intro">
								{workshop.shortDescription}
							</p>
						)}
						<div className="flex items-center gap-3 pt-2">
							<Button
								onClick={() => {
									const formElement = document.getElementById('signup-form')
									formElement?.scrollIntoView({
										behavior: 'smooth',
										block: 'center',
									})
								}}>
								Start free email course
								<Mail />
							</Button>
							<Button asChild variant="ghost">
								<Link href="/teaching">
									All teaching
									<ArrowUpRight />
								</Link>
							</Button>
						</div>
					</div>
				</Container>
			</section>

			<Separator />

			{/* Meta strip */}
			<section className="py-2">
				<Container>
					<div className="divide-border grid grid-cols-2 divide-x sm:grid-cols-4">
						{[
							{
								label: 'Format',
								value: 'Email Course',
							},
							{
								label: 'Lessons',
								value: lessonCount ? `${lessonCount} lessons` : 'Coming soon',
							},
							{
								label: 'Price',
								value: 'Free',
							},
							{
								label: 'Status',
								value: 'Available Now',
							},
						].map((item) => (
							<div key={item.label} className="px-4 py-5 first:pl-0 sm:px-6">
								<p className="type-item-title">{item.value}</p>
								<p className="type-meta">{item.label}</p>
							</div>
						))}
					</div>
				</Container>
			</section>

			{/* Contributors */}
			{workshop.contributors && workshop.contributors.length > 0 && (
				<>
					<Separator />
					<section className="py-5">
					<Container>
						<div className="flex items-center gap-3">
							<span className="type-meta">Taught by</span>
							{workshop.contributors.map((contributorData: SanityProductContributor) => {
								if (!contributorData.contributor) return null
								return (
									<div
										key={contributorData.contributor._id}
										className="flex items-center gap-2">
										<Avatar className="size-6">
											{contributorData.contributor.picture?.asset?.url ? (
												<AvatarImage
													src={contributorData.contributor.picture.asset.url}
													alt={contributorData.contributor.name}
												/>
											) : null}
											<AvatarFallback className="text-[0.65rem] font-semibold">
												{contributorData.contributor.name.charAt(0).toUpperCase()}
											</AvatarFallback>
										</Avatar>
										<span className="type-item-title">
											{contributorData.contributor.name}
										</span>
									</div>
								)
							})}
						</div>
					</Container>
					</section>
				</>
			)}

			{/* Workshop Image */}
			{workshop.image?.asset?.url && (
				<>
					<Separator />
					<section className="py-10 lg:py-14">
					<Container>
						<div className="overflow-hidden rounded-xl">
							<Image
								src={workshop.image.asset.url}
								alt={workshop.title}
								width={1200}
								height={675}
								className="h-full w-full object-cover"
								sizes="(max-width: 768px) 100vw, 680px"
								priority
							/>
						</div>
					</Container>
					</section>
				</>
			)}

			{/* Description */}
			{landingDescription && (
				<>
					<Separator />
					<section className="py-16 lg:py-20">
					<Container>
						<h2 className="type-section-label mb-6">
							About This Workshop
						</h2>
						<div>
							<div className="text-muted-foreground prose prose-sm dark:prose-invert prose-p:text-muted-foreground prose-p:leading-relaxed prose-headings:text-foreground max-w-none">
								{Array.isArray(landingDescription) ? (
									<PortableText value={landingDescription as PortableTextBlock[]} />
								) : (
									<p className="type-body-sm">{landingDescription}</p>
								)}
							</div>
						</div>
					</Container>
					</section>
				</>
			)}

			{/* Lessons preview */}
			{workshop.emailLessons && workshop.emailLessons.length > 0 && (
				<>
					<Separator />
					<section className="py-16 lg:py-20">
					<Container>
						<h2 className="type-section-label mb-6">
							What You&apos;ll Learn
						</h2>
						<p className="type-body-sm">
							{lessonCount} lessons delivered to your inbox, one per day.
						</p>
						<div className="mt-6">
							{workshop.emailLessons.map((lesson, i) => (
								<div key={lesson._key || i}>
									<div className="flex items-baseline gap-4 py-3">
										<span className="type-meta w-6 shrink-0 text-right font-mono tabular-nums">
											{String(i + 1).padStart(2, '0')}
										</span>
										<span className="type-item-title">
											{lesson.subject || `Lesson ${i + 1}`}
										</span>
									</div>
									{i < (workshop.emailLessons?.length ?? 0) - 1 && <Separator />}
								</div>
							))}
						</div>
					</Container>
					</section>
				</>
			)}

			{/* CTA */}
			<section className="py-16 lg:py-20">
				<Container>
					<div className="flex flex-col items-start gap-4 sm:flex-row sm:items-center sm:justify-between">
						<div>
							<p className="type-item-title">
								Start learning for free
							</p>
							<p className="type-body-sm">
								{lessonCount
									? `${lessonCount} lessons delivered to your inbox.`
									: 'Free email course — sign up below.'}
							</p>
						</div>
						<Button
							size="sm"
							onClick={() => {
								const formElement = document.getElementById('signup-form')
								formElement?.scrollIntoView({
									behavior: 'smooth',
									block: 'center',
								})
							}}>
							Start free email course
							<Mail />
						</Button>
					</div>
				</Container>
			</section>

			<div id="signup-form" className="sr-only" />

			<WorkshopNewsletterBar
				workshopSlug={workshop.slug.current}
				audienceId={workshop.resendAudienceId}
				lessonCount={lessonCount}
				preface="Free Email Course"
				ctaLabel="Start Learning"
				scrollOffset={400}
			/>
		</div>
	)
}
