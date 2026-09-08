import type { Metadata } from 'next';
// CHANGED: Geist → Space Grotesk (display + figures) and Plus Jakarta Sans (copy)
import { Space_Grotesk, Plus_Jakarta_Sans } from 'next/font/google';
import './globals.css';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const spaceGrotesk = Space_Grotesk({
	variable: '--font-space-grotesk',
	subsets: ['latin'],
	weight: ['400', '500', '600', '700'],
});

const jakarta = Plus_Jakarta_Sans({
	variable: '--font-jakarta',
	subsets: ['latin'],
	weight: ['400', '500', '600'],
});

// CHANGED: title and description now carry the phrases people search for,
// since search traffic is the whole point of this page.
export const metadata: Metadata = {
	title: 'Convert M-Pesa PDF Statement to Excel — free, in your browser',
	description:
		'Turn your M-Pesa PDF statement into a clean Excel file with every transaction, your totals, and what you paid in fees. Free, no account, and your statement never leaves your device.',
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<body
				// CHANGED: font variables renamed; flex column so the footer sits
				// at the bottom on short pages.
				className={`${spaceGrotesk.variable} ${jakarta.variable} antialiased min-h-screen flex flex-col`}
			>
				<Navbar />
				<main className="flex-1">{children}</main>
				<Footer />
				{/* CHANGED: dark toasts, bottom-right so they don't cover the nav */}
				<ToastContainer
					theme="dark"
					position="bottom-right"
					autoClose={4000}
				/>
			</body>
		</html>
	);
}
