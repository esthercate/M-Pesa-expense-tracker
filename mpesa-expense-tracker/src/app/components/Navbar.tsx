'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import { HiMenu, HiX } from 'react-icons/hi';
import { FiBarChart2 } from 'react-icons/fi';
import Privacy from './Privacy'; // Modal component

const Navbar = () => {
	const [showModal, setShowModal] = useState(false);
	const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

	const toggleMobileMenu = () => setMobileMenuOpen((prev) => !prev);

	const handleSmoothScroll = (
		e: React.MouseEvent<HTMLAnchorElement>,
		targetId: string,
	) => {
		e.preventDefault();
		const targetElement = document.getElementById(targetId);
		if (targetElement) {
			targetElement.scrollIntoView({ behavior: 'smooth' });
		}
		setMobileMenuOpen(false);
	};

	return (
		<>
			<nav className="sticky top-0 z-40 w-full border-b border-hairline bg-canvas/80 backdrop-blur-md">
				<div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-3 md:px-8">
					<Link
						href="/"
						className="flex items-center gap-2.5 transition hover:opacity-80"
					>
						<span className="flex h-8 w-8 items-center justify-center rounded-[10px] border border-accent-line bg-accent-soft">
							<FiBarChart2
								size={16}
								className="text-accent"
							/>
						</span>
						<span className="font-display text-base font-semibold tracking-tight text-ink">
							Mpesa to Excel
						</span>
					</Link>

					{/* Hamburger */}
					<button
						className="flex h-11 w-11 items-center justify-center text-2xl text-muted sm:hidden"
						onClick={toggleMobileMenu}
						aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
					>
						{mobileMenuOpen ? <HiX /> : <HiMenu />}
					</button>

					{/* Desktop links */}
					<div className="hidden items-center gap-1 sm:flex">
						<Link
							href="#demo"
							className="flex h-11 items-center px-4 text-sm text-muted transition hover:text-ink"
							onClick={(e) => handleSmoothScroll(e, 'demo')}
							scroll={false}
						>
							How it works
						</Link>
						{/* CHANGED: new — the FAQ section existed but nothing led to it */}
						<Link
							href="#faq"
							className="flex h-11 items-center px-4 text-sm text-muted transition hover:text-ink"
							onClick={(e) => handleSmoothScroll(e, 'faq')}
							scroll={false}
						>
							Questions
						</Link>
						<button
							onClick={() => setShowModal(true)}
							className="flex h-11 cursor-pointer items-center px-4 text-sm text-muted transition hover:text-ink"
						>
							Privacy
						</button>
						<Link
							href="#hire"
							className="ml-2 flex h-11 items-center rounded-control border border-hairline-strong bg-white/5 px-5 text-sm font-semibold text-ink transition hover:bg-white/10"
							onClick={(e) => handleSmoothScroll(e, 'hire')}
							scroll={false}
						>
							Contact
						</Link>
					</div>
				</div>

				{/* Mobile links */}
				{mobileMenuOpen && (
					<div className="flex flex-col gap-1 border-t border-hairline px-5 py-3 sm:hidden">
						<Link
							href="#demo"
							className="flex h-11 items-center text-sm text-muted transition hover:text-ink"
							onClick={(e) => handleSmoothScroll(e, 'demo')}
							scroll={false}
						>
							How it works
						</Link>
						{/* CHANGED: new */}
						<Link
							href="#faq"
							className="flex h-11 items-center text-sm text-muted transition hover:text-ink"
							onClick={(e) => handleSmoothScroll(e, 'faq')}
							scroll={false}
						>
							Questions
						</Link>
						<button
							onClick={() => {
								setShowModal(true);
								setMobileMenuOpen(false);
							}}
							className="flex h-11 cursor-pointer items-center text-left text-sm text-muted transition hover:text-ink"
						>
							Privacy
						</button>
						<Link
							href="#hire"
							className="mt-1 flex h-11 items-center justify-center rounded-control border border-hairline-strong bg-white/5 text-sm font-semibold text-ink"
							onClick={(e) => handleSmoothScroll(e, 'hire')}
							scroll={false}
						>
							Contact
						</Link>
					</div>
				)}
			</nav>

			<Privacy
				isOpen={showModal}
				onClose={() => setShowModal(false)}
			/>
		</>
	);
};

export default Navbar;
