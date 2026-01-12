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
