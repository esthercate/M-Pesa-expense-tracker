/**
 * Parses the text extracted from an M-Pesa PDF statement.
 *
 * Design rule: a row we cannot read must never disappear silently. Anything the
 * parser skips is counted in `diagnostics`, which records SHAPES and COUNTS
 * only — never statement content.
 */

export const PARSER_VERSION = 2;

// Amounts may carry a leading minus: M-Pesa shows money out as negative.
const AMOUNT = String.raw`-?[\d,]+\.\d{2}`;

/**
 * CHANGED: status is CAPTURED rather than required to be "COMPLETED", and the
 * trailing amounts are 1–3 columns rather than exactly 3 — a row is usually
 * either money in or money out, and the empty cell may not survive extraction.
 */
const TRANSACTION_RE = new RegExp(
	String.raw`([A-Z0-9]{10})\s+` + // receipt
		String.raw`(\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2})\s+` + // date
		String.raw`(.+?)\s+` + // details (lazy — backtracks past uppercase words)
		String.raw`([A-Z]{3,})\s+` + // status
		String.raw`((?:${AMOUNT}\s+){0,2}${AMOUNT})`, // 1–3 amounts, balance last
	'g',
);

// Any receipt-shaped token followed by a date: a row that OUGHT to have parsed.
const RECEIPT_CANDIDATE_RE = new RegExp(
	String.raw`[A-Z0-9]{10}\s+\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2}`,
	'g',
);

/**
 * CHANGED: type names may contain hyphens, digits, ampersands and apostrophes.
 * The old `[A-Za-z\s]+?` broke on M-Shwari, KCB M-Pesa and Fuliza M-Pesa.
 */
const SUMMARY_ROW_RE = new RegExp(
	String.raw`([A-Za-z][A-Za-z0-9&.'\/ -]*?)\s+(${AMOUNT})\s+(${AMOUNT})`,
	'g',
);

const SUMMARY_SECTION_RE =
	/TRANSACTION TYPE\s+PAID IN\s+PAID OUT([\s\S]+?)TOTAL:/;

const toNumber = (token) => {
	const value = parseFloat(String(token).replace(/,/g, ''));
	return Number.isFinite(value) ? value : 0;
};

/**
 * Split the trailing amount block into money columns and the running balance.
 * The balance is always last. With two money columns we trust position; with
 * one we trust the sign, because M-Pesa writes money out as negative.
 */
function readAmounts(block, documentHasNegatives) {
	const amounts = block.trim().split(/\s+/).map(toNumber);
	const balance = amounts[amounts.length - 1];
	const money = amounts.slice(0, -1);

	if (money.length === 2) {
		return {
			paidIn: Math.abs(money[0]),
			withdrawn: Math.abs(money[1]),
			balance,
			ambiguous: false,
		};
	}

	if (money.length === 1) {
		const [value] = money;
		return {
			paidIn: value >= 0 ? value : 0,
			withdrawn: value < 0 ? Math.abs(value) : 0,
			balance,
			// A lone positive column in a statement with no negatives anywhere
			// could be either direction. Flag it rather than guess quietly.
			ambiguous: value >= 0 && !documentHasNegatives,
		};
	}

	return { paidIn: 0, withdrawn: 0, balance, ambiguous: false };
}

export function parseMpesaStatementText(rawText) {
	const summary = [];
	const transactions = [];
	const statuses = {};

	/**
	 * CHANGED: collapse every run of whitespace, newlines included, into single
	 * spaces before matching. The old regexes used `.`, which never matches a
	 * newline, so any transaction split across a line or page boundary was
	 * dropped without trace.
	 */
	const flat = String(rawText || '').replace(/\s+/g, ' ');
	const documentHasNegatives = /-[\d,]+\.\d{2}/.test(flat);

	// --- Summary section --------------------------------------------------
	const summarySectionMatch = flat.match(SUMMARY_SECTION_RE);

	if (summarySectionMatch) {
		for (const match of summarySectionMatch[1].matchAll(SUMMARY_ROW_RE)) {
			const [, type, paidIn, paidOut] = match;
			summary.push({
				transactionType: type.trim(),
				paidIn: Math.abs(toNumber(paidIn)),
				paidOut: Math.abs(toNumber(paidOut)),
			});
		}
	}

	// --- Transactions -----------------------------------------------------
	let ambiguousRows = 0;

	for (const match of flat.matchAll(TRANSACTION_RE)) {
		const [, receipt, date, details, status, amountBlock] = match;
		const amounts = readAmounts(amountBlock, documentHasNegatives);

		if (amounts.ambiguous) ambiguousRows += 1;
		statuses[status] = (statuses[status] || 0) + 1;

		transactions.push({
			receipt,
			date,
			details: details.trim(),
			status, // CHANGED: was hardcoded 'COMPLETED'
			paidIn: amounts.paidIn,
			withdrawn: amounts.withdrawn,
			balance: amounts.balance,
		});
	}

	// --- Diagnostics ------------------------------------------------------
	// Shapes and counts only. Nothing here can identify a person or a payment.
	const receiptCandidates = (flat.match(RECEIPT_CANDIDATE_RE) || []).length;

	const diagnostics = {
		parserVersion: PARSER_VERSION,
		charCount: flat.length,
		summarySectionFound: Boolean(summarySectionMatch),
		summaryRowCount: summary.length,
		transactionCount: transactions.length,
		receiptCandidates,
		// The number that matters: rows that LOOK like transactions but didn't
		// parse. Anything above zero means the format has a variant we miss.
		unparsedRows: Math.max(0, receiptCandidates - transactions.length),
		documentHasNegatives,
		ambiguousRows,
		statuses,
	};

	return { summary, transactions, diagnostics };
}
