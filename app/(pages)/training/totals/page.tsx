'use client'

import {useMemo} from 'react'
import {Input} from '@/components/ui/input'
import {useTraining} from '@/components/training/training-provider'
import {
	computeTotals,
	computeWeeklyTotalsBackwards,
	groupTotalsBy,
	inDateRange
} from '@/lib/training/calculations'
import {formatFeet, formatHours, formatMiles} from '@/lib/format'

export default function TrainingTotalsPage() {
	const {data, setData} = useTraining()

	const filteredEntries = useMemo(() => {
		return data.tdEntries.filter((e) =>
			inDateRange(e.date, data.filters.totals)
		)
	}, [data.tdEntries, data.filters.totals])

	const totals = useMemo(
		() => computeTotals(filteredEntries),
		[filteredEntries]
	)
	const bySport = useMemo(
		() => groupTotalsBy(filteredEntries, 'sport'),
		[filteredEntries]
	)
	const bySurface = useMemo(
		() => groupTotalsBy(filteredEntries, 'surface'),
		[filteredEntries]
	)
	const byStimuli = useMemo(
		() => groupTotalsBy(filteredEntries, 'stimuli'),
		[filteredEntries]
	)
	const weekly = useMemo(
		() =>
			computeWeeklyTotalsBackwards(data.tdEntries, data.filters.totals.to, 12),
		[data.tdEntries, data.filters.totals.to]
	)

	return (
		<div className="space-y-6">
			<div className="space-y-1">
				<h1 className="text-xl font-semibold">Totals</h1>
				<p className="text-muted-foreground text-sm">
					Aggregations matching the Totals sheet (date range driven).
				</p>
			</div>

			<div className="flex flex-wrap items-end gap-3">
				<div className="space-y-1">
					<div className="text-muted-foreground text-xs">FROM</div>
					<Input
						type="date"
						value={data.filters.totals.from}
						onChange={(e) =>
							setData((prev) => ({
								...prev,
								filters: {
									...prev.filters,
									totals: {...prev.filters.totals, from: e.target.value}
								}
							}))
						}
						className="h-9"
					/>
				</div>
				<div className="space-y-1">
					<div className="text-muted-foreground text-xs">TO</div>
					<Input
						type="date"
						value={data.filters.totals.to}
						onChange={(e) =>
							setData((prev) => ({
								...prev,
								filters: {
									...prev.filters,
									totals: {...prev.filters.totals, to: e.target.value}
								}
							}))
						}
						className="h-9"
					/>
				</div>
			</div>

			<div className="grid gap-3 sm:grid-cols-3 lg:grid-cols-6">
				<div className="rounded-md border p-3">
					<div className="text-muted-foreground text-xs">TOTAL TIME (h)</div>
					<div className="text-lg font-semibold">
						{formatHours(totals.totalTimeHours)}
					</div>
				</div>
				<div className="rounded-md border p-3">
					<div className="text-muted-foreground text-xs">TIME Z2 (h)</div>
					<div className="text-lg font-semibold">
						{formatHours(totals.timeZ2Hours)}
					</div>
				</div>
				<div className="rounded-md border p-3">
					<div className="text-muted-foreground text-xs">TIME Z3 (h)</div>
					<div className="text-lg font-semibold">
						{formatHours(totals.timeZ3Hours)}
					</div>
				</div>
				<div className="rounded-md border p-3">
					<div className="text-muted-foreground text-xs">ELEV (ft)</div>
					<div className="text-lg font-semibold">
						{formatFeet(totals.dnvFt)}
					</div>
				</div>
				<div className="rounded-md border p-3">
					<div className="text-muted-foreground text-xs">DISTANCE (mi)</div>
					<div className="text-lg font-semibold">
						{formatMiles(totals.distanceMi)}
					</div>
				</div>
				<div className="rounded-md border p-3">
					<div className="text-muted-foreground text-xs">SESSIONS</div>
					<div className="text-lg font-semibold">{totals.sessions}</div>
				</div>
			</div>

			<div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
				<div className="rounded-md border p-3">
					<div className="text-muted-foreground text-xs">HEAT TIME (h)</div>
					<div className="text-sm font-medium">
						{formatHours(totals.heatTimeHours)}
					</div>
				</div>
				<div className="rounded-md border p-3">
					<div className="text-muted-foreground text-xs">TIME ALTITUDE (h)</div>
					<div className="text-sm font-medium">
						{formatHours(totals.timeAltitudeHours)}
					</div>
				</div>
				<div className="rounded-md border p-3">
					<div className="text-muted-foreground text-xs">TRAVEL (count)</div>
					<div className="text-sm font-medium">{totals.travelCount}</div>
				</div>
				<div className="rounded-md border p-3">
					<div className="text-muted-foreground text-xs">
						INJURY / SIC (count)
					</div>
					<div className="text-sm font-medium">
						{totals.injuryCount} / {totals.sicCount}
					</div>
				</div>
				<div className="rounded-md border p-3">
					<div className="text-muted-foreground text-xs">
						NEUROMUSCULAR (count)
					</div>
					<div className="text-sm font-medium">{totals.neuromuscularCount}</div>
				</div>
			</div>

			<div className="grid gap-6 lg:grid-cols-2">
				<div className="space-y-2">
					<h2 className="font-medium">By sport</h2>
					<div className="overflow-auto rounded-md border">
						<table className="w-full text-sm">
							<thead className="bg-muted/40">
								<tr>
									<th className="p-2 text-left">Sport</th>
									<th className="p-2 text-right">Time (h)</th>
									<th className="p-2 text-right">Elev (ft)</th>
									<th className="p-2 text-right">Dist (mi)</th>
									<th className="p-2 text-right">Sessions</th>
								</tr>
							</thead>
							<tbody>
								{Object.entries(bySport).map(([k, v]) => (
									<tr key={k} className="border-t">
										<td className="p-2">{k}</td>
										<td className="p-2 text-right">
											{formatHours(v.totalTimeHours)}
										</td>
										<td className="p-2 text-right">{formatFeet(v.dnvFt)}</td>
										<td className="p-2 text-right">
											{formatMiles(v.distanceMi)}
										</td>
										<td className="p-2 text-right">{v.sessions}</td>
									</tr>
								))}
							</tbody>
						</table>
					</div>
				</div>

				<div className="space-y-2">
					<h2 className="font-medium">By surface</h2>
					<div className="overflow-auto rounded-md border">
						<table className="w-full text-sm">
							<thead className="bg-muted/40">
								<tr>
									<th className="p-2 text-left">Surface</th>
									<th className="p-2 text-right">Time (h)</th>
									<th className="p-2 text-right">Elev (ft)</th>
									<th className="p-2 text-right">Dist (mi)</th>
									<th className="p-2 text-right">Sessions</th>
								</tr>
							</thead>
							<tbody>
								{Object.entries(bySurface).map(([k, v]) => (
									<tr key={k} className="border-t">
										<td className="p-2">{k}</td>
										<td className="p-2 text-right">
											{formatHours(v.totalTimeHours)}
										</td>
										<td className="p-2 text-right">{formatFeet(v.dnvFt)}</td>
										<td className="p-2 text-right">
											{formatMiles(v.distanceMi)}
										</td>
										<td className="p-2 text-right">{v.sessions}</td>
									</tr>
								))}
							</tbody>
						</table>
					</div>
				</div>
			</div>

			<div className="space-y-2">
				<h2 className="font-medium">By stimuli</h2>
				<div className="overflow-auto rounded-md border">
					<table className="w-full text-sm">
						<thead className="bg-muted/40">
							<tr>
								<th className="p-2 text-left">Stimuli</th>
								<th className="p-2 text-right">Time (h)</th>
								<th className="p-2 text-right">Elev (ft)</th>
								<th className="p-2 text-right">Dist (mi)</th>
								<th className="p-2 text-right">Sessions</th>
							</tr>
						</thead>
						<tbody>
							{Object.entries(byStimuli).map(([k, v]) => (
								<tr key={k} className="border-t">
									<td className="p-2">{k}</td>
									<td className="p-2 text-right">
										{formatHours(v.totalTimeHours)}
									</td>
									<td className="p-2 text-right">{formatFeet(v.dnvFt)}</td>
									<td className="p-2 text-right">
										{formatMiles(v.distanceMi)}
									</td>
									<td className="p-2 text-right">{v.sessions}</td>
								</tr>
							))}
						</tbody>
					</table>
				</div>
			</div>

			<div className="space-y-2">
				<h2 className="font-medium">Weekly (last 12)</h2>
				<div className="overflow-auto rounded-md border">
					<table className="w-full text-sm">
						<thead className="bg-muted/40">
							<tr>
								<th className="p-2 text-left">Week</th>
								<th className="p-2 text-left">from</th>
								<th className="p-2 text-left">to</th>
								<th className="p-2 text-right">Temps (h)</th>
								<th className="p-2 text-right">Elev (ft)</th>
								<th className="p-2 text-right">Dist (mi)</th>
								<th className="p-2 text-right">skimo (h)</th>
								<th className="p-2 text-right">correr (h)</th>
								<th className="p-2 text-right">altres (h)</th>
							</tr>
						</thead>
						<tbody>
							{weekly.map((w) => (
								<tr key={w.weekIndex} className="border-t">
									<td className="p-2">{w.weekIndex}</td>
									<td className="p-2 whitespace-nowrap">{w.from}</td>
									<td className="p-2 whitespace-nowrap">{w.to}</td>
									<td className="p-2 text-right">
										{formatHours(w.totals.totalTimeHours)}
									</td>
									<td className="p-2 text-right">
										{formatFeet(w.totals.dnvFt)}
									</td>
									<td className="p-2 text-right">
										{formatMiles(w.totals.distanceMi)}
									</td>
									<td className="p-2 text-right">
										{formatHours(w.skimoTimeHours)}
									</td>
									<td className="p-2 text-right">
										{formatHours(w.runningTimeHours)}
									</td>
									<td className="p-2 text-right">
										{formatHours(w.otherTimeHours)}
									</td>
								</tr>
							))}
						</tbody>
					</table>
				</div>
			</div>
		</div>
	)
}
