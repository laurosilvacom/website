'use client'

import type {TrainingData} from './types'
import {DEFAULT_PERFORMANCE_PROFILE} from './profile-defaults'
import {LAURO_INITIAL_TD_ENTRIES} from './fixtures/lauro-initial-td'
import {DEMO_PROFILE, DEMO_TD_ENTRIES} from './fixtures/demo-initial'

const STORAGE_PREFIX = 'training:v1'

const DEMO_USER_EMAIL = 'demo@local'

const DEFAULT_RACE_30K: Record<string, unknown> = {
	nº: '1',
	date: '2026-04-10',
	race: 'Gorge 30K (Wahkeena → Cascade Locks)',
	'sport (s/r)': 'r',
	Type: 'Trail',
	mi: 18.3,
	'elev ft': 2700,
	time: '',
	pos: '',
	COMMENTS:
		'Point-to-point; shuttle required. Start 10:00AM (waves). Cutoff: mile 12.2 @ 2:15PM; finish cutoff 4:15PM. ~2,700’ gain/loss.'
}

const DEFAULT_RACES: Array<Record<string, unknown>> = [DEFAULT_RACE_30K]

function safeParseJson(raw: string | null): unknown {
	if (!raw) return null
	try {
		return JSON.parse(raw)
	} catch {
		return null
	}
}

function todayIso(): string {
	return new Date().toISOString().slice(0, 10)
}

function minIsoDate(values: string[]): string | null {
	const sorted = [...values].filter(Boolean).sort()
	return sorted.length ? (sorted[0] ?? null) : null
}

function computeDefaultSeasonStart(
	tdEntries: TrainingData['tdEntries']
): string {
	return minIsoDate(tdEntries.map((e) => e.date)) ?? todayIso()
}

function computeDefaultTotalsFrom(
	tdEntries: TrainingData['tdEntries']
): string {
	return minIsoDate(tdEntries.map((e) => e.date)) ?? todayIso()
}

function isDemoUser(userEmail: string): boolean {
	return userEmail.trim().toLowerCase() === DEMO_USER_EMAIL
}

export function getDefaultTrainingData(): TrainingData {
	const today = todayIso()
	const tdEntries = LAURO_INITIAL_TD_ENTRIES
	const seasonStart = computeDefaultSeasonStart(tdEntries)
	const totalsFrom = computeDefaultTotalsFrom(tdEntries)

	return {
		version: 1,
		tdEntries,
		filters: {
			totals: {
				from: totalsFrom,
				to: today
			},
			seasonStart,
			seasonWeeks: 24
		},
		profile: {
			performanceProfile: DEFAULT_PERFORMANCE_PROFILE
		},
		metabolism: {},
		races: DEFAULT_RACES,
		vo2Tests: [],
		bloodTests: [],
		injuries: [],
		closeCalls: [],
		activities: []
	}
}

