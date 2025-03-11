'use client'

import {useEffect, useState} from 'react'
import Link from 'next/link'
import {BookOpen, Check, Home} from 'lucide-react'
import {Lesson} from '../(pages)/workshops/types'

import {
	Sidebar,
	SidebarContent,
	SidebarFooter,
	SidebarGroup,
	SidebarGroupContent,
	SidebarGroupLabel,
	SidebarHeader,
	SidebarMenu,
	SidebarMenuButton,
	SidebarMenuItem
} from '@/components/ui/sidebar'

import {Progress} from '@/components/ui/progress'
import {Button} from '@/components/ui/button'

interface ClientWorkshopSidebarProps {
	workshopTitle: string
	lessonsBySection: Record<string, Lesson[]>
	workshopSlug: string
	currentLessonSlug: string
	allLessons: Lesson[]
	completedLessons: string[]
}

export default function ClientWorkshopSidebar({
	workshopTitle,
	lessonsBySection,
	workshopSlug,
	currentLessonSlug,
	allLessons,
	completedLessons
}: ClientWorkshopSidebarProps) {
	// Calculate how many lessons are completed
	const completedLessonsCount = completedLessons.length

	// Calculate progress
	const totalLessons = allLessons.length
	const progressValue =
		Math.round((completedLessonsCount / totalLessons) * 100) || 0

	// Calculate completed sections
	const completedSections = Object.entries(lessonsBySection).reduce(
		(count, [_, sectionLessons]) => {
			const isCompleted = sectionLessons.every((lesson) =>
				completedLessons.includes(`${workshopSlug}/${lesson.slug}`)
			)
			return isCompleted ? count + 1 : count
		},
		0
	)

	const totalSections = Object.keys(lessonsBySection).length

	return (
		<Sidebar
			variant="sidebar"
			collapsible="offcanvas"
			className="border-sidebar-border border-r">
			<SidebarHeader className="border-sidebar-border bg-sidebar border-b">
				<div className="p-4">
					<Link
						href={`/workshops/${workshopSlug}`}
						className="text-sidebar-foreground hover:text-primary group flex items-center gap-2 transition-colors">
						<div className="bg-primary/10 group-hover:bg-primary/20 flex h-8 w-8 items-center justify-center rounded-full transition-colors">
							<BookOpen className="text-primary h-4 w-4" />
						</div>
						<span className="truncate font-medium">{workshopTitle}</span>
					</Link>

					<div className="mt-5 space-y-3">
						<div className="flex items-center justify-between text-sm">
							<span className="text-sidebar-foreground/70">Your progress</span>
							<span className="text-sidebar-foreground font-medium">
								{completedLessonsCount} of {totalLessons} lessons
							</span>
						</div>
						<Progress value={progressValue} className="bg-sidebar-accent h-2" />
						<div className="text-sidebar-foreground/60 flex justify-between text-xs">
							<span>
								{/* Changed from sections to lessons count */}
								{completedLessonsCount} of {totalLessons} lessons completed
							</span>
							<span>{progressValue}% complete</span>
						</div>
					</div>
				</div>
			</SidebarHeader>

			<SidebarContent className="py-2">
				{Object.entries(lessonsBySection).map(
					([sectionTitle, sectionLessons], sectionIndex) => {
						const isCurrentSection = sectionLessons.some(
							(lesson) => lesson.slug === currentLessonSlug
						)
						const isSectionCompleted = sectionLessons.every((lesson) =>
							completedLessons.includes(`${workshopSlug}/${lesson.slug}`)
						)

						return (
							<SidebarGroup key={sectionTitle} className="mb-3">
								<SidebarGroupLabel
									className={`px-4 py-2 text-xs font-semibold tracking-wider uppercase ${
										isCurrentSection ? 'bg-sidebar-accent/20' : ''
									} flex items-center justify-between`}>
									<span className="text-sidebar-foreground/70">
										{sectionTitle}
									</span>
									<span
										className={`rounded-sm px-2 py-0.5 text-[10px] ${
											isSectionCompleted
												? 'text-primary/80 bg-primary/5 border-primary/10 border'
												: 'text-sidebar-foreground/40'
										}`}>
										{isSectionCompleted ? 'COMPLETED' : 'PENDING'}
									</span>
								</SidebarGroupLabel>

								<SidebarGroupContent
									className={isCurrentSection ? 'bg-sidebar-accent/10' : ''}>
									<SidebarMenu>
										{sectionLessons.map((lesson) => {
											const isActive = lesson.slug === currentLessonSlug
											const isCompleted = completedLessons.includes(
												`${workshopSlug}/${lesson.slug}`
											)

											return (
												<SidebarMenuItem key={lesson.slug}>
													<SidebarMenuButton
														asChild
														isActive={isActive}
														className={`group/lesson ${isActive ? 'bg-primary/10 text-sidebar-foreground' : ''} ${isCompleted && !isActive ? 'text-sidebar-foreground/90' : ''} transition-all duration-200`}>
														<Link
															href={`/workshops/${workshopSlug}/lessons/${lesson.slug}`}>
															{isCompleted ? (
																<div className="bg-primary text-primary-foreground mr-2 flex h-5 w-5 items-center justify-center rounded-full">
																	<Check className="h-3 w-3" />
																</div>
															) : (
																<span
																	className={`mr-2 flex h-5 w-5 items-center justify-center rounded-full ${isActive ? 'bg-primary text-primary-foreground' : 'bg-sidebar-accent text-sidebar-foreground'} text-xs font-medium`}>
																	{lesson.metadata.number}
																</span>
															)}
															<div className="flex flex-col">
																<span className="truncate">
																	{lesson.metadata.title}
																</span>
																{isActive && (
																	<span className="text-primary mt-0.5 text-xs font-medium">
																		CURRENT LESSON
																	</span>
																)}
															</div>
														</Link>
													</SidebarMenuButton>
												</SidebarMenuItem>
											)
										})}
									</SidebarMenu>
								</SidebarGroupContent>
							</SidebarGroup>
						)
					}
				)}
			</SidebarContent>

			<SidebarFooter className="border-sidebar-border bg-sidebar/80 border-t p-4">
				<Button
					variant="outline"
					className="border-sidebar-border text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground w-full justify-start bg-transparent transition-all duration-200"
					asChild>
					<Link href={`/workshops/${workshopSlug}`}>
						<Home className="text-primary mr-2 h-4 w-4" />
						Workshop Home
					</Link>
				</Button>
			</SidebarFooter>
		</Sidebar>
	)
}
