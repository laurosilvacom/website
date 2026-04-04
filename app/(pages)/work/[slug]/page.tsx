import {type Metadata} from 'next/types'
import {notFound} from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import Container from '@/shared/components/container'
import {ArrowLeft} from 'lucide-react'
import {getCaseStudyBySlug, getCaseStudySlugs} from '@/features/work/server'

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
			<section className="pt-32 pb-16 lg:pt-36 lg:pb-20">
				<Container>
					<div className="space-y-4">
						<Link
							href="/work"
							className="text-muted-foreground hover:text-foreground inline-flex items-center gap-1.5 text-xs font-medium transition-colors">
							<ArrowLeft className="h-3 w-3" />
							All work
						</Link>

						<div className="text-muted-foreground flex items-center gap-2 text-xs">
							<span className="font-medium">{study.client}</span>
							<span>·</span>
							<span>{study.type}</span>
						</div>

						<h1 className="font-serif text-3xl leading-[1.1] font-bold tracking-tight sm:text-4xl lg:text-5xl">
							{study.title}
						</h1>

						<div className="flex flex-wrap items-center gap-2 pt-1">
							{study.tags.map((tag) => (
								<span key={tag} className="text-muted-foreground text-xs">
									{tag}
								</span>
							))}
						</div>
					</div>
				</Container>
			</section>

			{/* Challenge */}
			<section className="pb-12 lg:pb-16">
				<Container>
					<h2 className="text-foreground mb-4 text-sm font-semibold">The Challenge</h2>
					<div className="text-muted-foreground mt-4 space-y-4 text-sm leading-relaxed">
						{study.challenge.map((p, i) => (
							<p key={i}>{p}</p>
						))}
					</div>
				</Container>
			</section>

			{/* Approach */}
			<section className="pb-12 lg:pb-16">
				<Container>
					<h2 className="text-foreground mb-4 text-sm font-semibold">The Approach</h2>
					<div className="text-muted-foreground mt-4 space-y-4 text-sm leading-relaxed">
						{study.approach.map((p, i) => (
							<p key={i}>{p}</p>
						))}
					</div>
				</Container>
			</section>

			{/* Outcome */}
			<section className="pb-12 lg:pb-16">
				<Container>
					<h2 className="text-foreground mb-4 text-sm font-semibold">The Outcome</h2>
					<div className="text-muted-foreground mt-4 space-y-4 text-sm leading-relaxed">
						{study.outcome.map((p, i) => (
							<p key={i}>{p}</p>
						))}
					</div>
				</Container>
			</section>

			{/* Tech Stack */}
			<section className="pb-12 lg:pb-16">
				<Container>
					<h2 className="text-foreground mb-4 text-sm font-semibold">Tech Stack</h2>
					<div className="mt-4 flex flex-wrap gap-x-4 gap-y-1">
						{study.techStack.map((tech) => (
							<span key={tech} className="text-muted-foreground text-sm">
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
						<h2 className="text-foreground mb-4 text-sm font-semibold">Testimonial</h2>
						<div className="mt-4 space-y-4">
							<p className="text-foreground text-sm leading-relaxed italic">
								&ldquo;{study.testimonial.quote}&rdquo;
							</p>
							<div className="flex items-center gap-3">
								{study.testimonial.image?.asset?.url && (
									<div className="relative h-8 w-8 shrink-0 overflow-hidden rounded-full">
										<Image
											src={study.testimonial.image.asset.url}
											alt={study.testimonial.name}
											fill
											className="object-cover"
										/>
									</div>
								)}
								<div>
									<p className="text-foreground text-xs font-medium">
										{study.testimonial.name}
									</p>
									<p className="text-muted-foreground text-xs">
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
