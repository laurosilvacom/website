'use client'

import Link from 'next/link'
import {usePathname} from 'next/navigation'
import {cn} from '@/lib/utils'

const items = [
	{href: '/training', label: 'Overview'},
	{href: '/training/guide', label: 'Guide'},
	{href: '/training/td', label: 'TD'},
	{href: '/training/totals', label: 'Totals'},
	{href: '/training/season', label: 'Season'},
	{href: '/training/profile', label: 'My Profile'},
	{href: '/training/metabolism', label: 'Metabolism'},
	{href: '/training/races', label: 'Races'},
	{href: '/training/activities', label: 'Activities'},
	{href: '/training/vo2-tests', label: 'VO2 Tests'},
	{href: '/training/blood-tests', label: 'Blood Tests'},
	{href: '/training/injuries', label: 'Injuries'},
	{href: '/training/close-calls', label: 'Close Calls'}
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
