// NEW FILE: shared site constants. Swapping to a custom domain later is one
// env var (NEXT_PUBLIC_SITE_URL) rather than a hunt through the codebase.
export const SITE_URL = (
	process.env.NEXT_PUBLIC_SITE_URL ||
	'https://m-pesa-pdf-statement-to-excel-converter.vercel.app/'
).replace(/\/$/, '');

export const SITE_NAME = 'Mpesa to Excel';

export const SITE_DESCRIPTION =
	'Convert your M-Pesa PDF statement into a clean Excel file with every transaction, your monthly totals, and what you paid in transaction fees. Free, no account, and your statement never leaves your device.';

// Plain strings, deliberately: these are rendered on the page AND emitted as
// FAQPage structured data, and JSON-LD answers must be plain text.
export const FAQS = [
	{
		q: 'How do I convert an M-Pesa statement to Excel?',
		a: 'Download your statement as a PDF from the M-Pesa app or from the email Safaricom sends you, drop it onto this page, and your totals appear immediately. Click Download Excel to save a spreadsheet with every transaction in it.',
	},
	{
		q: 'Where do I get my M-Pesa statement?',
		a: 'In the M-Pesa app, go to M-Pesa Statement, tap See All, then Export Statement. Choose the period you want and generate it. Statements are sent to the email address registered on your line.',
	},
	{
		q: 'Can I get more than six months of transactions?',
		a: 'The M-Pesa app only generates statements of up to six months. For a longer period, Safaricom emails the statement to you instead of producing it in the app. Those emailed statements work here the same way.',
	},
	{
		q: 'What is the password on my M-Pesa statement?',
		a: 'Statements that arrive by email are password-protected, and Safaricom sends the password separately rather than putting it in the same email. Check the email itself for instructions and check your SMS messages, including any filtered or spam folder.',
	},
	{
		q: 'Is it safe to convert my M-Pesa statement here?',
		a: 'Your statement is never uploaded. Your own browser opens the PDF and builds the spreadsheet on your device, so no server ever receives the file. There is no account, nothing is stored, and closing the page ends it.',
	},
	{
		q: 'What is in the Excel file?',
		a: 'Two sheets. A summary sheet with the statement period, money in and out, net movement, closing balance and a breakdown by transaction type. And a transactions sheet with every row, using real dates and numbers with filters switched on, ready to sort or pivot.',
	},
	{
		q: 'Does it cost anything?',
		a: 'No. It is free, with no limit on how many statements you convert and no sign-up.',
	},
	{
		q: 'It says no transactions were found. What now?',
		a: 'That usually means your statement uses a layout the converter does not handle yet. Get in touch on WhatsApp and say which type of statement it was, and it can be added. Please do not send the statement itself.',
	},
];
