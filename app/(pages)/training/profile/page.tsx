'use client'

import {Input} from '@/components/ui/input'
import {useTraining} from '@/components/training/training-provider'
import type {PerformanceProfileRow} from '@/lib/training/types'
import {DEFAULT_PERFORMANCE_PROFILE} from '@/lib/training/profile-defaults'
import {formatPercent} from '@/lib/format'

function parsePerf(value: string): number | null {
	const raw = value.trim()
	if (!raw) return null

	// HH:MM:SS or H:MM:SS or MM:SS
	if (raw.includes(':')) {
		const parts = raw.split(':').map((p) => p.trim())
		if (parts.some((p) => p === '' || !/^[0-9]+$/.test(p))) return null
		const nums = parts.map((p) => Number(p))
		if (nums.some((n) => !Number.isFinite(n))) return null
		if (nums.length === 2) {
			const mm = nums[0]
			const ss = nums[1]
			if (mm == null || ss == null) return null
			return mm * 60 + ss
		}
		if (nums.length === 3) {
			const hh = nums[0]
			const mm = nums[1]
			const ss = nums[2]
			if (hh == null || mm == null || ss == null) return null
			return hh * 3600 + mm * 60 + ss
		}
		return null
	}

	// 303,5 style
	const normalized = raw.replace(',', '.')
	const n = Number(normalized)
	return Number.isFinite(n) ? n : null
}

function computePercentOfBest(row: PerformanceProfileRow): number | null {
	const my = parsePerf(row.myBestPerf)
	const best = parsePerf(row.worldBest)
	if (my == null || best == null || best === 0) return null

	// Excel:
	// - Most rows: (WorldBest * 100) / MyBest
	// - Downhill grades: (MyBest * 100) / WorldBest
	return row.direction === 'lowerIsBetter'
		? (best * 100) / my
		: (my * 100) / best
}

function computePercentOfGoal(row: PerformanceProfileRow): number | null {
	const goal = parsePerf(row.goal)
	const best = parsePerf(row.worldBest)
	if (goal == null || best == null || goal === 0) return null

	// Excel: (WorldBest * 100) / Goal
	return (best * 100) / goal
}

export default function TrainingProfilePage() {
	const {data, setData} = useTraining()

	const rows = data.profile.performanceProfile?.length
		? data.profile.performanceProfile
		: DEFAULT_PERFORMANCE_PROFILE

	const setRows = (next: PerformanceProfileRow[]) =>
		setData((prev) => ({
			...prev,
			profile: {
				...prev.profile,
				performanceProfile: next
			}
		}))

	return (
		<div className="space-y-4">
			<div className="space-y-1">
				<h1 className="text-xl font-semibold">My Profile</h1>
				<p className="text-muted-foreground text-sm">
					Performance Profile section (matches the spreadsheet formulas).
				</p>
			</div>

			<div className="overflow-auto rounded-md border">
				<table className="w-full text-sm">
					<thead className="bg-muted/40">
						<tr>
							<th className="p-2 text-left">EFFORT</th>
							<th className="p-2 text-left">my Best Perf</th>
							<th className="p-2 text-left">speed</th>
							<th className="p-2 text-left">Worlds Best</th>
							<th className="p-2 text-left">GOAL</th>
							<th className="p-2 text-left">% BP</th>
							<th className="p-2 text-left">% GOAL</th>
						</tr>
					</thead>
					<tbody>
						{rows.map((r, idx) => {
							const bp = computePercentOfBest(r)
							const gp = computePercentOfGoal(r)
							return (
								<tr key={r.id} className="border-t">
									<td className="p-2 whitespace-nowrap">{r.effort}</td>
									<td className="p-2">
										<Input
											value={r.myBestPerf}
											onChange={(e) => {
												const next = rows.map((row, i) =>
													i === idx ? {...row, myBestPerf: e.target.value} : row
												)
												setRows(next)
											}}
											className="h-8 min-w-40"
											placeholder="e.g. 00:45:30 or 1234"
										/>
									</td>
									<td className="p-2 whitespace-nowrap">{r.speed}</td>
									<td className="p-2 whitespace-nowrap">{r.worldBest}</td>
									<td className="p-2">
										<Input
											value={r.goal}
											onChange={(e) => {
												const next = rows.map((row, i) =>
													i === idx ? {...row, goal: e.target.value} : row
												)
												setRows(next)
											}}
											className="h-8 min-w-40"
											placeholder="goal time/value"
										/>
									</td>
									<td className="p-2 whitespace-nowrap">{formatPercent(bp)}</td>
									<td className="p-2 whitespace-nowrap">{formatPercent(gp)}</td>
								</tr>
							)
						})}
					</tbody>
				</table>
			</div>
		</div>
	)
}
