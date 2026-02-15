import {DAY_MS, HOUR_MS, MINUTE_MS} from './types'

export function getDripSendHourUtc() {
	const raw = process.env.WORKSHOP_DRIP_HOUR_UTC
	const parsed = typeof raw === 'string' ? Number(raw) : Number.NaN
	if (Number.isFinite(parsed) && parsed >= 0 && parsed < 24) {
		return parsed
	}
	return 8
}

export function startOfUtcDay(timestamp: number) {
	const date = new Date(timestamp)
	date.setUTCHours(0, 0, 0, 0)
	return date.getTime()
}

export function computeSendAt(enrolledAt: number, offsetDays: number, isTest: boolean) {
	if (isTest) {
		// Test mode: deliver immediately, then every other minute using the offset order
		const offsetMinutes = Math.max(0, Math.floor(offsetDays || 0))
		const cadenceMinutes = 2
		return enrolledAt + offsetMinutes * cadenceMinutes * MINUTE_MS
	}

	const base =
		startOfUtcDay(enrolledAt) + offsetDays * DAY_MS + getDripSendHourUtc() * HOUR_MS
	if (base <= enrolledAt) {
		return base + DAY_MS
	}
	return base
}
