import React from 'react';
import { formatKES } from '@/utils/summarise';
import type { StatementStats } from '@/types/mpesa';

// Single series, so one neutral hue and no legend — emerald and amber stay
// reserved for money and fees everywhere else in the app.
const MonthlySpend = ({ stats }: { stats: StatementStats }) => {
	// A bar chart of one month is just a line.
	if (stats.byMonth.length < 2) return null;

	const peakSpend = Math.max(...stats.byMonth.map((month) => month.totalOut));

	return (
		<div className="mt-4 rounded-card border border-hairline bg-surface p-7">
			<h3 className="font-display text-base font-semibold tracking-tight text-ink">
				What you spent each month
			</h3>
			<p className="mt-1 text-sm text-faint">Money out, by calendar month.</p>

			<div className="mt-6 flex flex-col gap-5">
				{stats.byMonth.map((month) => (
					<div
						key={month.key}
						title={`${month.label} · ${month.count} transactions · in ${formatKES(
							month.totalIn,
						)} · out ${formatKES(month.totalOut)}`}
					>
						<div className="flex items-baseline justify-between gap-4">
							<span className="text-sm text-muted">{month.label}</span>
							<span className="tabular font-display text-sm font-medium text-ink">
								{formatKES(month.totalOut)}
							</span>
						</div>
						<div className="mt-2 h-2 w-full rounded-full bg-white/5">
							<div
								className="h-2 rounded-full bg-white/30"
								style={{
									width: `${
										peakSpend > 0 ? (month.totalOut / peakSpend) * 100 : 0
									}%`,
								}}
							/>
						</div>
					</div>
				))}
			</div>
		</div>
	);
};

export default MonthlySpend;
