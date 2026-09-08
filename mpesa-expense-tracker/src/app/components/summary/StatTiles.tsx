import React from 'react';
import {
	FiTrendingUp,
	FiTrendingDown,
	FiActivity,
	FiCreditCard,
} from 'react-icons/fi';
import Card from '../common/Card';
import { formatKES } from '@/utils/summarise';
import type { StatementStats } from '@/types/mpesa';

type Tile = {
	title: string;
	value: string;
	icon: React.ReactNode;
	tone?: 'default' | 'accent';
};

// Money out leads — spending is what people opened the tool to find out.
const StatTiles = ({ stats }: { stats: StatementStats }) => {
	const tiles: Tile[] = [
		{
			title: 'Money out',
			value: formatKES(stats.totalOut),
			icon: <FiTrendingDown className="h-4 w-4 text-muted" />,
		},
		{
			title: 'Money in',
			value: formatKES(stats.totalIn),
			icon: <FiTrendingUp className="h-4 w-4 text-muted" />,
		},
		{
			title: 'Net movement',
			value: formatKES(stats.net),
			icon: <FiActivity className="h-4 w-4 text-muted" />,
			tone: stats.net >= 0 ? 'accent' : 'default',
		},
		{
			title: 'Closing balance',
			value: formatKES(stats.closing),
			icon: <FiCreditCard className="h-4 w-4 text-muted" />,
		},
	];

	return (
		<div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
			{tiles.map((tile) => (
				<Card
					key={tile.title}
					title={tile.title}
					value={tile.value}
					icon={tile.icon}
					tone={tile.tone}
				/>
			))}
		</div>
	);
};

export default StatTiles;
