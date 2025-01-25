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
	coverImage?: string
}

export function Card({
	href,
	title,
	description,
	icon,
	coverImage,
	date,
	footer,
	className = ''
}: CardProps) {
	return (
		<Link
			href={href}
			className="group peer relative block w-full focus:outline-none"
			aria-label={`Read more about ${title}`}>
			<article className={`space-y-8 ${className}`}>
				<div className="relative aspect-[3/4] rounded-lg">
					{/* Inner container for image with overflow hidden */}
					<div className="absolute inset-0 overflow-hidden rounded-xl">
						{coverImage ? (
							<Image
								src={coverImage}
								alt={title}
								fill
								className="absolute h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
							/>
						) : (
							<h1>lol</h1>
						)}
					</div>
					{/* Border effect outside of overflow hidden */}
					<div className="absolute inset-0 rounded-xl transition-shadow duration-300 group-hover:shadow-[0_0_0_4px_hsl(var(--primary))]" />
				</div>

				<div className="flex items-center justify-between">
					{date && (
						<time className="text-muted-foreground text-xl font-medium">
							{date}
						</time>
					)}
					{icon && (
						<div className="bg-secondary/10 rounded-xl p-2">
							<Image
								src={icon}
								alt=""
								width={24}
								height={24}
								className="h-6 w-6 object-contain"
							/>
						</div>
					)}
				</div>

				<div className="text-foreground text-xl font-semibold md:text-3xl">
					{title}
				</div>

				{description && (
					<p className="text-muted-foreground text-lg leading-relaxed">
						{description}
					</p>
				)}

				{footer}
			</article>
		</Link>
	)
}
