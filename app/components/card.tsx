import Link from 'next/link'
import Image from 'next/image'
import {type ReactNode} from 'react'
import {cn} from '@/lib/utils'
import {
	Card as UICard,
	CardHeader,
	CardTitle,
	CardDescription,
	CardContent,
	CardFooter
} from '@/app/components/ui/card'

interface CardProps {
	href: string
	title: string
	description?: string
	icon?: string
	tag?: string
	date?: string
	footer?: ReactNode
	className?: string
}

export function Card({
	href,
	title,
	description,
	icon,
	tag,
	date,
	footer,
	className = ''
}: CardProps) {
	return (
		<Link href={href} className="group focus-visible:outline-none">
			<UICard
				className={cn(
					'h-full transition-all',
					'hover:border-primary/40',
					'focus-visible:ring-primary/30 focus-visible:ring-2',
					className
				)}>
				<CardHeader className="p-0 pb-0">
					{/* Top row with icon and date */}
					<div className="mb-5 flex items-center justify-between px-6">
						{/* Icon */}
						{icon && (
							<div className="shrink-0">
								<Image
									src={icon}
									alt=""
									width={40}
									height={40}
									className="h-7 w-7 rounded-md object-contain"
								/>
							</div>
						)}

						{/* Right side with date/tag */}
						<div className="flex items-center gap-3">
							{tag && (
								<span className="bg-secondary text-secondary-foreground rounded-full px-3 py-1 text-xs font-medium">
									{tag}
								</span>
							)}
							{date && (
								<time className="text-muted-foreground text-xs">{date}</time>
							)}
						</div>
					</div>

					{/* Title */}
					<CardTitle className="group-hover:text-primary mb-3 px-6 text-xl leading-tight font-bold transition-colors">
						{title}
					</CardTitle>
				</CardHeader>

				{/* Description */}
				{description && (
					<CardContent className="px-6 pb-0">
						<CardDescription className="line-clamp-3 text-base leading-relaxed">
							{description}
						</CardDescription>
					</CardContent>
				)}

				{/* Footer */}
				<CardFooter className="mt-auto px-6 pt-5">
					{footer || (
						<span className="text-primary inline-flex items-center font-medium group-hover:underline">
							Read article
							<svg
								className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-0.5"
								xmlns="http://www.w3.org/2000/svg"
								fill="none"
								viewBox="0 0 24 24"
								stroke="currentColor">
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									strokeWidth={2}
									d="M13 7l5 5m0 0l-5 5m5-5H6"
								/>
							</svg>
						</span>
					)}
				</CardFooter>
			</UICard>
		</Link>
	)
}
