'use client'

import Link from 'next/link'
import {useMemo} from 'react'
import {useTraining} from '@/components/training/training-provider'
import {
	computeAcuteChronicRatio,
	computeTotals,
	filterEntriesByDateRange
} from '@/lib/training/calculations'
import {
	computeDailySummaries,
	computeMonotony,
	computeReadinessBaseline,
	computeStrain
} from '@/lib/training/coaching'
import {todayIso, addDays, weekStartMonday} from '@/lib/training/dates'
import {formatFeet, formatHours, formatMiles} from '@/lib/format'

function fmt(n: number | null | undefined, digits = 1) {
	if (n == null) return '—'
	return n.toFixed(digits)
}

export default function TrainingDashboardPage() {
	const {data} = useTraining()
	const today = todayIso()

	const last7 = useMemo(() => {
		const from = addDays(today, -6)
		return filterEntriesByDateRange(data.tdEntries, from, today)
	}, [data.tdEntries, today])

	const last28 = useMemo(() => {
		const from = addDays(today, -27)
		return filterEntriesByDateRange(data.tdEntries, from, today)
	}, [data.tdEntries, today])

	const last7Totals = useMemo(() => computeTotals(last7), [last7])
	const last28Totals = useMemo(() => computeTotals(last28), [last28])
	const acwr = useMemo(
		() => computeAcuteChronicRatio(data.tdEntries, today),
		[data.tdEntries, today]
	)

	const dailyLoads7 = useMemo(() => {
		return computeDailySummaries(data.tdEntries, addDays(today, -6), today).map(
			(d) => d.load
		)
	}, [data.tdEntries, today])
	const monotony7 = useMemo(() => computeMonotony(dailyLoads7), [dailyLoads7])
	const strain7 = useMemo(
		() => computeStrain(last7Totals.totalTrainingLoad, monotony7),
		[last7Totals.totalTrainingLoad, monotony7]
	)

	const baseline28 = useMemo(() => {
		const from = addDays(today, -27)
		return computeReadinessBaseline(data.tdEntries, from, today)
	}, [data.tdEntries, today])

	const thisWeekStart = weekStartMonday(today)
	const thisWeekEntries = useMemo(() => {
		return filterEntriesByDateRange(data.tdEntries, thisWeekStart, today)
	}, [data.tdEntries, thisWeekStart, today])
	const thisWeekTotals = useMemo(
		() => computeTotals(thisWeekEntries),
		[thisWeekEntries]
	)

	const recentCycles =
		data.cycles
			?.slice()
			.sort((a, b) => b.startDate.localeCompare(a.startDate))
			.slice(0, 2) ?? []

	return (
		<div className="space-y-6">
			<div className="space-y-1">
				<h1 className="text-2xl font-semibold">Training</h1>
				<div className="text-muted-foreground text-sm">
					Coach dashboard from your log (Today: {today})
				</div>
			</div>

			<div className="grid gap-3 md:grid-cols-3">
				<div className="rounded-md border p-4">
					<div className="text-muted-foreground text-xs">This week</div>
					<div className="mt-1 text-xl font-semibold">
						{formatHours(thisWeekTotals.totalTimeHours)}
					</div>
					<div className="text-muted-foreground text-sm">
						{formatMiles(thisWeekTotals.distanceMi)} •{' '}
						{formatFeet(thisWeekTotals.dnvFt)}
					</div>
					<div className="text-muted-foreground mt-1 text-xs">
						Sessions: {thisWeekTotals.sessions} • Aerobic:{' '}
						{thisWeekTotals.aerobicRatio != null
							? `${thisWeekTotals.aerobicRatio.toFixed(0)}%`
							: '—'}
					</div>
				</div>

				<div className="rounded-md border p-4">
					<div className="text-muted-foreground text-xs">Last 7 days</div>
					<div className="mt-1 text-xl font-semibold">
						Load {Math.round(last7Totals.totalTrainingLoad)}
					</div>
					<div className="text-muted-foreground text-sm">
						{formatHours(last7Totals.totalTimeHours)} •{' '}
						{formatFeet(last7Totals.dnvFt)}
					</div>
					<div className="text-muted-foreground mt-1 text-xs">
						ACWR: {acwr.ratio != null ? acwr.ratio.toFixed(2) : '—'} (
						{acwr.riskLevel})
					</div>
					<div className="text-muted-foreground mt-1 text-xs">
						Monotony: {fmt(monotony7, 2)} • Strain:{' '}
						{strain7 != null ? Math.round(strain7) : '—'}
					</div>
				</div>

				<div className="rounded-md border p-4">
					<div className="text-muted-foreground text-xs">Last 28 days</div>
					<div className="mt-1 text-xl font-semibold">
						{formatHours(last28Totals.totalTimeHours)}
					</div>
					<div className="text-muted-foreground text-sm">
						Load {Math.round(last28Totals.totalTrainingLoad)} •{' '}
						{formatFeet(last28Totals.dnvFt)}
					</div>
					<div className="text-muted-foreground mt-1 text-xs">
						Avg / week: {(last28Totals.totalTimeHours / 4).toFixed(1)}h
					</div>
				</div>
			</div>

			<div className="grid gap-3 md:grid-cols-2">
				<div className="rounded-md border p-4">
					<div className="text-muted-foreground text-xs">
						Readiness baseline (28d)
					</div>
					<div className="mt-1 text-xl font-semibold">
						Sleep {fmt(baseline28.sleepHoursAvg, 1)}h
					</div>
					<div className="text-muted-foreground text-sm">
						RHR {fmt(baseline28.restingHrAvg, 0)} • RPE{' '}
						{fmt(baseline28.rpeAvg, 1)}
					</div>
					<div className="text-muted-foreground mt-1 text-xs">
						Used to contextualize the Review flags
					</div>
				</div>

				<div className="rounded-md border p-4">
					<div className="text-muted-foreground text-xs">Quick review</div>
					<div className="mt-1 text-sm">
						<Link className="underline" href="/training/review">
							Open trends + flags
						</Link>
					</div>
					<div className="text-muted-foreground mt-1 text-xs">
						See daily load, sleep/RHR deltas, injury/sick/travel markers
					</div>
				</div>
			</div>

			<div className="space-y-2 rounded-md border p-4">
				<div className="font-medium">Do next</div>
				<div className="flex flex-wrap gap-3 text-sm">
					<Link className="underline" href="/training/log">
						Log a session
					</Link>
					<Link className="underline" href="/training/cycles">
						Review cycles
					</Link>
					<Link className="underline" href="/training/review">
						Review trends
					</Link>
				</div>
			</div>

			<div className="rounded-md border p-4">
				<div className="font-medium">Coach view: cycles</div>
				{recentCycles.length === 0 ? (
					<div className="text-muted-foreground mt-1 text-sm">
						No cycles yet. Create your first training cycle to track progress
						block-to-block.
					</div>
				) : (
					<div className="mt-2 space-y-2">
						{recentCycles.map((c) => (
							<div key={c.id} className="text-sm">
								<span className="font-medium">{c.name}</span>{' '}
								<span className="text-muted-foreground">
									({c.startDate} → {c.endDate})
								</span>
							</div>
						))}
					</div>
				)}
			</div>
		</div>
	)
}
