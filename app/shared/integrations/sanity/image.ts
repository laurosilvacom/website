import imageUrlBuilder from '@sanity/image-url'
import type {SanityImageSource} from '@sanity/image-url/lib/types/types'
import {client} from '@/shared/integrations/sanity/client'
import {type SanityImage} from '@/shared/integrations/sanity/types'

const builder = imageUrlBuilder(client)

export function urlForImage(source: SanityImageSource) {
	return builder.image(source)
}

type SanityImageTransform = {
	width?: number
	height?: number
	quality?: number
	fit?: 'clip' | 'crop' | 'fill' | 'fillmax' | 'max' | 'min' | 'scale'
}

export function getSanityImageUrl(
	source: SanityImageSource | undefined,
	{width, height, quality = 75, fit = 'max'}: SanityImageTransform = {},
) {
	if (!source) return undefined

	let image = urlForImage(source).auto('format').fit(fit).quality(quality)

	if (width) image = image.width(width)
	if (height) image = image.height(height)

	return image.url()
}

export function getSanityImageBlurDataUrl(image: SanityImage | undefined) {
	return image?.asset?.metadata?.lqip
}
