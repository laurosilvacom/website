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
				<summary className="border-muted bg-card flex cursor-pointer items-center justify-between rounded-2xl border p-4 shadow-sm backdrop-blur-xl">
					<h2 id="toc-title" className="text-foreground text-sm font-semibold">
						Table of Contents
					</h2>
					<ChevronDown className="text-muted-foreground h-5 w-5 transition-transform duration-300 group-open:rotate-180" />
				</summary>

				<ul
					className="mt-4 space-y-2 text-sm"
					role="list"
					aria-labelledby="toc-title">
					{headings.map((heading) => {
						const isActive = activeId === heading.id

						return (
							<li
								key={`${heading.id}-${heading.text}`}
								style={{marginLeft: `${(heading.level - 2) * 16}px`}}>
								<a
									href={`#${heading.id}`}
									className={`group hover:text-foreground focus-visible:ring-primary relative block rounded-sm py-1.5 pl-4 transition-all duration-200 outline-none focus-visible:ring-2 focus-visible:ring-offset-2 ${
										isActive
											? 'text-foreground underline decoration-[hsl(var(--primary))] decoration-wavy underline-offset-[6px]'
											: 'text-muted-foreground hover:underline hover:decoration-[hsl(var(--primary))] hover:decoration-wavy hover:underline-offset-[6px]'
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
									<span
										className={`absolute top-1/2 left-0 -translate-y-1/2 text-[hsl(var(--primary))] transition-transform duration-200 ${
											isActive ? 'translate-x-0' : '-translate-x-2 opacity-0'
										}`}
										aria-hidden="true">
										→
									</span>
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
