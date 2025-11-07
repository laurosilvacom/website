'use client'

import {Badge} from '@/components/ui/badge'
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
				<Badge
					key={tag}
					variant="secondary"
					className="cursor-pointer"
					onClick={() => handleTagClick(tag)}
					onKeyDown={(e) => {
						if (e.key === 'Enter' || e.key === ' ') {
							e.preventDefault()
							handleTagClick(tag)
						}
					}}
					tabIndex={0}
					aria-disabled={isPending}>
					{tag}
				</Badge>
			))}
		</div>
	)
}
