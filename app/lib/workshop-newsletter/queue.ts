import {Redis} from '@upstash/redis'
import {sendResendEmail} from '@/lib/resend'
import {getOptionalAppUrl, getWorkshopResendFrom} from './config'
import {computeSendAt} from './cadence'
import {fetchWorkshopEmailSequence, renderLessonHtml} from './sequence'
import {
	DRIP_QUEUE_KEY,
	DRIP_STATE_TTL_SECONDS,
	DRIP_SUBSCRIBER_PREFIX,
	DRIP_DELIVERY_PREFIX,
	WorkshopDripState,
	WorkshopDripDelivery,
	WorkshopEmailSequence
} from './types'

function log(message: string, data?: Record<string, unknown>) {
	const entry = {
		ts: new Date().toISOString(),
		source: 'workshop-drip',
		message,
		...data
	}
	console.log(JSON.stringify(entry))
}

function hasRedisEnv() {
	return Boolean(process.env.KV_REST_API_URL && process.env.KV_REST_API_TOKEN)
}

function getRedis() {
	if (!hasRedisEnv()) return null
	return new Redis({
		url: process.env.KV_REST_API_URL!,
		token: process.env.KV_REST_API_TOKEN!
	})
}

function normalizeEmail(email: string) {
	return email.trim().toLowerCase()
}

function encodeEmailKey(email: string) {
	return Buffer.from(normalizeEmail(email)).toString('base64url')
}

function getSubscriberKey(workshopSlug: string, email: string) {
	return `${DRIP_SUBSCRIBER_PREFIX}:${workshopSlug}:${encodeEmailKey(email)}`
}

function getDeliveryKey(
	workshopSlug: string,
	email: string,
	lessonKey: string
) {
	return `${DRIP_DELIVERY_PREFIX}:${workshopSlug}:${encodeEmailKey(email)}:${lessonKey}`
}

/**
 * Compute sendAt for each lesson.
 * Test mode: ALL emails sent immediately (small stagger for ordering)
 * Prod mode: uses day-based offset via computeSendAt.
 */
function computeLessonSendAt(
	enrolledAt: number,
	lessonIndex: number,
	offsetDays: number,
	isTest: boolean
): number {
	if (isTest) {
		// In test mode, ALL emails are sent immediately
		// 1 second stagger per email to ensure ordering
		return enrolledAt + lessonIndex * 1_000
	}
	return computeSendAt(enrolledAt, offsetDays, false)
}

async function toDeliveries(
	sequence: WorkshopEmailSequence,
	email: string,
	firstName: string | undefined,
	enrolledAt: number
): Promise<WorkshopDripDelivery[]> {
	const baseUrl = getOptionalAppUrl()

	const deliveries: WorkshopDripDelivery[] = []

	for (let index = 0; index < sequence.lessons.length; index++) {
		const lesson = sequence.lessons[index]!
		const sendAt = computeLessonSendAt(
			enrolledAt,
			index,
			lesson.sendOffsetDays,
			sequence.isTest
		)
		const deliveryKey = getDeliveryKey(sequence.slug, email, lesson.key)

		// Await async HTML rendering with syntax highlighting
		const html = await renderLessonHtml({
			lesson,
			workshopTitle: sequence.workshopTitle,
			workshopImage: sequence.workshopImage,
			lessonNumber: index + 1,
			lessonCount: sequence.lessons.length,
			firstName,
			baseUrl
		})

		deliveries.push({
			deliveryKey,
			email,
			firstName,
			subject: lesson.subject,
			preheader: lesson.preheader,
			workshopSlug: sequence.slug,
			workshopTitle: sequence.workshopTitle,
			sendAt,
			state: 'pending',
			html
		})
	}

	return deliveries
}

export async function enqueueWorkshopDripCampaign(args: {
	email: string
	firstName?: string
	workshopSlug?: string
	/** Set to true to allow re-enrolling the same email (useful for testing) */
	forceReEnroll?: boolean
}) {
	const redis = getRedis()
	if (!redis) {
		log('enqueue:skipped', {reason: 'kv-missing-env'})
		return {status: 'skipped', reason: 'kv-missing-env'} as const
	}

	const normalizedEmail = normalizeEmail(args.email)
	if (!args.workshopSlug) {
		log('enqueue:skipped', {
			reason: 'missing-workshop-slug',
			email: normalizedEmail
		})
		return {status: 'skipped', reason: 'missing-workshop-slug'} as const
	}

	const sequence = await fetchWorkshopEmailSequence(args.workshopSlug)
	if (!sequence) {
		log('enqueue:skipped', {
			reason: 'no-sequence',
			workshopSlug: args.workshopSlug
		})
		return {status: 'skipped', reason: 'no-sequence'} as const
	}

	const subscriberKey = getSubscriberKey(args.workshopSlug, normalizedEmail)

	// Check for existing enrollment (skip in force mode)
	if (!args.forceReEnroll) {
		const existing = await redis.get(subscriberKey)
		if (existing) {
			log('enqueue:exists', {
				email: normalizedEmail,
				workshopSlug: args.workshopSlug
			})
			return {status: 'exists'} as const
		}
	} else {
		// Force mode: clear existing deliveries first
		log('enqueue:force-re-enroll', {
			email: normalizedEmail,
			workshopSlug: args.workshopSlug
		})
		const existingDeliveryKeys = sequence.lessons.map((lesson) =>
			getDeliveryKey(args.workshopSlug!, normalizedEmail, lesson.key)
		)
		for (const key of existingDeliveryKeys) {
			await redis.del(key)
			await redis.zrem(DRIP_QUEUE_KEY, key)
		}
	}

	const enrolledAt = Date.now()
	const deliveries = await toDeliveries(
		sequence,
		normalizedEmail,
		args.firstName || undefined,
		enrolledAt
	)

	if (deliveries.length === 0) {
		log('enqueue:skipped', {
			reason: 'empty-sequence',
			workshopSlug: args.workshopSlug
		})
		return {status: 'skipped', reason: 'empty-sequence'} as const
	}

	// Log scheduling details for debugging
	log('enqueue:scheduling', {
		email: normalizedEmail,
		workshopSlug: args.workshopSlug,
		isTest: sequence.isTest,
		lessonCount: deliveries.length,
		enrolledAt,
		schedule: deliveries.map((d, i) => ({
			lesson: i + 1,
			sendAt: d.sendAt,
			sendAtISO: new Date(d.sendAt).toISOString(),
			delayMs: d.sendAt - enrolledAt
		}))
	})

	await redis.set(
		subscriberKey,
		{
			email: normalizedEmail,
			workshopSlug: sequence.slug,
			enrolledAt
		},
		{ex: DRIP_STATE_TTL_SECONDS}
	)

	await Promise.all(
		deliveries.map(async (delivery) => {
			await redis.set(delivery.deliveryKey, delivery, {
				ex: DRIP_STATE_TTL_SECONDS
			})
			await redis.zadd(DRIP_QUEUE_KEY, {
				score: delivery.sendAt,
				member: delivery.deliveryKey
			})
		})
	)

	log('enqueue:success', {
		email: normalizedEmail,
		workshopSlug: args.workshopSlug,
		count: deliveries.length,
		isTest: sequence.isTest
	})

	return {
		status: 'queued',
		count: deliveries.length,
		isTest: sequence.isTest
	} as const
}

