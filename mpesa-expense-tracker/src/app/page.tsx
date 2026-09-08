import Hero from './components/Hero';
import WhatYouGet from './components/WhatYouGet';
import Demo from './components/Demo';
import PrivacyNote from './components/PrivacyNote';
import HireMe from './components/HireMe';

export default function Home() {
	return (
		<div className="font-sans">
			<Hero />
			<WhatYouGet />
			<Demo />
			<PrivacyNote />
			<HireMe />
		</div>
	);
}
