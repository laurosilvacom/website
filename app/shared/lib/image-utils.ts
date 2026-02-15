/**
 * Utility functions for image styling and effects
 */

export const IMAGE_CLASSES = {
	// Black and white editorial effect used across the site
	EDITORIAL_BW: 'brightness-[0.95] contrast-[1.4] grayscale',

	// Hover effects for editorial images
	EDITORIAL_HOVER: 'transition-transform duration-500 group-hover:scale-105',

	// Combined editorial effect with hover
	EDITORIAL_FULL:
		'brightness-[0.95] contrast-[1.4] grayscale transition-transform duration-500 group-hover:scale-105',

	// Featured post hero effect (slightly different timing)
	FEATURED_HERO:
		'brightness-[0.95] contrast-[1.4] grayscale transition-transform duration-700 group-hover:scale-105',
} as const

export type ImageClassKey = keyof typeof IMAGE_CLASSES

/**
 * Get the appropriate image class name
 */
export function getImageClass(key: ImageClassKey): string {
	return IMAGE_CLASSES[key]
}

/**
 * Get editorial image class with optional hover effect
 */
export function getEditorialImageClass(withHover: boolean = true): string {
	return withHover ? IMAGE_CLASSES.EDITORIAL_FULL : IMAGE_CLASSES.EDITORIAL_BW
}
