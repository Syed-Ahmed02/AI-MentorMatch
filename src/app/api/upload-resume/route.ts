import { NextRequest, NextResponse } from 'next/server';
import pdfParse from 'pdf-parse';
import formidable, { Fields, Files } from 'formidable';
import { promises as fs } from 'fs';
import { genkit } from 'genkit';
import { googleAI, gemini15Flash } from '@genkit-ai/googleai';

export const runtime = 'nodejs';

export const config = {
  api: {
    bodyParser: false,
  },
};

function parseForm(req: NextRequest): Promise<{ fields: Fields; files: Files }> {
  return new Promise((resolve, reject) => {
    const form = formidable({ multiples: false });
    form.parse(req as any, (err: Error | null, fields: Fields, files: Files) => {
      if (err) return reject(err);
      resolve({ fields, files });
    });
  });
}

export async function POST(req: NextRequest) {
  try {
    // Parse the incoming form with formidable
    const { files } = await parseForm(req);
    const file = files.resume;
    if (!file) {
      return NextResponse.json({ error: 'No file uploaded' }, { status: 400 });
    }
    // formidable v3 returns file as array if multiples: false is not set
    const pdfFile = Array.isArray(file) ? file[0] : file;
    const buffer = await fs.readFile(pdfFile.filepath);

    // Parse PDF to text
    const pdfData = await pdfParse(buffer);
    const resumeText = pdfData.text;

    // Summarize with Genkit + Gemini
    const ai = genkit({
      plugins: [googleAI()],
      model: gemini15Flash,
    });
    const { text: summary } = await ai.generate({
      prompt: `Summarize this resume for a recruiter:\n\n${resumeText}`,
    });

    return NextResponse.json({ summary });
  } catch (err: any) {
    return NextResponse.json({ error: err.message || 'Failed to process resume' }, { status: 500 });
  }
}

