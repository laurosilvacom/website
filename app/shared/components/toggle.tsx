'use client'

import * as React from 'react'
import {Moon, Sun} from 'lucide-react'
import {useTheme} from 'next-themes'

import {Button} from '@/shared/ui/button'
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from '@/shared/ui/dropdown-menu'

export function ModeToggle() {
	const {setTheme} = useTheme()
	const [mounted, setMounted] = React.useState(false)

	React.useEffect(() => {
		setMounted(true)
	}, [])

	if (!mounted) {
		return (
			<Button
				variant="outline"
				size="icon"
				disabled
				className="shrink-0">
				<Sun className="text-foreground size-4" />
				<span className="sr-only">Toggle theme</span>
			</Button>
		)
	}

	return (
		<DropdownMenu modal={false}>
			<DropdownMenuTrigger asChild>
				<Button
					variant="outline"
					size="icon"
					className="relative shrink-0 overflow-hidden">
					<span className="absolute inset-0 flex items-center justify-center">
						<Sun className="text-foreground size-4 scale-100 rotate-0 transition-all dark:scale-0 dark:-rotate-90" />
						<Moon className="text-foreground absolute size-4 scale-0 rotate-90 transition-all dark:scale-100 dark:rotate-0" />
					</span>
					<span className="sr-only">Toggle theme</span>
				</Button>
			</DropdownMenuTrigger>
			<DropdownMenuContent
				align="end"
				sideOffset={8}
				avoidCollisions={true}
				className="will-change-[opacity,transform]">
				<DropdownMenuItem onClick={() => setTheme('light')}>Light</DropdownMenuItem>
				<DropdownMenuItem onClick={() => setTheme('dark')}>Dark</DropdownMenuItem>
				<DropdownMenuItem onClick={() => setTheme('system')}>System</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	)
}
