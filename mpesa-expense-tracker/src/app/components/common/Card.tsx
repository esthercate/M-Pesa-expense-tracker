import React from 'react';

type Props = {
	title: string;
	value: string | number;
	icon?: React.ReactNode;
	tone?: 'default' | 'accent';
};

const Card: React.FC<Props> = ({ title, value, icon, tone = 'default' }) => {
	return (
		<div className="flex w-full flex-col gap-4 rounded-card border border-hairline bg-surface p-6 transition-colors hover:border-hairline-strong">
			<div className="flex items-center gap-2.5">
				{icon}
				<h2 className="text-sm font-medium text-muted">{title}</h2>
			</div>
			<p
				className={`tabular font-display text-2xl font-semibold tracking-tight ${
					tone === 'accent' ? 'text-accent' : 'text-ink'
				}`}
			>
				{value}
			</p>
		</div>
	);
};

export default Card;
