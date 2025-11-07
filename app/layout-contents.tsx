'use client'

import React, {type ReactNode} from 'react'
import {Navbar} from 'app/components/nav'
import Footer from 'app/components/footer'

export function LayoutContents({children}: {children: ReactNode}) {
	return (
		<main className="min-w-0">
			<Navbar />
			{children}
			<Footer />
		</main>
	)
}
