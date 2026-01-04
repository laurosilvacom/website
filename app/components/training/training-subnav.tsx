'use client'

import Link from 'next/link'
import {usePathname} from 'next/navigation'
import {cn} from '@/lib/utils'

const items = [
	{href: '/training', label: 'Dashboard'},
	{href: '/training/log', label: 'Log'},
	{href: '/training/cycles', label: 'Cycles'},
	{href: '/training/review', label: 'Review'}
]

export function TrainingSubnav() {
	const pathname = usePathname()
	return (
		<nav className="flex flex-wrap gap-2">
			{items.map((it) => {
				const active = pathname === it.href
				return (
					<Link
						key={it.href}
						href={it.href}
						className={cn(
							'rounded-md border px-3 py-1.5 text-sm',
							active
								? 'bg-muted text-foreground'
								: 'text-muted-foreground hover:text-foreground'
						)}>
						{it.label}
					</Link>
				)
			})}
		</nav>
	)
}
