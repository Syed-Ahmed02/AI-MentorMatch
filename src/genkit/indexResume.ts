import { chunk } from 'llm-chunk';
import { Pinecone } from '@pinecone-database/pinecone';
import { vertexAI } from '@genkit-ai/vertexai';
import { z, genkit } from 'genkit';
import { firebaseStorage } from '../lib/firebaseStorage';

// Initialize Pinecone client
const pinecone = new Pinecone({
  apiKey: process.env.PINECONE_API_KEY!,
});

// Get the index
const index = pinecone.index(process.env.PINECONE_INDEX_NAME || 'resume-index');

export const ai = genkit({
  plugins: [
    // vertexAI provides the textEmbedding004 embedder
    vertexAI(),
  ],
});

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

async function getEmbeddings(text: string): Promise<number[]> {
  try {
    const response = await ai.embed({
      embedder: vertexAI.embedder('text-embedding-005'),
      content: text,
    });
    return response[0].embedding;
  } catch (error) {
    console.error('Error getting embeddings:', error);
    throw new Error(`Failed to get embeddings: ${error instanceof Error ? error.message : 'Unknown error'}`);
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

      // Process chunks and add to Pinecone
      let documentsIndexed = 0;
      
      for (let i = 0; i < chunks.length; i++) {
        const chunkText = chunks[i];
        
        // Get embeddings for the chunk
        const embedding = await ai.run(`get-embeddings-${i}`, async () => 
          getEmbeddings(chunkText)
        );

        // Create a unique ID for this chunk
        const chunkId = `${filePath}-chunk-${i}`;
        
        // Prepare metadata
        const metadata = {
          filePath,
          originalFileName: originalFileName || 'Unknown',
          source: 'firebase-storage',
          chunkIndex: i,
          text: chunkText.substring(0, 1000), // Store first 1000 chars as metadata
        };

        // Upsert to Pinecone
        await ai.run(`upsert-to-pinecone-${i}`, async () => 
          index.upsert([{
            id: chunkId,
            values: embedding,
            metadata
          }])
        );

        documentsIndexed++;
      }

      return {
        success: true,
        documentsIndexed,
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