import React from 'react';
import { MdCancel, MdCheckCircle } from 'react-icons/md';

type Props = {};

const features = [
	{ text: 'Convert M-Pesa PDF Statement to Excel', included: true },
	{ text: 'Download Excel Statement', included: true },
	{
		text: 'Your data is processed in your browser and never leaves your device',
		included: true,
	},
	{ text: 'Analyze Expenses (Coming Soon)', included: false },
	{ text: 'No data persistence', included: false },
	{ text: 'No expense history or comparisons', included: false },
];

const Pricing = (props: Props) => {
	return (
		<div
			id="pricing"
			className="w-full max-w-4xl mx-auto md:mt-10 md:px-4"
		>
			<div className="text-center mb-12">
				<h1 className="text-3xl md:text-4xl font-bold mb-4">Pricing</h1>
				<p className="text-gray-600 max-w-xl mx-auto">
					Start tracking your M-Pesa expenses for free. Convert your statements
					and get instant insights.
				</p>
			</div>

			<div className="max-w-sm mx-auto">
				<div className="flex flex-col gap-1 bg-white rounded-2xl p-3 md:p-6 shadow-xl hover:shadow-2xl transition-shadow duration-300">
					<h2 className="text-xl font-semibold">Free</h2>
					<h1 className="text-2xl font-bold text-blue-600">Ksh. 0</h1>
					<ul className="space-y-2 text-sm text-gray-700 py-3">
						{features.map((feature, idx) => (
							<li
								key={idx}
								className="flex items-start gap-2"
							>
								<span className="">
									{feature.included ? (
										<MdCheckCircle
											size={25}
											className="text-blue-600"
										/>
									) : (
										<MdCancel
											size={25}
											className="text-red-500"
										/>
									)}
								</span>
								<span>{feature.text}</span>
							</li>
						))}
					</ul>
				</div>
			</div>
		</div>
	);
};

export default Pricing;
