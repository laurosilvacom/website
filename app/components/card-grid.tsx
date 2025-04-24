import {type ReactNode} from 'react'

interface CardGridProps {
	children: ReactNode
	className?: string
}

export function CardGrid({children, className = ''}: CardGridProps) {
	return (
		<div
			className={`grid w-full grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 ${className}`}>
			{children}
		</div>
	)
}
