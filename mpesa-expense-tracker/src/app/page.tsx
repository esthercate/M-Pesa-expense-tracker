import Dashboard from './components/Dashboard';
import Demo from './components/Demo';
import Hero from './components/Hero';
import Pricing from './components/Pricing';

export default function Home() {
	return (
		<div className="font-sans flex flex-col min-h-screen p-6 pb-20 gap-16">
			<Hero />
			<Dashboard />
			<Demo />
			<Pricing />
		</div>
	);
}
