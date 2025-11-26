import {type ReactNode} from 'react'
import {cn} from '@/lib/utils'

type ContainerProps = {
	children: ReactNode
	className?: string
	as?: 'div' | 'section' | 'article' | 'header' | 'footer'
	width?: 'narrow' | 'base' | 'wide' | 'full'
}

const widthClasses = {
	narrow: 'max-w-[680px]', // Reading width - blog posts, long-form content
	base: 'max-w-[1080px]', // Default - forms, single column pages
	wide: 'max-w-[1400px]', // Multi-column - grids, marketing pages
	full: 'max-w-none' // Full bleed - hero sections, images
}

export default function Container({
	children,
	className = '',
	as: Component = 'div',
	width = 'base',
	...props
}: ContainerProps) {
	return (
		<Component
			className={cn(
				'mx-auto w-full px-6 lg:px-12',
				widthClasses[width],
				className
			)}
			{...props}>
			{children}
		</Component>
	)
}
