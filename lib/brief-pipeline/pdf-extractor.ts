export interface ExtractedPage {
  pageNumber: number;
  text: string;
}

export interface PDFExtractionResult {
  totalPages: number;
  pages: ExtractedPage[];
  fullText: string;
}

export async function extractTextFromPDF(file: File): Promise<PDFExtractionResult> {
  const pdfjsLib = await import("pdfjs-dist");

  // Set worker source
  pdfjsLib.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsLib.version}/pdf.worker.min.js`;

  const arrayBuffer = await file.arrayBuffer();
  const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;

  const pages: ExtractedPage[] = [];
  const totalPages = pdf.numPages;

  for (let i = 1; i <= totalPages; i++) {
    const page = await pdf.getPage(i);
    const textContent = await page.getTextContent();
    const text = textContent.items
      .map((item: any) => ("str" in item ? item.str : ""))
      .join(" ")
      .replace(/\s+/g, " ")
      .trim();

    pages.push({ pageNumber: i, text });
  }

  const fullText = pages.map(p => p.text).join("\n\n");

  return { totalPages, pages, fullText };
}
