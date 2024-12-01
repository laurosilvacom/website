import type {Metadata} from 'next'
import {Analytics} from '@vercel/analytics/react'
import {SpeedInsights} from '@vercel/speed-insights/next'
import Footer from 'app/components/footer'
import {Navbar} from 'app/components/nav'
import 'app/globals.css'
import {baseUrl} from 'app/sitemap'
import localFont from 'next/font/local'
import {Inter} from 'next/font/google'

const inter = Inter({
	subsets: ['latin'],
	display: 'swap',
	variable: '--font-inter'
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
	variable: '--font-commitmono',
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

export default function RootLayout({
	children
}: Readonly<{
	children: React.ReactNode
}>) {
	return (
		<html lang="en" className={cx(inter.variable, commitMono.variable)}>
			<body className="mx-4 mt-8 antialiased lg:mx-auto">
				<main className="mt-6 min-w-0 px-2 md:px-0">
					<Navbar />
					{children}
					<Footer />
					<Analytics />
					<SpeedInsights />
				</main>
			</body>
		</html>
	)
}
