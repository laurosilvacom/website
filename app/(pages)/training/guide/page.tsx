'use client'

export default function TrainingGuidePage() {
	return (
		<div className="space-y-6">
			<div className="space-y-1">
				<h1 className="text-xl font-semibold">How to use this training plan</h1>
				<p className="text-muted-foreground text-sm">
					A simple guide for using the Training app day-to-day.
				</p>
			</div>

			<div className="space-y-4 text-sm leading-6">
				<section className="space-y-2">
					<h2 className="text-base font-semibold">The big idea</h2>
					<p>
						Most of your results come from doing a few things well, over and
						over: consistency, enough easy volume, and a small number of
						purposeful hard sessions. The goal of this system is to keep your
						“big rocks” visible and measurable.
					</p>
					<ul className="list-disc space-y-1 pl-5">
						<li>Use the log to protect consistency.</li>
						<li>Use weekly totals to keep volume honest.</li>
						<li>
							Use notes/flags to catch patterns (fatigue, injury, travel,
							stress).
						</li>
					</ul>
				</section>

				<section className="space-y-2">
					<h2 className="text-base font-semibold">How the sheets connect</h2>
					<ul className="list-disc space-y-1 pl-5">
						<li>
							<b>TD</b> is the source of truth. Enter training here.
						</li>
						<li>
							<b>Totals</b> summarizes TD for any date range.
						</li>
						<li>
							<b>Season</b> buckets TD into weeks starting from your Season
							Start.
						</li>
					</ul>
					<p className="text-muted-foreground">
						If TD is accurate, everything else becomes accurate.
					</p>
				</section>

				<section className="space-y-2">
					<h2 className="text-base font-semibold">
						Daily workflow (2 minutes)
					</h2>
					<ol className="list-decimal space-y-1 pl-5">
						<li>Add the day (or edit an existing row).</li>
						<li>
							Enter <b>Total (h)</b>, plus either <b>Dist (mi)</b> or{' '}
							<b>Elev (ft)</b>
							when relevant.
						</li>
						<li>
							If it matters, split time into <b>Z2</b> and <b>Z3</b>.
						</li>
						<li>
							Tag the session with <b>Sport</b>, <b>Stimuli</b>, and{' '}
							<b>Surface</b>
							(keep it simple).
						</li>
						<li>
							Use the “human” columns to track the stuff that explains
							performance:
							<b>Travel</b>, <b>Injury</b>, <b>SIC</b>, <b>Feeling</b>,{' '}
							<b>Mood</b>, and a short description.
						</li>
					</ol>
				</section>

				<section className="space-y-2">
					<h2 className="text-base font-semibold">Weekly check-in</h2>
					<ul className="list-disc space-y-1 pl-5">
						<li>
							Open <b>Season</b> and make sure the current week’s totals match
							your intent.
						</li>
						<li>
							Open <b>Totals</b> for a recent range (last 7–14 days) to see if
							your workload and “hard session” count are drifting.
						</li>
						<li>
							If travel/injury/low mood is stacking up, reduce intensity first,
							then volume.
						</li>
					</ul>
				</section>

				<section className="space-y-2">
					<h2 className="text-base font-semibold">Using the other pages</h2>
					<ul className="list-disc space-y-1 pl-5">
						<li>
							<b>Races</b>: keep a simple calendar of key events and notes.
						</li>
						<li>
							<b>Metabolism</b>: track fueling-related inputs and decisions.
						</li>
						<li>
							<b>VO2 Tests</b> / <b>Blood Tests</b>: record periodic testing so
							you can connect training blocks to outcomes.
						</li>
						<li>
							<b>Injuries</b> / <b>Close Calls</b>: log issues early so you can
							spot repeat patterns.
						</li>
						<li>
							<b>Activities</b>: capture extra context (strength work, hikes,
							etc.).
						</li>
					</ul>
				</section>

				<section className="space-y-2">
					<h2 className="text-base font-semibold">
						A practical way to periodize
					</h2>
					<p>
						A simple structure is to build in blocks, where most of the work is
						easy volume, and each week includes a small number of focused
						sessions. Use TD “Stimuli” + the weekly totals to ensure you’re
						actually doing the block you think you’re doing.
					</p>
				</section>
			</div>
		</div>
	)
}
