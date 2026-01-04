'use client'

import {useMemo, useState} from 'react'
import {Button} from '@/components/ui/button'
import {Input} from '@/components/ui/input'
import {useTraining} from '@/components/training/training-provider'
import type {TrainingDiaryEntry} from '@/lib/training/types'
import {toInputString} from '@/lib/format'

function newId() {
	return `td-${Date.now()}-${Math.random().toString(16).slice(2)}`
}

function todayIso(): string {
	return new Date().toISOString().slice(0, 10)
}

function parseNumberOrNull(raw: string): number | null {
	const v = raw.trim()
	if (!v) return null
	const n = Number(v)
	return Number.isFinite(n) ? n : null
}

export default function TrainingDiaryPage() {
	const {data, upsertTdEntry, deleteTdEntry} = useTraining()
	const [draftDate, setDraftDate] = useState(todayIso)

	const inputDecimalsForKey = (key: string): number => {
		switch (key) {
			case 'totalTimeHours':
			case 'timeZ2Hours':
			case 'timeZ3Hours':
			case 'heatTimeHours':
			case 'timeAltitudeHours':
				return 2
			case 'distanceMi':
				return 2
			case 'dnvFt':
			case 'altitudeFt':
			case 'travel':
			case 'feeling':
			case 'mood':
				return 0
			default:
				return 2
		}
	}

	const entries = useMemo(() => {
		return [...data.tdEntries].sort((a, b) => (a.date < b.date ? -1 : 1))
	}, [data.tdEntries])

	const addDay = () => {
		const entry: TrainingDiaryEntry = {
			id: newId(),
			date: draftDate,
			weekday: null,
			travel: null,
			injury: null,
			sic: null,
			description: null,
			stimuli: null,
			sport: null,
			totalTimeHours: null,
			timeZ2Hours: null,
			timeZ3Hours: null,
			dnvFt: null,
			distanceMi: null,
			surface: null,
			substrateFueling: null,
			heatTimeHours: null,
			altitudeFt: null,
			timeAltitudeHours: null,
			neuromuscular: null,
			feeling: null,
			mood: null
		}
		upsertTdEntry(entry)
	}

	return (
		<div className="space-y-4">
			<div className="flex flex-wrap items-end justify-between gap-3">
				<div className="space-y-1">
					<h1 className="text-xl font-semibold">TD</h1>
					<p className="text-muted-foreground text-sm">
						Training diary (matches the TD sheet columns).
					</p>
				</div>
				<div className="flex items-center gap-2">
					<Input
						type="date"
						value={draftDate}
						onChange={(e) => setDraftDate(e.target.value)}
						className="h-9"
					/>
					<Button onClick={addDay} className="h-9">
						Add day
					</Button>
				</div>
			</div>

			<div className="overflow-auto rounded-md border">
				<table className="w-full text-sm">
					<thead className="bg-muted/40">
						<tr className="text-left">
							<th className="p-2">Date</th>
							<th className="p-2">Travel</th>
							<th className="p-2">Injury</th>
							<th className="p-2">SIC</th>
							<th className="p-2">Stimuli</th>
							<th className="p-2">Sport</th>
							<th className="p-2">Total (h)</th>
							<th className="p-2">Z2 (h)</th>
							<th className="p-2">Z3 (h)</th>
							<th className="p-2">Elev (ft)</th>
							<th className="p-2">Dist (mi)</th>
							<th className="p-2">Surface</th>
							<th className="p-2">Fueling</th>
							<th className="p-2">Heat (h)</th>
							<th className="p-2">Alt (ft)</th>
							<th className="p-2">Alt time (h)</th>
							<th className="p-2">Neuro</th>
							<th className="p-2">Feeling</th>
							<th className="p-2">Mood</th>
							<th className="p-2"></th>
						</tr>
					</thead>
					<tbody>
						{entries.map((e) => (
							<tr key={e.id} className="border-t align-top">
								<td className="p-2">
									<Input
										type="date"
										value={e.date}
										onChange={(ev) =>
											upsertTdEntry({...e, date: ev.target.value})
										}
										className="h-8"
									/>
								</td>
								<td className="p-2">
									<Input
										value={toInputString(
											e.travel,
											inputDecimalsForKey('travel')
										)}
										onChange={(ev) =>
											upsertTdEntry({
												...e,
												travel: parseNumberOrNull(ev.target.value)
											})
										}
										className="h-8 w-20"
									/>
								</td>
								<td className="p-2">
									<Input
										value={e.injury ?? ''}
										onChange={(ev) =>
											upsertTdEntry({...e, injury: ev.target.value || null})
										}
										className="h-8 w-32"
									/>
								</td>
								<td className="p-2">
									<Input
										value={e.sic ?? ''}
										onChange={(ev) =>
											upsertTdEntry({...e, sic: ev.target.value || null})
										}
										className="h-8 w-28"
									/>
								</td>
								<td className="p-2">
									<Input
										value={e.stimuli ?? ''}
										onChange={(ev) =>
											upsertTdEntry({...e, stimuli: ev.target.value || null})
										}
										className="h-8 w-28"
									/>
								</td>
								<td className="p-2">
									<Input
										value={e.sport ?? ''}
										onChange={(ev) =>
											upsertTdEntry({...e, sport: ev.target.value || null})
										}
										className="h-8 w-28"
									/>
								</td>
								{(
									[
										['totalTimeHours', 'w-24'],
										['timeZ2Hours', 'w-20'],
										['timeZ3Hours', 'w-20'],
										['dnvFt', 'w-24'],
										['distanceMi', 'w-24']
									] as const
								).map(([k, w]) => (
									<td key={k} className="p-2">
										<Input
											value={toInputString(
												(e as any)[k],
												inputDecimalsForKey(k)
											)}
											onChange={(ev) =>
												upsertTdEntry({
													...e,
													[k]: parseNumberOrNull(ev.target.value)
												} as any)
											}
											className={`h-8 ${w}`}
										/>
									</td>
								))}
								<td className="p-2">
									<Input
										value={e.surface ?? ''}
										onChange={(ev) =>
											upsertTdEntry({...e, surface: ev.target.value || null})
										}
										className="h-8 w-28"
									/>
								</td>
								<td className="p-2">
									<Input
										value={e.substrateFueling ?? ''}
										onChange={(ev) =>
											upsertTdEntry({
												...e,
												substrateFueling: ev.target.value || null
											})
										}
										className="h-8 w-32"
									/>
								</td>
								{(
									[
										['heatTimeHours', 'w-24'],
										['altitudeFt', 'w-24'],
										['timeAltitudeHours', 'w-24']
									] as const
								).map(([k, w]) => (
									<td key={k} className="p-2">
										<Input
											value={toInputString(
												(e as any)[k],
												inputDecimalsForKey(k)
											)}
											onChange={(ev) =>
												upsertTdEntry({
													...e,
													[k]: parseNumberOrNull(ev.target.value)
												} as any)
											}
											className={`h-8 ${w}`}
										/>
									</td>
								))}
								<td className="p-2">
									<Input
										value={e.neuromuscular ?? ''}
										onChange={(ev) =>
											upsertTdEntry({
												...e,
												neuromuscular: ev.target.value || null
											})
										}
										className="h-8 w-32"
									/>
								</td>
								<td className="p-2">
									<Input
										value={toInputString(
											e.feeling,
											inputDecimalsForKey('feeling')
										)}
										onChange={(ev) =>
											upsertTdEntry({
												...e,
												feeling: parseNumberOrNull(ev.target.value)
											})
										}
										className="h-8 w-20"
									/>
								</td>
								<td className="p-2">
									<Input
										value={toInputString(e.mood, inputDecimalsForKey('mood'))}
										onChange={(ev) =>
											upsertTdEntry({
												...e,
												mood: parseNumberOrNull(ev.target.value)
											})
										}
										className="h-8 w-20"
									/>
								</td>
								<td className="p-2">
									<Button
										variant="destructive"
										size="sm"
										onClick={() => deleteTdEntry(e.id)}>
										Delete
									</Button>
								</td>
							</tr>
						))}
						{entries.length === 0 && (
							<tr>
								<td
									colSpan={20}
									className="text-muted-foreground p-6 text-center">
									No entries yet.
								</td>
							</tr>
						)}
					</tbody>
				</table>
			</div>
		</div>
	)
}
