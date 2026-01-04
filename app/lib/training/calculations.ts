import type {
	IsoDate,
	TotalsByKey,
	TrainingDiaryEntry,
	TrainingTotalsFilter
} from './types'

function toDateValue(iso: IsoDate): number {
	// iso: YYYY-MM-DD
	return new Date(`${iso}T00:00:00Z`).getTime()
}

export function inDateRange(entryDate: IsoDate, filter: TrainingTotalsFilter) {
	const t = toDateValue(entryDate)
	return t >= toDateValue(filter.from) && t <= toDateValue(filter.to)
}

function toNumber(value: unknown): number {
	return typeof value === 'number' && Number.isFinite(value) ? value : 0
}

function addDays(iso: IsoDate, days: number): IsoDate {
	const t = toDateValue(iso)
	const d = new Date(t + days * 24 * 60 * 60 * 1000)
	return d.toISOString().slice(0, 10)
}

export function filterEntriesByDateRange(
	entries: TrainingDiaryEntry[],
	from: IsoDate,
	to: IsoDate
) {
	const filter: TrainingTotalsFilter = {from, to}
	return entries.filter((e) => inDateRange(e.date, filter))
}

export function computeWeeklyTotalsBackwards(
	entries: TrainingDiaryEntry[],
	endDateInclusive: IsoDate,
	weeks: number
) {
	return Array.from({length: weeks}, (_, i) => {
		const to = addDays(endDateInclusive, -7 * i)
		const from = addDays(to, -6)
		const weekEntries = filterEntriesByDateRange(entries, from, to)
		const totals = computeTotals(weekEntries)
		const bySport = groupTotalsBy(weekEntries, 'sport')
		const skimo = bySport['Skimo']?.totalTimeHours ?? 0
		const running = bySport['Running']?.totalTimeHours ?? 0
		const other = totals.totalTimeHours - (skimo + running)
		return {
			weekIndex: i + 1,
			from,
			to,
			totals,
			skimoTimeHours: skimo,
			runningTimeHours: running,
			otherTimeHours: other
		}
	})
}

export function computeTotals(entries: TrainingDiaryEntry[]): TotalsByKey {
	let totalTimeHours = 0
	let timeZ2Hours = 0
	let timeZ3Hours = 0
	let heatTimeHours = 0
	let timeAltitudeHours = 0
	let dnvFt = 0
	let distanceMi = 0
	let travelCount = 0
	let injuryCount = 0
	let sicCount = 0
	let neuromuscularCount = 0
	let sessions = 0

	for (const e of entries) {
		// Excel Totals uses COUNTIFS/COUNTA patterns; closest consistent proxy:
		// count a "session" when a sport is present.
		if ((e.sport ?? '').toString().trim()) sessions += 1

		totalTimeHours += toNumber(e.totalTimeHours)
		timeZ2Hours += toNumber(e.timeZ2Hours)
		timeZ3Hours += toNumber(e.timeZ3Hours)
		heatTimeHours += toNumber(e.heatTimeHours)
		timeAltitudeHours += toNumber(e.timeAltitudeHours)
		dnvFt += toNumber(e.dnvFt)
		distanceMi += toNumber(e.distanceMi)

		if (e.travel != null) travelCount += 1
		if ((e.injury ?? '').toString().trim()) injuryCount += 1
		if ((e.sic ?? '').toString().trim()) sicCount += 1
		if ((e.neuromuscular ?? '').toString().trim()) neuromuscularCount += 1
	}

	return {
		totalTimeHours,
		timeZ2Hours,
		timeZ3Hours,
		heatTimeHours,
		timeAltitudeHours,
		dnvFt,
		distanceMi,
		travelCount,
		injuryCount,
		sicCount,
		neuromuscularCount,
		sessions
	}
}

export function groupTotalsBy(
	entries: TrainingDiaryEntry[],
	key: 'sport' | 'surface' | 'stimuli'
): Record<string, TotalsByKey> {
	const out: Record<string, TotalsByKey> = {}
	for (const e of entries) {
		const k = (e[key] ?? '').toString().trim() || '—'
		const existing = out[k] ?? {
			totalTimeHours: 0,
			timeZ2Hours: 0,
			timeZ3Hours: 0,
			heatTimeHours: 0,
			timeAltitudeHours: 0,
			dnvFt: 0,
			distanceMi: 0,
			travelCount: 0,
			injuryCount: 0,
			sicCount: 0,
			neuromuscularCount: 0,
			sessions: 0
		}

		const hasSport = (e.sport ?? '').toString().trim().length > 0

		out[k] = {
			totalTimeHours: existing.totalTimeHours + toNumber(e.totalTimeHours),
			timeZ2Hours: existing.timeZ2Hours + toNumber(e.timeZ2Hours),
			timeZ3Hours: existing.timeZ3Hours + toNumber(e.timeZ3Hours),
			heatTimeHours: existing.heatTimeHours + toNumber(e.heatTimeHours),
			timeAltitudeHours:
				existing.timeAltitudeHours + toNumber(e.timeAltitudeHours),
			dnvFt: existing.dnvFt + toNumber(e.dnvFt),
			distanceMi: existing.distanceMi + toNumber(e.distanceMi),
			travelCount: existing.travelCount + (e.travel != null ? 1 : 0),
			injuryCount:
				existing.injuryCount + ((e.injury ?? '').toString().trim() ? 1 : 0),
			sicCount: existing.sicCount + ((e.sic ?? '').toString().trim() ? 1 : 0),
			neuromuscularCount:
				existing.neuromuscularCount +
				((e.neuromuscular ?? '').toString().trim() ? 1 : 0),
			sessions: existing.sessions + (hasSport ? 1 : 0)
		}
	}
	return out
}

export function computeWeeklyBuckets(
	entries: TrainingDiaryEntry[],
	seasonStart: IsoDate,
	weeks: number
) {
	const start = toDateValue(seasonStart)
	const oneWeekMs = 7 * 24 * 60 * 60 * 1000

	const buckets = Array.from({length: weeks}, (_, i) => {
		const from = new Date(start + i * oneWeekMs).toISOString().slice(0, 10)
		const to = addDays(from, 6)
		return {
			weekIndex: i + 1,
			from,
			to,
			entries: [] as TrainingDiaryEntry[]
		}
	})

	for (const e of entries) {
		const t = toDateValue(e.date)
		const idx = Math.floor((t - start) / oneWeekMs)
		if (idx >= 0 && idx < buckets.length) {
			buckets[idx]?.entries.push(e)
		}
	}

	return buckets.map((b) => ({
		...b,
		totals: computeTotals(b.entries)
	}))
}
