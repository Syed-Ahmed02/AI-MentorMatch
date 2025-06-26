import { NextRequest, NextResponse } from 'next/server';
import { promises as fs } from 'fs';
import { v4 as uuidv4 } from 'uuid';
import PDFParser from 'pdf2json';
import { genkit } from 'genkit';
import { googleAI, gemini15Flash } from '@genkit-ai/googleai';
import os from 'os';

const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB

export const runtime = 'nodejs';

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const file = formData.get('pdf');
    if (!file || typeof file === 'string') {
      return NextResponse.json({ error: 'No file provided' }, { status: 400 });
    }
    if (file.type !== 'application/pdf') {
      return NextResponse.json({ error: 'Only PDF files are allowed' }, { status: 400 });
    }
    if (file instanceof File && file.size > MAX_FILE_SIZE) {
      return NextResponse.json({ error: 'File size exceeds limit' }, { status: 400 });
    }

    const fileName = uuidv4();
    const tempFilePath = `${os.tmpdir()}/${fileName}.pdf`;
    const fileBuffer = Buffer.from(await file.arrayBuffer());
    await fs.writeFile(tempFilePath, fileBuffer);

    let pdfData;
    try {
      const pdfParser = new (PDFParser as any)(null, 1);
      pdfData = await new Promise((resolve, reject) => {
        pdfParser.on('pdfParser_dataError', reject);
        pdfParser.on('pdfParser_dataReady', () => {
          resolve(pdfParser.getRawTextContent());
        });
        pdfParser.loadPDF(tempFilePath);
      });
    } catch (error) {
      await fs.unlink(tempFilePath);
      return NextResponse.json({ error: 'Error parsing PDF' }, { status: 500 });
    }
    await fs.unlink(tempFilePath);

    // Summarize with Genkit + Gemini
    const ai = genkit({
      plugins: [googleAI()],
      model: gemini15Flash,
    });
    const { text: summary } = await ai.generate({
      prompt: `Summarize this resume for a recruiter:\n\n${pdfData}`,
    });

    return NextResponse.json({ summary });
  } catch (err: any) {
    console.error('Summarize API error:', err);
    return NextResponse.json({ error: err.message || 'Failed to process resume' }, { status: 500 });
  }
} 