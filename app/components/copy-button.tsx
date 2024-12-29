'use client'

import {successToast, errorToast} from 'app/components/toaster'

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
		<button
			onClick={handleCopy}
			className="group/button border-primary/20 bg-card/50 hover:border-primary/30 hover:bg-card focus:ring-primary/20 absolute top-3 right-3 rounded-md border p-1.5 opacity-0 backdrop-blur-sm transition-all duration-300 ease-out group-hover:opacity-100 hover:shadow-sm focus:ring-2 focus:outline-none"
			aria-label="Copy code to clipboard">
			<div className="relative">
				{/* Background glow effect */}
				<div className="bg-primary/20 absolute -inset-1 rounded-full opacity-0 blur transition-opacity duration-300 group-hover/button:opacity-100" />

				{/* Icon */}
				<svg
					width="15"
					height="15"
					viewBox="0 0 24 24"
					fill="none"
					className="relative transform-gpu transition-transform duration-200 ease-out group-hover/button:scale-110 group-active/button:scale-90">
					<path
						d="M6 11C6 9.89543 6.89543 9 8 9H16C17.1046 9 18 9.89543 18 11V19C18 20.1046 17.1046 21 16 21H8C6.89543 21 6 20.1046 6 19V11Z"
						stroke="currentColor"
						strokeWidth="2"
						strokeLinecap="round"
						strokeLinejoin="round"
						className="text-primary"
					/>
					<path
						d="M6 13H4C3.44772 13 3 12.5523 3 12V4C3 3.44772 3.44772 3 4 3H12C12.5523 3 13 3.44772 13 4V6"
						stroke="currentColor"
						strokeWidth="2"
						strokeLinecap="round"
						strokeLinejoin="round"
						className="text-primary/50"
					/>
				</svg>
			</div>
		</button>
	)
}
