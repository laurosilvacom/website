'use client'

import {SimpleSheetTable} from '@/components/training/simple-sheet-table'
import {useTraining} from '@/components/training/training-provider'

const columns = [
	'DATE',
	'WHERE',
	'Viatal Cap',
	'VEMS',
	'Tiffenneau',
	'PEFR',
	'Weight',
	'% Fat',
	'% mus',
	'% bone',
	'Speed',
	'Incline',
	'power W',
	'Lactate'
]

function normalizeRows(rows: Array<Record<string, unknown>>) {
	return rows.map((r) => {
		const out: Record<string, string> = {}
		for (const c of columns) out[c] = r[c] == null ? '' : String(r[c])
		return out
	})
}

export default function TrainingVo2TestsPage() {
	const {data, setData} = useTraining()
	const rows = normalizeRows(data.vo2Tests)

	return (
		<SimpleSheetTable
			title="VO2 Tests"
			description="Matches the VO2 Tests sheet (rows of tests)."
			columns={columns}
			rows={rows}
			onChangeAction={(next) =>
				setData((prev) => ({
					...prev,
					vo2Tests: next
				}))
			}
		/>
	)
}
