'use client'

import {Input} from '@/components/ui/input'
import {Label} from '@/components/ui/label'
import {useTraining} from '@/components/training/training-provider'

type Gender = 'Male' | 'Female'

type MetabolismData = {
	name?: string
	age?: number
	gender?: Gender
	heightCm?: number
	weightKg?: number
	hrMax?: number
	activityFactor?: number

	raceDurationHours?: number
	raceIntensity?: string
	calPerHour?: number
	choPerHour?: number
	fluidLossPercent?: number
	flatSpeed?: string
}

const DEFAULT_ACTIVITY_FACTORS: Array<{label: string; factor: number}> = [
	{label: 'Sedentary (little/no exercise)', factor: 1.2},
	{label: 'Lightly Active (sports 1-3 days/week)', factor: 1.375},
	{label: 'Moderately Active (sports 3-5 days/week)', factor: 1.55},
	{label: 'Very Active (sports 6-7 days/week)', factor: 1.725},
	{label: 'Extra Active', factor: 1.9}
]

type ZoneRow = {
	key: string
	label: string
	percent: string
}

const ZONES_5: ZoneRow[] = [
	{key: 'z1', label: 'easy', percent: '55-72%'},
	{key: 'z2', label: 'moderate', percent: '67-82%'},
	{key: 'z3', label: 'tempo', percent: '82-87%'},
	{key: 'z4', label: 'threshold', percent: '87-92%'},
	{key: 'z5', label: 'vo2max', percent: '92-100%'},
	{key: 'z6', label: 'sprint', percent: ''}
]

function asNumber(raw: string): number | undefined {
	const s = raw.trim()
	if (!s) return undefined
	const n = Number(s)
	return Number.isFinite(n) ? n : undefined
}

function parsePercentRange(range: string): {lo: number; hi: number} | null {
	const s = range.trim()
	if (!s) return null
	const m = s.match(/^\s*(\d+(?:\.\d+)?)\s*-\s*(\d+(?:\.\d+)?)\s*%\s*$/)
	if (!m) return null
	const lo = Number(m[1]) / 100
	const hi = Number(m[2]) / 100
	if (!Number.isFinite(lo) || !Number.isFinite(hi)) return null
	return {lo, hi}
}

function hrRangeText(hrMax: number | undefined, percentRange: string): string {
	if (!hrMax) return ''
	const r = parsePercentRange(percentRange)
	if (!r) return ''
	const lo = Math.round(hrMax * r.lo)
	const hi = Math.round(hrMax * r.hi)
	return `${lo}-${hi}`
}

function computeBmrKcalDay({
	gender,
	weightKg,
	heightCm,
	age
}: MetabolismData): number | null {
	if (!gender || !weightKg || !heightCm || !age) return null

	// Matches the workbook intent: Harris-Benedict (metric)
	// Male: 66 + 13.7W + 5H - 6.8A
	// Female: 655 + 9.6W + 1.8H - 4.7A
	if (gender === 'Male') return 66 + 13.7 * weightKg + 5 * heightCm - 6.8 * age
	return 655 + 9.6 * weightKg + 1.8 * heightCm - 4.7 * age
}

function cmToIn(cm: number): number {
	return cm / 2.54
}

function inToCm(inches: number): number {
	return inches * 2.54
}

function kgToLb(kg: number): number {
	return kg * 2.2046226218
}

function lbToKg(lb: number): number {
	return lb / 2.2046226218
}