export async function processWorkshopDripQueue(limit = 50) {
	const redis = getRedis()
	if (!redis) {
		log('process:skipped', {reason: 'kv-missing-env'})
		return {
			sent: 0,
			failed: 0,
			remaining: 0,
			skipped: true,
			reason: 'kv-missing-env'
		}
	}

	const now = Date.now()
	const readyKeys = (await redis.zrange(DRIP_QUEUE_KEY, 0, now, {
		byScore: true
	})) as string[]

	log('process:checking', {
		now,
		nowISO: new Date(now).toISOString(),
		readyCount: readyKeys.length,
		readyKeys: readyKeys.slice(0, 10) // Log first 10 for debugging
	})

	let sent = 0
	let failed = 0
	const from = getWorkshopResendFrom()

	for (const deliveryKey of readyKeys.slice(0, limit)) {
		const delivery = (await redis.get(
			deliveryKey
		)) as WorkshopDripDelivery | null
		if (!delivery) {
			log('process:orphan-key', {deliveryKey})
			await redis.zrem(DRIP_QUEUE_KEY, deliveryKey)
			continue
		}

		// Skip if already sent (idempotency)
		if (delivery.state === 'sent') {
			log('process:already-sent', {deliveryKey})
			await redis.zrem(DRIP_QUEUE_KEY, deliveryKey)
			continue
		}

		log('process:sending', {
			deliveryKey,
			email: delivery.email,
			subject: delivery.subject,
			scheduledAt: new Date(delivery.sendAt).toISOString()
		})

		const nextState: WorkshopDripState = 'sending'
		await redis.set(
			deliveryKey,
			{...delivery, state: nextState},
			{ex: DRIP_STATE_TTL_SECONDS}
		)

		const {error} = await sendResendEmail({
			from,
			to: delivery.email,
			subject: `${delivery.workshopTitle}: ${delivery.subject}`,
			html: delivery.html
		})

		if (error) {
			failed += 1
			log('process:send-failed', {
				deliveryKey,
				email: delivery.email,
				error: error.message || String(error)
			})
			// Retry in 1 hour
			await redis.zadd(DRIP_QUEUE_KEY, {
				score: now + 60 * 60 * 1000,
				member: deliveryKey
			})
			await redis.set(
				deliveryKey,
				{...delivery, state: 'failed'},
				{ex: DRIP_STATE_TTL_SECONDS}
			)
			continue
		}

		sent += 1
		log('process:sent', {
			deliveryKey,
			email: delivery.email,
			subject: delivery.subject
		})

		// Remove from queue and mark as sent (keep record for auditing)
		await redis.zrem(DRIP_QUEUE_KEY, deliveryKey)
		await redis.set(
			deliveryKey,
			{...delivery, state: 'sent', sentAt: now},
			{ex: DRIP_STATE_TTL_SECONDS}
		)
		// NOTE: Don't delete the delivery record - keep it for debugging/auditing
	}

	const remaining = await redis.zcard(DRIP_QUEUE_KEY)
	log('process:complete', {sent, failed, remaining})
	return {sent, failed, remaining}
}

/**
 * Debug utility: inspect queue state
 */
export async function inspectWorkshopDripQueue() {
	const redis = getRedis()
	if (!redis) {
		return {error: 'kv-missing-env'}
	}

	const now = Date.now()
	const allKeys = (await redis.zrange(DRIP_QUEUE_KEY, 0, -1, {
		withScores: true
	})) as (string | number)[]

	const items: Array<{
		key: string
		sendAt: number
		sendAtISO: string
		isDue: boolean
		delayMs: number
	}> = []

	for (let i = 0; i < allKeys.length; i += 2) {
		const key = allKeys[i] as string
		const score = allKeys[i + 1] as number
		items.push({
			key,
			sendAt: score,
			sendAtISO: new Date(score).toISOString(),
			isDue: score <= now,
			delayMs: score - now
		})
	}

	return {
		now,
		nowISO: new Date(now).toISOString(),
		totalQueued: items.length,
		dueNow: items.filter((i) => i.isDue).length,
		items
	}
}
