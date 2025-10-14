/* eslint-disable @typescript-eslint/no-unused-vars */

export function parseMpesaStatementText(rawText) {
	const summary = [];
	const transactions = [];

	const lines = rawText
		.split('\n')
		.map((line) => line.trim())
		.filter((line) => line.length > 0);

	// 1. Parse only the summary section (from TRANSACTION TYPE to TOTAL)
	const summarySectionMatch = rawText.match(
		/TRANSACTION TYPE\s+PAID IN\s+PAID OUT([\s\S]+?)TOTAL:/
	);

	if (summarySectionMatch) {
		const summaryBlock = summarySectionMatch[1];

		const summaryMatches = [
			...summaryBlock.matchAll(
				/([A-Za-z\s]+?)\s+([\d,]+\.\d{2})\s+([\d,]+\.\d{2})/g
			),
		];

		for (const match of summaryMatches) {
			const [_, type, paidIn, paidOut] = match;

			summary.push({
				transactionType: type.trim(),
				paidIn: parseFloat(paidIn.replace(/,/g, '')) || 0,
				paidOut: parseFloat(paidOut.replace(/,/g, '')) || 0,
			});
		}
	}

	// 2. Parse Detailed Transactions
	const transactionRegex =
		/([A-Z0-9]{10})\s+(\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2})\s+(.+?)\s+COMPLETED\s+([\d,]+\.\d{2})\s+([\d,]+\.\d{2})\s+([\d,]+\.\d{2})/g;

	let match;
	while ((match = transactionRegex.exec(rawText)) !== null) {
		const [_, receipt, date, details, paidIn, withdrawn, balance] = match;

		transactions.push({
			receipt,
			date,
			details: details.trim(),
			status: 'COMPLETED',
			paidIn: parseFloat(paidIn.replace(/,/g, '')),
			withdrawn: parseFloat(withdrawn.replace(/,/g, '')),
			balance: parseFloat(balance.replace(/,/g, '')),
		});
	}

	return { summary, transactions };
}
