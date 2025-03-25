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
			className="group focus-visible:ring-primary block h-full focus-visible:ring-2 focus-visible:outline-none"
			aria-label={`Read more about ${title}`}>
			<article
				className={`${className} bg-card border-border h-full overflow-hidden rounded-xl border shadow-sm`}>
				{/* Clean image container */}
				{coverImage && (
					<div className="relative aspect-[16/9] w-full overflow-hidden">
						<Image
							src={coverImage}
							alt={title}
							fill
							quality={80}
							loading="lazy"
							sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
							className="object-cover"
							priority={false}
						/>
					</div>
				)}

				{/* Content with proper spacing */}
				<div className="flex h-[calc(100%-9rem)] min-h-[14rem] flex-col p-6">
					{/* Date and icon row */}
					<div className="mb-4 flex items-center justify-between">
						{date && (
							<time className="text-muted-foreground text-sm font-medium">
								{date}
							</time>
						)}
						{icon && (
							<div className="p-2">
								<Image
									src={icon}
									alt=""
									width={28}
									height={28}
									className="h-7 w-7 object-contain"
								/>
							</div>
						)}
					</div>

					{/* Title with proper size */}
					<h3 className="text-foreground mb-2 line-clamp-2 text-xl font-semibold">
						{title}
					</h3>

					{/* Description with better size */}
					{description && (
						<p className="text-muted-foreground mb-auto line-clamp-3 text-base">
							{description}
						</p>
					)}

					{/* Footer area */}
					<div className="mt-auto pt-4">
						{footer || (
							<div className="text-primary text-sm font-medium">
								Read article
							</div>
						)}
					</div>
				</div>
			</article>
		</Link>
	)
}
