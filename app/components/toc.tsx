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

export function TableOfContents() {
	const [headings, setHeadings] = useState<HeadingData[]>([])
	const [activeId, setActiveId] = useState<string>('')
	const [isOpen, setIsOpen] = useState(false)

	useEffect(() => {
		const elements = Array.from(document.querySelectorAll('h2, h3, h4'))
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

	return (
		<nav aria-label="Table of contents">
			<Collapsible open={isOpen} onOpenChange={setIsOpen}>
				<CollapsibleTrigger className="flex w-full items-center justify-between rounded-lg border p-3">
					<h2 className="text-sm font-medium">Table of Contents</h2>
					<ChevronDown className="h-4 w-4" />
				</CollapsibleTrigger>
				<CollapsibleContent>
					<ul className="mt-3 space-y-1 text-sm">
						{headings.map((heading) => {
							const isActive = activeId === heading.id
							return (
								<li
									key={`${heading.id}-${heading.text}`}
									style={{marginLeft: `${(heading.level - 2) * 12}px`}}>
									<a
										href={`#${heading.id}`}
										className={cn(
											'block py-1',
											isActive ? 'text-foreground font-medium' : 'text-muted-foreground'
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
	)
}
