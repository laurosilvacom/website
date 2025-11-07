import {type ReactNode} from 'react'

type ErrorBoundaryProps = {
	children: ReactNode
	fallback?: ReactNode
}

export function ErrorBoundary({children, fallback}: ErrorBoundaryProps) {
	return <>{children}</>
}

