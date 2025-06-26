import { NextRequest, NextResponse } from 'next/server';
import { indexResume } from '../../../genkit/indexResume';
import { firebaseStorage } from '../../../lib/firebaseStorage';
import { firestoreService } from '../../../lib/firestoreService';
import { verifyIdToken } from '../../../lib/firebaseAdmin';
import { genkit } from 'genkit';
import { vertexAI } from '@genkit-ai/vertexai';
import { googleAI } from '@genkit-ai/googleai';
import { Pinecone } from '@pinecone-database/pinecone';
import pdfParse from 'pdf-parse';
import fs from 'fs';

export const ai = genkit({
  plugins: [
    vertexAI({
      location: process.env.LOCATION || 'us-central1',
    }),
    googleAI({
      // If you use Gemini or other Google AI APIs, set the API key here
      apiKey: process.env.GOOGLE_GENAI_API_KEY,
    }),
    // ...add other plugins as needed
  ],
});

// Helper: Chunk text (simple sentence split, you can use a better chunker)
function chunkText(text: string, chunkSize = 1000, overlap = 100) {
  const chunks = [];
  for (let i = 0; i < text.length; i += chunkSize - overlap) {
    chunks.push(text.slice(i, i + chunkSize));
  }
  return chunks;
}

export async function POST(request: NextRequest) {
  try {
    // Get the authorization header
    const authHeader = request.headers.get('authorization');
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return NextResponse.json(
        { error: 'No valid authorization token provided' },
        { status: 401 }
      );
    }

    // Verify the Firebase ID token
    const idToken = authHeader.split('Bearer ')[1];
    let decodedToken;
    try {
      decodedToken = await verifyIdToken(idToken);
    } catch (error) {
      return NextResponse.json(
        { error: 'Invalid authorization token' },
        { status: 401 }
      );
    }

    const userId = decodedToken.uid;
    const formData = await request.formData();
    const file = formData.get('file') as File;

    if (!file) {
      return NextResponse.json(
        { error: 'No file provided' },
        { status: 400 }
      );
    }

    if (file.type !== 'application/pdf') {
      return NextResponse.json(
        { error: 'Only PDF files are supported' },
        { status: 400 }
      );
    }

    // Upload file to Firebase Storage
    const uploadResult = await firebaseStorage.uploadFile(file, userId);

    if (!uploadResult.success || !uploadResult.filePath) {
      return NextResponse.json(
        { error: uploadResult.error || 'Failed to upload file to storage' },
        { status: 500 }
      );
    }

    // Create Firestore document for the resume
    const resumeData = {
      userId,
      fileName: uploadResult.filePath.split('/').pop() || file.name,
      originalFileName: file.name,
      storagePath: uploadResult.filePath,
      downloadURL: uploadResult.downloadURL!,
      fileSize: file.size,
      status: 'uploaded' as const,
    };

    const resumeId = await firestoreService.addResume(resumeData);

    // Download the PDF from Firebase Storage
    let buffer: Buffer;
    try {
      const downloadResult = await firebaseStorage.downloadFile(uploadResult.filePath);
      if (!downloadResult.success || !downloadResult.buffer) {
        await firestoreService.updateResumeStatus(resumeId, 'failed', 0, 'Failed to download file from storage');
        await firebaseStorage.deleteFile(uploadResult.filePath);
        return NextResponse.json({ error: 'Failed to download file from storage' }, { status: 500 });
      }
      buffer = downloadResult.buffer;
    } catch (err) {
      await firestoreService.updateResumeStatus(resumeId, 'failed', 0, 'Failed to download file from storage');
      await firebaseStorage.deleteFile(uploadResult.filePath);
      return NextResponse.json({ error: 'Failed to download file from storage' }, { status: 500 });
    }

    // Extract text from PDF
    let text = '';
    try {
      const data = await pdfParse(buffer);
      text = data.text;
    } catch (err) {
      await firestoreService.updateResumeStatus(resumeId, 'failed', 0, 'Failed to parse PDF');
      await firebaseStorage.deleteFile(uploadResult.filePath);
      return NextResponse.json({ error: 'Failed to parse PDF' }, { status: 500 });
    }

    // Chunk the text
    const chunks = chunkText(text);

    // Generate embeddings for each chunk and upsert to Pinecone
    const pinecone = new Pinecone(); // Uses env vars for config
    const index = pinecone.index(process.env.PINECONE_INDEX_NAME!);
    const embeddingModel = 'text-embedding-005'; // Or your preferred model
    let documentsIndexed = 0;
    try {
      // Generate embeddings in batch (if supported) or sequentially
      for (let i = 0; i < chunks.length; i++) {
        const chunk = chunks[i];
        // Use your existing embedding logic (VertexAI or Pinecone inference)
        // Here, we use VertexAI as in your original code
        const embeddingResult = await ai.embed({
          embedder: vertexAI.embedder(embeddingModel),
          content: chunk,
        });
        const embedding = embeddingResult[0].embedding;
        await index.upsert([
          {
            id: `${resumeData.fileName}-chunk-${i}`,
            values: embedding,
            metadata: {
              fileName: resumeData.fileName,
              chunkIndex: i,
              text: chunk.slice(0, 1000),
            },
          },
        ]);
        documentsIndexed++;
      }
    } catch (err) {
      await firestoreService.updateResumeStatus(resumeId, 'failed', documentsIndexed, 'Failed to upsert to Pinecone');
      await firebaseStorage.deleteFile(uploadResult.filePath);
      return NextResponse.json({ error: 'Failed to upsert to Pinecone' }, { status: 500 });
    }

    // Update Firestore status to indexed
    await firestoreService.updateResumeStatus(resumeId, 'indexed', documentsIndexed);

    return NextResponse.json({
      success: true,
      message: `Resume uploaded and indexed successfully. ${documentsIndexed} chunks processed and embedded in Pinecone.`,
      fileName: file.name,
      filePath: uploadResult.filePath,
      downloadURL: uploadResult.downloadURL,
      resumeId,
    });
  } catch (error) {
    console.error('Upload error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

