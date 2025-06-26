import { vertexAI } from '@genkit-ai/vertexai';
import googleAI from '@genkit-ai/googleai';
import { z, genkit } from 'genkit';

export const ai = genkit({
  plugins: [vertexAI(), googleAI()],
});

export const interviewSummaryFlow = ai.defineFlow(
  {
    name: 'interviewSummaryFlow',
    inputSchema: z.object({
      transcript: z.array(z.object({ role: z.string(), text: z.string() })),
      jobDescription: z.string(),
    }),
    outputSchema: z.object({
      summary: z.string(),
      tips: z.string(),
    }),
  },
  async ({ transcript, jobDescription }) => {
    const transcriptText = transcript.map((msg: any) => `${msg.role === 'assistant' ? 'Alex' : 'Candidate'}: ${msg.text}`).join('\n');
    const prompt = `You are an expert interview coach. Given the following job description and interview transcript, provide:\n1. A concise summary of the candidate's performance (2-3 sentences)\n2. Actionable tips for improvement (bullet points)\n\nJob Description:\n${jobDescription}\n\nTranscript:\n${transcriptText}\n\nRespond in JSON with keys: summary, tips.`;

    const { text: geminiResponse } = await ai.generate({
      model: googleAI.model('gemini-2.0-flash'),
      prompt,
    });
    let cleanJson = geminiResponse.trim();
    if (cleanJson.startsWith('```')) {
      cleanJson = cleanJson.replace(/^```[a-zA-Z]*\n?/, '').replace(/```$/, '').trim();
    }
    let parsed;
    try {
      parsed = typeof cleanJson === 'string' ? JSON.parse(cleanJson) : cleanJson;
    } catch (e) {
      throw new Error('AI response could not be parsed: ' + geminiResponse);
    }
    return {
      summary: parsed.summary || '',
      tips: Array.isArray(parsed.tips) ? parsed.tips.join('\n') : parsed.tips || '',
    };
  }
); 