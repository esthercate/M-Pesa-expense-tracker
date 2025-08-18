'use client';
import React, { useRef } from 'react';

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

	const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
		e.preventDefault();
		const file = e.dataTransfer.files[0];
		onFileSelect(file);
	};

	const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
		const file = e.target.files?.[0];
		if (file) onFileSelect(file);
	};

	return (
		<div
			onDrop={handleDrop}
			onDragOver={(e) => e.preventDefault()}
			className="border-2 border-dashed border-gray-400 rounded-lg px-8 py-10 md:py-20 text-center cursor-pointer hover:border-blue-500 transition"
			onClick={() => fileInputRef.current?.click()}
		>
			{pdfFile ? (
				<p className="text-sm text-blue-600 font-semibold break-all truncate max-w-full overflow-hidden text-ellipsis">
					{pdfFile.name}
				</p>
			) : (
				<p className="text-gray-600">
					Drag and drop your{' '}
					<span className="font-bold text-blue-600">M-Pesa PDF statement</span>{' '}
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
			{error && <p className="text-red-600 mt-2">{error}</p>}
		</div>
	);
};

export default FileUpload;
