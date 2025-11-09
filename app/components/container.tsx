import {type ReactNode} from 'react'
import {cn} from '@/lib/utils'

type ContainerProps = {
	children: ReactNode
	className?: string
	as?: 'div' | 'section' | 'article' | 'header' | 'footer'
	size?: 'sm' | 'md' | 'lg' | 'xl' | 'full'
}

const sizeClasses = {
	sm: 'max-w-4xl', // 896px - Narrow focused content
	md: 'max-w-6xl', // 1152px - Article/reading width
	lg: 'max-w-7xl', // 1280px - List/grid pages
	xl: 'max-w-[1920px]', // 1920px - Hero sections
	full: 'max-w-full'
}

export default function Container({
	children,
	className = '',
	as: Component = 'div',
	size = 'lg',
	...props
}: ContainerProps) {
	return (
		<Component
			className={cn(
				'mx-auto w-full px-6 lg:px-12 xl:px-16',
				sizeClasses[size],
				className
			)}
			{...props}>
			{children}
		</Component>
	)
}
