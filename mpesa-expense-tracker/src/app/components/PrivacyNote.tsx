import React from 'react';

// NEW FILE: privacy as a section on the page, not only a modal nobody opens.
// This is the strongest thing the product has to say, so it gets real space.
const chips = ['no uploads', 'no database', 'no account', 'open source'];

const PrivacyNote = () => {
	return (
		<section className="px-5 py-10 md:px-8">
			<div className="mx-auto max-w-6xl rounded-3xl border border-accent-line bg-gradient-to-b from-accent-soft to-transparent p-8 md:p-16">
				<div className="grid grid-cols-1 gap-8 md:grid-cols-12">
					<div className="md:col-span-5">
						<h2 className="font-display text-3xl font-semibold leading-tight tracking-tight text-ink md:text-4xl">
							We never receive your statement
						</h2>
					</div>
					<div className="md:col-span-6 md:col-start-7">
						<p className="text-base leading-relaxed text-muted">
							Your statement stays on your own phone or computer. When you drop
							the file in, your browser reads it and builds the spreadsheet
							right there. It is never sent to us, so we never have a copy of
							it.
						</p>
						<p className="mt-4 text-base leading-relaxed text-muted">
							There is no account to create and nothing is saved anywhere. Close
							the page and everything from your statement is gone.
						</p>
						<div className="mt-7 flex flex-wrap gap-2">
							{chips.map((chip) => (
								<span
									key={chip}
									className="rounded-full border border-hairline-strong bg-white/3 px-3.5 py-2 text-xs text-muted capitalize"
								>
									{chip}
								</span>
							))}
						</div>
					</div>
				</div>
			</div>
		</section>
	);
};

export default PrivacyNote;
