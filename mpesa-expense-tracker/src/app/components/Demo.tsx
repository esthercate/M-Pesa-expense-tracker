import React from 'react';

const steps = [
	{
		n: '01',
		title: 'Get the statement',
		body: (
			<>
				In the M-Pesa app:{' '}
				<span className="text-ink">
					M-Pesa Statement → See All → Export Statement
				</span>
				. Pick your months and generate it. Or use the PDF Safaricom emails you.
			</>
		),
	},
	{
		n: '02',
		title: 'Drop it in',
		body: (
			<>
				Your browser opens and reads it locally, so it&apos;s fast and the file
				goes nowhere. Your totals appear immediately.
			</>
		),
	},
	{
		n: '03',
		title: 'Download the Excel',
		body: (
			<>
				Named after its own date range, so a folder of them never overwrites
				last month&apos;s.
			</>
		),
	},
];

const Demo = () => {
	return (
		<section
			id="demo"
			className="px-5 py-10 md:px-8"
		>
			<div className="mx-auto max-w-6xl">
				<h2 className="font-display text-3xl font-semibold tracking-tight text-ink md:text-4xl">
					How it works
				</h2>
				<p className="mt-3 text-base text-muted">
					Three steps, about a minute. No sign-up in the middle of it.
				</p>

				<div className="mt-12 grid grid-cols-1 gap-5 md:grid-cols-3">
					{steps.map((step) => (
						<div
							key={step.n}
							className="rounded-card border border-hairline bg-white/[0.025] p-7"
						>
							<p className="font-display text-sm font-semibold text-accent">
								{step.n}
							</p>
							<p className="mt-4 text-lg font-semibold text-ink">
								{step.title}
							</p>
							<p className="mt-2.5 text-sm leading-relaxed text-muted">
								{step.body}
							</p>
						</div>
					))}
				</div>
			</div>
		</section>
	);
};

export default Demo;
