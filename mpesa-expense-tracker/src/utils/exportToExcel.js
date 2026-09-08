// CHANGED: the date helpers and the overview maths now live in summarise.js,
// so the on-screen summary and this workbook can't drift apart.
import {
	parseStatementDate,
	toDateStamp,
	summariseTransactions,
} from './summarise';

const MONEY_FORMAT = '#,##0.00';
const DATETIME_FORMAT = 'yyyy-mm-dd hh:mm:ss';
const HEADER_FILL = 'FF1D4ED8'; // blue-700, matches the site
const HEADER_FONT = { bold: true, color: { argb: 'FFFFFFFF' }, size: 11 };

// CHANGED: parseStatementDate(), toDateStamp(), isChargeRow() and
// buildOverview() were deleted from this file — they're imported above now.

/** Name the file after the statement's own date range, not a fixed string. */
function buildFileName(transactions) {
	const dates = transactions
		.map((tx) => parseStatementDate(tx.date))
		.filter(Boolean)
		.sort((a, b) => a - b);

	if (!dates.length) return `mpesa-statement-${toDateStamp(new Date())}.xlsx`;

	const start = toDateStamp(dates[0]);
	const end = toDateStamp(dates[dates.length - 1]);
	return start === end
		? `mpesa-statement-${start}.xlsx`
		: `mpesa-statement-${start}-to-${end}.xlsx`;
}

function styleHeaderRow(row) {
	row.font = HEADER_FONT;
	row.alignment = { vertical: 'middle' };
	row.eachCell((cell) => {
		cell.fill = {
			type: 'pattern',
			pattern: 'solid',
			fgColor: { argb: HEADER_FILL },
		};
	});
	row.height = 20;
}

function buildSummarySheet(workbook, summary, transactions) {
	const sheet = workbook.addWorksheet('Summary');
	// CHANGED: was buildOverview(transactions)
	const overview = summariseTransactions(transactions);

	sheet.columns = [
		{ key: 'label', width: 34 },
		{ key: 'a', width: 18 },
		{ key: 'b', width: 18 },
		{ key: 'c', width: 18 },
	];

	// --- Overview block ---------------------------------------------------
	const title = sheet.addRow(['M-Pesa Statement Overview']);
	title.font = { bold: true, size: 14 };
	sheet.addRow([]);

	const overviewRows = [
		// CHANGED: was overview.period
		['Statement period', overview.periodLabel],
		['Transactions', overview.count],
		['Total paid in', overview.totalIn],
		['Total paid out', overview.totalOut],
		['Net movement', overview.net],
		['Total transaction charges', overview.charges],
		['Closing balance', overview.closing],
	];

	overviewRows.forEach(([label, value]) => {
		const row = sheet.addRow([label, value]);
		row.getCell(1).font = { bold: true };
		if (typeof value === 'number' && label !== 'Transactions') {
			row.getCell(2).numFmt = MONEY_FORMAT;
		}
	});

	sheet.addRow([]);
	sheet.addRow([]);

	// --- Safaricom's transaction-type breakdown ---------------------------
	const heading = sheet.addRow(['Breakdown by transaction type']);
	heading.font = { bold: true, size: 12 };
	sheet.addRow([]);

	const headerRow = sheet.addRow([
		'Transaction Type',
		'Paid In (KES)',
		'Paid Out (KES)',
		'Net (KES)',
	]);
	styleHeaderRow(headerRow);

	const firstDataRow = headerRow.number + 1;

	summary.forEach((entry) => {
		const row = sheet.addRow([
			entry.transactionType,
			entry.paidIn || 0,
			entry.paidOut || 0,
			(entry.paidIn || 0) - (entry.paidOut || 0),
		]);
		['B', 'C', 'D'].forEach((col) => {
			row.getCell(col).numFmt = MONEY_FORMAT;
		});
	});

	if (summary.length) {
		const lastDataRow = firstDataRow + summary.length - 1;
		const totals = sheet.addRow([
			'TOTAL',
			{ formula: `SUM(B${firstDataRow}:B${lastDataRow})` },
			{ formula: `SUM(C${firstDataRow}:C${lastDataRow})` },
			{ formula: `SUM(D${firstDataRow}:D${lastDataRow})` },
		]);
		totals.font = { bold: true };
		['B', 'C', 'D'].forEach((col) => {
			totals.getCell(col).numFmt = MONEY_FORMAT;
		});
		totals.eachCell((cell) => {
			cell.border = { top: { style: 'thin' } };
		});
	}

	return sheet;
}

