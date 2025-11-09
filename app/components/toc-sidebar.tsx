'use client'

import {ChevronDown} from 'lucide-react'
import {useEffect, useState} from 'react'
import {
	Collapsible,
	CollapsibleContent,
	CollapsibleTrigger
} from '@/components/ui/collapsible'
import {cn} from '@/lib/utils'
import {getFootnotes, getFootnoteById, subscribeToActiveFootnote, getActiveFootnote, setActiveFootnote} from './footnote'

interface HeadingData {
	id: string
	text: string
	level: number
}

export function TocSidebar() {
	const [headings, setHeadings] = useState<HeadingData[]>([])
	const [activeId, setActiveId] = useState<string>('')
	const [isOpen, setIsOpen] = useState(true)
	const [activeFootnote, setActiveFootnote] = useState<{id: string; content: React.ReactNode; number: number} | null>(null)

	useEffect(() => {
		const article = document.querySelector('article')
		if (!article) return

		const elements = Array.from(article.querySelectorAll('h2, h3, h4'))
		const headingData = elements
			.map((element) => ({
				id: element.id,
				text: (element.textContent || '').replace(/^#*\s*/, ''),
				level: Number(element.tagName.charAt(1))
			}))
			.filter((heading) => heading.text !== 'Table of Contents')

		setHeadings(headingData)

		const callback = (entries: IntersectionObserverEntry[]) => {
			entries.forEach((entry) => {
				if (entry.isIntersecting) {
					setActiveId(entry.target.id)
				}
			})
		}

		const observer = new IntersectionObserver(callback, {
			rootMargin: '-10% 0% -80% 0%',
			threshold: 1.0
		})

		elements.forEach((element) => observer.observe(element))

		return () => observer.disconnect()
	}, [])

	useEffect(() => {
		const unsubscribe = subscribeToActiveFootnote((id) => {
			if (id) {
				const footnote = getFootnoteById(id)
				setActiveFootnote(footnote || null)
			} else {
				setActiveFootnote(null)
			}
		})

		// Initialize with current active footnote
		const currentActive = getActiveFootnote()
		if (currentActive) {
			const footnote = getFootnoteById(currentActive)
			setActiveFootnote(footnote || null)
		}

		return unsubscribe
	}, [])

	useEffect(() => {
		const handleClickOutside = (e: MouseEvent) => {
			const target = e.target as HTMLElement
			// Don't close if clicking on a footnote button
			if (target.closest('[id^="footnote-ref-"]')) {
				return
			}
			// Don't close if clicking inside the sidebar
			if (target.closest('aside')) {
				return
			}
			// Close footnote if clicking anywhere else
			if (activeFootnote) {
				setActiveFootnote(null)
			}
		}

		if (activeFootnote) {
			// Use setTimeout to avoid closing immediately on the click that opened it
			setTimeout(() => {
				document.addEventListener('click', handleClickOutside, true)
			}, 0)
			return () => {
				document.removeEventListener('click', handleClickOutside, true)
			}
		}
	}, [activeFootnote])

	if (headings.length === 0 && !activeFootnote) return null

	return (
		<aside className="flex flex-col w-64 sticky top-0 h-screen border-l border-border/30 bg-background/40 backdrop-blur-sm">
			<div className="flex flex-col h-full px-6 py-8 overflow-y-auto">
				{headings.length > 0 && (
					<nav aria-label="Table of contents">
						<Collapsible open={isOpen} onOpenChange={setIsOpen}>
							<CollapsibleTrigger className="flex w-full items-center justify-between mb-12 text-sm font-semibold text-foreground hover:opacity-80 transition-opacity">
								<span>Table of Contents</span>
								<ChevronDown className={cn('h-4 w-4 transition-transform', isOpen && 'rotate-180')} />
							</CollapsibleTrigger>
							<CollapsibleContent>
								<ul className="space-y-1.5 text-sm">
									{headings.map((heading) => {
										const isActive = activeId === heading.id
										return (
											<li
												key={`${heading.id}-${heading.text}`}
												style={{paddingLeft: `${(heading.level - 2) * 12}px`}}>
												<a
													href={`#${heading.id}`}
													className={cn(
														'block py-1 leading-relaxed transition-colors',
														isActive
															? 'text-foreground font-medium'
															: 'text-muted-foreground hover:text-foreground'
													)}
													onClick={(e) => {
														e.preventDefault()
														const element = document.getElementById(heading.id)
														if (element) {
															element.scrollIntoView({behavior: 'smooth'})
															window.history.pushState(null, '', `#${heading.id}`)
														}
													}}>
													{heading.text}
												</a>
											</li>
										)
									})}
								</ul>
							</CollapsibleContent>
						</Collapsible>
					</nav>
				)}

				{activeFootnote && (
					<div className="mt-auto pt-8 border-t border-border/30 animate-[fadeIn_0.3s_ease-out_forwards,slideUp_0.3s_ease-out_forwards]">
						<div className="text-xs font-medium text-muted-foreground mb-3 uppercase tracking-wider">
							Footnote {activeFootnote.number}
						</div>
						<div className="text-sm text-foreground leading-relaxed space-y-3 [&_img]:rounded-lg [&_img]:shadow-lg [&_img]:w-full [&_img]:h-auto [&_img]:my-3">
							{activeFootnote.content}
						</div>
					</div>
				)}
			</div>
		</aside>
	)
}
