import {config} from 'dotenv'

// Loads local env so this script behaves like Next runtime.
config({path: '.env.local'})

import {
	processWorkshopDripQueue,
	inspectWorkshopDripQueue
} from '@/lib/workshop-newsletter'

function sleep(ms: number) {
	return new Promise((resolve) => setTimeout(resolve, ms))
}

async function main() {
	// For test mode: run every 15 seconds by default (emails are 2 min apart)
	const intervalMs = Number(
		process.env.WORKSHOP_DRIP_CRON_INTERVAL_MS || 15_000
	)
	const maxMinutes = Number(process.env.WORKSHOP_DRIP_CRON_MAX_MINUTES || 15)
	const endAt = Date.now() + maxMinutes * 60_000

	if (!Number.isFinite(intervalMs) || intervalMs < 1000) {
		throw new Error('WORKSHOP_DRIP_CRON_INTERVAL_MS must be >= 1000')
	}
	if (!Number.isFinite(maxMinutes) || maxMinutes <= 0) {
		throw new Error('WORKSHOP_DRIP_CRON_MAX_MINUTES must be > 0')
	}

	console.log('\n🚀 Workshop Drip Cron Simulator Started')
	console.log('━'.repeat(50))
	console.log(`Interval:     ${intervalMs / 1000}s`)
	console.log(`Max runtime:  ${maxMinutes} minutes`)
	console.log(`Started at:   ${new Date().toISOString()}`)
	console.log('━'.repeat(50))
	console.log('\nNote: In test mode, ALL emails are sent immediately')
	console.log('      upon confirmation. This script is for production use.\n')

	// Show initial queue state
	const initialState = await inspectWorkshopDripQueue()
	if ('error' in initialState) {
		console.error('❌ Redis not configured:', initialState.error)
		process.exit(1)
	}
	console.log(
		`📋 Initial queue: ${initialState.totalQueued} items (${initialState.dueNow} due now)\n`
	)

	let tick = 0
	while (Date.now() < endAt) {
		tick += 1
		const started = Date.now()
		const result = await processWorkshopDripQueue()
		const elapsedMs = Date.now() - started

		const timestamp = new Date().toLocaleTimeString()
		if (result.sent > 0 || result.failed > 0) {
			console.log(
				`[${timestamp}] ✉️  Tick ${tick}: sent=${result.sent}, failed=${result.failed}, remaining=${result.remaining} (${elapsedMs}ms)`
			)
		} else {
			console.log(
				`[${timestamp}] ⏳ Tick ${tick}: nothing due, remaining=${result.remaining}`
			)
		}

		// Show next due time if there are remaining items
		if (result.remaining > 0 && tick % 4 === 0) {
			const state = await inspectWorkshopDripQueue()
			if (!('error' in state) && state.items.length > 0) {
				const nextDue = state.items.find((i) => !i.isDue)
				if (nextDue) {
					const secsUntil = Math.round(nextDue.delayMs / 1000)
					console.log(`     ⏰ Next email due in ${secsUntil}s`)
				}
			}
		}

		await sleep(Math.max(0, intervalMs - elapsedMs))
	}

	console.log('\n✅ Cron simulator finished\n')
}

main().catch((error) => {
	console.error(error)
	process.exit(1)
})