function buildTransactionsSheet(workbook, transactions) {
	const sheet = workbook.addWorksheet('Transactions');

	sheet.columns = [
		{ header: 'Receipt No.', key: 'receipt', width: 16 },
		{ header: 'Date', key: 'date', width: 22 },
		{ header: 'Details', key: 'details', width: 60 },
		{ header: 'Status', key: 'status', width: 14 },
		{ header: 'Paid In (KES)', key: 'paidIn', width: 16 },
		{ header: 'Withdrawn (KES)', key: 'withdrawn', width: 18 },
		{ header: 'Balance (KES)', key: 'balance', width: 16 },
	];

	styleHeaderRow(sheet.getRow(1));
	sheet.views = [{ state: 'frozen', ySplit: 1 }];

	transactions.forEach((tx) => {
		const parsedDate = parseStatementDate(tx.date);
		const row = sheet.addRow({
			receipt: tx.receipt,
			date: parsedDate || tx.date,
			details: tx.details,
			status: tx.status,
			paidIn: tx.paidIn || 0,
			withdrawn: tx.withdrawn || 0,
			balance: tx.balance || 0,
		});

		if (parsedDate) row.getCell('date').numFmt = DATETIME_FORMAT;
		['paidIn', 'withdrawn', 'balance'].forEach((key) => {
			row.getCell(key).numFmt = MONEY_FORMAT;
		});
		row.getCell('details').alignment = { wrapText: true, vertical: 'top' };
	});

	if (transactions.length) {
		const lastRow = transactions.length + 1;
		const totals = sheet.addRow({
			receipt: 'TOTAL',
			paidIn: { formula: `SUM(E2:E${lastRow})` },
			withdrawn: { formula: `SUM(F2:F${lastRow})` },
		});
		totals.font = { bold: true };
		['paidIn', 'withdrawn'].forEach((key) => {
			totals.getCell(key).numFmt = MONEY_FORMAT;
		});
		totals.eachCell((cell) => {
			cell.border = { top: { style: 'thin' } };
		});

		sheet.autoFilter = { from: 'A1', to: `G${lastRow}` };
	}

	return sheet;
}

/** Hand the finished workbook to the browser as a download. */
function downloadWorkbook(buffer, fileName) {
	const blob = new Blob([buffer], {
		type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
	});
	const url = URL.createObjectURL(blob);
	const link = document.createElement('a');

	link.href = url;
	link.download = fileName;
	document.body.appendChild(link);
	link.click();
	document.body.removeChild(link);

	// Give the browser a beat to start the download before revoking.
	setTimeout(() => URL.revokeObjectURL(url), 1000);
}

/**
 * @param {Array} summary       Rows from the statement's summary section.
 * @param {Array} transactions  Parsed transaction rows.
 * @returns {Promise<string>}   The filename that was downloaded.
 */
export async function exportMpesaToExcel(summary = [], transactions = []) {
	if (!transactions.length) {
		throw new Error('No transactions to export.');
	}

	// Dynamic import: ExcelJS is ~250KB and only needed once the user converts.
	// CHANGED: was `const module = ...` — `module` is reserved in webpack's
	// CommonJS scope, which fails the build under @next/next/no-assign-module-variable.
	const excelModule = await import('exceljs');
	const ExcelJS = excelModule.default || excelModule;

	const workbook = new ExcelJS.Workbook();
	workbook.creator = 'M-Pesa to Excel';
	workbook.created = new Date();

	buildSummarySheet(workbook, summary, transactions);
	buildTransactionsSheet(workbook, transactions);

	const buffer = await workbook.xlsx.writeBuffer();
	const fileName = buildFileName(transactions);
	downloadWorkbook(buffer, fileName);

	return fileName;
}
