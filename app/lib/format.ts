type FormatNumberOptions = {
	maximumFractionDigits?: number
	minimumFractionDigits?: number
	useGrouping?: boolean
	fallback?: string
}

function isFiniteNumber(value: unknown): value is number {
	return typeof value === 'number' && Number.isFinite(value)
}

function roundTo(value: number, maxFractionDigits: number): number {
	if (maxFractionDigits <= 0) return Math.round(value)
	const factor = 10 ** maxFractionDigits
	return Math.round(value * factor) / factor
}

export function formatNumber(
	value: number | null | undefined,
	{
		maximumFractionDigits = 0,
		minimumFractionDigits = 0,
		useGrouping = true,
		fallback = '—'
	}: FormatNumberOptions = {}
): string {
	if (!isFiniteNumber(value)) return fallback

	const rounded = roundTo(value, maximumFractionDigits)
	return new Intl.NumberFormat('en-US', {
		maximumFractionDigits,
		minimumFractionDigits,
		useGrouping
	}).format(rounded)
}

export function formatHours(value: number | null | undefined): string {
	return formatNumber(value, {maximumFractionDigits: 2, fallback: '0'})
}

export function formatMiles(value: number | null | undefined): string {
	return formatNumber(value, {maximumFractionDigits: 2, fallback: '0'})
}

export function formatFeet(value: number | null | undefined): string {
	return formatNumber(value, {maximumFractionDigits: 0, fallback: '0'})
}

export function formatPercent(value: number | null | undefined): string {
	if (!isFiniteNumber(value)) return ''
	return `${formatNumber(value, {
		maximumFractionDigits: 1,
		minimumFractionDigits: 0,
		fallback: ''
	})}%`
}

export function toInputString(
	value: number | null | undefined,
	maximumFractionDigits: number
): string {
	if (!isFiniteNumber(value)) return ''
	const rounded = roundTo(value, maximumFractionDigits)
	if (maximumFractionDigits <= 0) return String(Math.round(rounded))
	const fixed = rounded.toFixed(maximumFractionDigits)
	return fixed.replace(/\.0+$/, '').replace(/(\.\d*[1-9])0+$/, '$1')
}
