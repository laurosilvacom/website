'use client'

import {useMemo} from 'react'
import {Button} from '@/components/ui/button'
import {Input} from '@/components/ui/input'
import {useTraining} from '@/components/training/training-provider'
import {computeWeeklyBuckets} from '@/lib/training/calculations'
import {formatFeet, formatHours, formatMiles} from '@/lib/format'

export default function TrainingSeasonPage() {
	const {data, setData} = useTraining()

	const buckets = useMemo(() => {
		return computeWeeklyBuckets(
			data.tdEntries,
			data.filters.seasonStart,
			data.filters.seasonWeeks
		)
	}, [data.tdEntries, data.filters.seasonStart, data.filters.seasonWeeks])

	const firstTdDate = useMemo(() => {
		const dates = data.tdEntries
			.map((e) => e.date)
			.filter(Boolean)
			.sort()
		return dates.length ? (dates[0] ?? null) : null
	}, [data.tdEntries])

	const hasAnySessionsInBuckets = useMemo(() => {
		return buckets.some((b) => b.totals.sessions > 0)
	}, [buckets])

	return (
		<div className="space-y-6">
			<div className="space-y-1">
				<h1 className="text-xl font-semibold">Season</h1>
				<p className="text-muted-foreground text-sm">
					Weekly overview based on the SEASON sheet logic.
				</p>
			</div>

			<div className="flex flex-wrap items-end gap-3">
				<div className="space-y-1">
					<div className="text-muted-foreground text-xs">Start</div>
					<Input
						type="date"
						value={data.filters.seasonStart}
						onChange={(e) =>
							setData((prev) => ({
								...prev,
								filters: {...prev.filters, seasonStart: e.target.value}
							}))
						}
						className="h-9"
					/>
				</div>
				<div className="space-y-1">
					<div className="text-muted-foreground text-xs">Weeks</div>
					<Input
						type="number"
						value={data.filters.seasonWeeks}
						onChange={(e) =>
							setData((prev) => ({
								...prev,
								filters: {
									...prev.filters,
									seasonWeeks: Math.max(1, Number(e.target.value) || 1)
								}
							}))
						}
						className="h-9 w-24"
					/>
				</div>
			</div>

			{data.tdEntries.length > 0 && !hasAnySessionsInBuckets && firstTdDate ? (
				<div className="rounded-md border p-3 text-sm">
					<div className="font-medium">
						No TD entries in this season window.
					</div>
					<div className="text-muted-foreground">
						Your first logged day is {firstTdDate}. Update “Start” to include
						your current training.
					</div>
					<div className="mt-2">
						<Button
							size="sm"
							variant="outline"
							onClick={() =>
								setData((prev) => ({
									...prev,
									filters: {...prev.filters, seasonStart: firstTdDate}
								}))
							}>
							Set start to {firstTdDate}
						</Button>
					</div>
				</div>
			) : null}

			<div className="overflow-auto rounded-md border">
				<table className="w-full text-sm">
					<thead className="bg-muted/40">
						<tr>
							<th className="p-2 text-left">Week</th>
							<th className="p-2 text-left">From</th>
							<th className="p-2 text-left">To</th>
							<th className="p-2 text-right">Time (h)</th>
							<th className="p-2 text-right">Z2 (h)</th>
							<th className="p-2 text-right">Z3 (h)</th>
							<th className="p-2 text-right">Elev (ft)</th>
							<th className="p-2 text-right">Dist (mi)</th>
							<th className="p-2 text-right">Sessions</th>
						</tr>
					</thead>
					<tbody>
						{buckets.map((b) => (
							<tr key={b.weekIndex} className="border-t">
								<td className="p-2">{b.weekIndex}</td>
								<td className="p-2">{b.from}</td>
								<td className="p-2">{b.to}</td>
								<td className="p-2 text-right">
									{formatHours(b.totals.totalTimeHours)}
								</td>
								<td className="p-2 text-right">
									{formatHours(b.totals.timeZ2Hours)}
								</td>
								<td className="p-2 text-right">
									{formatHours(b.totals.timeZ3Hours)}
								</td>
								<td className="p-2 text-right">{formatFeet(b.totals.dnvFt)}</td>
								<td className="p-2 text-right">
									{formatMiles(b.totals.distanceMi)}
								</td>
								<td className="p-2 text-right">{b.totals.sessions}</td>
							</tr>
						))}
					</tbody>
				</table>
			</div>
		</div>
	)
}
