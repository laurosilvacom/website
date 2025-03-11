import {Analytics} from '@vercel/analytics/react'
import {SpeedInsights} from '@vercel/speed-insights/next'
import localFont from 'next/font/local'
import {type Metadata} from 'next/types'
import {type ReactNode} from 'react'

import 'app/globals.css'
import Footer from 'app/components/footer'
import {Navbar} from 'app/components/nav'
import {Toaster} from 'app/components/toaster'
import {baseUrl} from 'app/sitemap'
import {LayoutContents} from './layout-contents'

const wotfard = localFont({
	src: [
		{
			path: './fonts/wotfard/Wotfard-Thin.ttf',
			weight: '100',
			style: 'normal'
		},
		{
			path: './fonts/wotfard/Wotfard-Regular.ttf',
			weight: '400',
			style: 'normal'
		},
		{
			path: './fonts/wotfard/Wotfard-Medium.ttf',
			weight: '500',
			style: 'normal'
		},
		{
			path: './fonts/wotfard/Wotfard-SemiBold.ttf',
			weight: '600',
			style: 'normal'
		},
		{
			path: './fonts/wotfard/Wotfard-Bold.ttf',
			weight: '700',
			style: 'normal'
		}
	],
	variable: '--font-sans',
	display: 'swap'
})

const commitMono = localFont({
	src: [
		{
			path: './fonts/commit/CommitMono-400-Regular.otf',
			weight: '400',
			style: 'normal'
		},
		{
			path: './fonts/commit/CommitMono-400-Italic.otf',
			weight: '400',
			style: 'italic'
		},
		{
			path: './fonts/commit/CommitMono-700-Regular.otf',
			weight: '700',
			style: 'normal'
		},
		{
			path: './fonts/commit/CommitMono-700-Italic.otf',
			weight: '700',
			style: 'italic'
		}
	],
	variable: '--font-mono',
	display: 'swap'
})

export const metadata: Metadata = {
	metadataBase: new URL(baseUrl),
	title: {
		default: 'Lauro Silva',
		template: '%s | Lauro Silva'
	},
	description:
		'Learn, build, and grow as a developer. Deep technical insights mixed with real experiences. Because great software comes from understanding both the code and the people who write it.',
	openGraph: {
		title: 'Lauro Silva',
		description:
			'Learn, build, and grow as a developer. Deep technical insights mixed with real experiences. Because great software comes from understanding both the code and the people who write it.',
		url: baseUrl,
		siteName: 'Lauro Silva',
		locale: 'en_US',
		type: 'website'
	},
	robots: {
		index: true,
		follow: true,
		googleBot: {
			index: true,
			follow: true,
			'max-video-preview': -1,
			'max-image-preview': 'large',
			'max-snippet': -1
		}
	}
}

const cx = (...classes: (string | false | null | undefined)[]) =>
	classes.filter(Boolean).join(' ')

type RootLayoutProps = {
	children: ReactNode
}

export default function RootLayout({children}: RootLayoutProps) {
	return (
		<html
			lang="en"
			className={cx(
				wotfard.variable,
				commitMono.variable,
				'scroll-smooth antialiased'
			)}>
			<body>
				<LayoutContents>{children}</LayoutContents>
				<Analytics />
				<SpeedInsights />
				<Toaster />
				{/* Subtle grid overlay */}
				<div className="pointer-events-none fixed inset-0 z-[-1] bg-[linear-gradient(to_right,#8882_1px,transparent_1px),linear-gradient(to_bottom,#8882_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_100%_50%_at_50%_0%,#000,transparent)]" />
			</body>
		</html>
	)
}
