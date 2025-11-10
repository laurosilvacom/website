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
			if (target.closest('[id^="footnote-ref-"]')) {
				return
			}
			if (target.closest('aside')) {
				return
			}
			if (activeFootnote) {
				setActiveFootnote(null)
			}
		}

		if (activeFootnote) {
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
		<aside className="border-border bg-muted/30 rounded-2xl border p-6 backdrop-blur-sm">
			{headings.length > 0 && (
				<nav aria-label="Table of contents">
					<Collapsible open={isOpen} onOpenChange={setIsOpen}>
						<CollapsibleTrigger className="flex w-full items-center justify-between mb-4 text-sm font-semibold text-foreground hover:opacity-80 transition-opacity group">
							<span>Table of Contents</span>
							<ChevronDown className={cn('h-4 w-4 transition-transform text-muted-foreground group-hover:text-foreground', isOpen && 'rotate-180')} />
						</CollapsibleTrigger>
						<CollapsibleContent>
							<ul className="space-y-1.5 text-sm pt-2">
								{headings.map((heading) => {
									const isActive = activeId === heading.id
									return (
										<li
											key={`${heading.id}-${heading.text}`}
											style={{paddingLeft: `${(heading.level - 2) * 16}px`}}
											className="relative">
											{isActive && (
												<span className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-1 rounded-full bg-primary" />
											)}
											<a
												href={`#${heading.id}`}
												className={cn(
													'block py-1.5 leading-relaxed transition-colors rounded-md px-2 -ml-2',
													isActive
														? 'text-foreground font-medium bg-primary/10'
														: 'text-muted-foreground hover:text-foreground hover:bg-muted'
												)}
												onClick={(e) => {
													e.preventDefault()
													const element = document.getElementById(heading.id)
													if (element) {
														element.scrollIntoView({behavior: 'smooth', block: 'start'})
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
				<div className="mt-6 pt-6 border-t border-border/50 animate-[fadeIn_0.3s_ease-out_forwards,slideUp_0.3s_ease-out_forwards]">
					<div className="text-xs font-medium text-muted-foreground mb-3 uppercase tracking-wider">
						Footnote {activeFootnote.number}
					</div>
					<div className="text-sm text-foreground leading-relaxed space-y-3 [&_img]:rounded-lg [&_img]:shadow-lg [&_img]:w-full [&_img]:h-auto [&_img]:my-3">
						{activeFootnote.content}
					</div>
				</div>
			)}
		</aside>
	)
}
