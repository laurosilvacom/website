import {Analytics} from '@vercel/analytics/react'
import {SpeedInsights} from '@vercel/speed-insights/next'
import Footer from 'app/components/footer'
import {Navbar} from 'app/components/nav'
import 'app/globals.css'
import {baseUrl} from 'app/sitemap'
import type {Metadata} from 'next'
import localFont from 'next/font/local'
import {type ReactNode} from 'react'
import {Toaster} from 'app/components/toaster'

const wotfard = localFont({
	src: [
		{
			path: './wotfard/Wotfard-Thin.ttf',
			weight: '100',
			style: 'normal'
		},
		{
			path: './wotfard/Wotfard-Regular.ttf',
			weight: '400',
			style: 'normal'
		},
		{
			path: './wotfard/Wotfard-Medium.ttf',
			weight: '500',
			style: 'normal'
		},
		{
			path: './wotfard/Wotfard-SemiBold.ttf',
			weight: '600',
			style: 'normal'
		},
		{
			path: './wotfard/Wotfard-Bold.ttf',
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
			path: './commit/CommitMono-400-Regular.otf',
			weight: '400',
			style: 'normal'
		},
		{
			path: './commit/CommitMono-400-Italic.otf',
			weight: '400',
			style: 'italic'
		},
		{
			path: './commit/CommitMono-700-Regular.otf',
			weight: '700',
			style: 'normal'
		},
		{
			path: './commit/CommitMono-700-Italic.otf',
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
		default: 'Next.js Portfolio Starter',
		template: '%s | Next.js Portfolio Starter'
	},
	description: 'This is my portfolio.',
	openGraph: {
		title: 'My Portfolio',
		description: 'This is my portfolio.',
		url: baseUrl,
		siteName: 'My Portfolio',
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
			className={cx(wotfard.variable, commitMono.variable, 'scroll-smooth')}>
			<body className="antialiased lg:mx-auto">
				<main className="min-w-0 px-2 md:px-0">
					<Navbar />
					{children}
					<Footer />
					<Analytics />
					<SpeedInsights />
					<Toaster />
				</main>
			</body>
		</html>
	)
}
