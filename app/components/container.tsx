import React from 'react'
import {cn} from '@/lib/utils'

type ContainerProps = {
	className?: string
	wrapperClassName?: string
	as?: keyof React.JSX.IntrinsicElements | React.ComponentType<unknown>
} & React.PropsWithChildren

const Container: React.FC<ContainerProps> = ({
	children,
	className = '',
	wrapperClassName = '',
	as: Component = 'div',
	...props
}) => {
	return (
		<div className={cn('w-full px-2 sm:px-5 lg:px-8', wrapperClassName)}>
			<Component className={cn('container h-full', className)} {...props}>
				{children}
			</Component>
		</div>
	)
}

export default Container
