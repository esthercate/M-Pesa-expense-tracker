/**
 * Pure aggregation over parsed M-Pesa transactions.
 *
 * No React and no ExcelJS in here — the on-screen summary and the Summary sheet
 * in the workbook both call this, so the two can never disagree.
 */

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

/** "2025-07-01" → "1 Jul 2025". Split, not parsed, so no timezone can shift it. */
export function formatStatementDate(iso, withYear = true) {
	if (!iso) return '';
	const [y, m, d] = iso.split('-');
	const base = `${Number(d)} ${MONTHS[Number(m) - 1]}`;
	return withYear ? `${base} ${y}` : base;
}

/**
 * Which rows are transaction charges.
 *
 * CHANGED: narrowed back to "charge"/"charges" only. Safaricom's published
 * consumer tariffs use "charge" and "transaction charges" throughout and never
 * "fee", so matching `fee` was catching rows that are not charges. Airtime and
 * data purchases are listed as FREE, which is a second reason no Recharge row
 * should ever be counted here.
 *
 * Two guards remain:
 *   1. Whole words only — \bcharge\b does not match "Recharge", because there
 *      is no word boundary between "Re" and "charge".
 *   2. A charge is always money out and never money in, so a row with anything
 *      in the paid-in column is disqualified regardless of its wording.
 */
const FEE_WORDS = /\b(charge|charges)\b/i;

export const isChargeRow = (tx) =>
	FEE_WORDS.test(tx.details || '') &&
	(tx.withdrawn || 0) > 0 &&
	(tx.paidIn || 0) === 0;

/** "KES 12,450.00" */
export function formatKES(amount) {
	return `KES ${Number(amount || 0).toLocaleString('en-KE', {
		minimumFractionDigits: 2,
		maximumFractionDigits: 2,
	})}`;
}

/**
 * Statements can arrive newest-first, which would make the closing balance the
 * OLDEST balance. Sort a copy by date when every row parses; when any row does
 * not, leave the order alone rather than shuffling it half-blind.
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

/** Money in/out per calendar month, oldest first. */
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
	const ordered = inDateOrder(transactions);

	const dates = ordered
		.map((tx) => parseStatementDate(tx.date))
		.filter(Boolean)
		.sort((a, b) => a - b);

	const totalIn = ordered.reduce((sum, tx) => sum + (tx.paidIn || 0), 0);
	const totalOut = ordered.reduce((sum, tx) => sum + (tx.withdrawn || 0), 0);

	const chargeRows = ordered.filter(isChargeRow);
	const charges = chargeRows.reduce((sum, tx) => sum + (tx.withdrawn || 0), 0);

	// CHANGED: temporary [fees] console.log removed.

	const closing = ordered.length ? ordered[ordered.length - 1].balance || 0 : 0;

	const start = dates.length ? toDateStamp(dates[0]) : null;
	const end = dates.length ? toDateStamp(dates[dates.length - 1]) : null;

	// Charges as a share of actual SPENDING, not of spending-plus-charges —
	// dividing by totalOut would put the charges inside their own denominator.
	const spendExcludingFees = totalOut - charges;

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
		chargeCount: chargeRows.length,
		chargeShare:
			spendExcludingFees > 0 ? (charges / spendExcludingFees) * 100 : 0,
		closing,
		byMonth: groupByMonth(ordered),
	};
}
