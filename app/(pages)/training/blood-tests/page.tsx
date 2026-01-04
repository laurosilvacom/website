'use client'

import {SimpleSheetTable} from '@/components/training/simple-sheet-table'
import {useTraining} from '@/components/training/training-provider'

// The Excel sheet is a matrix by date/marker, but the template is empty.
// We model it as a row-based log to keep it editable and queryable.
const columns = ['date', 'Lab', 'marker', 'value', 'unit', 'notes']

function normalizeRows(rows: Array<Record<string, unknown>>) {
	return rows.map((r) => {
		const out: Record<string, string> = {}
		for (const c of columns) out[c] = r[c] == null ? '' : String(r[c])
		return out
	})
}

export default function TrainingBloodTestsPage() {
	const {data, setData} = useTraining()
	const rows = normalizeRows(data.bloodTests)

	return (
		<SimpleSheetTable
			title="Blood tests"
			description="Captures the blood tests sheet as a log (date + marker)."
			columns={columns}
			rows={rows}
			onChangeAction={(next) =>
				setData((prev) => ({
					...prev,
					bloodTests: next
				}))
			}
		/>
	)
}
