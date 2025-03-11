import {Analytics} from '@vercel/analytics/react'
import {SpeedInsights} from '@vercel/speed-insights/next'
import localFont from 'next/font/local'
import {type ReactNode} from 'react'
import {Toaster} from 'app/components/toaster'

const cx = (...classes: (string | false | null | undefined)[]) =>
	classes.filter(Boolean).join(' ')

export default function LessonLayout({children}: {children: ReactNode}) {
	return (
		<div>
			{children}
			<Analytics />
			<SpeedInsights />
			<Toaster />
			{/* Subtle grid overlay */}
			<div className="pointer-events-none fixed inset-0 z-[-1] bg-[linear-gradient(to_right,#8882_1px,transparent_1px),linear-gradient(to_bottom,#8882_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_100%_30%_at_30%_0%,#000,transparent)]" />
		</div>
	)
}
