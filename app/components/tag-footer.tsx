'use client'

import {useRouter} from 'next/navigation'
import {useTransition} from 'react'

interface TagFooterProps {
	tags: string[]
}

export function TagFooter({tags}: TagFooterProps) {
	const router = useRouter()
	const [isPending, startTransition] = useTransition()

	const handleTagClick = (tag: string) => {
		const url = new URL(window.location.href)
		url.searchParams.set('tag', tag)
		startTransition(() => {
			router.push(url.toString())
		})
	}

	return (
		<div className="flex flex-wrap gap-2">
			{tags.map((tag) => (
				<button
					key={tag}
					onClick={() => handleTagClick(tag)}
					onKeyDown={(e) => {
						if (e.key === 'Enter' || e.key === ' ') {
							e.preventDefault()
							handleTagClick(tag)
						}
					}}
					tabIndex={0}
					disabled={isPending}
					className="text-muted-foreground hover:text-foreground text-xs transition-colors">
					#{tag}
				</button>
			))}
		</div>
	)
}
