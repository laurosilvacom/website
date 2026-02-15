import {type Metadata} from 'next/types'
import {type ReactNode} from 'react'
import {ThemeProvider} from '@/shared/components/theme-provider'
import {Analytics} from '@vercel/analytics/next'
import {GeistSans} from 'geist/font/sans'
import {GeistMono} from 'geist/font/mono'

import '@/app/globals.css'

import {Toaster} from '@/shared/components/toaster'
import {StructuredData} from '@/shared/components/structured-data'
import {baseUrl} from '@/app/sitemap'
import {Navigation} from '@/shared/components/navigation'
import {defaultOgImageUrl} from '@/shared/lib/metadata'

export const metadata: Metadata = {
	metadataBase: new URL(baseUrl),
	title: {
		default: 'Lauro Silva - Senior Full-Stack Engineer & Developer Educator',
		template: '%s | Lauro Silva',
	},
	description:
		"Senior full-stack engineer and developer educator. I help companies ship better software and level up their engineering teams. React, Next.js, TypeScript. Previously with Google, O'Reilly, Sentry.",
	keywords: [
		'senior full-stack engineer',
		'developer educator',
		'freelance senior engineer',
		'technical consulting',
		'corporate developer training',
		'React workshops',
		'full-stack consultant',
		'TypeScript',
		'React',
		'Next.js',
		'Node.js',
		'developer experience',
		'technical writing',
		'AI integration',
	],
	authors: [
		{
			name: 'Lauro Silva',
			url: baseUrl,
		},
	],
	creator: 'Lauro Silva',
	publisher: 'Lauro Silva',
	formatDetection: {
		email: false,
		address: false,
		telephone: false,
	},
	category: 'technology',
	classification: 'Software Development & Education',
	openGraph: {
		title: 'Lauro Silva - Senior Full-Stack Engineer & Developer Educator',
		description:
			"Senior full-stack engineer and developer educator. I help companies ship better software and level up their engineering teams. Previously with Google, O'Reilly, Sentry.",
		url: baseUrl,
		siteName: 'Lauro Silva',
		locale: 'en_US',
		type: 'website',
		images: [
			{
				url: defaultOgImageUrl,
				width: 1200,
				height: 630,
				alt: 'Lauro Silva - Senior Full-Stack Engineer & Developer Educator',
				type: 'image/webp',
			},
		],
	},
	twitter: {
		card: 'summary_large_image',
		title: 'Lauro Silva - Senior Full-Stack Engineer & Developer Educator',
		description:
			'Senior full-stack engineer and developer educator. I help companies ship better software and level up their engineering teams.',
		images: [
			{
				url: defaultOgImageUrl,
				width: 1200,
				height: 630,
				alt: 'Lauro Silva - Senior Full-Stack Engineer & Developer Educator',
			},
		],
	},
	robots: {
		index: true,
		follow: true,
		noarchive: false,
		nosnippet: false,
		noimageindex: false,
		nocache: false,
		googleBot: {
			index: true,
			follow: true,
			noimageindex: false,
			'max-video-preview': -1,
			'max-image-preview': 'large',
			'max-snippet': -1,
		},
	},
	alternates: {
		canonical: baseUrl,
		types: {
			'application/rss+xml': `${baseUrl}/blog/rss.xml`,
			'application/feed+json': `${baseUrl}/feed.json`,
			'text/plain': `${baseUrl}/llms.txt`,
		},
	},
	icons: {
		icon: [
			{
				url: '/favicon.ico',
				sizes: 'any',
			},
		],
		apple: [
			{
				url: '/favicon.ico',
				sizes: '180x180',
				type: 'image/x-icon',
			},
		],
	},
	manifest: '/manifest.json',
	verification: {
		google: process.env.GOOGLE_SITE_VERIFICATION,
	},
	other: {
		'theme-color': '#ffffff',
		'color-scheme': 'light dark',
		'mobile-web-app-capable': 'yes',
		'apple-mobile-web-app-capable': 'yes',
		'apple-mobile-web-app-status-bar-style': 'default',
		'apple-mobile-web-app-title': 'Lauro Silva',
		'application-name': 'Lauro Silva',
		'msapplication-TileColor': '#ffffff',
		'msapplication-config': '/browserconfig.xml',
	},
}

type RootLayoutProps = {
	children: ReactNode
}

export default function RootLayout({children}: RootLayoutProps) {
	return (
		<html
			lang="en"
			className={`${GeistSans.variable} ${GeistMono.variable} bg-background text-foreground scroll-smooth antialiased`}
			suppressHydrationWarning>
			<head>
				<link rel="dns-prefetch" href="https://cdn.sanity.io" />
				<link rel="preconnect" href="https://cdn.sanity.io" crossOrigin="" />
			</head>
			<body className="min-h-screen">
				<ThemeProvider
					attribute="class"
					defaultTheme="system"
					enableSystem
					disableTransitionOnChange>
					<div className="relative min-h-screen">
						<Navigation />
						<main className="relative">{children}</main>
					</div>
				</ThemeProvider>
				<StructuredData type="website" />
				<StructuredData type="person" />
				<Toaster />
				<Analytics />
			</body>
		</html>
	)
}
