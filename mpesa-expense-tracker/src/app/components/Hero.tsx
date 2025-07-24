'use client';

import React, { useState, useRef } from 'react';
import { useExtractText } from '@/hooks/useExtractText';
import { SummaryEntry, TransactionEntry } from '@/types/mpesa';
import { exportMpesaToExcel } from '@/utils/exportToExcel';

type Props = {};

const Hero = (props: Props) => {
	const [pdfFile, setPdfFile] = useState<File | null>(null);
	const [error, setError] = useState('');
	const [summary, setSummary] = useState<SummaryEntry[]>([]);
	const [transactions, setTransactions] = useState<TransactionEntry[]>([]);
	const fileInputRef = useRef<HTMLInputElement>(null);

	const { extractTextFromPDF } = useExtractText();

	const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
		e.preventDefault();
		const file = e.dataTransfer.files[0];
		handleFile(file);
	};

	const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
		const file = e.target.files?.[0];
		if (file) handleFile(file);
	};

	const handleFile = async (file: File) => {
		if (file && file.type === 'application/pdf') {
			setPdfFile(file);
			setError('');

			try {
				const text: string = await extractTextFromPDF(file);
				console.log('[Extracted Text]', text);

				const { parseMpesaStatementText } = await import('@/utils/mpesaParser');
				const result = parseMpesaStatementText(text);

				setSummary(result.summary);
				setTransactions(result.transactions);

				console.log('[Parsed Summary]', result.summary);
				console.log('[Parsed Transactions]', result.transactions);
			} catch (err) {
				console.error('Error parsing PDF:', err);
				setError('Failed to parse PDF file.');
			}
		} else {
			setPdfFile(null);
			setError('Only PDF files are allowed.');
		}
	};

	const handleDownloadExcel = () => {
		if (summary.length && transactions.length) {
			exportMpesaToExcel(summary, transactions);
		} else {
			alert('No data to export yet.');
		}
	};

	return (
		<div className="w-full max-w-2xl mx-auto mt-2 md:mt-10 px-0 md:px-4">
			<div className="text-center mb-8">
				<h1 className="text-lg md:text-3xl font-bold mb-2">
					Turn Your M-Pesa PDF Into Insight or Excel
				</h1>
				<p className="text-gray-600 max-w-lg mx-auto text-sm md:text-lg">
					Upload your{' '}
					<span className="font-semibold text-blue-600">
						M-Pesa statement PDF
					</span>{' '}
					to analyze your spending or simply convert it into an Excel file — all
					right in your browser.
				</p>
			</div>
			<div
				onDrop={handleDrop}
				onDragOver={(e) => e.preventDefault()}
				className="border-2 border-dashed border-gray-400 rounded-lg px-8 py-10 md:py-20 text-center cursor-pointer hover:border-blue-500 transition "
				onClick={() => fileInputRef.current?.click()}
			>
				{pdfFile ? (
					<p className="text-sm text-blue-600 font-semibold break-all truncate max-w-full overflow-hidden text-ellipsis">
						{pdfFile.name}
					</p>
				) : (
					<p className="text-gray-600">
						Drag and drop your{' '}
						<span className="font-bold text-blue-600">
							M-Pesa PDF statement
						</span>{' '}
						here, or click to upload
					</p>
				)}
				<input
					type="file"
					accept="application/pdf"
					ref={fileInputRef}
					onChange={handleFileSelect}
					className="hidden"
				/>
			</div>

			{error && <p className="text-red-600 mt-2">{error}</p>}

			{pdfFile && (
				<div className="mt-4 md:mt-10 flex flex-col md:flex-row gap-4 justify-center font-semibold">
					<button className="text-sm md:text-base bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition cursor-pointer">
						Analyze Expense
					</button>
					<button
						className="bg-white px-4 py-2 rounded transition border border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white cursor-pointer text-sm md:text-base"
						onClick={handleDownloadExcel}
					>
						Convert to Excel
					</button>
				</div>
			)}
		</div>
	);
};

export default Hero;
