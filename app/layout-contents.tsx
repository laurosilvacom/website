'use client'

import {usePathname} from 'next/navigation'
import React, {type ReactNode, useEffect} from 'react'
import {Navbar} from 'app/components/nav'
import Footer from 'app/components/footer'

// Helper function to check if path is a lesson view
function isLessonPath(path: string): boolean {
	// Match paths like /workshops/react-fundamentals/lessons/introduction-to-react
	return /\/workshops\/[^/]+\/lessons\/[^/]+/.test(path)
}

const cx = (...classes: (string | false | null | undefined)[]) =>
	classes.filter(Boolean).join(' ')

export function LayoutContents({children}: {children: ReactNode}) {
	const pathname = usePathname()
	const isLesson = isLessonPath(pathname)

	// Set the body class based on whether we're in a lesson
	useEffect(() => {
		if (isLesson) {
			document.body.classList.add('lesson-view')
		} else {
			document.body.classList.remove('lesson-view')
		}

		return () => {
			document.body.classList.remove('lesson-view')
		}
	}, [isLesson])

	return (
		<main className={cx('min-w-0', isLesson && 'h-screen overflow-hidden')}>
			{!isLesson && <Navbar />}
			{children}
			{!isLesson && <Footer />}
		</main>
	)
}