export default function TrainingMetabolismPage() {
	const {data, setData} = useTraining()
	const metabolism = (data.metabolism ?? {}) as MetabolismData

	const update = (patch: Partial<MetabolismData>) =>
		setData((prev) => ({
			...prev,
			metabolism: {
				...(prev.metabolism ?? {}),
				...patch
			}
		}))

	const bmr = computeBmrKcalDay(metabolism)
	const activityFactor =
		metabolism.activityFactor ?? DEFAULT_ACTIVITY_FACTORS[0]?.factor ?? 1.2
	const dailyNeeds = bmr != null ? bmr * activityFactor : null
	const totalRaceCalories =
		(metabolism.raceDurationHours ?? 0) * (metabolism.calPerHour ?? 0) || null
	const totalRaceCho =
		(metabolism.raceDurationHours ?? 0) * (metabolism.choPerHour ?? 0) || null

	return (
		<div className="space-y-6">
			<h1 className="text-xl font-semibold">Metabolism</h1>

			<section className="space-y-3">
				<div className="space-y-1">
					<h2 className="text-sm font-medium">Rest Metabolism</h2>
					<p className="text-muted-foreground text-sm">
						Inputs mirror the spreadsheet; BMR + daily needs are computed.
					</p>
				</div>

				<div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
					<div className="space-y-1">
						<Label>Name</Label>
						<Input
							value={metabolism.name ?? ''}
							onChange={(e) => update({name: e.target.value})}
							className="h-8"
						/>
					</div>
					<div className="space-y-1">
						<Label>Gender</Label>
						<Input
							value={metabolism.gender ?? ''}
							onChange={(e) => {
								const v = e.target.value.trim()
								update({
									gender:
										v === 'Male' || v === 'Female' ? (v as Gender) : undefined
								})
							}}
							placeholder="Male/Female"
							className="h-8"
						/>
					</div>
					<div className="space-y-1">
						<Label>Age (years)</Label>
						<Input
							value={metabolism.age?.toString() ?? ''}
							onChange={(e) => update({age: asNumber(e.target.value)})}
							inputMode="numeric"
							className="h-8"
						/>
					</div>
					<div className="space-y-1">
						<Label>Height (in)</Label>
						<Input
							value={
								metabolism.heightCm != null
									? Math.round(cmToIn(metabolism.heightCm)).toString()
									: ''
							}
							onChange={(e) => {
								const inches = asNumber(e.target.value)
								update({heightCm: inches == null ? undefined : inToCm(inches)})
							}}
							inputMode="numeric"
							className="h-8"
						/>
					</div>
					<div className="space-y-1">
						<Label>Weight (lb)</Label>
						<Input
							value={
								metabolism.weightKg != null
									? Math.round(kgToLb(metabolism.weightKg)).toString()
									: ''
							}
							onChange={(e) => {
								const lb = asNumber(e.target.value)
								update({weightKg: lb == null ? undefined : lbToKg(lb)})
							}}
							inputMode="numeric"
							className="h-8"
						/>
					</div>
					<div className="space-y-1">
						<Label>HR max</Label>
						<Input
							value={metabolism.hrMax?.toString() ?? ''}
							onChange={(e) => update({hrMax: asNumber(e.target.value)})}
							inputMode="numeric"
							className="h-8"
						/>
					</div>
				</div>

				<div className="grid gap-3 sm:grid-cols-2">
					<div className="rounded-md border p-3">
						<div className="text-muted-foreground text-xs">BMR</div>
						<div className="text-sm font-medium">
							{bmr == null ? '—' : `${Math.round(bmr)} kcal/day`}
						</div>
					</div>
					<div className="rounded-md border p-3">
						<div className="text-muted-foreground text-xs">Daily needs</div>
						<div className="text-sm font-medium">
							{dailyNeeds == null ? '—' : `${Math.round(dailyNeeds)} kcal/day`}
						</div>
					</div>
				</div>

				<div className="space-y-2">
					<div className="text-sm font-medium">Activity factor</div>
					<div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
						{DEFAULT_ACTIVITY_FACTORS.map((a) => (
							<label key={a.factor} className="flex items-center gap-2 text-sm">
								<input
									type="radio"
									name="activityFactor"
									checked={activityFactor === a.factor}
									onChange={() => update({activityFactor: a.factor})}
								/>
								<span>{a.label}</span>
							</label>
						))}
					</div>
				</div>
			</section>

			<section className="space-y-3">
				<div className="space-y-1">
					<h2 className="text-sm font-medium">Exercise Metabolism</h2>
					<p className="text-muted-foreground text-sm">
						Zone HR ranges are derived from HR max (matches the sheet’s intent).
					</p>
				</div>

				<div className="overflow-auto rounded-md border">
					<table className="w-full text-sm">
						<thead className="bg-muted/40">
							<tr>
								<th className="p-2 text-left">5 Zones</th>
								<th className="p-2 text-left">Name</th>
								<th className="p-2 text-left">HR %</th>
								<th className="p-2 text-left">HR</th>
							</tr>
						</thead>
						<tbody>
							{ZONES_5.map((z) => (
								<tr key={z.key} className="border-t">
									<td className="p-2 whitespace-nowrap">
										{z.key.toUpperCase()}
									</td>
									<td className="p-2 whitespace-nowrap">{z.label}</td>
									<td className="p-2 whitespace-nowrap">{z.percent}</td>
									<td className="p-2 whitespace-nowrap">
										{hrRangeText(metabolism.hrMax, z.percent)}
									</td>
								</tr>
							))}
						</tbody>
					</table>
				</div>
			</section>

			<section className="space-y-3">
				<div className="space-y-1">
					<h2 className="text-sm font-medium">Race Specs</h2>
					<p className="text-muted-foreground text-sm">
						This block matches the “RACE SPECS” section structure.
					</p>
				</div>

				<div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
					<div className="space-y-1">
						<Label>Duration (h)</Label>
						<Input
							value={metabolism.raceDurationHours?.toString() ?? ''}
							onChange={(e) =>
								update({raceDurationHours: asNumber(e.target.value)})
							}
							inputMode="decimal"
							className="h-8"
						/>
					</div>
					<div className="space-y-1">
						<Label>Intensity</Label>
						<Input
							value={metabolism.raceIntensity ?? ''}
							onChange={(e) => update({raceIntensity: e.target.value})}
							placeholder="e.g. Z1"
							className="h-8"
						/>
					</div>
					<div className="space-y-1">
						<Label>Cal / h</Label>
						<Input
							value={metabolism.calPerHour?.toString() ?? ''}
							onChange={(e) => update({calPerHour: asNumber(e.target.value)})}
							inputMode="decimal"
							className="h-8"
						/>
					</div>
					<div className="space-y-1">
						<Label>CHO / h</Label>
						<Input
							value={metabolism.choPerHour?.toString() ?? ''}
							onChange={(e) => update({choPerHour: asNumber(e.target.value)})}
							inputMode="decimal"
							className="h-8"
						/>
					</div>
					<div className="space-y-1">
						<Label>Fluid loss (%)</Label>
						<Input
							value={metabolism.fluidLossPercent?.toString() ?? ''}
							onChange={(e) =>
								update({fluidLossPercent: asNumber(e.target.value)})
							}
							inputMode="decimal"
							className="h-8"
						/>
					</div>
					<div className="space-y-1">
						<Label>Flat speed</Label>
						<Input
							value={metabolism.flatSpeed ?? ''}
							onChange={(e) => update({flatSpeed: e.target.value})}
							placeholder="e.g. 00:05:30"
							className="h-8"
						/>
					</div>
				</div>

				<div className="grid gap-3 sm:grid-cols-2">
					<div className="rounded-md border p-3">
						<div className="text-muted-foreground text-xs">Total Cal</div>
						<div className="text-sm font-medium">
							{totalRaceCalories == null
								? '—'
								: `${Math.round(totalRaceCalories)} kcal`}
						</div>
					</div>
					<div className="rounded-md border p-3">
						<div className="text-muted-foreground text-xs">Total CHO</div>
						<div className="text-sm font-medium">
							{totalRaceCho == null ? '—' : `${Math.round(totalRaceCho)} g`}
						</div>
					</div>
				</div>
			</section>
		</div>
	)
}
