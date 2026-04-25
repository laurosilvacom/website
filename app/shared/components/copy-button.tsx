'use client'

import {useState} from 'react'
import {Check, Copy} from 'lucide-react'
import {Button} from '@/shared/ui/button'

export function CodeCopyButton({code}: {code: string}) {
	const [copied, setCopied] = useState(false)

	const copy = async () => {
		await navigator.clipboard.writeText(code)
		setCopied(true)
		setTimeout(() => setCopied(false), 2000)
	}

	return (
		<Button
			onClick={copy}
			variant="ghost"
			size="icon-xs"
			className="text-muted-foreground hover:text-foreground"
			aria-label="Copy code">
			{copied ? <Check className="size-4" /> : <Copy className="size-4" />}
		</Button>
	)
}
