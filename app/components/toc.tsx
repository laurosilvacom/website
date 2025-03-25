'use client'

import {ChevronDown} from 'lucide-react'
import {useEffect, useState} from 'react'

interface HeadingData {
	id: string
	text: string
	level: number
}

export function TableOfContents() {
	const [headings, setHeadings] = useState<HeadingData[]>([])
	const [activeId, setActiveId] = useState<string>('')

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
		<nav className="relative font-sans" aria-label="Table of contents">
			<details className="group [&_summary::-webkit-details-marker]:hidden">
				<summary className="bg-secondary/30 border-border ring-border/40 flex cursor-pointer items-center justify-between rounded-xl border p-3 ring-1 shadow-sm">
					<div className="flex items-center gap-2">
						{/* Simple dot indicator to match code block */}
						<div className="bg-primary/60 h-2 w-2 rounded-full"></div>
						<h2
							id="toc-title"
							className="text-foreground text-[0.85rem] font-medium">
							Table of Contents
						</h2>
					</div>
					<ChevronDown className="text-primary/70 h-4 w-4 transition-transform duration-200 group-open:rotate-180" />
				</summary>

				<ul
					className="mt-3 space-y-1 text-[0.85rem]"
					role="list"
					aria-labelledby="toc-title">
					{headings.map((heading) => {
						const isActive = activeId === heading.id

						return (
							<li
								key={`${heading.id}-${heading.text}`}
								style={{marginLeft: `${(heading.level - 2) * 12}px`}}>
								<a
									href={`#${heading.id}`}
									className={`hover:text-primary relative flex items-center py-1.5 pl-3 transition-colors duration-150 ${
										isActive
											? 'text-primary font-medium'
											: 'text-muted-foreground'
									}`}
									onClick={(e) => {
										e.preventDefault()
										const element = document.getElementById(heading.id)
										if (element) {
											element.scrollIntoView({
												behavior: 'smooth',
												block: 'start'
											})
											window.history.pushState(null, '', `#${heading.id}`)
											element.focus({preventScroll: true})
											element.setAttribute('tabindex', '-1')
										}
									}}
									aria-current={isActive ? 'location' : undefined}>
									{/* Simple active indicator */}
									<span
										className={`bg-primary/60 absolute left-0 h-full w-0.5 rounded-full transition-opacity duration-150 ${
											isActive ? 'opacity-100' : 'opacity-0'
										}`}
										aria-hidden="true"
									/>
									{heading.text}
								</a>
							</li>
						)
					})}
				</ul>
			</details>
		</nav>
	)
}
