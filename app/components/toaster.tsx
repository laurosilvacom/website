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
						'group toast group flex gap-3 bg-card border border-border rounded-default text-foreground font-sans',
					description: 'group-[.toast]:text-muted-foreground font-sans',
					actionButton:
						'group-[.toast]:bg-primary group-[.toast]:text-primary-foreground font-sans',
					cancelButton:
						'group-[.toast]:bg-muted group-[.toast]:text-muted-foreground font-sans',
					title: 'group-[.toast]:text-foreground font-sans',
					loader: 'group-[.toast]:text-muted-foreground',
					closeButton:
						'group-[.toast]:hover:text-foreground group-[.toast]:text-muted-foreground'
				}
			}}
		/>
	)
}

export function successToast(message: string) {
	toast.custom((t) => (
		<div className="rounded-default border-border bg-card flex items-center gap-3 border p-4 font-sans shadow-lg transition-all duration-300 ease-out hover:scale-[1.02] hover:shadow-xl">
			<div className="relative flex h-8 w-8 items-center justify-center">
				<div className="animate-in fade-in-0 zoom-in-50 absolute h-8 w-8 duration-300">
					<div className="h-full w-full rounded-full bg-emerald-500/20 transition-transform duration-300 ease-out group-hover:scale-110" />
				</div>
				<svg
					viewBox="0 0 24 24"
					className="absolute h-5 w-5 stroke-emerald-500 stroke-[2.5]"
					fill="none"
					strokeLinecap="round"
					strokeLinejoin="round">
					<path
						className="animate-in fade-in-0 zoom-in-50 delay-150 duration-300"
						d="M7.75 12.75L10 15.25L16.25 8.75"
					/>
				</svg>
			</div>
			<p className="text-foreground font-medium">{message}</p>
		</div>
	))
}

export function errorToast(message: string) {
	toast.custom((t) => (
		<div className="rounded-default border-border bg-card flex items-center gap-3 border p-4 font-sans shadow-lg transition-all duration-300 ease-out hover:scale-[1.02] hover:shadow-xl">
			<div className="relative flex h-8 w-8 items-center justify-center">
				<div className="animate-in fade-in-0 zoom-in-50 absolute h-8 w-8 duration-300">
					<div className="h-full w-full rounded-full bg-red-500/20 transition-transform duration-300 ease-out group-hover:scale-110" />
				</div>
				<svg
					viewBox="0 0 24 24"
					className="absolute h-5 w-5 stroke-red-500 stroke-[2.5]"
					fill="none"
					strokeLinecap="round"
					strokeLinejoin="round">
					<path
						className="animate-in fade-in-0 zoom-in-50 delay-150 duration-300"
						d="M9 9L15 15M15 9L9 15"
					/>
				</svg>
			</div>
			<p className="text-foreground font-medium">{message}</p>
		</div>
	))
}
