import {type Metadata} from 'next/types'
import {notFound} from 'next/navigation'
import Link from 'next/link'
import Container from '@/shared/components/container'
import {ArrowLeft} from 'lucide-react'
import {getCaseStudyBySlug, getCaseStudySlugs} from '@/features/work/server'
import {Avatar, AvatarFallback, AvatarImage} from '@/shared/ui/avatar'
import {Button} from '@/shared/ui/button'

export async function generateStaticParams() {
	const slugs = await getCaseStudySlugs()
	return slugs.map((slug) => ({slug}))
}

type PageProps = {
	params: Promise<{slug: string}>
}

export async function generateMetadata({params}: PageProps): Promise<Metadata> {
	const {slug} = await params
	const study = await getCaseStudyBySlug(slug)
	if (!study) return {title: 'Not Found'}
	return {
		title: `${study.client} - ${study.title}`,
		description: study.challenge[0],
	}
}

export default async function CaseStudyPage({params}: PageProps) {
	const {slug} = await params
	const study = await getCaseStudyBySlug(slug)

	if (!study) {
		notFound()
	}

	return (
		<>
			{/* Header */}
			<section className="pt-28 pb-12 lg:pt-32 lg:pb-16">
				<Container>
					<div className="space-y-4">
						<Button asChild variant="link" size="sm" className="type-link-muted h-auto px-0">
							<Link href="/work" className="inline-flex items-center gap-1.5">
								<ArrowLeft className="h-3 w-3" />
								All work
							</Link>
						</Button>

						<div className="type-meta flex items-center gap-2">
							<span className="font-medium">{study.client}</span>
							<span>·</span>
							<span>{study.type}</span>
						</div>

						<h1 className="type-page-title">
							{study.title}
						</h1>

						<div className="flex flex-wrap items-center gap-2 pt-1">
							{study.tags.map((tag) => (
								<span key={tag} className="type-meta">
									{tag}
								</span>
							))}
						</div>
					</div>
				</Container>
			</section>

			{/* Challenge */}
			<section className="pb-16 lg:pb-20">
				<Container>
					<h2 className="type-section-label mb-6">The Challenge</h2>
					<div className="type-body-sm mt-4 space-y-4">
						{study.challenge.map((p, i) => (
							<p key={i}>{p}</p>
						))}
					</div>
				</Container>
			</section>

			{/* Approach */}
			<section className="pb-16 lg:pb-20">
				<Container>
					<h2 className="type-section-label mb-6">The Approach</h2>
					<div className="type-body-sm mt-4 space-y-4">
						{study.approach.map((p, i) => (
							<p key={i}>{p}</p>
						))}
					</div>
				</Container>
			</section>

			{/* Outcome */}
			<section className="pb-16 lg:pb-20">
				<Container>
					<h2 className="type-section-label mb-6">The Outcome</h2>
					<div className="type-body-sm mt-4 space-y-4">
						{study.outcome.map((p, i) => (
							<p key={i}>{p}</p>
						))}
					</div>
				</Container>
			</section>

			{/* Tech Stack */}
			<section className="pb-16 lg:pb-20">
				<Container>
					<h2 className="type-section-label mb-6">Tech Stack</h2>
					<div className="mt-4 flex flex-wrap gap-x-4 gap-y-1">
						{study.techStack.map((tech) => (
							<span key={tech} className="type-body-sm">
								{tech}
							</span>
						))}
					</div>
				</Container>
			</section>

			{/* Testimonial */}
			{study.testimonial && (
				<section className="pb-16 lg:pb-20">
					<Container>
						<h2 className="type-section-label mb-6">Testimonial</h2>
						<div className="mt-4 space-y-4">
							<p className="type-body-sm text-foreground italic">
								&ldquo;{study.testimonial.quote}&rdquo;
							</p>
							<div className="flex items-center gap-3">
								{study.testimonial.image?.asset?.url && (
									<Avatar className="size-8 shrink-0">
										<AvatarImage
											src={study.testimonial.image.asset.url}
											alt={study.testimonial.name}
										/>
										<AvatarFallback>
											{study.testimonial.name.charAt(0).toUpperCase()}
										</AvatarFallback>
									</Avatar>
								)}
								<div>
									<p className="type-meta text-foreground font-medium">
										{study.testimonial.name}
									</p>
									<p className="type-meta">
										{study.testimonial.title}
									</p>
								</div>
							</div>
						</div>
					</Container>
				</section>
			)}
		</>
	)
}
