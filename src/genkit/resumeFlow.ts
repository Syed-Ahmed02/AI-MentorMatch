import { Pinecone } from '@pinecone-database/pinecone';
import { vertexAI } from '@genkit-ai/vertexai';
import { z } from 'genkit';
import { ai } from '../genkit/indexResume';

// Initialize Pinecone client
const pinecone = new Pinecone({
  apiKey: process.env.PINECONE_API_KEY!,
});

// Get the index
const index = pinecone.index(process.env.PINECONE_INDEX_NAME || 'resume-index');

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

export const resumeFlow = ai.defineFlow(
  {
    name: 'resumeFlow',
    inputSchema: z.object({ query: z.string() }),
    outputSchema: z.object({ answer: z.string() })
  },
  async ({ query }: { query: string }) => {
    try {
      // Get embeddings for the query
      const queryEmbedding = await ai.run('get-query-embeddings', async () => 
        getEmbeddings(query)
      );

      // Search Pinecone for similar documents
      const searchResults = await ai.run('search-pinecone', async () => 
        index.query({
          vector: queryEmbedding,
          topK: 7, // Context 7 - retrieve top 7 documents
          includeMetadata: true,
        })
      );

      // Extract text from search results
      const docs = searchResults.matches
        .filter(match => match.metadata?.text)
        .map(match => ({
          content: match.metadata?.text as string,
          metadata: {
            filePath: match.metadata?.filePath,
            originalFileName: match.metadata?.originalFileName,
            score: match.score,
          }
        }));

      // generate a response
      const { text } = await ai.generate({
        model: vertexAI.model('gemini-2.5-flash'),
        prompt: `
You are acting as a helpful AI assistant that can analyze and answer
questions about resumes and professional experience.

Use only the context provided from the resume to answer the question.
If you don't know or the information is not in the resume, say so clearly.
Do not make up or add information not present in the resume.
Be professional and objective in your responses.

Context from resume:
${docs.map(doc => doc.content).join('\n\n')}

Question: ${query}`,
      });

      return { answer: text };
    } catch (error) {
      console.error('Error in resumeFlow:', error);
      return { 
        answer: `I'm sorry, I encountered an error while processing your request: ${error instanceof Error ? error.message : 'Unknown error'}` 
      };
    }
  },
);