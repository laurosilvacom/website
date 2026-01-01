import {type PortableTextBlock} from '@sanity/types'
import {
	type SanityEmailLessonPost,
	type SanityModuleEmailLesson,
	type SanityImage
} from '@/lib/sanity/types'

export const TOKEN_TTL_SECONDS = 60 * 60 * 48 // 48 hours
export const OPT_IN_PREFIX = 'workshop-optin'
export const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
export const DRIP_SUBSCRIBER_PREFIX = 'workshop-drip:subscriber'
export const DRIP_DELIVERY_PREFIX = 'workshop-drip:delivery'
export const DRIP_QUEUE_KEY = 'workshop-drip:queue'
export const DRIP_STATE_TTL_SECONDS = 60 * 60 * 24 * 90 // 90 days
export const DAY_MS = 1000 * 60 * 60 * 24
export const HOUR_MS = 1000 * 60 * 60
export const MINUTE_MS = 60 * 1000

export type WorkshopDripState = 'pending' | 'sending' | 'sent' | 'failed'

export type WorkshopEmailLessonResolved = {
	key: string
	subject: string
	preheader?: string
	sendOffsetDays: number
	content: PortableTextBlock[]
	summary?: string
	postSlug?: string
}

export type WorkshopEmailSequence = {
	workshopTitle: string
	workshopImage?: SanityImage
	slug: string
	isTest: boolean
	lessons: WorkshopEmailLessonResolved[]
}

export type WorkshopDripDelivery = {
	deliveryKey: string
	email: string
	firstName?: string
	subject: string
	preheader?: string
	workshopSlug: string
	workshopTitle: string
	sendAt: number
	html: string
	state: WorkshopDripState
}

export type WorkshopOptInRequestBody = {
	email?: unknown
	firstName?: unknown
	workshopSlug?: unknown
	audienceId?: unknown
}

export type WorkshopOptInRecord = {
	email: string
	firstName: string
	workshopSlug: string
	audienceId: string
	expiresAt: number
}

export type WorkshopOptInStartResult = {
	token: string
	confirmUrl: string
}

export function isLessonWithContent(
	lesson: SanityModuleEmailLesson
): lesson is SanityModuleEmailLesson & {
	post: SanityEmailLessonPost & {content: PortableTextBlock[]}
} {
	return Boolean(
		lesson?.post &&
			Array.isArray(lesson.post.content) &&
			lesson.post.content.length
	)
}
