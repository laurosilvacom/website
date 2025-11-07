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
				'group block border-b border-border pb-8 last:border-0 last:pb-0',
				className
			)}>
			<article className="space-y-2.5">
				{date && (
					<time className="text-muted-foreground text-sm">
						{date}
					</time>
				)}
				<h3 className="text-2xl font-semibold leading-tight tracking-tight group-hover:text-foreground/80 transition-colors">
					{title}
				</h3>
				{description && (
					<p className="text-muted-foreground text-base leading-relaxed">
						{description}
					</p>
				)}
				{footer && <div className="pt-1.5">{footer}</div>}
			</article>
		</Link>
	)
}
