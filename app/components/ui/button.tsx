import * as React from 'react'
import {Slot} from '@radix-ui/react-slot'
import {cva, type VariantProps} from 'class-variance-authority'

import {cn} from '@/lib/utils'

const buttonVariants = cva(
	'inline-flex items-center justify-center gap-2 whitespace-nowrap font-semibold transition-all duration-500 ease-[cubic-bezier(0.4,0,0.2,1)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 disabled:cursor-not-allowed [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 box-border relative overflow-hidden group',
	{
		variants: {
			variant: {
				default:
					'bg-primary text-primary-foreground shadow-xl shadow-primary/30 hover:shadow-2xl hover:shadow-primary/40 hover:scale-[1.01] active:scale-[0.99] rounded-2xl border border-primary/30 before:absolute before:inset-0 before:bg-gradient-to-b before:from-white/20 before:via-white/5 before:to-transparent before:opacity-0 hover:before:opacity-100 after:absolute after:inset-0 after:bg-gradient-to-t after:from-black/5 after:to-transparent after:opacity-0 hover:after:opacity-100 before:transition-opacity before:duration-500 before:ease-[cubic-bezier(0.4,0,0.2,1)] after:transition-opacity after:duration-500 after:ease-[cubic-bezier(0.4,0,0.2,1)]',
				destructive:
					'bg-destructive text-destructive-foreground shadow-xl shadow-destructive/30 hover:shadow-2xl hover:shadow-destructive/40 hover:scale-[1.01] active:scale-[0.99] rounded-2xl border border-destructive/30 before:absolute before:inset-0 before:bg-gradient-to-b before:from-white/20 before:via-white/5 before:to-transparent before:opacity-0 hover:before:opacity-100 after:absolute after:inset-0 after:bg-gradient-to-t after:from-black/5 after:to-transparent after:opacity-0 hover:after:opacity-100 before:transition-opacity before:duration-500 before:ease-[cubic-bezier(0.4,0,0.2,1)] after:transition-opacity after:duration-500 after:ease-[cubic-bezier(0.4,0,0.2,1)]',
				outline:
					'border-2 border-border bg-background text-foreground shadow-lg shadow-black/5 hover:shadow-xl hover:shadow-black/10 hover:bg-accent/50 hover:border-accent-foreground/30 hover:scale-[1.01] active:scale-[0.99] rounded-2xl backdrop-blur-sm before:absolute before:inset-0 before:bg-gradient-to-br before:from-accent/30 before:via-accent/10 before:to-transparent before:opacity-0 hover:before:opacity-100 after:absolute after:inset-0 after:bg-gradient-to-t after:from-foreground/5 after:to-transparent after:opacity-0 hover:after:opacity-100 before:transition-opacity before:duration-500 before:ease-[cubic-bezier(0.4,0,0.2,1)] after:transition-opacity after:duration-500 after:ease-[cubic-bezier(0.4,0,0.2,1)]',
				secondary:
					'bg-gradient-to-b from-secondary via-secondary to-secondary/90 text-secondary-foreground shadow-xl shadow-secondary/25 hover:shadow-2xl hover:shadow-secondary/35 hover:scale-[1.01] active:scale-[0.99] rounded-2xl border border-secondary/40 before:absolute before:inset-0 before:bg-gradient-to-b before:from-white/25 before:via-white/8 before:to-transparent before:opacity-0 hover:before:opacity-100 after:absolute after:inset-0 after:bg-gradient-to-t after:from-black/8 after:via-black/3 after:to-transparent after:opacity-0 hover:after:opacity-100 before:transition-opacity before:duration-500 before:ease-[cubic-bezier(0.4,0,0.2,1)] after:transition-opacity after:duration-500 after:ease-[cubic-bezier(0.4,0,0.2,1)]',
				ghost:
					'text-foreground hover:bg-accent/60 hover:shadow-lg hover:shadow-black/5 rounded-2xl hover:scale-[1.01] active:scale-[0.99] transition-all duration-500 before:absolute before:inset-0 before:bg-gradient-to-br before:from-accent/20 before:to-transparent before:opacity-0 hover:before:opacity-100 before:transition-opacity before:duration-500 before:ease-[cubic-bezier(0.4,0,0.2,1)]',
				link: 'text-primary underline-offset-4 hover:underline rounded-xl hover:bg-primary/10 px-2 py-1 transition-all duration-300 ease-[cubic-bezier(0.4,0,0.2,1)] font-medium'
			},
			size: {
				default: 'h-11 px-6 py-3 text-sm rounded-2xl',
				sm: 'h-9 px-5 py-2 text-xs rounded-xl',
				lg: 'h-14 px-12 py-4 text-base rounded-2xl',
				icon: 'h-11 w-11 rounded-2xl'
			}
		},
		defaultVariants: {
			variant: 'default',
			size: 'default'
		}
	}
)

export interface ButtonProps
	extends React.ButtonHTMLAttributes<HTMLButtonElement>,
		VariantProps<typeof buttonVariants> {
	asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
	({className, variant, size, asChild = false, ...props}, ref) => {
		const Comp = asChild ? Slot : 'button'
		return (
			<Comp
				className={cn(buttonVariants({variant, size, className}))}
				ref={ref}
				{...props}
			/>
		)
	}
)
Button.displayName = 'Button'

export {Button, buttonVariants}
