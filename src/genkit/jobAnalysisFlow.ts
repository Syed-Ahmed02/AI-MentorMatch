import { Pinecone } from '@pinecone-database/pinecone';
import { vertexAI } from '@genkit-ai/vertexai';
import googleAI from '@genkit-ai/googleai';
import { z, genkit } from 'genkit';
import { OpenAI } from 'openai';

// Initialize Pinecone client for roadmap-gpt
const pinecone = new Pinecone({
  apiKey: process.env.PINECONE_API_KEY!,
});
const index = pinecone.index('roadmap-gpt');

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

async function getOpenAIEmbedding(text: string) {
  const response = await openai.embeddings.create({
    model: 'text-embedding-ada-002',
    input: text,
  });
  return response.data[0].embedding;
}

export const ai = genkit({
  plugins: [vertexAI(), googleAI()],
});

export const jobAnalysisFlow = ai.defineFlow(
  {
    name: 'jobAnalysisFlow',
    inputSchema: z.object({
      resumeSummary: z.string(),
      jobDescription: z.string(),
    }),
    outputSchema: z.object({
      summary: z.string(),
      score: z.number(),
      strengths: z.string(),
      improvements: z.string(),
      missingSkills: z.array(z.string()),
      resources: z.array(z.object({
        skill: z.string(),
        resources: z.array(z.string()),
      })),
    }),
  },
  async ({ resumeSummary, jobDescription }) => {
    // Step 1: Use Gemini to analyze
    const geminiPrompt = `You are a career coach AI. Given the following resume summary and job description, do the following:
1. Score the resume for this job (out of 10).
2. List strengths ("Great:").
3. List improvements ("Improvements:").
4. List missing skills (as a JSON array).
5. Write a 2-3 sentence summary for the resume card.

Resume Summary:
${resumeSummary}

Job Description:
${jobDescription}

Respond in JSON with keys: score, strengths, improvements, missingSkills, summary.`;

    const { text: geminiResponse } = await ai.generate({
      model: googleAI.model('gemini-2.0-flash'),
      prompt: geminiPrompt,
    });

    let cleanJson = geminiResponse.trim();
    if (cleanJson.startsWith('```')) {
      cleanJson = cleanJson.replace(/^```[a-zA-Z]*\n?/, '').replace(/```$/, '').trim();
    }
    let parsed;
    try {
      parsed = JSON.parse(cleanJson);
    } catch (e) {
      throw new Error('Gemini did not return valid JSON: ' + geminiResponse);
    }

    // Step 2: For each missing skill, query Pinecone for resources
    const resources: { skill: string; resources: string[] }[] = [];
    for (const skill of parsed.missingSkills || []) {
      // Get embedding for the skill
      const embedding = await getOpenAIEmbedding(skill);
      // Query Pinecone
      const searchResults = await index.query({
        vector: embedding,
        topK: 7,
        includeMetadata: true,
      });
      // Extract resource titles or links from metadata, only keep strings
      const skillResources = (searchResults.matches || [])
        .map(match => match.metadata?.title || match.metadata?.url || match.metadata?.text || '')
        .filter((v): v is string => typeof v === 'string' && v.length > 0);
      resources.push({ skill, resources: skillResources });
    }

    return {
      summary: parsed.summary,
      score: parsed.score,
      strengths: Array.isArray(parsed.strengths) ? parsed.strengths.join('\n') : parsed.strengths,
      improvements: Array.isArray(parsed.improvements) ? parsed.improvements.join('\n') : parsed.improvements,
      missingSkills: parsed.missingSkills,
      resources,
    };
  }
); 