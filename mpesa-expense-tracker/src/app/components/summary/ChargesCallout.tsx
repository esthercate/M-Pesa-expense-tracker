import React from 'react';
import { formatKES } from '@/utils/summarise';
import type { StatementStats } from '@/types/mpesa';

// The shareable number. Below the useful figures, but still loud.
const ChargesCallout = ({ stats }: { stats: StatementStats }) => {
	if (stats.charges <= 0) return null;

	return (
		<div className="mt-4 rounded-card border border-warn-line bg-gradient-to-br from-warn-soft to-transparent p-7">
			<span className="inline-flex h-7 items-center rounded-full border border-warn-line bg-warn-soft px-3 text-xs font-semibold uppercase tracking-wider text-warn">
				Transaction charges
			</span>
			<p className="tabular mt-5 font-display text-4xl font-semibold tracking-tight text-ink md:text-5xl">
				{formatKES(stats.charges)}
			</p>
			<p className="mt-4 max-w-md text-base leading-relaxed text-muted">
				paid in M-Pesa fees over this period
				{stats.chargeShare >= 1 && (
					<>
						{' '}
						—{' '}
						<span className="font-semibold text-ink">
							{stats.chargeShare.toFixed(1)}%
						</span>{' '}
						of everything you sent out
					</>
				)}
				.
			</p>
		</div>
	);
};

export default ChargesCallout;
