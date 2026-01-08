import { geminiModel } from '../config/gemini';

interface GrammarReviewResult {
    feedback: string;
    corrections: string[];
    corrected: string;
}

export async function reviewGrammar(
    text: string,
    targetLanguage: string
): Promise<GrammarReviewResult> {
    if (!geminiModel) {
        return {
            feedback: 'AI service not configured',
            corrections: [],
            corrected: text,
        };
    }

    const prompt = `You are a language teacher reviewing a student's writing in ${targetLanguage}.

Student's text:
"${text}"

Provide:
1. Brief feedback on what was done well
2. Grammar corrections with explanations
3. A corrected version of the text

IMPORTANT: Respond ONLY with valid JSON, no markdown, no code blocks:
{"feedback": "...", "corrections": ["..."], "corrected": "..."}`;

    try {
        const result = await geminiModel.generateContent(prompt);
        const response = result.response.text();

        // Clean up potential markdown formatting
        const cleaned = response
            .replace(/```json\n?/g, '')
            .replace(/```\n?/g, '')
            .trim();

        return JSON.parse(cleaned);
    } catch (error) {
        console.error('AI Grammar Review Error:', error);
        return {
            feedback: 'Could not process grammar review',
            corrections: [],
            corrected: text,
        };
    }
}

export async function generatePracticeSentences(
    verbs: string[],
    targetLanguage: string,
    level: string
): Promise<string[]> {
    if (!geminiModel) {
        return verbs.map((v) => `Practice with: ${v}`);
    }

    const prompt = `Generate 3 practice sentences for each verb at ${level} level in ${targetLanguage}.
Verbs: ${verbs.join(', ')}

IMPORTANT: Respond ONLY with a valid JSON array of strings, no markdown:
["sentence 1", "sentence 2", ...]`;

    try {
        const result = await geminiModel.generateContent(prompt);
        const response = result.response.text();

        const cleaned = response
            .replace(/```json\n?/g, '')
            .replace(/```\n?/g, '')
            .trim();

        return JSON.parse(cleaned);
    } catch (error) {
        console.error('AI Practice Sentences Error:', error);
        return verbs.map((v) => `Practice sentence for: ${v}`);
    }
}

export async function suggestTodaysPodcast(
    targetLanguage: string,
    level: string,
    interests?: string[]
): Promise<{ title: string; description: string; suggestedUrl?: string }> {
    if (!geminiModel) {
        return {
            title: `Daily ${targetLanguage} Podcast`,
            description: 'Find a podcast in your target language',
        };
    }

    const interestsText = interests?.length
        ? `User interests: ${interests.join(', ')}`
        : '';

    const prompt = `Suggest a podcast for learning ${targetLanguage} at ${level} level.
${interestsText}

IMPORTANT: Respond ONLY with valid JSON:
{"title": "Podcast Name", "description": "Brief description", "suggestedUrl": "optional URL or null"}`;

    try {
        const result = await geminiModel.generateContent(prompt);
        const response = result.response.text();

        const cleaned = response
            .replace(/```json\n?/g, '')
            .replace(/```\n?/g, '')
            .trim();

        return JSON.parse(cleaned);
    } catch (error) {
        console.error('AI Podcast Suggestion Error:', error);
        return {
            title: `Daily ${targetLanguage} Practice`,
            description: 'Listen to native content in your target language',
        };
    }
}
