import React from 'react';
import { FiChevronDown } from 'react-icons/fi';
import { FAQS } from '@/lib/site';

const Faq = () => {
	return (
		<section
			id="faq"
			className="px-5 py-20 md:px-8"
		>
			<div className="mx-auto max-w-3xl">
				<h2 className="font-display text-3xl font-semibold tracking-tight text-ink md:text-4xl text-center">
					Frequently Asked Questions
				</h2>

				<div className="mt-10 flex flex-col gap-5">
					{FAQS.map((item) => (
						<details
							key={item.q}
							className="group rounded-card border border-hairline bg-surface px-6 py-5"
						>
							<summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-base font-semibold text-ink">
								{item.q}
								<FiChevronDown
									size={18}
									className="shrink-0 text-faint transition-transform group-open:rotate-180"
								/>
							</summary>
							<p className="mt-4 text-base leading-relaxed text-muted">
								{item.a}
							</p>
						</details>
					))}
				</div>
			</div>
		</section>
	);
};

export default Faq;
