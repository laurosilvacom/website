import {ArrowRight} from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import {type ReactNode} from 'react'

interface CardProps {
	href: string
	title: string
	description?: string
	icon?: string
	date?: string
	footer?: ReactNode
	className?: string
}
export function Card({
	href,
	title,
	description,
	icon,
	date,
	footer,
	className = ''
}: CardProps) {
	return (
		<Link href={href} aria-label={`Read more about ${title}`} className="group">
			<article
				className={`border-border relative flex h-full flex-col overflow-hidden rounded-2xl border bg-[hsl(225,25%,99%)] backdrop-blur-[12px] backdrop-saturate-[180%] transition-all duration-300 ease-out hover:translate-y-[-2px] hover:shadow-[0_1px_3px_rgba(0,0,0,0.05),0_12px_28px_-1px_rgba(0,0,0,0.12)] dark:bg-[hsl(225,25%,11%)] dark:hover:shadow-[0_1px_3px_rgba(0,0,0,0.2),0_12px_28px_-1px_rgba(0,0,0,0.35)] ${className}`}>
				<div className="relative flex-grow p-6 sm:p-8">
					{icon && (
						<div className="mb-4">
							<Image
								src={icon}
								alt={`${title} icon`}
								width={32}
								height={32}
								quality={100}
								className="rounded-[calc(var(--radius)/2)]"
							/>
						</div>
					)}

					<h2 className="text-foreground mb-2 text-xl font-bold tracking-tight sm:text-2xl">
						{title}
					</h2>

					{description && (
						<p className="text-muted-foreground line-clamp-3 text-base leading-relaxed">
							{description}
						</p>
					)}
				</div>

				{(date || footer) && (
					<div className="border-border relative border-t bg-[hsl(225,25%,98%)] p-6 sm:p-8 dark:bg-[hsl(225,25%,12%)]">
						<div className="flex items-center justify-between">
							{date && (
								<time
									dateTime={date}
									className="text-muted-foreground text-sm font-medium">
									{date}
								</time>
							)}
							{footer || (
								<div className="flex items-center gap-2">
									<span className="text-muted-foreground text-sm font-medium">
										Read more
									</span>
									<ArrowRight className="text-primary h-4 w-4 transition-all duration-300 ease-out group-hover:translate-x-1" />
								</div>
							)}
						</div>
					</div>
				)}
			</article>
		</Link>
	)
}
