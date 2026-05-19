import { GoogleGenerativeAI } from '@google/generative-ai';
import { loadEnv } from '../../lib/env.js';
import type { AIProvider } from './ai-provider.js';

const env = loadEnv();
const client = new GoogleGenerativeAI(env.GEMINI_API_KEY);

export const geminiProvider: AIProvider = {
  async generateMetadata(input) {
    const model = client.getGenerativeModel({ model: 'gemini-2.5-flash' });
    const prompt = [
      'You are a YouTube metadata generator.',
      `Title: ${input.title}`,
      input.transcript ? `Transcript: ${input.transcript}` : '',
      input.prompt ? `Prompt: ${input.prompt}` : '',
      'Return JSON with keys: titles (5 items), description, hashtags (array).',
    ]
      .filter(Boolean)
      .join('\n');

    const result = await model.generateContent(prompt);
    const text = result.response.text();
    try {
      const parsed = JSON.parse(text);
      return {
        titles: parsed.titles ?? [],
        description: parsed.description ?? '',
        hashtags: parsed.hashtags ?? [],
      };
    } catch (_error) {
      return {
        titles: [input.title],
        description: text,
        hashtags: [],
      };
    }
  },
};
