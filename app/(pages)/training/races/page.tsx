'use client'

import {SimpleSheetTable} from '@/components/training/simple-sheet-table'
import {useTraining} from '@/components/training/training-provider'

const columns = [
	'nº',
	'date',
	'race',
	'sport (s/r)',
	'Type',
	'mi',
	'elev ft',
	'time',
	'pos',
	'COMMENTS'
]

function normalizeRows(rows: Array<Record<string, unknown>>) {
	return rows.map((r) => {
		const out: Record<string, string> = {}
		for (const c of columns) out[c] = r[c] == null ? '' : String(r[c])
		return out
	})
}

export default function TrainingRacesPage() {
	const {data, setData} = useTraining()
	const rows = normalizeRows(data.races)

	return (
		<SimpleSheetTable
			title="Races"
			description="Matches the Races sheet main table."
			columns={columns}
			rows={rows}
			onChangeAction={(next) =>
				setData((prev) => ({
					...prev,
					races: next
				}))
			}
		/>
	)
}
