import * as React from 'react'

import {cn} from '@/lib/utils'

function Input({className, type, ...props}: React.ComponentProps<'input'>) {
	return (
		<input
			type={type}
			data-slot="input"
			className={cn(
				'border-input bg-card text-foreground relative flex h-10 w-full min-w-0 rounded-md border px-3 py-2 text-sm shadow-sm transition-all duration-200',
				'file:mr-4 file:border-0 file:bg-transparent file:text-sm file:font-medium',
				'placeholder:text-muted-foreground/70',
				'selection:bg-primary/15 selection:text-foreground',
				'hover:border-primary/30 hover:shadow-[0_2px_4px_rgba(0,0,0,0.04)]',
				'focus:border-primary focus:shadow-[0_0_0_3px_rgba(var(--primary),0.12)] focus:outline-none',
				'disabled:bg-muted/40 disabled:cursor-not-allowed disabled:opacity-50',
				'aria-invalid:border-destructive aria-invalid:focus:shadow-[0_0_0_3px_rgba(var(--destructive),0.12)]',
				className
			)}
			{...props}
		/>
	)
}

export {Input}
