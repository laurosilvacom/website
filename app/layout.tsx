import {type Metadata} from 'next/types'
import {type ReactNode} from 'react'
import {ThemeProvider} from '@/components/theme-provider'

import '@/app/globals.css'

import {Toaster} from '@/components/toaster'
import {StructuredData} from '@/components/structured-data'
import {baseUrl} from '@/app/sitemap'
import {Navbar} from '@/components/nav'
import {Sidebar} from '@/components/sidebar'

export const metadata: Metadata = {
	metadataBase: new URL(baseUrl),
	title: {
		default: 'Lauro Silva - Software Engineer & Developer Educator',
		template: '%s | Lauro Silva'
	},
	description:
		'Learn, build, and grow as a developer. Deep technical insights mixed with real experiences. Because great software comes from understanding both the code and the people who write it.',
	keywords: [
		'software engineer',
		'developer educator',
		'web development',
		'programming tutorials',
		'tech blog',
		'software development',
		'coding',
		'JavaScript',
		'TypeScript',
		'React',
		'Next.js',
		'developer experience',
		'technical writing'
	],
	authors: [
		{
			name: 'Lauro Silva',
			url: baseUrl
		}
	],
	creator: 'Lauro Silva',
	publisher: 'Lauro Silva',
	formatDetection: {
		email: false,
		address: false,
		telephone: false
	},
	category: 'technology',
	classification: 'Software Development & Education',
	openGraph: {
		title: 'Lauro Silva - Software Engineer & Developer Educator',
		description:
			'Learn, build, and grow as a developer. Deep technical insights mixed with real experiences. Because great software comes from understanding both the code and the people who write it.',
		url: baseUrl,
		siteName: 'Lauro Silva',
		locale: 'en_US',
		type: 'website',
		images: [
			{
				url: `${baseUrl}og?title=${encodeURIComponent('Lauro Silva - Software Engineer & Developer Educator')}`,
				width: 1200,
				height: 630,
				alt: 'Lauro Silva - Software Engineer & Developer Educator',
				type: 'image/png'
			}
		]
	},
	twitter: {
		card: 'summary_large_image',
		title: 'Lauro Silva - Software Engineer & Developer Educator',
		description:
			'Learn, build, and grow as a developer. Deep technical insights mixed with real experiences.',
		images: [
			{
				url: `${baseUrl}og?title=${encodeURIComponent('Lauro Silva - Software Engineer & Developer Educator')}`,
				width: 1200,
				height: 630,
				alt: 'Lauro Silva - Software Engineer & Developer Educator'
			}
		]
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
			'max-snippet': -1
		}
	},
	alternates: {
		canonical: baseUrl,
		types: {
			'application/rss+xml': `${baseUrl}rss`
		}
	},
	icons: {
		icon: [
			{
				url: '/favicon.ico',
				sizes: 'any'
			}
		],
		apple: [
			{
				url: '/favicon.ico',
				sizes: '180x180',
				type: 'image/x-icon'
			}
		]
	},
	manifest: '/manifest.json',
	verification: {
		google: process.env.GOOGLE_SITE_VERIFICATION
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
		'msapplication-config': '/browserconfig.xml'
	}
}


type RootLayoutProps = {
	children: ReactNode
}

export default function RootLayout({children}: RootLayoutProps) {
	return (
		<html
			lang="en"
			className="bg-background text-foreground scroll-smooth antialiased"
			suppressHydrationWarning // Add this to suppress hydration warnings related to theme
		>
			<body>
					<ThemeProvider
						attribute="class"
						defaultTheme="system"
						enableSystem
						disableTransitionOnChange>
						<div className="flex min-h-screen justify-center">
							<div className="flex w-full max-w-[1600px] relative">
								<Sidebar />
								<main className="flex-1 min-w-0 flex relative">
									<div className="flex-1 min-w-0 relative">
										<Navbar />
										{children}
									</div>
									<div className="hidden xl:block xl:w-64 flex-shrink-0" />
								</main>
							</div>
						</div>
					</ThemeProvider>
				<StructuredData type="website" />
				<StructuredData type="person" />
				<Toaster />
			</body>
		</html>
	)
}
