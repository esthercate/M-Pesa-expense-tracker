import React from 'react';
// CHANGED: inline SVG paths → react-icons (Feather), matching StatementSummary
import { FiGrid, FiFilter, FiDollarSign } from 'react-icons/fi';
import type { IconType } from 'react-icons';

type Item = {
	title: string;
	body: string;
	tone: 'default' | 'warn';
	Icon: IconType;
};

const items: Item[] = [
	{
		title: 'A Summary sheet',
		body: 'Period, money in and out, net movement, closing balance, plus every transaction type broken out with its own total.',
		tone: 'default',
		Icon: FiGrid,
	},
	{
		title: 'Every row, properly typed',
		body: 'Real dates and real numbers with filters switched on — sortable and ready to pivot, not text dumped into cells.',
		tone: 'default',
		Icon: FiFilter,
	},
	{
		title: 'What the fees cost you',
		body: 'Every charge on the statement, added up and shown on screen. Most people have never seen this number for a full year.',
		tone: 'warn',
		Icon: FiDollarSign,
	},
];

const WhatYouGet = () => {
	return (
		<section className="px-5 py-20 md:px-8">
			<div className="mx-auto max-w-6xl">
				<h2 className="font-display text-3xl font-semibold tracking-tight text-ink md:text-4xl">
					What you get
				</h2>
				<p className="mt-3 text-base text-muted">
					Every conversion produces the same three things.
				</p>

				<div className="mt-12 grid grid-cols-1 gap-5 md:grid-cols-3">
					{items.map((item) => (
						<div
							key={item.title}
							className={`rounded-card bg-surface p-8 ${
								item.tone === 'warn'
									? 'border border-warn-line'
									: 'border border-hairline'
							}`}
						>
							<span
								className={`mb-6 flex h-10 w-10 items-center justify-center rounded-xl border ${
									item.tone === 'warn'
										? 'border-warn-line bg-warn-soft'
										: 'border-hairline bg-white/5'
								}`}
							>
								<item.Icon
									size={19}
									className={item.tone === 'warn' ? 'text-warn' : 'text-ink'}
								/>
							</span>
							<p className="text-lg font-semibold text-ink">{item.title}</p>
							<p className="mt-2.5 text-sm leading-relaxed text-muted">
								{item.body}
							</p>
						</div>
					))}
				</div>
			</div>
		</section>
	);
};

export default WhatYouGet;
