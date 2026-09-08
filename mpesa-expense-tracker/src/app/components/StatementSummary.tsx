'use client';
import React from 'react';
import { useStore } from '@/store/store';
import { summariseTransactions } from '@/utils/summarise';
import type { StatementStats } from '@/types/mpesa';
import StatementMeta from './summary/StatementMeta';
import StatTiles from './summary/StatTiles';
import MonthlySpend from './summary/MonthlySpend';
import ChargesCallout from './summary/ChargesCallout';

// CHANGED: was ~150 lines doing four jobs. It now reads the store, computes the
// stats once, and hands them down. Each child owns its own "should I render?"
// rule, so there are no conditionals left here.
const StatementSummary = () => {
	const { transactions } = useStore();

	// Nothing parsed yet — stay out of the way entirely.
	if (!transactions.length) return null;

	const stats: StatementStats = summariseTransactions(transactions);

	return (
		<section className="mt-10 w-full">
			<StatementMeta stats={stats} />
			<StatTiles stats={stats} />
			<MonthlySpend stats={stats} />
			<ChargesCallout stats={stats} />
			<p className="mt-4 text-xs text-faint">
				Calculated on your own device. Your statement was never uploaded.
			</p>
		</section>
	);
};

export default StatementSummary;
