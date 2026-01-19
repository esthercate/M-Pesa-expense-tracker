'use client';
import React, { useState } from 'react';
import { useExtractText } from '@/hooks/useExtractText';
import { exportMpesaToExcel } from '@/utils/exportToExcel';
import FileUpload from './FileUpload';
import { toast } from 'react-toastify';
import { useStore } from '@/store/store';

const Hero = () => {
	const { summary, transactions, error, setError, setSummary, setTransactions, pdfFile, setPdfFile } = useStore();
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
			toast.error('Please upload PDF to continue.');
		}
	};

	return (
		<div className="w-full max-w-3xl mx-auto mt-2 md:mt-10 px-0 md:px-4">
			<div className="text-center mb-8">
				<h1 className="text-lg md:text-3xl font-bold mb-2">
					Convert your M-Pesa PDF Statement into Excel
				</h1>
				<p className="text-gray-600 max-w-lg mx-auto text-sm md:text-lg">
					Upload your{' '}
					<span className="font-semibold text-blue-600">
						M-Pesa PDF Statement
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
			<div className="w-full mt-4 md:mt-10 flex flex-row flex-wrap gap-4 justify-center font-semibold">
				<button
					className="w-full md:w-auto text-sm md:text-base  bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition cursor-pointer"
					onClick={handleDownloadExcel}
				>
					Convert to Excel
				</button>
				<button
					onClick={() => {
						const ctaSection = document.getElementById('cta');
						if (ctaSection) {
							ctaSection.scrollIntoView({ behavior: 'smooth' });
						}
					}}
					className="w-full md:w-auto text-sm md:text-base bg-gray-400 text-white px-4 py-2 rounded opacity-70 cursor-pointer hover:opacity-90"
				>
					Analyze Expenses (Coming Soon)
				</button>
			</div>
		</div>
	);
};

export default Hero;
