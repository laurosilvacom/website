'use client'

import Image, {type ImageProps} from 'next/image'
import {useEffect, useState} from 'react'
import {cn} from '@/shared/lib/utils'

interface FootnoteData {
	id: string
	content: React.ReactNode
	number: number
}

const footnotesMap = new Map<string, FootnoteData>()
let globalCounter = 0

// Global state for active footnote
let activeFootnoteId: string | null = null
const listeners = new Set<(id: string | null) => void>()

export function setActiveFootnote(id: string | null) {
	activeFootnoteId = id
	listeners.forEach((listener) => listener(id))
}

export function getActiveFootnote() {
	return activeFootnoteId
}

export function subscribeToActiveFootnote(listener: (id: string | null) => void) {
	listeners.add(listener)
	return () => {
		listeners.delete(listener)
	}
}

interface FootnoteProps {
	id?: string
	children: React.ReactNode
}

export function Footnote({id, children}: FootnoteProps) {
	const [footnoteId] = useState(() => {
		const num = ++globalCounter
		return id || `footnote-${num}`
	})

	const [footnoteNumber, setFootnoteNumber] = useState(0)
	const [isActive, setIsActive] = useState(false)

	useEffect(() => {
		footnotesMap.set(footnoteId, {
			id: footnoteId,
			content: children,
			number: Array.from(footnotesMap.keys()).indexOf(footnoteId) + 1,
		})

		const allFootnotes = Array.from(footnotesMap.entries())
		allFootnotes.forEach(([id, data], index) => {
			data.number = index + 1
		})

		setFootnoteNumber(Array.from(footnotesMap.keys()).indexOf(footnoteId) + 1)

		// Subscribe to active footnote changes
		const unsubscribe = subscribeToActiveFootnote((activeId) => {
			setIsActive(activeId === footnoteId)
		})

		return () => {
			footnotesMap.delete(footnoteId)
			unsubscribe()
		}
	}, [footnoteId, children])

	const handleClick = (e: React.MouseEvent) => {
		e.preventDefault()
		e.stopPropagation()
		const currentActive = getActiveFootnote()
		if (currentActive === footnoteId) {
			setActiveFootnote(null)
		} else {
			setActiveFootnote(footnoteId)
		}
	}

	return (
		<sup>
			<button
				type="button"
				id={`footnote-ref-${footnoteId}`}
				onClick={handleClick}
				className={cn(
					'focus:ring-primary inline-flex h-5 w-5 items-center justify-center rounded-full text-xs font-medium transition-colors focus:ring-2 focus:ring-offset-2 focus:outline-none',
					isActive
						? 'bg-primary text-primary-foreground hover:bg-primary/90'
						: 'text-muted-foreground hover:text-foreground border-border/50 hover:border-border border bg-transparent',
				)}>
				{footnoteNumber}
			</button>
		</sup>
	)
}

export function getFootnotes(): Array<{
	id: string
	content: React.ReactNode
	number: number
}> {
	return Array.from(footnotesMap.values()).sort((a, b) => a.number - b.number)
}

export function getFootnoteById(
	id: string,
): {id: string; content: React.ReactNode; number: number} | undefined {
	return footnotesMap.get(id)
}
