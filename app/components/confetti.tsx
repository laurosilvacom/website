'use client'

import {useEffect, useState} from 'react'

interface ConfettiProps {
	numberOfPieces?: number
	colors?: string[]
}

export function Confetti({numberOfPieces = 200, colors = ['#F5D547', '#F7E174', '#E6B91E', '#D69E2E', '#38A169', '#3182CE']}: ConfettiProps) {
	const [pieces, setPieces] = useState<Array<{id: number; left: number; delay: number; color: string; duration: number}>>([])

	useEffect(() => {
		const newPieces = Array.from({length: numberOfPieces}, (_, i) => ({
			id: i,
			left: Math.random() * 100,
			delay: Math.random() * 3,
			duration: 2 + Math.random() * 2,
			color: colors[Math.floor(Math.random() * colors.length)] || colors[0] || '#F5D547'
		}))
		setPieces(newPieces)
	}, [numberOfPieces, colors])

	return (
		<>
			<style dangerouslySetInnerHTML={{
				__html: `
					@keyframes confetti-fall {
						to {
							transform: translateY(100vh) rotate(720deg);
							opacity: 0;
						}
					}
				`
			}} />
			<div className="pointer-events-none fixed inset-0 overflow-hidden">
				{pieces.map((piece) => (
					<div
						key={piece.id}
						className="absolute h-2 w-2 rounded-full"
						style={{
							left: `${piece.left}%`,
							backgroundColor: piece.color,
							animation: `confetti-fall ${piece.duration}s linear ${piece.delay}s forwards`,
							transform: `rotate(${Math.random() * 360}deg)`
						}}
					/>
				))}
			</div>
		</>
	)
}

