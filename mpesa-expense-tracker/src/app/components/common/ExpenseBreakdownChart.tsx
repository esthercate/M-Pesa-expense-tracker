'use client';
import React from 'react';
import {
	PieChart,
	Pie,
	Cell,
	Tooltip,
	Legend,
	ResponsiveContainer,
} from 'recharts';

const data = [
	{ name: 'Airtime', value: 1000 },
	{ name: 'Fuliza Loan', value: 2000 },
	{ name: 'Bills', value: 3000 },
	{ name: 'Shopping', value: 4000 },
];

const COLORS = ['#3b82f6', '#ef4444', '#10b981', '#f59e0b'];

const ExpenseBreakdownChart: React.FC = () => {
	return (
		<div className="bg-white shadow-sm border border-gray-100 rounded-xl p-5 w-full">
			<h2 className="text-lg font-semibold mb-4 text-gray-700">
				Expense Breakdown
			</h2>
			<ResponsiveContainer
				width="100%"
				height={300}
			>
				<PieChart>
					<Pie
						data={data}
						cx="50%"
						cy="50%"
						outerRadius={100}
						fill="#8884d8"
						dataKey="value"
						label
					>
						{data.map((entry, index) => (
							<Cell
								key={`cell-${index}`}
								fill={COLORS[index % COLORS.length]}
							/>
						))}
					</Pie>
					<Tooltip />
					<Legend />
				</PieChart>
			</ResponsiveContainer>
		</div>
	);
};

export default ExpenseBreakdownChart;
