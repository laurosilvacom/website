'use client'

import {useState} from 'react'
import {Check, Copy} from 'lucide-react'

export function CodeCopyButton({code}: {code: string}) {
	const [copied, setCopied] = useState(false)

	const copy = async () => {
		await navigator.clipboard.writeText(code)
		setCopied(true)
		setTimeout(() => setCopied(false), 2000)
	}

	return (
		<button
			onClick={copy}
			className="hover:text-foreground text-muted-foreground flex h-6 w-6 items-center justify-center rounded transition-colors"
			aria-label="Copy code">
			{copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
		</button>
	)
}
