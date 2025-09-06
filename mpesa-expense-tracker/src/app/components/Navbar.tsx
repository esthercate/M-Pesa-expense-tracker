'use client';
import { GiExpense } from 'react-icons/gi';
import { HiMenu, HiX } from 'react-icons/hi';
import React, { useState } from 'react';
import Privacy from './Privacy'; // Modal component
import Link from 'next/link';

type Props = {};

const Navbar = (props: Props) => {
	const [showModal, setShowModal] = useState(false);
	const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

	const toggleMobileMenu = () => setMobileMenuOpen((prev) => !prev);

	return (
		<>
			<nav className="w-full px-4 md:px-10 py-4 shadow-md bg-white">
				<div className="flex items-center justify-between">
					<Link
						href="/"
						className="flex items-center gap-2 font-bold text-gray-800 hover:text-blue-600 transition"
					>
						<GiExpense size={30} />
						M-pesa Expense Tracker
					</Link>

					{/* Hamburger Button */}
					<button
						className="sm:hidden text-2xl text-blue-600"
						onClick={toggleMobileMenu}
					>
						{mobileMenuOpen ? <HiX /> : <HiMenu />}
					</button>

					{/* Desktop Nav Links */}
					<div className="hidden sm:flex items-center gap-4">
						<a
							href="/"
							className="text-gray-700 hover:text-blue-600 transition"
						>
							Upload PDF
						</a>
						<a
							href="#demo"
							className="text-gray-700 hover:text-blue-600 transition"
						>
							How it works
						</a>
						<a
							href="#pricing"
							className="text-gray-700 hover:text-blue-600 transition"
						>
							Pricing
						</a>
						<button
							onClick={() => setShowModal(true)}
							className="text-gray-700 hover:text-blue-600 transition"
						>
							Privacy
						</button>
						<Link
							href="/#cta"
							className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
						>
							Join Waitlist
						</Link>
					</div>
				</div>

				{/* Mobile Nav Links */}
				{mobileMenuOpen && (
					<div className="flex flex-col gap-2 mt-3 sm:hidden">
						<a
							href="/"
							className="text-gray-700 hover:text-blue-600 transition"
						>
							Upload PDF
						</a>
						<a
							href="#demo"
							className="text-gray-700 hover:text-blue-600 transition"
						>
							How it works
						</a>
						<a
							href="#pricing"
							className="text-gray-700 hover:text-blue-600 transition"
						>
							Pricing
						</a>
						<button
							onClick={() => {
								setShowModal(true);
								setMobileMenuOpen(false);
							}}
							className="text-gray-700 hover:text-blue-600 transition text-left"
						>
							Privacy
						</button>
						<Link
							href="/#cta"
							className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
						>
							Join Waitlist
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
