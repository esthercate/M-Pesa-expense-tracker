import React from 'react';
import {
	FiCreditCard,
	FiTrendingDown,
	FiTrendingUp,
	FiActivity,
} from 'react-icons/fi';
import Card from './common/Card';
import IncomeExpenseChart from './common/IncomeExpenseChart';
import ExpenseBreakdownChart from './common/ExpenseBreakdownChart';

const Dashboard: React.FC = () => {
	const metricsData = [
		{
			title: 'Balance',
			value: 'Ksh 5,000',
			icon: <FiCreditCard className="text-blue-500 w-6 h-6" />,
		},
		{
			title: 'Total Received',
			value: 'Ksh 15,000',
			icon: <FiTrendingUp className="text-blue-500 w-6 h-6" />,
		},
		{
			title: 'Total Spend',
			value: 'Ksh 10,000',
			icon: <FiTrendingDown className="text-blue-500 w-6 h-6" />,
		},
		{
			title: 'Net Cash Flow',
			value: '+Ksh 5,000',
			icon: <FiActivity className="text-blue-500 w-6 h-6" />,
		},
	];

	return (
		<div className="flex flex-col items-center gap-5 p-4 max-w-6xl mx-auto">
			<h1 className="text-2xl text-center font-bold mb-4">Dashboard</h1>
			<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 w-full">
				{metricsData.map((metric, index) => (
					<Card
						key={index}
						title={metric.title}
						value={metric.value}
						icon={metric.icon}
					/>
				))}
			</div>
			{/* Charts */}
			<div className="grid grid-cols-1 lg:grid-cols-2 gap-6 w-full">
				<IncomeExpenseChart />
				<ExpenseBreakdownChart />
			</div>
		</div>
	);
};

export default Dashboard;
