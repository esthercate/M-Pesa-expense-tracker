"use client"
import React, { useState } from 'react';
import Privacy from './Privacy'; // adjust path if needed

type Props = {};

const Footer = (props: Props) => {
	const [showModal, setShowModal] = useState(false);

	return (
		<>
			<footer className="w-full px-4 py-4 flex flex-col sm:flex-row justify-between items-center text-sm text-gray-600 border-t border-gray-300">
				<p className="mb-2 sm:mb-0 text-center">Copyright © 2025 M-pesa Expense Tracker.</p>
				<div className="flex gap-4">
					<button
						onClick={() => setShowModal(true)}
						className="hover:text-blue-600 transition"
					>
						Privacy
					</button>
					<a
						href="/login"
						className="hover:text-blue-600 transition"
					>
						Login
					</a>
					<a
						href="/register"
						className="hover:text-blue-600 transition"
					>
						Register
					</a>
				</div>
			</footer>

			<Privacy
				isOpen={showModal}
				onClose={() => setShowModal(false)}
			/>
		</>
	);
};

export default Footer;
