import {type ReactNode} from 'react'
import {cn} from '@/lib/utils'

type ContainerProps = {
	className?: string
	as?: keyof React.JSX.IntrinsicElements | React.ComponentType<unknown>
} & {children: ReactNode}

export default function Container({
	children,
	className = '',
	as: Component = 'div',
	...props
}: ContainerProps) {
	return (
		<div className="w-full px-2 sm:px-5 lg:px-8">
			<Component className={cn('container h-full', className)} {...props}>
				{children}
			</Component>
		</div>
	)
}
