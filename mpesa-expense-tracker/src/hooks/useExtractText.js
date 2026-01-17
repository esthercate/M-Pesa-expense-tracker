'use client';

export const useExtractText = () => {
  const extractTextFromPDF = async (file) => {
    const pdfjsLib = await import('pdfjs-dist/legacy/build/pdf');

    pdfjsLib.GlobalWorkerOptions.workerSrc = '/pdf.worker.mjs';

    const arrayBuffer = await file.arrayBuffer();
    const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;

    let text = '';
    for (let pageNum = 1; pageNum <= pdf.numPages; pageNum++) {
      const page = await pdf.getPage(pageNum);
      const content = await page.getTextContent();
      const strings = content.items.map((item) => item.str);
      text += strings.join(' ') + '\n';
    }

    return text;
  };

  return { extractTextFromPDF };
};
