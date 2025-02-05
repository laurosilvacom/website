import * as React from 'react'
import {Slot} from '@radix-ui/react-slot'
import {cva, type VariantProps} from 'class-variance-authority'
import {cn} from '@/lib/utils'

const buttonVariants = cva(
	'inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 active:translate-y-[1px]',
	{
		variants: {
			variant: {
				default:
					'relative bg-primary text-primary-foreground shadow-[0_4px_0_0_hsl(var(--primary)/.7)] hover:brightness-105 hover:shadow-[0_6px_0_0_hsl(var(--primary)/.7)] active:shadow-[0_2px_0_0_hsl(var(--primary)/.7)] active:brightness-95',
				destructive:
					'relative bg-destructive text-destructive-foreground shadow-[0_4px_0_0_hsl(var(--destructive)/.7)] hover:brightness-105 hover:shadow-[0_6px_0_0_hsl(var(--destructive)/.7)] active:shadow-[0_2px_0_0_hsl(var(--destructive)/.7)] active:brightness-95',
				outline:
					'relative border-2 border-primary bg-card text-primary shadow-[0_4px_0_0_hsl(var(--primary)/.8)] hover:bg-primary/10 hover:shadow-[0_6px_0_0_hsl(var(--primary)/.8)] active:shadow-[0_2px_0_0_hsl(var(--primary)/.8)]',
				secondary:
					'relative bg-secondary text-secondary-foreground shadow-[0_4px_0_0_hsl(var(--secondary)/.8)] hover:brightness-105 hover:shadow-[0_6px_0_0_hsl(var(--secondary)/.8)] active:shadow-[0_2px_0_0_hsl(var(--secondary)/.8)]',
				ghost:
					'hover:bg-primary/15 hover:text-primary active:bg-primary/25 relative after:absolute after:inset-0 after:rounded-md after:border-2 after:border-transparent hover:after:border-primary/50',
				link: 'relative text-primary after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-full after:origin-bottom-right after:scale-x-0 after:bg-primary after:transition-transform after:duration-200 hover:after:origin-bottom-left hover:after:scale-x-100'
			},
			size: {
				default: 'h-10 px-4 py-2',
				sm: 'h-9 rounded-md px-3 text-xs',
				lg: 'h-11 rounded-md px-8 text-base',
				icon: 'h-10 w-10'
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
