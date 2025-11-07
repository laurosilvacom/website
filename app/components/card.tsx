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
		<Link href={href}>
			<UICard className={cn('h-full', className)}>
				<CardHeader>
					<div className="flex items-center justify-between">
						{icon && (
							<Image
								src={icon}
								alt=""
								width={40}
								height={40}
								className="h-7 w-7 rounded object-contain"
							/>
						)}
						<div className="flex items-center gap-3">
							{tag && <span className="text-xs">{tag}</span>}
							{date && (
								<time className="text-muted-foreground text-xs">{date}</time>
							)}
						</div>
					</div>
					<CardTitle>{title}</CardTitle>
				</CardHeader>
				{description && (
					<CardContent>
						<CardDescription className="line-clamp-3">
							{description}
						</CardDescription>
					</CardContent>
				)}
				<CardFooter>
					{footer || <span className="text-sm">Read article</span>}
				</CardFooter>
			</UICard>
		</Link>
	)
}
