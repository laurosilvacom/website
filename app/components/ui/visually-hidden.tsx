import {cn} from '@/lib/utils'
import React from 'react'

// Remove empty interface that extends HTMLAttributes
export const VisuallyHidden = React.forwardRef<
	HTMLSpanElement,
	React.HTMLAttributes<HTMLSpanElement>
>(({className, ...props}, ref) => (
	<span
		ref={ref}
		className={cn(
			'absolute h-px w-px overflow-hidden border-0 p-0 whitespace-nowrap',
			className
		)}
		style={{
			clip: 'rect(0, 0, 0, 0)',
			clipPath: 'inset(50%)',
			margin: '-1px'
		}}
		{...props}
	/>
))

VisuallyHidden.displayName = 'VisuallyHidden'
