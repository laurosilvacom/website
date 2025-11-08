import Link from 'next/link'
import {type ReactNode} from 'react'
import {cn} from '@/lib/utils'

interface CardProps {
	href: string
	title: string
	description?: string
	date?: string
	footer?: ReactNode
	className?: string
}

export function Card({
	href,
	title,
	description,
	date,
	footer,
	className = ''
}: CardProps) {
	return (
		<Link
			href={href}
			className={cn(
				'group block pb-10',
				className
			)}>
			<article className="space-y-2.5">
				{date && (
					<time className="text-muted-foreground text-sm">
						{date}
					</time>
				)}
				<h3 className="text-lg font-semibold leading-tight tracking-tight group-hover:text-foreground/80 transition-colors">
					{title}
				</h3>
				{description && (
					<p className="text-muted-foreground text-sm leading-relaxed mt-1.5">
						{description}
					</p>
				)}
				{footer && <div className="pt-1.5">{footer}</div>}
			</article>
		</Link>
	)
}
