import React from 'react';
import { FaWhatsapp } from 'react-icons/fa';
import { FiMail, FiArrowUpRight } from 'react-icons/fi';

import { whatsappLink } from '@/lib/site';

const whatsappUrl = whatsappLink(
	'Hi Catherine, I used your M-Pesa to Excel converter and I have something I would like built.',
);

const WHATSAPP_MESSAGE =
	'Hi Catherine, I used your M-Pesa to Excel converter and I have something I would like built.';


const PORTFOLIO_URL = 'https://catherine-vuthi.vercel.app/';
const EMAIL = 'catherinev.codes@gmail.com';

const HireMe = () => {
	return (
		<section
			id="hire"
			className="px-5 py-10 md:px-8"
		>
			<div className="mx-auto flex max-w-2xl flex-col items-center text-center">
				<p className="text-xs font-semibold uppercase tracking-widest text-warn">
					Who made this
				</p>
				<h4 className="mt-4 font-display text-xl font-semibold text-ink md:text-2xl">
					I&apos;m Catherine. I build tools to solve my everyday
					problems.
				</h4>

				<p className="mt-5 text-base leading-relaxed text-muted">
					Software engineer based in Nairobi. This one started with my own
					statements, going through them by hand every month was miserable, so I
					built what I wanted to exist. If your business is doing something
					similar with invoices, stock counts or reports, I can customize for
					you the version that does it for you.
				</p>

				<a
					href={whatsappUrl}
					target="_blank"
					rel="noopener noreferrer"
					className="mt-10 flex h-13 items-center justify-center gap-2.5 rounded-control bg-accent px-8 text-base font-semibold text-accent-ink transition hover:opacity-90"
				>
					<FaWhatsapp size={20} />
					Message me on WhatsApp
				</a>

				<p className="mt-4 text-sm text-faint">Usually replies the same day.</p>

				<div className="mt-8 flex flex-col items-center gap-4 sm:flex-row sm:gap-8">
					<a
						href={PORTFOLIO_URL}
						target="_blank"
						rel="noopener noreferrer"
						className="flex items-center gap-2 text-sm text-muted transition hover:text-ink"
					>
						See more of my work
						<FiArrowUpRight size={16} />
					</a>
					<a
						href={`mailto:${EMAIL}`}
						className="flex items-center gap-2.5 text-sm text-muted transition hover:text-ink"
					>
						<FiMail size={16} />
						{EMAIL}
					</a>
				</div>
			</div>
		</section>
	);
};

export default HireMe;