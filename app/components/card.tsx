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
		<Link
			href={href}
			className="group block h-full transform transition-all duration-300"
			aria-label={`Read more about ${title}`}>
			<article
				className={`relative flex h-full flex-col rounded-2xl border border-[hsl(var(--border)/0.15)] bg-[hsl(var(--card)/0.95)] shadow-[0_1px_3px_rgba(0,0,0,0.05)] transition-all duration-300 ease-out hover:border-[hsl(var(--border)/0.25)] hover:bg-[hsl(var(--accent)/0.05)] hover:shadow-[0_4px_18px_rgba(0,0,0,0.04)] dark:shadow-[0_1px_3px_rgba(0,0,0,0.2)] dark:hover:shadow-[0_4px_18px_rgba(0,0,0,0.25)] ${className} `}>
				<div className="flex flex-1 flex-col p-8">
					{/* Icon */}
					{icon && (
						<div className="mb-7">
							<div className="inline-flex h-14 w-14 items-center justify-center rounded-xl bg-[hsl(var(--accent)/0.1)] ring-1 ring-[hsl(var(--border)/0.1)]">
								<Image
									src={icon}
									alt=""
									width={28}
									height={28}
									quality={100}
									className="h-7 w-7 object-contain"
									aria-hidden="true"
								/>
							</div>
						</div>
					)}

					{/* Content */}
					<div className="flex-1 space-y-5">
						<div className="space-y-3">
							<h2 className="text-2xl leading-tight font-bold tracking-tight text-[hsl(var(--foreground))]">
								{title}
							</h2>
							{description && (
								<p className="text-base leading-relaxed text-[hsl(var(--muted-foreground)/0.9)]">
									{description}
								</p>
							)}
						</div>

						{date && (
							<time className="block text-sm font-medium text-[hsl(var(--muted-foreground)/0.7)]">
								{date}
							</time>
						)}
					</div>
				</div>

				{/* Footer */}
				{(footer || !icon) && (
					<div className="mt-auto flex items-center border-t border-[hsl(var(--border)/0.1)] px-8 py-6">
						{footer || (
							<div className="flex items-center font-medium text-[hsl(var(--primary))]">
								<span className="text-base">Learn more</span>
								<ArrowRight className="ml-2 h-5 w-5 transition-transform duration-300 ease-out group-hover:translate-x-0.5" />
							</div>
						)}
					</div>
				)}
			</article>
		</Link>
	)
}
