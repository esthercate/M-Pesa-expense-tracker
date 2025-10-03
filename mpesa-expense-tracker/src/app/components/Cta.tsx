'use client';

import React, { useState } from 'react';
import emailjs from '@emailjs/browser';
import {
	FiUserCheck,
	FiBarChart2,
	FiTrendingUp,
	FiPieChart,
} from 'react-icons/fi';
import Avatars from './Avatars';

const features = [
	{
		title: 'Sign in & Save',
		description: 'Securely log in and have your data persist across sessions.',
		icon: <FiUserCheck className="text-blue-600 text-2xl" />,
	},
	{
		title: 'Dashboard',
		description:
			'A central place to view and explore your M-Pesa spending history.',
		icon: <FiBarChart2 className="text-blue-600 text-2xl" />,
	},
	{
		title: 'Compare Expenses',
		description:
			'See how your current expenses stack up against previous months.',
		icon: <FiTrendingUp className="text-blue-600 text-2xl" />,
	},
	{
		title: 'Visual Charts',
		description: 'Understand trends with interactive graphs and breakdowns.',
		icon: <FiPieChart className="text-blue-600 text-2xl" />,
	},
];

const Cta = () => {
	const [email, setEmail] = useState('');
	const [status, setStatus] = useState('');

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();

		if (!email) {
			setStatus('Please enter a valid email.');
			return;
		}

		const templateParams = {
			user_email: email,
		};

		try {
			await emailjs.send(
				process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID!,
				process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID!,
				templateParams,
				process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY!
			);
			setStatus('Thanks for joining the waitlist!');
			setEmail('');
		} catch (error) {
			console.error('EmailJS Error:', error);
			setStatus('Something went wrong. Please try again.');
		}
	};

	return (
		<div
			className="w-full bg-blue-50 py-16 px-4"
			id="cta"
		>
			<div className="max-w-4xl mx-auto text-center">
				<h2 className="text-3xl md:text-4xl font-bold mb-4 text-blue-900">
					Coming Soon
				</h2>
				<p className="text-blue-800 mb-10 max-w-2xl mx-auto">
					We’re building powerful features to help you track and understand your
					M-Pesa spending like never before.
				</p>

				{/* Feature Cards */}
				<div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-12">
					{features.map((feature, index) => (
						<div
							key={index}
							className="bg-white rounded-xl shadow-md p-6 text-left flex gap-4 items-start"
						>
							<div>{feature.icon}</div>
							<div>
								<h3 className="font-semibold text-lg text-blue-900 mb-1">
									{feature.title}
								</h3>
								<p className="text-sm text-blue-800">{feature.description}</p>
							</div>
						</div>
					))}
				</div>

				{/* Waitlist Input */}
				<form
					onSubmit={handleSubmit}
					className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full mx-auto"
				>
					<input
						type="email"
						placeholder="Enter your email"
						value={email}
						onChange={(e) => setEmail(e.target.value)}
						required
						className="w-full md:w-1/2 px-4 py-3 rounded-lg bg-white shadow-sm border border-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-600"
					/>
					<button
						type="submit"
						className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition shadow-md cursor-pointer"
					>
						Join Waitlist
					</button>
				</form>

				{status && <p className="mt-4 text-blue-800">{status}</p>}

				<div className="flex items-center justify-center gap-3 mt-6">
					<Avatars />
					<span className="text-sm text-blue-900">
						Join <span className="font-semibold">125+</span> others on the
						waitlist
					</span>
				</div>

				<p className="text-xs text-blue-700 mt-4">
					No spam. Just a heads-up when we launch.
				</p>
			</div>
		</div>
	);
};

export default Cta;
