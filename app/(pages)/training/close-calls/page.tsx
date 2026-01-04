'use client'

import {SimpleSheetTable} from '@/components/training/simple-sheet-table'
import {useTraining} from '@/components/training/training-provider'

const columns = [
	'Date',
	'1 Close calls / month',
	'Nature',
	'Description',
	'Possible outcome',
	"What Could I've done?",
	"What I've learned?"
]

function normalizeRows(rows: Array<Record<string, unknown>>) {
	return rows.map((r) => {
		const out: Record<string, string> = {}
		for (const c of columns) out[c] = r[c] == null ? '' : String(r[c])
		return out
	})
}

export default function TrainingCloseCallsPage() {
	const {data, setData} = useTraining()
	const rows = normalizeRows(data.closeCalls)

	return (
		<SimpleSheetTable
			title="Close Calls"
			description="Matches the Close Calls sheet table."
			columns={columns}
			rows={rows}
			onChangeAction={(next) =>
				setData((prev) => ({
					...prev,
					closeCalls: next
				}))
			}
		/>
	)
}
