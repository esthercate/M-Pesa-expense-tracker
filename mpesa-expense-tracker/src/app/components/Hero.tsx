'use client';
import React, { useState } from 'react';
import { useExtractText } from '@/hooks/useExtractText';
import { SummaryEntry, TransactionEntry } from '@/types/mpesa';
import { exportMpesaToExcel } from '@/utils/exportToExcel';
import FileUpload from './FileUpload';

const Hero = () => {
	const [pdfFile, setPdfFile] = useState<File | null>(null);
	const [error, setError] = useState('');
	const [summary, setSummary] = useState<SummaryEntry[]>([]);
	const [transactions, setTransactions] = useState<TransactionEntry[]>([]);
	const { extractTextFromPDF } = useExtractText();

	const handleFile = async (file: File) => {
		if (file && file.type === 'application/pdf') {
			setPdfFile(file);
			setError('');

			try {
				const text: string = await extractTextFromPDF(file);
				const { parseMpesaStatementText } = await import('@/utils/mpesaParser');
				const result = parseMpesaStatementText(text);

				setSummary(result.summary);
				setTransactions(result.transactions);
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
			<FileUpload
				onFileSelect={handleFile}
				error={error}
				pdfFile={pdfFile}
			/>
			{pdfFile && (
				<div className="mt-4 md:mt-10 flex flex-col md:flex-row gap-4 justify-center font-semibold">
					<button
						className="bg-white px-4 py-2 rounded transition border border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white cursor-pointer text-sm md:text-base"
						onClick={handleDownloadExcel}
					>
						Convert to Excel
					</button>
					<button className="text-sm md:text-base bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition cursor-pointer">
						Analyze Expense
					</button>
				</div>
			)}
		</div>
	);
};

export default Hero;
