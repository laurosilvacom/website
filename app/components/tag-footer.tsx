'use client'

import React from 'react'
import {Badge} from '@/components/ui/badge'
import {useRouter} from 'next/navigation'

interface TagFooterProps {
	tags: string[]
}

export function TagFooter({tags}: TagFooterProps) {
	const router = useRouter()

	// Fixed the event parameter type to be generic enough for both div and span elements
	const handleTagClick = (e: React.MouseEvent<Element>, tag: string) => {
		e.preventDefault() // Prevent the default link navigation
		e.stopPropagation() // Stop the event from bubbling up to the card

		// Create a URL with the tag parameter
		const url = new URL(window.location.href)
		url.searchParams.set('tag', tag)

		// Use router.push to navigate
		router.push(url.toString())
	}

	// Fixed keyboard event handler to be properly typed
	const handleKeyDown = (
		e: React.KeyboardEvent<HTMLSpanElement>,
		tag: string
	) => {
		if (e.key === 'Enter' || e.key === ' ') {
			e.preventDefault()
			handleTagClick(e as unknown as React.MouseEvent<Element>, tag)
		}
	}

	return (
		<div className="flex flex-wrap gap-2" onClick={(e) => e.stopPropagation()}>
			{tags.map((tag) => (
				<Badge
					key={tag}
					variant="secondary"
					className="hover:bg-secondary/80 cursor-pointer"
					onClick={(e) => handleTagClick(e, tag)}
					tabIndex={0}
					onKeyDown={(e) => handleKeyDown(e, tag)}>
					{tag}
				</Badge>
			))}
		</div>
	)
}
