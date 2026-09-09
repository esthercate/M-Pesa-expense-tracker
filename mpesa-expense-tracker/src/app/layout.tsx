import type { Metadata } from 'next';
import { Space_Grotesk, Plus_Jakarta_Sans } from 'next/font/google';
import './globals.css';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
// CHANGED: metadata now builds from the shared site constants
import { SITE_URL, SITE_NAME, SITE_DESCRIPTION } from '@/lib/site';

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

const TITLE = 'Convert M-Pesa PDF Statement to Excel — free, in your browser';

export const metadata: Metadata = {
	// CHANGED: without metadataBase, Next can't build absolute URLs for the
	// social tags and previews silently break.
	metadataBase: new URL(SITE_URL),
	title: TITLE,
	description: SITE_DESCRIPTION,
	// CHANGED: new — canonical, social cards and explicit indexing
	alternates: { canonical: '/' },
	openGraph: {
		type: 'website',
		url: '/',
		siteName: SITE_NAME,
		title: TITLE,
		description: SITE_DESCRIPTION,
		locale: 'en_KE',
	},
	twitter: {
		card: 'summary_large_image',
		title: TITLE,
		description: SITE_DESCRIPTION,
	},
	robots: { index: true, follow: true },
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<body
				className={`${spaceGrotesk.variable} ${jakarta.variable} antialiased min-h-screen flex flex-col`}
			>
				<Navbar />
				<main className="flex-1">{children}</main>
				<Footer />
				<ToastContainer
					theme="dark"
					position="bottom-right"
					autoClose={4000}
				/>
			</body>
		</html>
	);
}
