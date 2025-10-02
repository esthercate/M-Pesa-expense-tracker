// components/PrivacyModal.tsx
import React from 'react';

type PrivacyProps = {
	isOpen: boolean;
	onClose: () => void;
};

const Privacy = ({ isOpen, onClose }: PrivacyProps) => {
	if (!isOpen) return null;

	return (
		<div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center px-4">
			<div className="bg-white rounded-lg p-6 max-w-2xl w-full shadow-lg overflow-y-auto max-h-[80vh]">
				<h2 className="text-xl font-bold mb-4 text-gray-800">Privacy Notice</h2>
				<div className="space-y-4 text-gray-700 text-sm leading-relaxed">
					<p>
						We take your privacy seriously. When you use our M-Pesa PDF-to-Excel
						converter, your data remains entirely under your control.
					</p>

					<ul className="list-disc list-inside space-y-2">
						<li>
							<strong>No Data Leaves Your Device:</strong> All file processing
							happens directly in your web browser. Your M-Pesa statement is
							never uploaded to any server, stored in any database, or shared
							with third parties.
						</li>
						<li>
							<strong>No Storage or Tracking:</strong> We do not keep copies of
							your files. We do not log, track, or record the contents of your
							statements. Once you close or refresh the page, your file and the
							converted results are gone.
						</li>
						<li>
							<strong>No Account Required:</strong> You do not need to create an
							account or provide any personal details to use this tool.
						</li>
						<li>
							<strong>Secure by Design:</strong> Since the entire conversion
							runs locally on your device, there is no risk of your financial
							information being intercepted online.
						</li>
						<li>
							<strong>Transparency:</strong> If we ever introduce features that
							involve storing or transmitting data (e.g., cloud storage, user
							accounts), we will update this privacy statement and clearly
							explain how your data will be handled.
						</li>
					</ul>

					<p>
						By using this tool, you can be confident that your financial
						information stays private, secure, and in your hands at all times.
					</p>
				</div>

				<div className="mt-6 text-right">
					<button
						onClick={onClose}
						className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
					>
						Close
					</button>
				</div>
			</div>
		</div>
	);
};

export default Privacy;
