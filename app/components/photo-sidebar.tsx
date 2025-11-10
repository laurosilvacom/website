'use client'

import {useEffect, useState} from 'react'
import Image from 'next/image'
import {cn} from '@/lib/utils'

const photos = [
	'/photos/website-photo-1.jpg',
	'/photos/website-photo-2.jpg',
	'/photos/website-photo-3.jpg',
	'/photos/website-photo-4.jpg',
	'/photos/website-photo-5.jpg',
	'/photos/website-photo-6.jpg',
	'/photos/website-photo-7.jpg',
	'/photos/website-photo-8.jpg',
	'/photos/website-photo-9.jpg',
	'/photos/website-photo-10.jpg',
	'/photos/website-photo-11.jpg',
	'/photos/website-photo-12.jpg',
	'/photos/website-photo-13.jpg',
	'/photos/website-photo-14.jpg',
	'/photos/website-photo-15.jpg'
]

export function PhotoSidebar() {
	const [activeIndex, setActiveIndex] = useState(0)

	useEffect(() => {
		const handleScroll = () => {
			const scrollPosition = window.scrollY + window.innerHeight * 0.5
			const documentHeight = document.documentElement.scrollHeight
			const scrollProgress = Math.min(scrollPosition / documentHeight, 1)

			const newIndex = Math.min(
				Math.floor(scrollProgress * photos.length),
				photos.length - 1
			)
			setActiveIndex(newIndex)
		}

		window.addEventListener('scroll', handleScroll, {passive: true})
		handleScroll()

		return () => window.removeEventListener('scroll', handleScroll)
	}, [])

	return (
		<aside className="flex flex-col w-80 sticky top-0 h-screen border-l border-border/30 bg-background/40 backdrop-blur-sm pointer-events-auto">
			<div className="flex items-center justify-center h-full px-8 py-8">
				<div className="relative w-full aspect-3/4 max-w-[280px]">
					{photos.map((photo, index) => (
						<div
							key={photo}
							className={cn(
								'absolute inset-0 transition-opacity duration-1000 ease-in-out rounded-lg overflow-hidden',
								index === activeIndex ? 'opacity-100 z-10' : 'opacity-0 z-0'
							)}>
							<Image
								src={photo}
								alt=""
								fill
								className="object-cover grayscale hover:grayscale-0 transition-all duration-500"
								sizes="320px"
								priority={index === 0}
							/>
						</div>
					))}
				</div>
			</div>
		</aside>
	)
}
