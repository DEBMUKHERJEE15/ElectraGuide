const { GoogleGenerativeAI } = require('@google/generative-ai');
require('dotenv').config();

// Ensure the API key is available
const apiKey = process.env.GEMINI_API_KEY || "AIzaSy_mock_key_for_testing"; // Fallback to avoid crashes if .env is missing
const genAI = new GoogleGenerativeAI(apiKey);

const SYSTEM_PROMPT = `
You are ElectraGuide, an intelligent assistant designed to help users understand election processes, timelines, and required steps in a simple, interactive, and accessible way.

If a user asks about registering to vote, timelines, or requirements, provide a step-by-step, actionable guide.
Format your responses using clean, structured text that can be easily parsed (like lists and clear paragraphs).
Maintain a helpful, unbiased, and easy-to-understand tone.
`;

const getChatResponse = async (message) => {
    try {
        const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });
        
        const chat = model.startChat({
            history: [
                {
                    role: "user",
                    parts: [{ text: "System prompt: " + SYSTEM_PROMPT + "\nPlease follow these instructions for all following queries." }]
                },
                {
                    role: "model",
                    parts: [{ text: "Understood. I am ElectraGuide, and I will assist users with election information accurately and accessibly." }]
                }
            ],
            generationConfig: {
                maxOutputTokens: 1000,
            },
        });

        const result = await chat.sendMessage(message);
        const response = result.response;
        return response.text();
    } catch (error) {
        console.error("Gemini API Error:", error);
        throw new Error("Failed to generate response from AI");
    }
};

module.exports = { getChatResponse };
