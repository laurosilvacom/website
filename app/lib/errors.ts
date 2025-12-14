/**
 * Type-safe error handling utility
 * Inspired by Kent C. Dodds' error handling patterns
 */
export class AppError extends Error {
	constructor(
		message: string,
		public statusCode: number = 500,
		public cause?: unknown
	) {
		super(message)
		this.name = 'AppError'
	}
}

/**
 * Type guard to check if error is an AppError
 */
export function isAppError(error: unknown): error is AppError {
	return error instanceof AppError
}

/**
 * Safely get error message from unknown error
 */
export function getErrorMessage(error: unknown): string {
	if (isAppError(error)) {
		return error.message
	}
	if (error instanceof Error) {
		return error.message
	}
	if (typeof error === 'string') {
		return error
	}
	return 'An unexpected error occurred'
}
