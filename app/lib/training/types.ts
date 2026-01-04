export type IsoDate = string

export type PerformanceProfileDirection = 'lowerIsBetter' | 'higherIsBetter'

export type PerformanceProfileRow = {
	id: string
	effort: string
	myBestPerf: string
	speed: string
	worldBest: string
	goal: string
	direction: PerformanceProfileDirection
}

export type TrainingProfile = {
	name?: string
	birthdate?: IsoDate
	coach?: string
	performanceProfile: PerformanceProfileRow[]
}

export type TrainingMetabolism = Record<string, unknown>

export type TrainingDiaryEntry = {
	id: string
	date: IsoDate
	weekday?: string | null
	travel?: number | null
	injury?: string | null
	sic?: string | null
	description?: string | null
	stimuli?: string | null
	sport?: string | null
	totalTimeHours?: number | null
	timeZ2Hours?: number | null
	timeZ3Hours?: number | null
	dnvFt?: number | null
	distanceMi?: number | null
	surface?: string | null
	substrateFueling?: string | null
	heatTimeHours?: number | null
	altitudeFt?: number | null
	timeAltitudeHours?: number | null
	neuromuscular?: string | null
	feeling?: number | null
	mood?: number | null
}

export type TrainingTotalsFilter = {
	from: IsoDate
	to: IsoDate
}

export type TotalsByKey = {
	totalTimeHours: number
	timeZ2Hours: number
	timeZ3Hours: number
	heatTimeHours: number
	timeAltitudeHours: number
	dnvFt: number
	distanceMi: number
	travelCount: number
	injuryCount: number
	sicCount: number
	neuromuscularCount: number
	sessions: number
}

export type TrainingData = {
	version: 1
	tdEntries: TrainingDiaryEntry[]
	filters: {
		totals: TrainingTotalsFilter
		seasonStart: IsoDate
		seasonWeeks: number
	}
	profile: TrainingProfile
	metabolism: TrainingMetabolism
	races: Array<Record<string, unknown>>
	vo2Tests: Array<Record<string, unknown>>
	bloodTests: Array<Record<string, unknown>>
	injuries: Array<Record<string, unknown>>
	closeCalls: Array<Record<string, unknown>>
	activities: Array<Record<string, unknown>>
}
