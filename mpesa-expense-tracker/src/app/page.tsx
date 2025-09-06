import Demo from './components/Demo';
import Hero from './components/Hero';
import Pricing from './components/Pricing';
import Cta from './components/Cta';

export default function Home() {
	return (
		<div className="font-sans min-h-screen">
			<div className="flex flex-col gap-16 p-6 pb-20">
				<Hero />
				<Demo />
				<Pricing />
			</div>
			<Cta />
		</div>
	);
}
