import { GoogleGenerativeAI } from '@google/generative-ai';
import { config } from './env';

// Initialize Gemini AI client
const genAI = config.geminiApiKey
    ? new GoogleGenerativeAI(config.geminiApiKey)
    : null;

export const geminiModel = genAI?.getGenerativeModel({ model: 'gemini-pro' });

export { genAI };
