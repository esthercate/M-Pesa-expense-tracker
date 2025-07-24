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
