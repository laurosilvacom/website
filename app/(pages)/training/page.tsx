'use client'

import Link from 'next/link'

const links = [
	{href: '/training/guide', label: 'Guide (How to use this plan)'},
	{href: '/training/td', label: 'TD (Training Diary)'},
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

export default function TrainingIndexPage() {
	return (
		<div className="space-y-4">
			<h1 className="text-2xl font-semibold">Training</h1>
			<ul className="list-disc space-y-2 pl-5">
				{links.map((l) => (
					<li key={l.href}>
						<Link href={l.href} className="underline">
							{l.label}
						</Link>
					</li>
				))}
			</ul>
		</div>
	)
}
