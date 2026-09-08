import React from 'react';
import { FiCalendar, FiList } from 'react-icons/fi';
import { formatStatementDate } from '@/utils/summarise';
import type { StatementStats } from '@/types/mpesa';

// Heading plus the two facts that tell someone they uploaded the right file.
const StatementMeta = ({ stats }: { stats: StatementStats }) => {
	const rangeLabel = (() => {
		if (!stats.start || !stats.end) return null;
		if (stats.start === stats.end) return formatStatementDate(stats.start);
		const sameYear = stats.start.slice(0, 4) === stats.end.slice(0, 4);
		return `${formatStatementDate(stats.start, !sameYear)} – ${formatStatementDate(
			stats.end,
		)}`;
	})();

	return (
		<div className="mb-6">
			<h2 className="font-display text-xl font-semibold tracking-tight text-ink">
				Your statement at a glance
			</h2>
			<div className="mt-3 flex flex-wrap items-center gap-2">
				<span className="inline-flex items-center gap-2 rounded-full border border-hairline bg-white/[0.03] px-3 py-1.5 text-sm text-muted">
					<FiList
						size={14}
						className="text-faint"
					/>
					{stats.count} transactions
				</span>
				{rangeLabel && (
					<span className="inline-flex items-center gap-2 rounded-full border border-hairline bg-white/[0.03] px-3 py-1.5 text-sm text-muted">
						<FiCalendar
							size={14}
							className="text-faint"
						/>
						{rangeLabel}
					</span>
				)}
			</div>
		</div>
	);
};

export default StatementMeta;
