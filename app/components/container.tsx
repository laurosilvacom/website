import React from 'react'

// Utility function to combine class names
const cx = (...classes: string[]): string => classes.filter(Boolean).join(' ')

// Define the props for the Container component
type ContainerProps = {
	className?: string
	wrapperClassName?: string
	as?: keyof React.ReactHTML | React.ComponentType<unknown>
} & React.PropsWithChildren

// Container component definition
const Container: React.FC<ContainerProps> = ({
	children,
	className = '',
	wrapperClassName = '',
	as: Component = 'div',
	...props
}) => {
	const wrapperClasses = cx('w-full px-2 sm:px-5 lg:px-8', wrapperClassName)
	const componentClasses = cx('container h-full', className)

	return (
		<div className={wrapperClasses}>
			<Component className={componentClasses} {...props}>
				{children}
			</Component>
		</div>
	)
}

export default Container
