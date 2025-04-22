'use client'

import {Badge} from '@/components/ui/badge'
import {useRouter} from 'next/navigation'

interface ClickableTagProps {
	tag: string
}

export function ClickableTag({tag}: ClickableTagProps) {
	const router = useRouter()

	const handleTagClick = () => {
		// Create a URL with the tag parameter
		const url = new URL(window.location.href)
		url.searchParams.set('tag', tag)

		// Use router.push instead of directly changing location
		router.push(url.toString())
	}

	return (
		<Badge
			variant="secondary"
			className="hover:bg-secondary/80 cursor-pointer"
			onClick={handleTagClick}
			tabIndex={0}
			role="link"
			onKeyDown={(e) => {
				if (e.key === 'Enter' || e.key === ' ') {
					e.preventDefault()
					handleTagClick()
				}
			}}>
			{tag}
		</Badge>
	)
}
