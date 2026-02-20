import { createWorker, type Worker } from "tesseract.js";

let workerInstance: Worker | null = null;

async function getWorker(): Promise<Worker> {
  if (!workerInstance) {
    workerInstance = await createWorker("eng");
  }
  return workerInstance;
}

/**
 * Extract text from an image file using Tesseract.js OCR.
 * Returns extracted text, or a placeholder if no text is detected.
 */
export async function extractTextFromImage(file: File): Promise<string> {
  try {
    const worker = await getWorker();
    // Convert file to data URL for Tesseract
    const arrayBuffer = await file.arrayBuffer();
    const blob = new Blob([arrayBuffer], { type: file.type });
    const dataUrl = await new Promise<string>((resolve) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result as string);
      reader.readAsDataURL(blob);
    });

    const { data } = await worker.recognize(dataUrl);
    const text = data.text.trim();

    if (!text || text.length < 10) {
      return `[Image file: ${file.name} — OCR detected no readable text]`;
    }

    return `[OCR extracted from: ${file.name}]\n${text}`;
  } catch {
    return `[Image file: ${file.name} — OCR extraction failed]`;
  }
}
