'use client'

import {SimpleSheetTable} from '@/components/training/simple-sheet-table'
import {useTraining} from '@/components/training/training-provider'

const columns = [
	'Injury or Illness',
	'Date Began',
	'Date Ended',
	'Location',
	'Severity',
	'Possible Cause',
	'Treatment',
	'Notes'
]

function normalizeRows(rows: Array<Record<string, unknown>>) {
	return rows.map((r) => {
		const out: Record<string, string> = {}
		for (const c of columns) out[c] = r[c] == null ? '' : String(r[c])
		return out
	})
}

export default function TrainingInjuriesPage() {
	const {data, setData} = useTraining()
	const rows = normalizeRows(data.injuries)

	return (
		<SimpleSheetTable
			title="Injuries"
			description="Matches the Injuries sheet table."
			columns={columns}
			rows={rows}
			onChangeAction={(next) =>
				setData((prev) => ({
					...prev,
					injuries: next
				}))
			}
		/>
	)
}
