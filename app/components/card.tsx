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
		<Link href={href} className={cn('group block pb-10', className)}>
			<article className="space-y-2.5">
				{date && <time className="text-muted-foreground text-sm">{date}</time>}
				<h3 className="group-hover:text-foreground/80 text-lg leading-tight font-semibold tracking-tight transition-colors">
					{title}
				</h3>
				{description && (
					<p className="text-muted-foreground mt-1.5 text-sm leading-relaxed">
						{description}
					</p>
				)}
				{footer && <div className="pt-1.5">{footer}</div>}
			</article>
		</Link>
	)
}
