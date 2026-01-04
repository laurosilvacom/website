'use client'

import {SimpleSheetTable} from '@/components/training/simple-sheet-table'
import {useTraining} from '@/components/training/training-provider'

const columns = [
	'Activity',
	'Where',
	'Summit',
	'Route',
	'grade',
	'description',
	'with',
	'Date',
	'link'
]

function normalizeRows(rows: Array<Record<string, unknown>>) {
	return rows.map((r) => {
		const out: Record<string, string> = {}
		for (const c of columns) out[c] = r[c] == null ? '' : String(r[c])
		return out
	})
}

export default function TrainingActivitiesPage() {
	const {data, setData} = useTraining()
	const rows = normalizeRows(data.activities)

	return (
		<SimpleSheetTable
			title="Activities"
			description="Matches the Activities sheet (free-form log)."
			columns={columns}
			rows={rows}
			onChangeAction={(next) =>
				setData((prev) => ({
					...prev,
					activities: next
				}))
			}
		/>
	)
}
