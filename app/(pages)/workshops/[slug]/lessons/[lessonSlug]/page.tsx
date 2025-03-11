import {ChevronRight, ChevronLeft, Clock, Home} from 'lucide-react'
import Link from 'next/link'
import React from 'react'
import {getWorkshops, getWorkshopLessons} from '../../../utils'
import {
	getCompletedLessons,
	isLessonCompleted
} from '@/app/(pages)/workshops/actions/lesson-completion'
import ClientWorkshopSidebar from '@/components/client-workshop-sidebar'

import {LessonCompletion} from '@/components/lesson-completion'
import {CustomMDX} from '@/components/mdx'
import {Button} from '@/components/ui/button'
import {
	SidebarInset,
	SidebarProvider,
	SidebarTrigger
} from '@/components/ui/sidebar'
import {getUserData} from '@/app/(pages)/workshops/actions/user-data'

// Relative imports

import type {Lesson} from '../../../types'

export async function generateStaticParams() {
	const workshops = await getWorkshops()

	const params = await Promise.all(
		workshops.map(async (workshop) => {
			const lessons = await getWorkshopLessons(workshop.slug)

			return lessons.map((lesson) => ({
				slug: workshop.slug,
				lessonSlug: lesson.slug
			}))
		})
	)

	return params.flat()
}

interface Props {
	params: Promise<{
		slug: string
		lessonSlug: string
	}>
}

