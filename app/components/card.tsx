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
								quality={70}
								loading="lazy" // Add lazy loading
								sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" // Add responsive sizes
								placeholder="blur" // Add blur placeholder
								blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRg..." // Add base64 blur image
								className="absolute h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
								priority={false} // Set to true only for above-the-fold images
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
						<div className="bg-secondary/10 rounded-xl p-2 grayscale">
							<Image
								src={icon}
								alt=""
								width={34}
								height={34}
								className="h-8 w-8 object-contain"
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
