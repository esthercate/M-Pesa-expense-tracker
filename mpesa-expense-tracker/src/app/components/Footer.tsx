"use client"
import React, { useState } from 'react';
import Privacy from './Privacy'; // adjust path if needed

type Props = {};

const Footer = (props: Props) => {
	const [showModal, setShowModal] = useState(false);

	return (
		<>
			<footer className="w-full px-4 md:px-10 py-4 flex flex-col gap-2 justify-between items-center text-sm text-gray-600 border-t border-gray-300">
				<p className="mb-2 sm:mb-0 text-center">
					Copyright © 2025 Mpesa to Excel Converter.
				</p>
				<div className="flex gap-4">
					<button
						onClick={() => setShowModal(true)}
						className="text-blue-600 transition cursor-pointer"
					>
						Privacy
					</button>
					{/* <a
						href="/login"
						className="text-blue-600 transition cursor-pointer"
					>
						Login
					</a>
					<a
						href="/register"
						className="cursor-pointer text-blue-600 transition"
					>
						Signup
					</a> */}
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
