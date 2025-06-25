import { Document } from 'genkit/retriever';
import { chunk } from 'llm-chunk';
import { devLocalIndexerRef, devLocalVectorstore } from '@genkit-ai/dev-local-vectorstore';
import { vertexAI } from '@genkit-ai/vertexai';
import { z, genkit } from 'genkit';
import { firebaseStorage } from '@/lib/firebaseStorage';

export const ai = genkit({
  plugins: [
    // vertexAI provides the textEmbedding004 embedder
    vertexAI(),

    // the local vector store requires an embedder to translate from text to vector
    devLocalVectorstore([
      {
        indexName: 'resourcesIndex',
        embedder: vertexAI.embedder('text-embedding-005'),
      },
    ]),
  ],
});

export const resourcesIndexer = devLocalIndexerRef('resourcesIndex');

// Inline chunking config to avoid import issues
const chunkingConfig = {
  minLength: 1000,
  maxLength: 2000,
  splitter: 'sentence',
  overlap: 100,
  delimiters: '',
} as any;

async function extractTextFromPdfBuffer(buffer: Buffer) {
  try {
    // Dynamic import to avoid module initialization issues
    const pdf = (await import('pdf-parse')).default;
    const data = await pdf(buffer);
    return data.text;
  } catch (error) {
    console.error('Error extracting text from PDF:', error);
    throw new Error(`Failed to extract text from PDF: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
}

export const indexResume = ai.defineFlow(
  {
    name: 'indexResume',
    inputSchema: z.object({ 
      filePath: z.string().describe('Firebase Storage file path'),
      originalFileName: z.string().optional().describe('Original file name for metadata')
    }),
    outputSchema: z.object({
      success: z.boolean(),
      documentsIndexed: z.number(),
      error: z.string().optional(),
    }),
  },
  async ({ filePath, originalFileName }) => {
    try {
      // Download file from Firebase Storage
      const downloadResult = await ai.run('download-from-storage', async () => 
        firebaseStorage.downloadFile(filePath)
      );

      if (!downloadResult.success || !downloadResult.buffer) {
        throw new Error(downloadResult.error || 'Failed to download file from storage');
      }

      // Extract text from PDF buffer
      const pdfTxt = await ai.run('extract-text', async () => 
        extractTextFromPdfBuffer(downloadResult.buffer!)
      );

      // Divide the pdf text into segments
      const chunks = await ai.run('chunk-it', async () => chunk(pdfTxt, chunkingConfig));

      // Convert chunks of text into documents to store in the index.
      const documents = chunks.map((text) => {
        return Document.fromText(text, { 
          filePath,
          originalFileName: originalFileName || 'Unknown',
          source: 'firebase-storage'
        });
      });

      // Add documents to the index
      await ai.index({
        indexer: resourcesIndexer,
        documents,
      });

      return {
        success: true,
        documentsIndexed: documents.length,
      };
    } catch (err) {
      // For unexpected errors that throw exceptions
      return {
        success: false,
        documentsIndexed: 0,
        error: err instanceof Error ? err.message : String(err)
      };
    }
  },
);