function getDefaultTrainingDataForUser(userEmail: string): TrainingData {
	if (!isDemoUser(userEmail)) return getDefaultTrainingData()

	const today = todayIso()
	const tdEntries = DEMO_TD_ENTRIES
	const seasonStart = computeDefaultSeasonStart(tdEntries)
	const totalsFrom = computeDefaultTotalsFrom(tdEntries)

	return {
		version: 1,
		tdEntries,
		filters: {
			totals: {
				from: totalsFrom,
				to: today
			},
			seasonStart,
			seasonWeeks: 12
		},
		profile: DEMO_PROFILE,
		metabolism: {},
		races: [
			{
				nº: '1',
				date: '2025-12-14',
				race: 'Local Winter Trail 15K',
				'sport (s/r)': 'r',
				Type: 'Trail',
				mi: 9.3,
				'elev ft': 1400,
				time: '01:18:45',
				pos: '12',
				COMMENTS: 'Steady effort; good footing.'
			},
			{
				nº: '2',
				date: '2026-02-22',
				race: 'Snowline 10K',
				'sport (s/r)': 'r',
				Type: 'Trail',
				mi: 6.2,
				'elev ft': 900,
				time: '',
				pos: '',
				COMMENTS: 'Tune-up race (planned).'
			}
		],
		vo2Tests: [
			{
				Date: '2025-12-10',
				Protocol: 'Treadmill ramp',
				Result: 'VO2max 62',
				Notes: 'Good sleep week.'
			}
		],
		bloodTests: [
			{
				Date: '2025-12-05',
				Marker: 'Ferritin',
				Value: '55',
				Units: 'ng/mL',
				Notes: 'Within normal range.'
			}
		],
		injuries: [
			{
				Date: '2025-12-19',
				Injury: 'Mild Achilles tightness',
				Severity: 'Low',
				Notes: 'Resolved with reduced intensity + mobility.'
			}
		],
		closeCalls: [
			{
				Date: '2025-12-21',
				What: 'Slipped on wet rock',
				Outcome: 'No injury',
				Notes: 'Slow down on descents in rain.'
			}
		],
		activities: [
			{
				Activity: 'trail running',
				Where: 'Forest Park',
				Summit: '',
				Route: 'Wildwood out-and-back',
				grade: '',
				description: 'Easy aerobic run with a few short hills.',
				with: '',
				Date: '2025-12-01',
				link: ''
			},
			{
				Activity: 'treadmill running',
				Where: 'Gym',
				Summit: '',
				Route: '',
				grade: '',
				description: 'Steady aerobic treadmill run.',
				with: '',
				Date: '2025-12-03',
				link: ''
			},
			{
				Activity: 'incline treadmill running',
				Where: 'Gym',
				Summit: '',
				Route: '',
				grade: '12%',
				description: 'Incline hike effort for climbing strength.',
				with: '',
				Date: '2025-12-09',
				link: ''
			},
			{
				Activity: 'gravel biking',
				Where: 'River Road',
				Summit: '',
				Route: 'Loop',
				grade: '',
				description: 'Endurance spin; mostly easy.',
				with: '',
				Date: '2025-12-07',
				link: ''
			},
			{
				Activity: 'indoor biking',
				Where: 'Home trainer',
				Summit: '',
				Route: '',
				grade: '',
				description: 'Recovery spin.',
				with: '',
				Date: '2025-12-02',
				link: ''
			}
		]
	}
}

function toNumber(value: unknown): number | null {
	return typeof value === 'number' && Number.isFinite(value) ? value : null
}

function roundTo(value: number, fractionDigits: number): number {
	const factor = 10 ** fractionDigits
	return Math.round(value * factor) / factor
}

function kmToMi(km: number): number {
	return km * 0.621371
}

function mToFt(m: number): number {
	return m * 3.28084
}

function normalizeRaceRow(raw: any): Record<string, unknown> {
	if (!raw || typeof raw !== 'object') return {}
	const out: Record<string, unknown> = {...raw}

	// migrate old columns
	if (out.mi == null && out.km != null) {
		const km = toNumber(out.km)
		if (km != null) out.mi = roundTo(kmToMi(km), 2)
	}
	if (out['elev ft'] == null && out.dnv != null) {
		const dnv = toNumber(out.dnv)
		if (dnv != null) out['elev ft'] = Math.round(mToFt(dnv))
	}

	// keep table clean
	delete out.km
	delete out.dnv

	return out
}

