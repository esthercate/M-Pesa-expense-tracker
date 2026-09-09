import Hero from './components/Hero';
import WhatYouGet from './components/WhatYouGet';
import Demo from './components/Demo';
import PrivacyNote from './components/PrivacyNote';
import Faq from './components/Faq';
import HireMe from './components/HireMe';
import JsonLd from './components/JsonLd';

export default function Home() {
	return (
		<div className="font-sans">
			<JsonLd />
			<Hero />
			<WhatYouGet />
			<Demo />
			<PrivacyNote />
			<Faq />
			<HireMe />
		</div>
	);
}
