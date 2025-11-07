'use client'

import {successToast, errorToast} from '@/components/toaster'

export function CodeCopyButton({code}: {code: string}) {
	const handleCopy = async () => {
		try {
			await navigator.clipboard.writeText(code)
			successToast('Code copied')
		} catch {
			errorToast('Failed to copy')
		}
	}

	return (
		<button
			onClick={handleCopy}
			className="text-muted-foreground hover:text-foreground h-6 w-6 flex items-center justify-center transition-colors rounded"
			aria-label="Copy code">
			<svg
				width="14"
				height="14"
				viewBox="0 0 24 24"
				fill="none"
				stroke="currentColor"
				strokeWidth="2"
				strokeLinecap="round"
				strokeLinejoin="round">
				<rect width="14" height="14" x="8" y="8" rx="2" ry="2" />
				<path d="M4 16c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2h8c1.1 0 2 .9 2 2" />
			</svg>
		</button>
	)
}
