'use client';
import React, { useState } from 'react';
import Privacy from './Privacy';

const Footer = () => {
	const [showModal, setShowModal] = useState(false);

	return (
		<>
			<footer className="border-t border-hairline px-5 py-8 md:px-8">
				<div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 sm:flex-row">
					<p className="mt-1 text-xs text-faint">
						Built in Nairobi by Catherine Vuthi · © 2026
					</p>
					<div className="flex items-center gap-6 text-[13px]">
						<a
							href="https://github.com/esthercate"
							target="_blank"
							rel="noopener noreferrer"
							className="text-muted transition hover:text-ink"
						>
							GitHub
						</a>
						<a
							href="https://www.linkedin.com/in/catherine-esther-vuthi/"
							target="_blank"
							rel="noopener noreferrer"
							className="text-muted transition hover:text-ink"
						>
							LinkedIn
						</a>
						<button
							onClick={() => setShowModal(true)}
							className="cursor-pointer text-muted transition hover:text-ink"
						>
							Privacy
						</button>
					</div>
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
