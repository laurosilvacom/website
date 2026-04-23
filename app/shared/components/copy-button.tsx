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
			className="flex size-6 items-center justify-center rounded-md text-muted-foreground transition-colors hover:text-foreground"
			aria-label="Copy code">
			{copied ? <Check className="size-4" /> : <Copy className="size-4" />}
		</button>
	)
}
