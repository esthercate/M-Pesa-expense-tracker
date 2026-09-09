import React from 'react';
import { FAQS, SITE_URL, SITE_NAME, SITE_DESCRIPTION } from '@/lib/site';

// NEW FILE: structured data. The FAQPage block is what can earn an expanded
// search result with the questions listed under your link. Built from the same
// FAQS array the page renders, so the two can't disagree.
const JsonLd = () => {
	const data = [
		{
			'@context': 'https://schema.org',
			'@type': 'SoftwareApplication',
			name: SITE_NAME,
			url: SITE_URL,
			applicationCategory: 'FinanceApplication',
			operatingSystem: 'Any',
			description: SITE_DESCRIPTION,
			offers: {
				'@type': 'Offer',
				price: '0',
				priceCurrency: 'KES',
			},
		},
		{
			'@context': 'https://schema.org',
			'@type': 'FAQPage',
			mainEntity: FAQS.map((item) => ({
				'@type': 'Question',
				name: item.q,
				acceptedAnswer: { '@type': 'Answer', text: item.a },
			})),
		},
	];

	return (
		<script
			type="application/ld+json"
			dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
		/>
	);
};

export default JsonLd;
