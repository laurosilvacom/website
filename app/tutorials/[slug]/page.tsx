import {getTutorials} from '../utils'
import {CustomMDX} from 'app/components/mdx'
import {formatDate} from 'app/blog/utils'
import {Metadata} from 'next'
import {notFound} from 'next/navigation'

const baseUrl =
	process.env.NEXT_PUBLIC_URL || 'https://laurosilvadevelopment.com'

interface GenerateMetadataProps {
	params: {slug: string}
	searchParams: {[key: string]: string | string[] | undefined}
}

export async function generateMetadata({
	params
}: GenerateMetadataProps): Promise<Metadata | null> {
	const tutorials = await getTutorials()
	const tutorial = tutorials.find((tutorial) => tutorial.slug === params.slug)

	if (!tutorial) {
		return null
	}

	const {
		title,
		publishedAt: publishedTime,
		summary: description,
		videoUrl,
		icon,
		image
	} = tutorial.metadata

	const ogImage = image
		? `${baseUrl}${image}`
		: `${baseUrl}/og?title=${encodeURIComponent(title)}${
				icon ? `&icon=${encodeURIComponent(icon)}` : ''
			}`

	return {
		title,
		description,
		openGraph: {
			title,
			description,
			type: 'article',
			publishedTime,
			url: `${baseUrl}/tutorials/${tutorial.slug}`,
			images: [
				{
					url: ogImage
				}
			],
			videos: [
				{
					url: videoUrl,
					width: 1920,
					height: 1080,
					type: 'video/mp4'
				}
			]
		},
		twitter: {
			card: 'summary_large_image',
			title,
			description,
			images: [ogImage]
		}
	}
}

export default async function TutorialPage({
	params,
	searchParams
}: {
	params: {slug: string}
	searchParams: {[key: string]: string | string[] | undefined}
}) {
	const tutorials = await getTutorials()
	const tutorial = tutorials.find((tutorial) => tutorial.slug === params.slug)

	if (!tutorial) {
		notFound()
	}

	return (
		<div className="mx-auto max-w-[1200px] px-6 py-10">
			{/* Video section first */}
			<div className="relative mb-12 overflow-hidden rounded-xl bg-black">
				<div className="aspect-video">
					<iframe
						className="h-full w-full"
						src={tutorial.metadata.videoUrl}
						title={tutorial.metadata.title}
						allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
						allowFullScreen
					/>
				</div>
			</div>

			{/* Metadata section */}
			<div className="bg-card mb-16 rounded-xl border p-8">
				{/* Title and icon */}
				<div className="flex items-start gap-4 border-b pb-6">
					{tutorial.metadata.icon && (
						<img
							src={tutorial.metadata.icon}
							alt=""
							className="h-12 w-12 rounded-lg"
						/>
					)}
					<div>
						<h1 className="text-foreground mb-3 text-2xl font-bold">
							{tutorial.metadata.title}
						</h1>
						<p className="text-muted-foreground text-lg">
							{tutorial.metadata.summary}
						</p>
					</div>
				</div>

				{/* Stats row */}
				<div className="text-muted-foreground flex flex-wrap items-center gap-6 border-b py-6">
					<time className="flex items-center gap-2 text-sm">
						<svg
							className="h-4 w-4"
							fill="none"
							viewBox="0 0 24 24"
							stroke="currentColor">
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								strokeWidth={2}
								d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
							/>
						</svg>
						{formatDate(tutorial.metadata.publishedAt)}
					</time>

					<div className="flex items-center gap-2 text-sm">
						<svg
							className="h-4 w-4"
							fill="none"
							viewBox="0 0 24 24"
							stroke="currentColor">
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								strokeWidth={2}
								d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
							/>
						</svg>
						{tutorial.metadata.duration}
					</div>

					{tutorial.metadata.difficulty && (
						<div className="flex items-center gap-2 text-sm">
							<svg
								className="h-4 w-4"
								fill="none"
								viewBox="0 0 24 24"
								stroke="currentColor">
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									strokeWidth={2}
									d="M13 10V3L4 14h7v7l9-11h-7z"
								/>
							</svg>
							<span className="capitalize">{tutorial.metadata.difficulty}</span>
						</div>
					)}
				</div>

				{/* Topics */}
				{tutorial.metadata.topics && tutorial.metadata.topics.length > 0 && (
					<div className="flex flex-wrap gap-2 pt-6">
						{tutorial.metadata.topics.map((topic) => (
							<span
								key={topic}
								className="bg-secondary/50 text-secondary-foreground rounded px-3 py-1 text-sm">
								{topic}
							</span>
						))}
					</div>
				)}
			</div>

			{/* Content section */}
			<article className="prose prose-gray dark:prose-invert mx-auto max-w-3xl">
				<CustomMDX source={tutorial.content} />
			</article>

			<script
				type="application/ld+json"
				suppressHydrationWarning
				dangerouslySetInnerHTML={{
					__html: JSON.stringify({
						'@context': 'https://schema.org',
						'@type': 'Article',
						headline: tutorial.metadata.title,
						description: tutorial.metadata.summary,
						datePublished: tutorial.metadata.publishedAt,
						author: {
							'@type': 'Person',
							name: 'Lauro Silva',
							url: 'https://laurosilvadevelopment.com'
						}
					})
				}}
			/>
		</div>
	)
}

export async function generateStaticParams() {
	const tutorials = await getTutorials()
	return tutorials.map((tutorial) => ({
		slug: tutorial.slug
	}))
}
