// components/PrivacyModal.tsx
import React from 'react';

type PrivacyProps = {
	isOpen: boolean;
	onClose: () => void;
};

const Privacy = ({ isOpen, onClose }: PrivacyProps) => {
	if (!isOpen) return null;

	return (
		<div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center">
			<div className="bg-white rounded-lg p-6 max-w-md w-full shadow-lg">
				<h2 className="text-lg font-semibold mb-4">Privacy Notice</h2>
				<p className="text-gray-700">
					Your information is completely private and never leaves your browser.
					No data is sent to any server.
				</p>
				<div className="mt-6 text-right">
					<button
						onClick={onClose}
						className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
					>
						Close
					</button>
				</div>
			</div>
		</div>
	);
};

export default Privacy;
