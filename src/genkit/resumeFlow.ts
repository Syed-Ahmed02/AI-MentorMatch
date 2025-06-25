import { devLocalRetrieverRef } from '@genkit-ai/dev-local-vectorstore';
import { vertexAI } from '@genkit-ai/vertexai';
import { z } from 'genkit';
import { ai } from '@/genkit/indexResume';

// Define the retriever reference
export const menuRetriever = devLocalRetrieverRef('resourcesIndex');

export const resumeFlow = ai.defineFlow(
  {
    name: 'resumeFlow',
    inputSchema: z.object({ query: z.string() }),
    outputSchema: z.object({ answer: z.string() })
  },
  async ({ query }: { query: string }) => {
    // retrieve relevant documents using Context 7 (top 7 most relevant)
    const docs = await ai.retrieve({
      retriever: menuRetriever,
      query,
      options: { k: 7 }, // Context 7 - retrieve top 7 documents
    });

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

Context 7 has been used to retrieve the most relevant information from the resume.

Question: ${query}`,
      docs,
    });

    return { answer: text };
  },
);