function normalizeTdEntry(raw: any): TrainingData['tdEntries'][number] {
	const dnvFt =
		toNumber(raw?.dnvFt) ??
		(toNumber(raw?.dnvMeters) != null
			? Math.round(mToFt(Number(raw.dnvMeters)))
			: null)
	const distanceMi =
		toNumber(raw?.distanceMi) ??
		(toNumber(raw?.distanceKm) != null
			? roundTo(kmToMi(Number(raw.distanceKm)), 2)
			: null)
	const altitudeFt =
		toNumber(raw?.altitudeFt) ??
		(toNumber(raw?.altitudeMeters) != null
			? Math.round(mToFt(Number(raw.altitudeMeters)))
			: null)

	return {
		id: String(raw?.id ?? `td-${Date.now()}`),
		date: String(raw?.date ?? todayIso()),
		weekday: raw?.weekday ?? null,
		travel: toNumber(raw?.travel),
		injury: raw?.injury ?? null,
		sic: raw?.sic ?? null,
		description: raw?.description ?? null,
		stimuli: raw?.stimuli ?? null,
		sport: raw?.sport ?? null,
		totalTimeHours: toNumber(raw?.totalTimeHours),
		timeZ2Hours: toNumber(raw?.timeZ2Hours),
		timeZ3Hours: toNumber(raw?.timeZ3Hours),
		dnvFt,
		distanceMi,
		surface: raw?.surface ?? null,
		substrateFueling: raw?.substrateFueling ?? null,
		heatTimeHours: toNumber(raw?.heatTimeHours),
		altitudeFt,
		timeAltitudeHours: toNumber(raw?.timeAltitudeHours),
		neuromuscular: raw?.neuromuscular ?? null,
		feeling: toNumber(raw?.feeling),
		mood: toNumber(raw?.mood)
	}
}

export function storageKeyForUser(userEmail: string): string {
	const normalized = userEmail.trim().toLowerCase() || 'local'
	return `${STORAGE_PREFIX}:${normalized}`
}

export function loadTrainingData(userEmail: string): TrainingData {
	const key = storageKeyForUser(userEmail)
	const parsed = safeParseJson(window.localStorage.getItem(key))
	const fresh = getDefaultTrainingDataForUser(userEmail)

	if (parsed && typeof parsed === 'object') {
		const obj = parsed as any
		if (obj.version === 1 && Array.isArray(obj.tdEntries)) {
			const looksLikeOldPlaceholderSeed =
				obj.tdEntries.length === 1 &&
				String(obj.tdEntries?.[0]?.description ?? '').includes(
					'Description of the session'
				)

			const rawTdEntries =
				Array.isArray(obj.tdEntries) &&
				obj.tdEntries.length > 0 &&
				!looksLikeOldPlaceholderSeed
					? obj.tdEntries
					: fresh.tdEntries
			const tdEntries = rawTdEntries.map(normalizeTdEntry)

			return {
				...fresh,
				...obj,
				tdEntries,
				filters: {
					...fresh.filters,
					...(obj.filters ?? {}),
					totals: {
						...fresh.filters.totals,
						...(obj.filters?.totals ?? {})
					}
				},
				profile: {
					...fresh.profile,
					...(obj.profile ?? {}),
					performanceProfile: Array.isArray(obj.profile?.performanceProfile)
						? obj.profile.performanceProfile
						: fresh.profile.performanceProfile
				},
				metabolism: (obj.metabolism && typeof obj.metabolism === 'object'
					? obj.metabolism
					: fresh.metabolism) as TrainingData['metabolism'],
				races: (() => {
					const base = Array.isArray(obj.races) ? obj.races : fresh.races
					const normalized = base.map(normalizeRaceRow)
					const hasDefault = normalized.some(
						(r: Record<string, unknown>) =>
							String(r.date ?? '') === String(DEFAULT_RACE_30K.date) &&
							String(r.race ?? '') === String(DEFAULT_RACE_30K.race)
					)
					if (hasDefault) return normalized
					return [...normalized, DEFAULT_RACE_30K]
				})(),
				vo2Tests: Array.isArray(obj.vo2Tests) ? obj.vo2Tests : fresh.vo2Tests,
				bloodTests: Array.isArray(obj.bloodTests)
					? obj.bloodTests
					: fresh.bloodTests,
				injuries: Array.isArray(obj.injuries) ? obj.injuries : fresh.injuries,
				closeCalls: Array.isArray(obj.closeCalls)
					? obj.closeCalls
					: fresh.closeCalls,
				activities: Array.isArray(obj.activities)
					? obj.activities
					: fresh.activities
			} satisfies TrainingData
		}
	}
	window.localStorage.setItem(key, JSON.stringify(fresh))
	return fresh
}

export function saveTrainingData(userEmail: string, data: TrainingData) {
	const key = storageKeyForUser(userEmail)
	window.localStorage.setItem(key, JSON.stringify(data))
}