export default async function LessonPage(props: Props) {
	// Await the params
	const params = await props.params

	const workshops = await getWorkshops()
	const workshop = workshops.find((w) => w.slug === params.slug)

	if (!workshop) {
		return <div>Workshop not found</div>
	}

	const lessons = await getWorkshopLessons(params.slug)
	const lesson = lessons.find((l) => l.slug === params.lessonSlug)

	if (!lesson) {
		return <div>Lesson not found</div>
	}

	// Find next and previous lessons
	const currentIndex = lessons.findIndex((l) => l.slug === params.lessonSlug)
	const prevLesson = currentIndex > 0 ? lessons[currentIndex - 1] : null
	const nextLesson =
		currentIndex < lessons.length - 1 ? lessons[currentIndex + 1] : null

	// Organize lessons by section for the sidebar
	const lessonsBySection = workshop.metadata.curriculum.reduce(
		(acc, section) => {
			const sectionLessons = lessons.filter(
				(l) => l.metadata.section === section.title
			)
			if (sectionLessons.length > 0) {
				acc[section.title] = sectionLessons
			}
			return acc
		},
		{} as Record<string, Lesson[]>
	)

	// Get all lessons in a flat array, sorted by number
	const allLessons = Object.values(lessonsBySection)
		.flat()
		.sort((a, b) => a.metadata.number - b.metadata.number)

	// Get the completion status for the current lesson
	const isCurrentLessonCompleted = await isLessonCompleted(
		`${params.slug}/${params.lessonSlug}`
	)

	// Get all completed lessons
	const completedLessons = await getCompletedLessons()

	const userData = await getUserData()

	return (
		<div className="text-foreground h-screen overflow-hidden">
			<SidebarProvider defaultOpen={true}>
				<ClientWorkshopSidebar
					workshopTitle={workshop.metadata.title}
					lessonsBySection={lessonsBySection}
					workshopSlug={params.slug}
					currentLessonSlug={params.lessonSlug}
					allLessons={allLessons}
					completedLessons={completedLessons}
				/>

				<SidebarInset>
					{/* Header */}
					<header className="border-border bg-card flex h-14 items-center border-b px-4">
						<div className="flex items-center">
							<SidebarTrigger className="text-muted-foreground hover:text-foreground hover:bg-accent mr-2 rounded-md p-2" />

							<div className="flex items-center">
								{/* Workshop title link - HIDE ON MOBILE */}
								<Link
									href={`/workshops/${params.slug}`}
									className="text-muted-foreground hover:text-foreground hidden text-sm sm:inline">
									{workshop.metadata.title}
								</Link>

								{/* Right arrow - HIDE ON MOBILE */}
								<ChevronRight className="text-muted-foreground/50 mx-1 hidden h-4 w-4 sm:inline" />

								{/* Section link - HIDE ON MOBILE */}
								{(() => {
									const currentSection = lesson.metadata.section
									const lessonsInSection = lessons
										.filter((l) => l.metadata.section === currentSection)
										.sort((a, b) => a.metadata.number - b.metadata.number)

									const firstLessonInSection =
										lessonsInSection.length > 0 ? lessonsInSection[0] : null

									return (
										<>
											{firstLessonInSection ? (
												<Link
													href={`/workshops/${params.slug}/lessons/${firstLessonInSection.slug}`}
													className="text-muted-foreground hover:text-foreground hidden text-sm sm:inline">
													{currentSection}
												</Link>
											) : (
												<span className="text-muted-foreground hidden text-sm sm:inline">
													{currentSection}
												</span>
											)}
										</>
									)
								})()}

								{/* Right arrow - HIDE ON MOBILE */}
								<ChevronRight className="text-muted-foreground/50 mx-1 hidden h-4 w-4 sm:inline" />

								{/* Current lesson title - ALWAYS SHOW */}
								<span className="text-foreground max-w-[300px] truncate text-base font-semibold sm:max-w-[300px]">
									{lesson.metadata.title}
								</span>
							</div>
						</div>

						<div className="ml-auto flex items-center gap-4">
							{/* User greeting with name and progress - NEW */}
							<div className="text-muted-foreground hidden items-center text-sm sm:flex">
								<span className="font-medium">
									{userData?.name ? `${userData.name}, ` : ''}
									you have completed {completedLessons.length} of{' '}
									{allLessons.length} lessons
								</span>
							</div>

							{/* Lesson number - HIDE ON MOBILE */}
							<div className="text-muted-foreground hidden items-center text-sm sm:flex">
								<Clock className="mr-1 h-4 w-4" />
								<span>
									Lesson {lesson.metadata.number} of {allLessons.length}
								</span>
							</div>

							{/* Always show completion button */}
							<LessonCompletion
								workshopSlug={params.slug}
								lessonSlug={params.lessonSlug}
								initialCompletionState={isCurrentLessonCompleted}
								variant="icon"
								lessonsBySection={lessonsBySection}
								allLessons={allLessons}
								nextLessonSlug={nextLesson?.slug}
							/>
						</div>
					</header>

					{/* Main content area */}
					<main className="h-[calc(100vh-56px)] overflow-auto">
						<div className="mx-auto max-w-5xl px-4 py-8 md:px-8 lg:px-12">
							{/* Lesson header */}
							<div className="mb-12">
								<div className="text-muted-foreground mb-4 flex items-center gap-3 text-sm">
									<span className="bg-primary/10 text-primary inline-flex items-center rounded-full px-3 py-1 text-xs font-medium">
										{lesson.metadata.section}
									</span>
									<span className="text-primary/50">•</span>
									<span className="font-medium">
										Lesson {lesson.metadata.number}
									</span>
								</div>

								<h1 className="text-foreground mb-8 text-5xl leading-tight font-extrabold tracking-tight sm:text-6xl">
									<span className="relative">
										{lesson.metadata.title}
										<span className="bg-primary/0 absolute right-0 -bottom-3 left-0 h-3 w-full">
											<svg
												width="100%"
												height="12"
												viewBox="0 0 1200 12"
												fill="none"
												xmlns="http://www.w3.org/2000/svg"
												preserveAspectRatio="none">
												<path
													d="M0 6C100 2 200 10 300 6C400 2 500 10 600 6C700 2 800 10 900 6C1000 2 1100 10 1200 6"
													stroke="hsl(var(--primary))"
													strokeWidth="4"
													strokeLinecap="round"
													className="animate-draw"
												/>
											</svg>
										</span>
									</span>
								</h1>
							</div>

							{/* Lesson content */}
							<article className="prose prose-lg dark:prose-invert mx-auto max-w-none">
								<CustomMDX source={lesson.content} />
							</article>

							{/* Lesson completion button and navigation */}
							<div className="border-border mt-12 border-t pt-8">
								{/* Add completion button */}
								<div className="mb-8 flex justify-center">
									<LessonCompletion
										workshopSlug={params.slug}
										lessonSlug={params.lessonSlug}
										initialCompletionState={isCurrentLessonCompleted}
										variant="button"
										lessonsBySection={lessonsBySection}
										allLessons={allLessons}
										nextLessonSlug={nextLesson?.slug}
									/>
								</div>

								{/* Lesson navigation */}
								<div className="grid grid-cols-1 gap-4 md:grid-cols-2">
									{/* Previous lesson button */}
									{prevLesson ? (
										<Button
											variant="outline"
											className="bg-card/50 border-border text-muted-foreground hover:text-foreground hover:bg-accent/70 h-auto justify-start px-5 py-4"
											asChild>
											<Link
												href={`/workshops/${params.slug}/lessons/${prevLesson.slug}`}>
												<div className="flex w-full items-center">
													<ChevronLeft className="text-primary mr-3 h-5 w-5 flex-shrink-0" />
													<div className="flex flex-col items-start text-left">
														<span className="text-muted-foreground mb-1 text-xs font-medium">
															Previous Lesson
														</span>
														<span className="max-w-[250px] truncate text-sm font-medium">
															{prevLesson.metadata.title}
														</span>
													</div>
												</div>
											</Link>
										</Button>
									) : (
										<div className="hidden md:block"></div>
									)}

									{/* Next lesson button */}
									{nextLesson ? (
										<Button
											variant="outline"
											className="bg-card/50 border-border text-muted-foreground hover:text-foreground hover:bg-accent/70 group h-auto justify-end px-5 py-4 md:ml-auto"
											asChild>
											<Link
												href={`/workshops/${params.slug}/lessons/${nextLesson.slug}`}>
												<div className="flex w-full items-center justify-end">
													<div className="flex flex-col items-end text-right">
														<span className="text-muted-foreground mb-1 text-xs font-medium">
															Next Lesson
														</span>
														<span className="max-w-[250px] truncate text-sm font-medium">
															{nextLesson.metadata.title}
														</span>
													</div>
													<ChevronRight className="text-primary ml-3 h-5 w-5 flex-shrink-0 transition-transform group-hover:translate-x-1" />
												</div>
											</Link>
										</Button>
									) : (
										<Button
											variant="outline"
											className="bg-card/50 border-border text-muted-foreground hover:text-foreground hover:bg-accent/70 h-auto justify-end px-5 py-4 md:ml-auto"
											asChild>
											<Link href={`/workshops/${params.slug}`}>
												<div className="flex w-full items-center justify-end">
													<div className="flex flex-col items-end text-right">
														<span className="text-muted-foreground mb-1 text-xs font-medium">
															Workshop Complete
														</span>
														<span className="text-sm font-medium">
															Back to Workshop Overview
														</span>
													</div>
													<Home className="text-primary ml-3 h-5 w-5 flex-shrink-0" />
												</div>
											</Link>
										</Button>
									)}
								</div>
							</div>
						</div>
					</main>
				</SidebarInset>
			</SidebarProvider>
		</div>
	)
}
