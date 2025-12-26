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
		<Link href={href} className={cn('group block', className)}>
			<article className="bg-background/70 border-border/30 hover:bg-background/90 hover:border-border/60 space-y-3 rounded-2xl border p-6 shadow-[0_1px_2px_rgba(0,0,0,0.02)] backdrop-blur-xl transition-all duration-300 ease-out hover:shadow-[0_2px_8px_rgba(0,0,0,0.04)]">
				{date && (
					<time className="text-muted-foreground text-xs font-medium tracking-wider uppercase">
						{date}
					</time>
				)}
				<h3 className="text-foreground text-lg leading-tight font-semibold tracking-tight transition-colors">
					{title}
				</h3>
				{description && (
					<p className="text-muted-foreground text-sm leading-relaxed">
						{description}
					</p>
				)}
				{footer && <div className="pt-2">{footer}</div>}
			</article>
		</Link>
	)
}
