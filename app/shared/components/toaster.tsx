'use client'

import {Toaster as Sonner, toast} from 'sonner'

export function Toaster() {
	return (
		<Sonner
			theme="system"
			className="toaster group font-sans"
			toastOptions={{
				classNames: {
					toast:
						'group toast group flex gap-3 bg-card border border-border rounded-lg text-foreground font-sans',
					description: 'group-[.toast]:text-muted-foreground font-sans',
					actionButton:
						'group-[.toast]:bg-primary group-[.toast]:text-primary-foreground font-sans',
					cancelButton:
						'group-[.toast]:bg-muted group-[.toast]:text-muted-foreground font-sans',
					title: 'group-[.toast]:text-foreground font-sans',
					loader: 'group-[.toast]:text-primary',
					closeButton:
						'group-[.toast]:hover:text-primary group-[.toast]:text-muted-foreground',
				},
			}}
		/>
	)
}

export function successToast(message: string) {
	toast.custom(() => (
		<div className="border-primary/20 bg-card flex items-center gap-3 rounded-lg border p-4 font-sans shadow-lg transition-all duration-200">
			<div className="relative flex h-8 w-8 items-center justify-center">
				<div className="animate-in fade-in-0 zoom-in-50 absolute h-8 w-8 duration-300">
					<div className="bg-primary/20 h-full w-full rounded-full transition-transform duration-300 ease-out group-hover:scale-110" />
				</div>
				<svg
					viewBox="0 0 24 24"
					className="stroke-primary absolute h-5 w-5 stroke-[2.5]"
					fill="none"
					strokeLinecap="round"
					strokeLinejoin="round">
					<path
						className="animate-in fade-in-0 zoom-in-50 delay-150 duration-300"
						d="M7.75 12.75L10 15.25L16.25 8.75"
					/>
				</svg>
			</div>
			<p className="text-card-foreground font-medium">{message}</p>
		</div>
	))
}

export function errorToast(message: string) {
	toast.custom(() => (
		<div className="border-destructive/20 bg-card flex items-center gap-3 rounded-lg border p-4 font-sans shadow-lg transition-all duration-200">
			<div className="relative flex h-8 w-8 items-center justify-center">
				<div className="animate-in fade-in-0 zoom-in-50 absolute h-8 w-8 duration-300">
					<div className="bg-destructive/20 h-full w-full rounded-full transition-transform duration-300 ease-out group-hover:scale-110" />
				</div>
				<svg
					viewBox="0 0 24 24"
					className="stroke-destructive absolute h-5 w-5 stroke-[2.5]"
					fill="none"
					strokeLinecap="round"
					strokeLinejoin="round">
					<path
						className="animate-in fade-in-0 zoom-in-50 delay-150 duration-300"
						d="M9 9L15 15M15 9L9 15"
					/>
				</svg>
			</div>
			<p className="text-card-foreground font-medium">{message}</p>
		</div>
	))
}
