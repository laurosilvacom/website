import * as React from 'react'
import {Slot} from '@radix-ui/react-slot'
import {cva, type VariantProps} from 'class-variance-authority'
import {cn} from '@/lib/utils'

const buttonEffects = {
	smoothGradient:
		'before:absolute before:inset-0 before:rounded-[inherit] before:bg-[linear-gradient(180deg,rgba(255,255,255,0.15)_0%,rgba(255,255,255,0)_60%,rgba(0,0,0,0.08)_100%)]',
	subtleGradient:
		'before:absolute before:inset-0 before:rounded-[inherit] before:bg-[linear-gradient(180deg,rgba(255,255,255,0.08)_0%,transparent_60%,rgba(0,0,0,0.03)_100%)]',
	highlightBorder:
		'after:absolute after:inset-0 after:rounded-[inherit] after:opacity-0 after:transition-opacity after:shadow-[0_0_0_1px_rgba(255,255,255,0.2)_inset] hover:after:opacity-100',
	activePress: 'active:translate-y-[1px]',
	focus:
		'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/30 focus-visible:ring-offset-2'
}

const buttonVariants = cva(
	"relative inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0",
	{
		variants: {
			variant: {
				default: cn(
					'bg-primary text-white',
					buttonEffects.smoothGradient,
					buttonEffects.highlightBorder,
					buttonEffects.activePress,
					buttonEffects.focus,
					'shadow-[0_2px_6px_rgba(0,0,0,0.12)]',
					'hover:bg-primary/95 hover:shadow-[0_4px_12px_rgba(0,0,0,0.18)]',
					'active:shadow-[0_2px_2px_rgba(0,0,0,0.1)]'
				),
				destructive: cn(
					'bg-destructive text-white',
					buttonEffects.smoothGradient,
					buttonEffects.highlightBorder,
					buttonEffects.activePress,
					buttonEffects.focus,
					'shadow-[0_2px_6px_rgba(220,38,38,0.18)]',
					'hover:bg-destructive/95 hover:shadow-[0_4px_12px_rgba(220,38,38,0.25)]',
					'active:shadow-[0_2px_2px_rgba(0,0,0,0.1)]'
				),
				outline: cn(
					'border-input bg-background text-foreground border',
					buttonEffects.subtleGradient,
					buttonEffects.activePress,
					buttonEffects.focus,
					'shadow-[0_1px_2px_rgba(0,0,0,0.04)]',
					'hover:border-primary/30 hover:bg-primary/5 hover:shadow-[0_2px_4px_rgba(0,0,0,0.06)]',
					'active:shadow-none'
				),
				secondary: cn(
					'bg-secondary text-secondary-foreground',
					buttonEffects.subtleGradient,
					buttonEffects.activePress,
					buttonEffects.focus,
					'shadow-[0_1px_3px_rgba(0,0,0,0.06)]',
					'hover:bg-secondary/90 hover:shadow-[0_2px_6px_rgba(0,0,0,0.08)]',
					'active:shadow-[0_1px_1px_rgba(0,0,0,0.04)]'
				),
				ghost: cn(
					'text-foreground',
					buttonEffects.activePress,
					buttonEffects.focus,
					'hover:bg-accent hover:text-accent-foreground',
					'after:absolute after:inset-0 after:rounded-[inherit] after:opacity-0 after:transition-opacity hover:after:opacity-100'
				),
				link: cn(
					'text-primary underline-offset-4 hover:underline',
					buttonEffects.focus
				)
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

interface ButtonProps
	extends React.ButtonHTMLAttributes<HTMLButtonElement>,
		VariantProps<typeof buttonVariants> {
	asChild?: boolean
	isLoading?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
	(
		{
			className,
			variant,
			size,
			asChild = false,
			isLoading = false,
			children,
			...props
		},
		ref
	) => {
		const Comp = asChild ? Slot : 'button'

		// When using asChild, we need to clone the child and add our props
		if (asChild && React.isValidElement(children)) {
			// Don't add loading spinner when using asChild
			return (
				<Comp
					ref={ref}
					data-slot="button"
					data-state={isLoading ? 'loading' : undefined}
					className={cn(
						buttonVariants({variant, size, className}),
						isLoading &&
							'relative text-transparent transition-none hover:text-transparent'
					)}
					disabled={isLoading || props.disabled}
					{...props}>
					{children}
				</Comp>
			)
		}

		// Standard button rendering with potential loading spinner
		return (
			<Comp
				ref={ref}
				data-slot="button"
				data-state={isLoading ? 'loading' : undefined}
				className={cn(
					buttonVariants({variant, size, className}),
					isLoading &&
						'relative text-transparent transition-none hover:text-transparent'
				)}
				disabled={isLoading || props.disabled}
				{...props}>
				<span className="flex items-center justify-center gap-2">
					{children}
					{isLoading && (
						<span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
							<svg
								className="size-4 animate-spin text-current opacity-100"
								xmlns="http://www.w3.org/2000/svg"
								fill="none"
								viewBox="0 0 24 24">
								<circle
									className="opacity-25"
									cx="12"
									cy="12"
									r="10"
									stroke="currentColor"
									strokeWidth="4"></circle>
								<path
									className="opacity-75"
									fill="currentColor"
									d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
							</svg>
						</span>
					)}
				</span>
			</Comp>
		)
	}
)

Button.displayName = 'Button'

export {Button, buttonVariants, type ButtonProps}
