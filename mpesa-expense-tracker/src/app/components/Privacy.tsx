'use client';
import React, { useEffect } from 'react';

type PrivacyProps = {
	isOpen: boolean;
	onClose: () => void;
};

const points = [
	{
		label: 'No data leaves your device',
		body: 'All file processing happens directly in your web browser. Your M-Pesa statement is never uploaded to any server, stored in any database, or shared with third parties.',
	},
	{
		label: 'No storage or tracking',
		body: 'We do not keep copies of your files. We do not log, track, or record the contents of your statements. Once you close or refresh the page, your file and the converted results are gone.',
	},
	{
		label: 'No account required',
		body: 'You do not need to create an account or provide any personal details to use this tool.',
	},
	{
		label: 'Secure by design',
		body: 'Because the entire conversion runs locally on your device, there is no risk of your financial information being intercepted in transit.',
	},
	{
		label: 'Transparency',
		body: 'If we ever introduce features that involve storing or transmitting data, this notice will be updated to explain exactly how before anything changes.',
	},
];

const Privacy = ({ isOpen, onClose }: PrivacyProps) => {
	// CHANGED: new — Escape closes the modal
	useEffect(() => {
		if (!isOpen) return;
		const onKey = (e: KeyboardEvent) => {
			if (e.key === 'Escape') onClose();
		};
		window.addEventListener('keydown', onKey);
		return () => window.removeEventListener('keydown', onKey);
	}, [isOpen, onClose]);

	if (!isOpen) return null;

	return (
		<div
			className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 px-4 backdrop-blur-sm"
			onClick={onClose}
		>
			<div
				className="max-h-[80vh] w-full max-w-2xl overflow-y-auto rounded-card border border-hairline bg-surface p-7 md:p-9"
				onClick={(e) => e.stopPropagation()}
			>
				<h2 className="font-display text-2xl font-semibold tracking-tight text-ink">
					Privacy notice
				</h2>
				<p className="mt-4 text-[15px] leading-relaxed text-muted">
					When you use this converter, your data stays entirely under your
					control.
				</p>

				<div className="mt-7 flex flex-col gap-5">
					{points.map((point) => (
						<div key={point.label}>
							<p className="text-[15px] font-semibold text-ink">
								{point.label}
							</p>
							<p className="mt-1.5 text-[15px] leading-relaxed text-muted">
								{point.body}
							</p>
						</div>
					))}
				</div>

				<div className="mt-8 flex justify-end">
					<button
						onClick={onClose}
						className="h-11 cursor-pointer rounded-control bg-accent px-6 text-[15px] font-semibold text-accent-ink transition hover:opacity-90"
					>
						Close
					</button>
				</div>
			</div>
		</div>
	);
};;

export default Privacy;
