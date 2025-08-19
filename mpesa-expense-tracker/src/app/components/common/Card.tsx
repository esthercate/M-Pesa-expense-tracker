import React from 'react';

type Props = {
	title: string;
	value: string | number;
	icon?: React.ReactNode;
};

const Card: React.FC<Props> = ({ title, value, icon }) => {
	return (
		<div className="rounded-xl shadow-sm border border-gray-100 p-5 flex flex-col gap-2 bg-white hover:shadow-md transition-shadow w-full">
			<div className="flex items-center gap-2 text-blue-500">
				{icon}
				<h2 className="text-sm font-medium text-gray-600">{title}</h2>
			</div>
			<p className="text-lg font-semibold">{value}</p>
		</div>
	);
};

export default Card;
