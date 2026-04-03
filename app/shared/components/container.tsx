import {type ReactNode} from 'react'
import {cn} from '@/shared/lib/utils'

type ContainerProps = {
	children: ReactNode
	className?: string
	as?: 'div' | 'section' | 'article' | 'header' | 'footer'
	width?: 'narrow' | 'base' | 'full'
}

const widthClasses = {
	narrow: 'max-w-[680px]', // Reading width - long-form content
	base: 'max-w-[680px]', // Default - same as reading width for consistency
	full: 'max-w-none', // Full bleed
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
				'mx-auto w-full px-5 sm:px-6 lg:px-12',
				widthClasses[width],
				className,
			)}
			{...props}>
			{children}
		</Component>
	)
}
