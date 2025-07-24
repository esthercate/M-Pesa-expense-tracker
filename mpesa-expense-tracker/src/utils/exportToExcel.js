import * as XLSX from 'xlsx';

export function exportMpesaToExcel(summary, transactions) {
	const wb = XLSX.utils.book_new();

	// 1. Convert summary array to worksheet
	const summarySheet = XLSX.utils.json_to_sheet(summary);
	XLSX.utils.book_append_sheet(wb, summarySheet, 'Summary');

	// 2. Convert transactions array to worksheet
	const txSheet = XLSX.utils.json_to_sheet(transactions);
	XLSX.utils.book_append_sheet(wb, txSheet, 'Transactions');

	// 3. Save the workbook
	XLSX.writeFile(wb, 'mpesa_statement.xlsx');
}
