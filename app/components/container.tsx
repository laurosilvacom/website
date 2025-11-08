import {type ReactNode} from 'react'
import {cn} from '@/lib/utils'

type ContainerProps = {
	className?: string
	as?: keyof React.JSX.IntrinsicElements | React.ComponentType<unknown>
} & {children: ReactNode}

// Substack-like consistent width: 680px (perfect reading width)
const CONTENT_WIDTH = 'max-w-[680px]'

export default function Container({
	children,
	className = '',
	as: Component = 'div',
	...props
}: ContainerProps) {
	return (
		<div className="w-full px-4 sm:px-6 lg:px-8">
			<Component
				className={cn('mx-auto', CONTENT_WIDTH, className)}
				{...props}>
				{children}
			</Component>
		</div>
	)
}
