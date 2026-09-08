export type SummaryEntry = {
	transactionType: string;
	paidIn: number;
	paidOut: number;
};

export type TransactionEntry = {
	receipt: string;
	date: string;
	details: string;
	status: string;
	paidIn: number;
	withdrawn: number;
	balance: number;
};

export type MonthlyTotals = {
	key: string; // "2025-07"
	label: string; // "Jul 2025"
	totalIn: number;
	totalOut: number;
	net: number;
	count: number;
};

export type StatementStats = {
	start: string | null;
	end: string | null;
	periodLabel: string;
	count: number;
	totalIn: number;
	totalOut: number;
	net: number;
	charges: number;
	chargeShare: number;
	closing: number;
	byMonth: MonthlyTotals[];
};
