import Link from 'next/link'
import Image from 'next/image'
import React from 'react'
import Container from 'app/components/container'
import {CustomMDX} from 'app/components/mdx'
import {getWorkshops, getWorkshopLessons} from '../utils'
import {BookOpen, Check, ChevronDown, Trophy, CheckCircle} from 'lucide-react'
import {Button} from '@/components/ui/button'
import {Progress} from '@/components/ui/progress'
import {getCompletedLessons} from '../actions/lesson-completion'
import {ResetProgressButton} from '@/components/reset-progress-button'

import {StartWorkshopButton} from '@/components/start-workshop-button'
import {hasStartedWorkshop} from '../actions/user-data'

// Add this new import for the client component
import {LessonLink} from './lesson-link'

export async function generateStaticParams(): Promise<{slug: string}[]> {
	const workshops = await getWorkshops()
	return workshops.map((workshop) => ({
		slug: workshop.slug
	}))
}

interface Props {
	params: Promise<{slug: string}>
}

export default async function WorkshopPage(props: Props) {
	// Await the params to resolve the slug
	const {slug} = await props.params

	const workshops = await getWorkshops()
	const workshop = workshops.find((w) => w.slug === slug)

	if (!workshop) {
		return <div>Workshop not found</div>
	}

	// Get the lessons for this workshop
	const lessons = await getWorkshopLessons(slug)

	// Get the first lesson if available
	const firstLesson = lessons.length > 0 ? lessons[0] : null

	// Count total lessons
	const totalLessons = workshop.metadata.curriculum.reduce(
		(total, section) => total + section.lessons.length,
		0
	)

	// Get completed lessons
	const completedLessons = await getCompletedLessons()

	// Filter to just this workshop's completed lessons
	const workshopCompletedLessons = completedLessons.filter((id) =>
		id.startsWith(`${slug}/`)
	)

	// Calculate completion status
	const completedCount = workshopCompletedLessons.length
	const completionPercentage = Math.round((completedCount / totalLessons) * 100)
	const isCompleted = completedCount === totalLessons
	const hasStarted = completedCount > 0
	const hasUserStarted = await hasStartedWorkshop(slug)

	return (
		<div className="relative min-h-screen">
			<Container className="mx-auto w-full max-w-screen-xl">
				<div className="mx-auto flex w-full px-5 sm:px-10 lg:px-0">
					<div className="w-full py-12">
						{/* Back link */}
						<Link
							href="/workshops"
							className="text-primary mb-8 inline-flex items-center gap-2 hover:opacity-80">
							← Back to Workshops
						</Link>

						{/* Hero Section */}
						<div className="mb-16 grid grid-cols-1 gap-8 md:grid-cols-[2fr_1fr] md:items-start md:gap-12">
							<div>
								<h1 className="text-foreground mb-6 text-4xl font-bold sm:text-5xl">
									{workshop.metadata.title}
								</h1>

								<p className="text-muted-foreground mb-8 text-xl leading-relaxed">
									{workshop.metadata.description}
								</p>

								<div className="mb-4 flex flex-wrap gap-8">
									{/* Stats */}
									<div className="flex items-center gap-2">
										<BookOpen className="text-primary h-5 w-5" />
										<span className="text-muted-foreground">
											{totalLessons} lessons
										</span>
									</div>

									{/* Completion status */}
									{hasStarted && (
										<div className="flex items-center gap-2">
											<CheckCircle
												className={`h-5 w-5 ${isCompleted ? 'text-primary' : 'text-muted-foreground'}`}
											/>
											<span className="text-muted-foreground">
												{completedCount} of {totalLessons} completed
											</span>
										</div>
									)}
								</div>

								{/* Completion progress */}
								{hasStarted && (
									<div className="mb-6 space-y-2">
										<div className="flex justify-between text-sm">
											<span className="text-muted-foreground font-medium">
												Progress
											</span>
											<span className="text-muted-foreground font-medium">
												{completionPercentage}%
											</span>
										</div>
										<Progress value={completionPercentage} className="h-2" />
									</div>
								)}

								{/* Certificate link if completed */}
								<div className="mt-4 flex flex-wrap gap-4">
									{isCompleted && (
										<Button asChild variant="default" className="gap-2">
											<Link href={`/workshops/${slug}/certificate`}>
												<Trophy className="h-4 w-4" />
												View Your Certificate
											</Link>
										</Button>
									)}

									{/* Reset progress button - only show if user has started */}
									{hasStarted && <ResetProgressButton workshopSlug={slug} />}
								</div>
							</div>

							{/* Workshop Image */}
							<div className="relative aspect-square overflow-hidden">
								<Image
									src={workshop.metadata.imageUrl}
									alt={workshop.metadata.title}
									fill
									className="object-cover"
									priority
								/>
							</div>
						</div>

						{/* Content grid */}
						<div className="grid grid-cols-1 gap-12 lg:grid-cols-[2fr_1fr]">
							{/* Main content */}
							<div>
								{/* Highlights section */}
								<div className="mb-12">
									<h2 className="text-foreground mb-6 text-2xl font-bold">
										Workshop Highlights
									</h2>
									<div className="grid gap-4 sm:grid-cols-2">
										{workshop.metadata.highlights.map((highlight, i) => (
											<div
												key={i}
												className="border-border bg-card flex items-start gap-3 rounded-lg border p-4">
												<div className="bg-primary/10 rounded-full p-1">
													<Check className="text-primary h-4 w-4" />
												</div>
												<span className="text-foreground">{highlight}</span>
											</div>
										))}
									</div>
								</div>

								<article className="prose prose-xl text-foreground">
									<CustomMDX source={workshop.content} />
								</article>
							</div>

							{/* Sidebar */}
							<div className="relative">
								<div className="sticky top-24 space-y-8">
									<div className="border-border bg-card overflow-hidden rounded-xl border shadow-sm">
										{/* Curriculum tabs */}
										<div className="divide-border divide-y">
											{workshop.metadata.curriculum.map(
												(section, sectionIndex) => {
													// Check if this section is completed
													const sectionLessons = lessons.filter(
														(l) => l.metadata.section === section.title
													)
													const isSectionCompleted = sectionLessons.every(
														(lesson) =>
															completedLessons.includes(
																`${slug}/${lesson.slug}`
															)
													)

													return (
														<details
															key={sectionIndex}
															className="group"
															open={sectionIndex === 0}>
															<summary className="text-foreground hover:bg-muted/50 flex cursor-pointer items-center justify-between p-4 font-medium">
																<div className="flex items-center gap-2">
																	{isSectionCompleted ? (
																		<CheckCircle className="text-primary h-4 w-4" />
																	) : null}
																	<span>{section.title}</span>
																	<span className="bg-muted text-muted-foreground py-0.2 ml-2 rounded-full px-2 text-xs">
																		{section.lessons.length}
																	</span>
																</div>
																<ChevronDown className="text-muted-foreground h-5 w-5 transition-transform group-open:rotate-180" />
															</summary>

															<div className="border-border bg-card/50 border-t p-4">
																<ul className="space-y-3">
																	{section.lessons.map(
																		(lesson, lessonIndex) => {
																			// Find the lesson in our lessons array if available
																			const lessonFile = lessons.find(
																				(l) => l.metadata.title === lesson.title
																			)

																			// Check if this lesson is completed
																			const isLessonCompleted = lessonFile
																				? completedLessons.includes(
																						`${slug}/${lessonFile.slug}`
																					)
																				: false

																			return (
																				<li key={lessonIndex} className="group">
																					<div className="flex items-center gap-3">
																						{isLessonCompleted ? (
																							<div className="bg-primary text-primary-foreground flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-xs font-medium">
																								<Check className="h-3 w-3" />
																							</div>
																						) : (
																							<div className="bg-secondary flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-xs font-medium">
																								{sectionIndex *
																									section.lessons.length +
																									lessonIndex +
																									1}
																							</div>
																						)}

																						{lessonFile ? (
																							// Use our custom lesson link component instead
																							<LessonLink
																								lessonSlug={lessonFile.slug}
																								lessonTitle={lesson.title}
																								workshopSlug={slug}
																								workshopTitle={
																									workshop.metadata.title
																								}
																								isCompleted={isLessonCompleted}
																								hasUserStarted={hasUserStarted}
																							/>
																						) : (
																							<span className="text-muted-foreground">
																								{lesson.title}
																							</span>
																						)}
																					</div>
																				</li>
																			)
																		}
																	)}
																</ul>
															</div>
														</details>
													)
												}
											)}
										</div>

										{/* CTA Button */}
										<div className="border-border border-t p-4">
											{!hasUserStarted ? (
												<StartWorkshopButton
													workshopSlug={slug}
													workshopTitle={workshop.metadata.title}
													firstLessonSlug={firstLesson?.slug || ''}
												/>
											) : (
												<Button
													className="w-full justify-center"
													size="lg"
													asChild>
													<Link
														href={`/workshops/${slug}/lessons/${firstLesson?.slug}`}>
														Continue Workshop
													</Link>
												</Button>
											)}
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</Container>
		</div>
	)
}
