'use client';
import React, { useState } from 'react';
import { useExtractText } from '@/hooks/useExtractText';
import { exportMpesaToExcel } from '@/utils/exportToExcel';
import FileUpload from './FileUpload';
import StatementSummary from './StatementSummary';
import { FiDownload } from 'react-icons/fi';
import { FaWhatsapp } from 'react-icons/fa';
import { toast } from 'react-toastify';
import { useStore } from '@/store/store';
import { whatsappLink } from '@/lib/site'; // CHANGED: for the report link

const Hero = () => {
	const {
		summary,
		transactions,
		error,
		setError,
		setSummary,
		setTransactions,
		pdfFile,
		setPdfFile,
	} = useStore();
	const { extractTextFromPDF } = useExtractText();
	const [isExporting, setIsExporting] = useState(false);
	// CHANGED: new — holds the parser's shape report when a file fails
	const [failureReport, setFailureReport] = useState<string>('');

	const handleFile = async (file: File) => {
		if (!file || file.type !== 'application/pdf') {
			setPdfFile(null);
			setError('Only PDF files are allowed.');
			setFailureReport('');
			return;
		}

		setPdfFile(file);
		setError('');
		setFailureReport('');
		setSummary([]);
		setTransactions([]);

		try {
			const text: string = await extractTextFromPDF(file);
			const { parseMpesaStatementText } = await import('@/utils/mpesaParser');
			// CHANGED: the parser now also returns diagnostics
			const result = parseMpesaStatementText(text);
			const diagnostics = result.diagnostics || {};

			// Counts and shapes only — safe to log, safe to send.
			console.info('[parser]', diagnostics);

			if (!result.transactions.length) {
				setError(
					"We couldn't read any transactions from that file. It may be a statement format we don't support yet.",
				);
				setFailureReport(JSON.stringify(diagnostics));
				return;
			}

			setSummary(result.summary);
			setTransactions(result.transactions);

			// Parsed, but not everything: worth knowing about.
			if (diagnostics.unparsedRows > 0) {
				console.warn(
					`[parser] ${diagnostics.unparsedRows} row(s) looked like transactions but did not parse`,
				);
			}

			toast.success(`Read ${result.transactions.length} transactions.`);
		} catch (err) {
			console.error('Error parsing PDF:', err);
			setError('Failed to read that PDF. Please try another file.');
		}
	};

	const handleDownloadExcel = async () => {
		if (!transactions.length) {
			toast.error('Upload an M-Pesa statement first.');
			return;
		}

		setIsExporting(true);
		try {
			const fileName = await exportMpesaToExcel(summary, transactions);
			toast.success(`Downloaded ${fileName}`);
		} catch (err) {
			console.error('Error building workbook:', err);
			toast.error('Could not build the Excel file. Please try again.');
		} finally {
			setIsExporting(false);
		}
	};

	return (
		<section className="relative overflow-hidden px-5 pb-20 pt-16 md:px-8 md:pt-24">
			<div
				aria-hidden
				className="pointer-events-none absolute -top-72 left-1/2 h-[640px] w-[1000px] -translate-x-1/2 rounded-full"
				style={{
					background:
						'radial-gradient(ellipse at center, rgba(62,207,142,0.13), rgba(62,207,142,0) 68%)',
				}}
			/>

			<div className="relative mx-auto flex max-w-3xl flex-col items-center text-center">
				<span className="inline-flex h-9 items-center gap-2.5 rounded-full border border-accent-line bg-accent-soft px-4 text-sm font-medium text-accent">
					<span className="h-1.5 w-1.5 rounded-full bg-accent" />
					Free · nothing leaves your device
				</span>

				<h1 className="mt-7 text-pretty font-display text-4xl font-semibold leading-none tracking-tight text-ink md:text-6xl">
					Turn your M-Pesa statement into a real spreadsheet
				</h1>

				<p className="mt-6 max-w-xl text-base leading-relaxed text-muted md:text-lg">
					Drop in the PDF Safaricom sends you. Get every transaction in Excel,
					your totals broken down by type, and one figure that&apos;s easy to
					lose track of when it&apos;s spread across hundreds of rows — what
					you&apos;ve paid in transaction fees.
				</p>

				<div className="mt-10 w-full">
					<FileUpload
						onFileSelect={handleFile}
						error={error}
						pdfFile={pdfFile}
					/>
				</div>

				{/* CHANGED: new — when nothing parses, offer to send the SHAPE of the
				    failure. No statement content, so it stays consistent with the
				    promise that nothing leaves the device. */}
				{failureReport && (
					<a
						href={whatsappLink(
							`Hi Catherine, a statement failed to convert. Parser report: ${failureReport}`,
						)}
						target="_blank"
						rel="noopener noreferrer"
						className="mt-4 inline-flex items-center gap-2 text-sm text-muted underline underline-offset-4 transition hover:text-ink"
					>
						<FaWhatsapp size={16} />
						Tell me about it so I can add support for your statement
					</a>
				)}

				{!transactions.length && (
					<div className="mt-8 flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-sm text-faint">
						<span>No account</span>
						<span className="text-white/15">·</span>
						<span>No upload</span>
						<span className="text-white/15">·</span>
						<span>No limit</span>
					</div>
				)}
			</div>

			<div className="relative mx-auto max-w-6xl text-left">
				<StatementSummary />

				{transactions.length > 0 && (
					<div className="mt-6 flex flex-col items-start gap-4 rounded-card border border-accent-line bg-gradient-to-b from-accent-soft to-transparent p-7 sm:flex-row sm:items-center sm:justify-between">
						<div>
							<p className="font-display text-lg font-semibold tracking-tight text-ink">
								Take the spreadsheet
							</p>
							<p className="mt-1.5 text-sm text-muted">
								Two sheets, formatted, filters on, named after its own date
								range.
							</p>
						</div>
						<button
							onClick={handleDownloadExcel}
							disabled={isExporting}
							className="flex h-13 w-full shrink-0 cursor-pointer items-center justify-center gap-2.5 rounded-control bg-accent px-7 text-base font-semibold text-accent-ink transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto"
						>
							{!isExporting && <FiDownload size={18} />}
							{isExporting ? 'Building your file…' : 'Download Excel'}
						</button>
					</div>
				)}
			</div>
		</section>
	);
};;

export default Hero;