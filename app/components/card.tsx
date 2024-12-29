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
				className={`border-border bg-card hover:shadow-primary/5 relative flex h-full flex-col rounded-3xl border backdrop-blur-md transition-all duration-300 hover:-translate-y-0.5 hover:shadow-sm ${className} `}>
				<div className="relative flex-grow space-y-4 p-6 sm:p-8">
					{icon && (
						<Image
							src={icon}
							alt={`${title} icon`}
							width={32}
							height={32}
							quality={100}
							className="rounded-lg"
						/>
					)}

					<h2 className="text-foreground text-xl font-bold tracking-tight sm:text-2xl">
						{title}
					</h2>

					{description && (
						<p className="text-muted-foreground line-clamp-3 text-base leading-relaxed">
							{description}
						</p>
					)}
				</div>

				{(date || footer) && (
					<div className="border-border bg-card relative rounded-b-3xl border-t p-6 sm:p-8">
						<div className="flex items-center justify-between">
							{date && (
								<time dateTime={date} className="text-muted-foreground text-sm">
									{date}
								</time>
							)}
							{footer || (
								<div className="flex items-center gap-2">
									<span className="text-muted-foreground text-sm">
										Read more
									</span>
									<ArrowRight className="text-primary h-4 w-4 transition-all duration-300 group-hover:translate-x-1" />
								</div>
							)}
						</div>
					</div>
				)}
			</article>
		</Link>
	)
}
