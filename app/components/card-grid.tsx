import {type ReactNode} from 'react'

interface CardGridProps {
	children: ReactNode
	className?: string
}

export function CardGrid({children, className = ''}: CardGridProps) {
	return (
		<div
			className={`grid w-full [grid-template-columns:repeat(auto-fit,minmax(320px,1fr))] gap-12 sm:grid-cols-2 lg:grid-cols-3 ${className} `}>
			{children}
		</div>
	)
}
