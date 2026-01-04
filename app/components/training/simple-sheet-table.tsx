'use client'

import {Button} from '@/components/ui/button'
import {Input} from '@/components/ui/input'

type Row = Record<string, string>

type Props = {
	title: string
	description?: string
	columns: string[]
	rows: Row[]
	onChangeAction: (next: Row[]) => void
	emptyRowAction?: () => Row
}

function defaultEmptyRow(columns: string[]): Row {
	return Object.fromEntries(columns.map((c) => [c, '']))
}

export function SimpleSheetTable({
	title,
	description,
	columns,
	rows,
	onChangeAction,
	emptyRowAction
}: Props) {
	return (
		<div className="space-y-4">
			<div className="flex flex-wrap items-end justify-between gap-3">
				<div className="space-y-1">
					<h1 className="text-xl font-semibold">{title}</h1>
					{description ? (
						<p className="text-muted-foreground text-sm">{description}</p>
					) : null}
				</div>
				<Button
					className="h-9"
					onClick={() =>
						onChangeAction([
							...rows,
							(emptyRowAction ?? (() => defaultEmptyRow(columns)))()
						])
					}>
					Add row
				</Button>
			</div>

			<div className="overflow-auto rounded-md border">
				<table className="w-full text-sm">
					<thead className="bg-muted/40">
						<tr>
							{columns.map((c) => (
								<th key={c} className="p-2 text-left whitespace-nowrap">
									{c}
								</th>
							))}
							<th className="p-2"></th>
						</tr>
					</thead>
					<tbody>
						{rows.map((r, idx) => (
							<tr key={idx} className="border-t align-top">
								{columns.map((c) => (
									<td key={c} className="p-2">
										<Input
											value={r[c] ?? ''}
											onChange={(e) => {
												const next = rows.map((row, i) =>
													i === idx ? {...row, [c]: e.target.value} : row
												)
												onChangeAction(next)
											}}
											className="h-8 min-w-[140px]"
										/>
									</td>
								))}
								<td className="p-2">
									<Button
										variant="destructive"
										size="sm"
										onClick={() =>
											onChangeAction(rows.filter((_, i) => i !== idx))
										}>
										Delete
									</Button>
								</td>
							</tr>
						))}
						{rows.length === 0 ? (
							<tr>
								<td
									colSpan={columns.length + 1}
									className="text-muted-foreground p-6 text-center">
									No rows yet.
								</td>
							</tr>
						) : null}
					</tbody>
				</table>
			</div>
		</div>
	)
}
