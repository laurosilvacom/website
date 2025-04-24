import * as React from 'react'
import {Slot} from '@radix-ui/react-slot'
import {cva, type VariantProps} from 'class-variance-authority'

import {cn} from '@/lib/utils'

const buttonVariants = cva(
	"relative inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/30 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0",
	{
		variants: {
			variant: {
				default: [
					'bg-primary text-white',
					'before:absolute before:inset-0 before:rounded-md before:bg-[linear-gradient(rgba(255,255,255,0.12),rgba(255,255,255,0)_50%,rgba(0,0,0,0.05)_50%,rgba(0,0,0,0.07))]',
					'shadow-[0_2px_6px_rgba(0,0,0,0.12)]',
					'after:absolute after:inset-0 after:rounded-md after:opacity-0 after:transition-opacity after:shadow-[0_0_0_1px_rgba(255,255,255,0.2)_inset] hover:after:opacity-100',
					'hover:bg-primary/95 hover:shadow-[0_4px_12px_rgba(0,0,0,0.18)]',
					'active:translate-y-[1px] active:shadow-[0_2px_2px_rgba(0,0,0,0.1)]'
				].join(' '),
				destructive: [
					'bg-destructive text-white',
					'before:absolute before:inset-0 before:rounded-md before:bg-[linear-gradient(rgba(255,255,255,0.12),rgba(255,255,255,0)_50%,rgba(0,0,0,0.05)_50%,rgba(0,0,0,0.07))]',
					'shadow-[0_2px_6px_rgba(220,38,38,0.18)]',
					'after:absolute after:inset-0 after:rounded-md after:opacity-0 after:transition-opacity after:shadow-[0_0_0_1px_rgba(255,255,255,0.2)_inset] hover:after:opacity-100',
					'hover:bg-destructive/95 hover:shadow-[0_4px_12px_rgba(220,38,38,0.25)]',
					'active:translate-y-[1px] active:shadow-[0_2px_2px_rgba(0,0,0,0.1)]'
				].join(' '),
				outline: [
					'border border-input bg-background text-foreground',
					'before:absolute before:inset-0 before:rounded-md before:bg-[linear-gradient(rgba(255,255,255,0.08),rgba(255,255,255,0)_50%,rgba(0,0,0,0.02)_50%,rgba(0,0,0,0.04))]',
					'shadow-[0_1px_2px_rgba(0,0,0,0.04)]',
					'hover:border-primary/30 hover:bg-primary/5 hover:shadow-[0_2px_4px_rgba(0,0,0,0.06)]',
					'active:translate-y-[1px] active:shadow-none'
				].join(' '),
				secondary: [
					'bg-secondary text-secondary-foreground',
					'before:absolute before:inset-0 before:rounded-md before:bg-[linear-gradient(rgba(255,255,255,0.08),rgba(255,255,255,0)_50%,rgba(0,0,0,0.02)_50%,rgba(0,0,0,0.04))]',
					'shadow-[0_1px_3px_rgba(0,0,0,0.06)]',
					'hover:bg-secondary/90 hover:shadow-[0_2px_6px_rgba(0,0,0,0.08)]',
					'active:translate-y-[1px] active:shadow-[0_1px_1px_rgba(0,0,0,0.04)]'
				].join(' '),
				ghost: [
					'text-foreground hover:bg-accent hover:text-accent-foreground',
					'after:absolute after:inset-0 after:rounded-md after:opacity-0 after:transition-opacity hover:after:opacity-100',
					'active:translate-y-[1px]'
				].join(' '),
				link: 'text-primary underline-offset-4 hover:underline'
			},
			size: {
				default: 'h-10 px-4 py-2',
				sm: 'h-9 rounded-md gap-1.5 px-3 text-xs',
				lg: 'h-11 rounded-md px-6 text-base font-semibold',
				xl: 'h-12 rounded-md px-8 text-base font-semibold tracking-wide',
				icon: 'h-10 w-10 p-0'
			}
		},
		defaultVariants: {
			variant: 'default',
			size: 'default'
		}
	}
)

function Button({
	className,
	variant,
	size,
	asChild = false,
	...props
}: React.ComponentProps<'button'> &
	VariantProps<typeof buttonVariants> & {
		asChild?: boolean
	}) {
	const Comp = asChild ? Slot : 'button'

	return (
		<Comp
			data-slot="button"
			className={cn(buttonVariants({variant, size, className}))}
			{...props}
		/>
	)
}

export {Button, buttonVariants}
