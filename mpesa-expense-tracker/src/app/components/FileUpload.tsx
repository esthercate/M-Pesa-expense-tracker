'use client';
import React, { useRef, useState } from 'react';
// CHANGED: added react-icons for the upload and error marks
import { FiUploadCloud, FiAlertCircle } from 'react-icons/fi';

type FileUploadProps = {
	onFileSelect: (file: File) => void;
	error: string;
	pdfFile: File | null;
};

const FileUpload: React.FC<FileUploadProps> = ({
	onFileSelect,
	error,
	pdfFile,
}) => {
	const fileInputRef = useRef<HTMLInputElement>(null);
	const [isDragging, setIsDragging] = useState(false);

	const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
		e.preventDefault();
		setIsDragging(false);
		const file = e.dataTransfer.files[0];
		if (file) onFileSelect(file);
	};

	const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
		const file = e.target.files?.[0];
		if (file) onFileSelect(file);
	};

	return (
		<div className="w-full rounded-[20px] bg-gradient-to-b from-white/[0.09] to-white/[0.02] p-px">
			<div className="rounded-[19px] bg-surface p-3.5">
				<div
					onDrop={handleDrop}
					onDragOver={(e) => {
						e.preventDefault();
						setIsDragging(true);
					}}
					onDragLeave={() => setIsDragging(false)}
					onClick={() => fileInputRef.current?.click()}
					className={`flex cursor-pointer flex-col items-center gap-5 rounded-2xl border-[1.5px] border-dashed px-8 py-12 text-center transition-colors md:py-14 ${
						isDragging
							? 'border-accent bg-accent-soft'
							: 'border-white/15 bg-white/[0.015] hover:border-white/25'
					}`}
				>
					<span className="flex h-14 w-14 items-center justify-center rounded-2xl border border-accent-line bg-accent-soft">
						{/* CHANGED: inline SVG → FiUploadCloud */}
						<FiUploadCloud
							size={24}
							className="text-accent"
						/>
					</span>

					{pdfFile ? (
						<div className="max-w-full">
							<p className="truncate text-base font-semibold text-accent">
								{pdfFile.name}
							</p>
							<p className="mt-2 text-sm text-faint">
								Click to choose a different file
							</p>
						</div>
					) : (
						<div>
							<p className="text-lg font-semibold text-ink">
								Drop your statement here
							</p>
							<p className="mt-2 text-sm text-faint">PDF · we never see it</p>
						</div>
					)}

					<span className="mt-1 flex h-12 items-center justify-center rounded-control bg-accent px-7 text-base font-semibold text-accent-ink">
						Choose file
					</span>

					<input
						type="file"
						accept="application/pdf"
						ref={fileInputRef}
						onChange={handleFileSelect}
						className="hidden"
					/>
				</div>

				{error && (
					<div className="mt-3 flex items-start gap-2.5 rounded-control border border-warn-line bg-warn-soft px-4 py-3">
						<FiAlertCircle
							size={16}
							className="mt-0.5 shrink-0 text-warn"
						/>
						<p className="text-sm leading-relaxed text-warn">{error}</p>
					</div>
				)}
			</div>
		</div>
	);
};

export default FileUpload;
