'use client';
import React from 'react';
import {
	BarChart,
	Bar,
	XAxis,
	YAxis,
	Tooltip,
	Legend,
	ResponsiveContainer,
} from 'recharts';

const data = [
	{ month: 'Jan', income: 15000, expense: 20000 },
	{ month: 'Feb', income: 12000, expense: 8000 },
	{ month: 'Mar', income: 18000, expense: 19000 },
	{ month: 'Apr', income: 16000, expense: 11000 },
];

const IncomeExpenseChart: React.FC = () => {
	return (
		<div className="bg-white shadow-sm border border-gray-100 rounded-xl p-5 w-full">
			<h2 className="text-lg font-semibold mb-4 text-gray-700">
				Income vs Expense (Monthly)
			</h2>
			<ResponsiveContainer
				width="100%"
				height={300}
			>
				<BarChart data={data}>
					<XAxis dataKey="month" />
					<YAxis />
					<Tooltip />
					<Legend />
					<Bar
						dataKey="income"
						fill="#3b82f6"
						name="Income"
					/>
					<Bar
						dataKey="expense"
						fill="#ef4444"
						name="Expense"
					/>
				</BarChart>
			</ResponsiveContainer>
		</div>
	);
};

export default IncomeExpenseChart;
