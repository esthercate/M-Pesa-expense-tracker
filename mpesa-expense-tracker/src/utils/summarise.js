const MONTHS = [
	'Jan',
	'Feb',
	'Mar',
	'Apr',
	'May',
	'Jun',
	'Jul',
	'Aug',
	'Sep',
	'Oct',
	'Nov',
	'Dec',
];

const pad = (n) => String(n).padStart(2, '0');

/** Parse "YYYY-MM-DD HH:MM:SS" into a Date. Returns null when unparseable. */
export function parseStatementDate(value) {
	if (!value) return null;
	const date = new Date(String(value).trim().replace(' ', 'T'));
	return Number.isNaN(date.getTime()) ? null : date;
}

/** YYYY-MM-DD in local time (toISOString would shift us off EAT). */
export function toDateStamp(date) {
	return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}`;
}

/**
 * CHANGED: new — "2025-07-01" → "1 Jul 2025". Splits the string rather than
 * using new Date(), so no timezone can shift the day.
 */
export function formatStatementDate(iso, withYear = true) {
	if (!iso) return '';
	const [y, m, d] = iso.split('-');
	const base = `${Number(d)} ${MONTHS[Number(m) - 1]}`;
	return withYear ? `${base} ${y}` : base;
}

/** Safaricom's own fee rows. NOTE: verify this against a real statement. */
export const isChargeRow = (tx) => /charge/i.test(tx.details || '');

/** "KES 12,450.00" */
export function formatKES(amount) {
	return `KES ${Number(amount || 0).toLocaleString('en-KE', {
		minimumFractionDigits: 2,
		maximumFractionDigits: 2,
	})}`;
}

/**
 * CHANGED: new — statements can arrive newest-first, which made the closing
 * balance the OLDEST balance. Sort a copy by date when every row parses; when
 * any row doesn't, leave the order alone rather than shuffling it half-blind.
 */
function inDateOrder(transactions) {
	const decorated = transactions.map((tx, index) => ({
		tx,
		date: parseStatementDate(tx.date),
		index,
	}));

	if (decorated.some((entry) => !entry.date)) return transactions;

	return decorated
		.sort((a, b) => a.date - b.date || a.index - b.index)
		.map((entry) => entry.tx);
}

/**
 * CHANGED: new — money in/out per calendar month, oldest first. This is what
 * people actually came to find out; a single figure across six months isn't
 * useful for budgeting.
 */
function groupByMonth(transactions) {
	const months = new Map();

	for (const tx of transactions) {
		const date = parseStatementDate(tx.date);
		if (!date) continue;

		const key = `${date.getFullYear()}-${pad(date.getMonth() + 1)}`;
		const existing = months.get(key) || {
			key,
			label: `${MONTHS[date.getMonth()]} ${date.getFullYear()}`,
			totalIn: 0,
			totalOut: 0,
			count: 0,
		};

		existing.totalIn += tx.paidIn || 0;
		existing.totalOut += tx.withdrawn || 0;
		existing.count += 1;
		months.set(key, existing);
	}

	return [...months.values()]
		.sort((a, b) => a.key.localeCompare(b.key))
		.map((month) => ({ ...month, net: month.totalIn - month.totalOut }));
}

export function summariseTransactions(transactions = []) {
	// CHANGED: everything below now works from the date-ordered copy
	const ordered = inDateOrder(transactions);

	const dates = ordered
		.map((tx) => parseStatementDate(tx.date))
		.filter(Boolean)
		.sort((a, b) => a - b);

	const totalIn = ordered.reduce((sum, tx) => sum + (tx.paidIn || 0), 0);
	const totalOut = ordered.reduce((sum, tx) => sum + (tx.withdrawn || 0), 0);
	const charges = ordered
		.filter(isChargeRow)
		.reduce((sum, tx) => sum + (tx.withdrawn || 0), 0);

	const closing = ordered.length ? ordered[ordered.length - 1].balance || 0 : 0;

	const start = dates.length ? toDateStamp(dates[0]) : null;
	const end = dates.length ? toDateStamp(dates[dates.length - 1]) : null;

	return {
		start,
		end,
		periodLabel: start
			? start === end
				? start
				: `${start} to ${end}`
			: 'Unknown',
		count: ordered.length,
		totalIn,
		totalOut,
		net: totalIn - totalOut,
		charges,
		chargeShare: totalOut > 0 ? (charges / totalOut) * 100 : 0,
		closing,
		byMonth: groupByMonth(ordered),
	};
}
