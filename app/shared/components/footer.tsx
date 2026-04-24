'use client'

import {usePathname} from 'next/navigation'
import Container from '@/shared/components/container'
import {ModeToggle} from '@/shared/components/toggle'

export function Footer() {
	const pathname = usePathname()

	// Hide footer in Sanity Studio
	if (pathname.startsWith('/studio')) {
		return null
	}

	return (
		<footer className="border-border border-t py-10">
			<Container>
				<div className="flex justify-center">
					<ModeToggle />
				</div>
			</Container>
		</footer>
	)
}
