'use client'

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
			<h2 id="toc-title" className="text-foreground mb-4 text-sm font-semibold">
				Table of Contents
			</h2>
			<ul className="space-y-2 text-sm" role="list" aria-labelledby="toc-title">
				{headings.map((heading) => {
					const isActive = activeId === heading.id

					return (
						<li
							key={heading.id}
							style={{
								paddingLeft: `${(heading.level - 2) * 16}px`
							}}>
							<a
								href={`#${heading.id}`}
								className={`group focus-visible:ring-primary relative block rounded-sm py-1.5 transition-all duration-300 ease-out outline-none focus-visible:ring-2 focus-visible:ring-offset-2 ${
									isActive
										? 'text-primary pl-4'
										: 'text-muted-foreground hover:text-foreground pl-0'
								} `}
								onClick={(e) => {
									e.preventDefault()
									const element = document.getElementById(heading.id)
									if (element) {
										element.scrollIntoView({
											behavior: 'smooth',
											block: 'start'
										})
										window.history.pushState(null, '', `#${heading.id}`)
										// Set focus to the heading for screen readers
										element.focus({preventScroll: true})
										// Announce the section change
										element.setAttribute('tabindex', '-1')
									}
								}}
								aria-current={isActive ? 'location' : undefined}
								role="link"
								tabIndex={0}>
								{/* Arrow indicator */}
								<span
									className={`text-chart-2 aria-hidden="true" absolute top-1/2 left-0 -translate-y-1/2 transition-all duration-300 ease-out ${
										isActive
											? 'translate-x-0 opacity-100'
											: '-translate-x-2 opacity-0'
									} `}
									aria-hidden="true">
									›
								</span>

								{/* Text with underline effect */}
								<span className="relative">
									{heading.text}
									<span
										className={`bg-chart-2 absolute -bottom-0.5 left-0 h-[1px] w-full origin-left transition-transform duration-300 ease-out ${isActive ? 'scale-x-100' : 'scale-x-0'} `}
										aria-hidden="true"
									/>
								</span>
							</a>
						</li>
					)
				})}
			</ul>
		</nav>
	)
}
