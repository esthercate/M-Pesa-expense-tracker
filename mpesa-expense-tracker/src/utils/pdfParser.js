import * as pdfjsLib from 'pdfjs-dist/legacy/build/pdf';

// Create a Blob-based worker dynamically
const workerBlob = new Blob(
	[
		`
      importScripts('https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsLib.version}/pdf.worker.min.js');
    `,
	],
	{ type: 'application/javascript' }
);
const workerBlobUrl = URL.createObjectURL(workerBlob);
pdfjsLib.GlobalWorkerOptions.workerSrc = workerBlobUrl;

export const extractTextFromPDF = async (file) => {
	const arrayBuffer = await file.arrayBuffer();
	const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;
	const numPages = pdf.numPages;
	let fullText = '';

	for (let pageNum = 1; pageNum <= numPages; pageNum++) {
		const page = await pdf.getPage(pageNum);
		const content = await page.getTextContent();
		const strings = content.items.map((item) => item.str);
		fullText += strings.join(' ') + '\n';
	}

	return fullText;
};
