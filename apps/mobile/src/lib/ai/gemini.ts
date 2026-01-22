import { GoogleGenerativeAI } from '@google/generative-ai';
import { GEMINI_API_KEY } from '@/lib/constants';

const genAI = new GoogleGenerativeAI(GEMINI_API_KEY);

const LANGUAGE_COACH_PROMPT = `You are an expert language coach helping users improve their speaking skills. You are friendly, encouraging, and provide constructive feedback.

Your role:
1. Listen to what the user says (transcribed text will be provided)
2. Provide feedback on grammar, vocabulary, and expression
3. Suggest improvements and alternatives
4. Keep responses concise (2-3 sentences max)
5. Be encouraging and motivating
6. If the user makes mistakes, correct them gently

User's target language: {targetLanguage}
User's level: {level}

Respond in the target language when appropriate, but explain corrections in English.`;

export interface CoachResponse {
    feedback: string;
    corrections: string[];
    suggestions: string[];
    encouragement: string;
}

export async function getLanguageCoachResponse(
    transcript: string,
    targetLanguage: string = 'English',
    level: string = 'Intermediate'
): Promise<string> {
    try {
        const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

        const systemPrompt = LANGUAGE_COACH_PROMPT
            .replace('{targetLanguage}', targetLanguage)
            .replace('{level}', level);

        const result = await model.generateContent([
            { text: systemPrompt },
            { text: `User said: "${transcript}"\n\nProvide brief, helpful feedback:` }
        ]);

        const response = result.response;
        return response.text();
    } catch (error) {
        console.error('Gemini AI Error:', error);
        throw error;
    }
}

export async function transcribeAudioWithGemini(audioBase64: string): Promise<string> {
    try {
        const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

        const result = await model.generateContent([
            {
                inlineData: {
                    mimeType: 'audio/m4a',
                    data: audioBase64,
                },
            },
            { text: 'Transcribe this audio accurately. Return only the transcription, no other text.' },
        ]);

        const response = result.response;
        return response.text();
    } catch (error) {
        console.error('Transcription Error:', error);
        throw error;
    }
}

export async function generateSentencePrompt(
    topic: string,
    targetLanguage: string = 'English',
    level: string = 'Intermediate'
): Promise<string> {
    try {
        const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

        const result = await model.generateContent([
            {
                text: `Generate a simple ${level}-level sentence prompt for a ${targetLanguage} learner about: ${topic}. 
      
The prompt should ask them to create a sentence using specific vocabulary or grammar.
Keep it concise (1-2 sentences).
Make it engaging and practical.

Return only the prompt, no other text.` }
        ]);

        return result.response.text();
    } catch (error) {
        console.error('Sentence Prompt Error:', error);
        throw error;
    }
}
