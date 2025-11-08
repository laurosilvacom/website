'use client'

import {ChevronDown} from 'lucide-react'
import {useEffect, useState} from 'react'
import {
	Collapsible,
	CollapsibleContent,
	CollapsibleTrigger
} from '@/components/ui/collapsible'
import {cn} from '@/lib/utils'

interface HeadingData {
	id: string
	text: string
	level: number
}

export function TocSidebar() {
	const [headings, setHeadings] = useState<HeadingData[]>([])
	const [activeId, setActiveId] = useState<string>('')
	const [isOpen, setIsOpen] = useState(true)

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

	if (headings.length === 0) return null

	return (
		<aside className="flex flex-col w-64 sticky top-0 h-screen border-l border-border/30 bg-background/40 backdrop-blur-sm">
			<div className="flex flex-col h-full px-6 py-8 overflow-y-auto">
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
			</div>
		</aside>
	)
}

