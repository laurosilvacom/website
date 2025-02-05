import Link from 'next/link'
import React from 'react'
import Container from 'app/components/container'
import {CustomMDX} from 'app/components/mdx'
import {getWorkshops, formatDuration} from '../utils'

interface Lesson {
	title: string
	duration: string
}

interface CurriculumSection {
	title: string
	lessons: Lesson[]
}

interface WorkshopMetadata {
	title: string
	description: string
	price: string
	duration: string
	topics: string[]
	status: string
	curriculum: CurriculumSection[]
}

interface Workshop {
	slug: string
	content: string
	metadata: WorkshopMetadata
}

export async function generateStaticParams(): Promise<{slug: string}[]> {
	const workshops = await getWorkshops()
	return workshops.map((workshop) => ({
		slug: workshop.slug
	}))
}

interface WorkshopHeaderProps {
	title: string
	description: string
	price: string
	duration: string
	topics: string[]
	status: string
}

function WorkshopHeader({
	title,
	description,
	duration,
	topics,
	status
}: WorkshopHeaderProps) {
	return (
		<header className="mx-auto w-full max-w-4xl">
			<div className="space-y-6">
				<div className="flex items-center justify-between">
					<span
						className={`text-sm ${
							status === 'available' ? 'text-primary' : 'text-muted-foreground'
						}`}>
						{status}
					</span>
					<span className="text-muted-foreground text-sm">
						{formatDuration(duration)}
					</span>
				</div>

				<h1 className="text-foreground text-3xl font-bold sm:text-4xl md:text-5xl lg:text-6xl">
					{title}
				</h1>

				<div className="space-y-3">
					<p className="text-muted-foreground text-lg md:text-xl">
						{description}
					</p>
					<div className="flex flex-wrap gap-2">
						{topics.map((topic) => (
							<span
								key={topic}
								className="bg-secondary/10 rounded-full px-3 py-1 text-sm">
								{topic}
							</span>
						))}
					</div>
				</div>
			</div>
		</header>
	)
}

type Props = {
	params: Promise<{slug: string}>
	searchParams: Promise<{[key: string]: string | string[] | undefined}>
}

export default async function WorkshopPage(
	props: Props
): Promise<React.ReactElement> {
	const params = await props.params

	const workshops = (await getWorkshops()) as Workshop[]
	const workshop = workshops.find((w) => w.slug === params.slug)

	if (!workshop) {
		return <div>Workshop not found</div>
	}

	return (
		<div className="bg-background relative min-h-screen">
			<Container className="mx-auto w-full max-w-screen-xl">
				<div className="mx-auto flex w-full px-5 sm:px-10 lg:px-0">
					<div className="w-full py-12">
						{/* Back link */}
						<Link
							href="/workshops"
							className="text-primary mb-12 inline-flex items-center gap-2 hover:opacity-80">
							← Back to Workshops
						</Link>

						{/* Content grid */}
						<div className="grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_340px] lg:gap-x-[clamp(2rem,6vw,6rem)]">
							{/* Main content */}
							<div className="min-w-0">
								{/* Header section */}
								<div className="relative mb-16">
									<WorkshopHeader
										title={workshop!.metadata.title}
										description={workshop!.metadata.description}
										price={workshop!.metadata.price}
										duration={workshop!.metadata.duration}
										topics={workshop!.metadata.topics}
										status={workshop!.metadata.status}
									/>
								</div>

								{/* Content */}
								<article className="prose prose-xl dark:prose-invert prose-headings:scroll-mt-24 prose-headings:font-bold prose-p:text-muted-foreground prose-ul:text-muted-foreground prose-ol:text-muted-foreground prose-li:text-muted-foreground mx-auto max-w-none">
									<CustomMDX source={workshop!.content} />
								</article>
							</div>

							{/* Sidebar */}
							<aside className="relative lg:block">
								<div className="sticky top-24 space-y-8">
									<div className="bg-card overflow-hidden rounded-xl border shadow-sm">
										<div className="p-6">
											<div className="mb-6 flex items-center justify-between">
												<span className="text-xl font-bold">
													{workshop!.metadata.price}
												</span>
												<span className="text-muted-foreground text-sm">
													{formatDuration(workshop!.metadata.duration)} total
												</span>
											</div>

											<button
												className="bg-primary text-primary-foreground hover:bg-primary/90 mb-6 w-full rounded-lg px-8 py-3 font-medium transition-all disabled:opacity-50"
												disabled={workshop!.metadata.status === 'coming-soon'}>
												{workshop!.metadata.status === 'available'
													? 'Enroll Now'
													: 'Coming Soon'}
											</button>

											<div className="space-y-6">
												<h3 className="text-lg font-semibold">
													Workshop Curriculum
												</h3>
												{workshop!.metadata.curriculum.map((section, i) => (
													<div key={i}>
														<h4 className="mb-2 font-medium">
															{section.title}
														</h4>
														<ul className="space-y-2">
															{section.lessons.map((lesson, j) => (
																<li
																	key={j}
																	className="text-muted-foreground flex items-center justify-between text-sm">
																	<span>{lesson.title}</span>
																	<span>{formatDuration(lesson.duration)}</span>
																</li>
															))}
														</ul>
													</div>
												))}
											</div>
										</div>
									</div>
								</div>
							</aside>
						</div>
					</div>
				</div>
			</Container>
		</div>
	)
}
