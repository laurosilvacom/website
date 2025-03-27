'use client'

import {successToast, errorToast} from 'app/components/toaster'
import {Button} from './ui/button'

export function CodeCopyButton({code}: {code: string}) {
	const handleCopy = async () => {
		try {
			await navigator.clipboard.writeText(code)
			successToast('Code copied to clipboard')
		} catch {
			errorToast('Failed to copy code')
		}
	}

	return (
		<Button
			onClick={handleCopy}
			size="icon"
			variant="ghost"
			className="text-foreground/40 h-8 w-8 transition-opacity" // Updated classes for header
			aria-label="Copy code to clipboard">
			<svg
				width="15"
				height="15"
				viewBox="0 0 24 24"
				fill="none"
				stroke="currentColor"
				strokeWidth="2"
				strokeLinecap="round"
				strokeLinejoin="round">
				<path d="M8 4v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V7.242a2 2 0 0 0-.602-1.43L16.083 2.57A2 2 0 0 0 14.685 2H10a2 2 0 0 0-2 2z" />
				<path d="M16 18v2a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V9a2 2 0 0 1 2-2h2" />
			</svg>
		</Button>
	)
}
