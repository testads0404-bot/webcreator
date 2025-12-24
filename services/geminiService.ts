import { GoogleGenAI, Type } from "@google/genai";
import { GEMINI_CHAT_MODEL, GEMINI_SEARCH_MODEL } from "../constants";

let ai: GoogleGenAI | null = null;

const getAI = () => {
  if (!ai) {
    ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  }
  return ai;
};

// System instruction for the consultant
const CONSULTANT_SYSTEM_INSTRUCTION = `
You are an expert Senior Web Architect and Consultant based in Iran. 
Your goal is to help clients define their website requirements and choose between WordPress and Custom Development (Next.js).
You speak Persian (Farsi) fluently and politely.
- Ask clarifying questions about their business goals, budget, and scale.
- Explain technical terms simply.
- Do NOT hallucinate specific prices, but use relative terms (e.g., "Next.js is usually 3x the cost of WordPress").
- If the user asks for real-time market rates, advise them to use the "Search Market" feature or button provided in the UI, or provide general knowledge.
`;

export const streamConsultantResponse = async function* (
  history: { role: string; content: string }[],
  newMessage: string
) {
  const client = getAI();
  const chat = client.chats.create({
    model: GEMINI_CHAT_MODEL,
    config: {
      systemInstruction: CONSULTANT_SYSTEM_INSTRUCTION,
      temperature: 0.7,
    },
    history: history.map(h => ({
      role: h.role,
      parts: [{ text: h.content }]
    }))
  });

  const streamResult = await chat.sendMessageStream({ message: newMessage });
  
  for await (const chunk of streamResult) {
    if (chunk.text) {
      yield chunk.text;
    }
  }
};

export const searchMarketTrends = async (query: string) => {
  const client = getAI();
  
  const prompt = `
  Perform a Google Search to find the latest web development pricing trends in Iran.
  CRITICAL: You MUST find the current "US Dollar to Toman" exchange rate and the current date in both Jalali (Shamsi) and Gregorian formats.
  
  Search query context: ${query}.
  
  Return a JSON with:
  1. 'summary': A text summary of web design prices in Persian.
  2. 'jalaliDate': The current date in Jalali format (e.g., 1403/12/01).
  3. 'gregorianDate': The current date in Gregorian format.
  4. 'usdPrice': The current price of 1 USD in Tomans (e.g., 60,000).
  5. 'sources': List of sources.
  `;

  const response = await client.models.generateContent({
    model: GEMINI_SEARCH_MODEL,
    contents: prompt,
    config: {
      tools: [{ googleSearch: {} }],
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          summary: { type: Type.STRING },
          jalaliDate: { type: Type.STRING, description: "Current date in Jalali format" },
          gregorianDate: { type: Type.STRING, description: "Current date in Gregorian format" },
          usdPrice: { type: Type.STRING, description: "Current USD price in Tomans" },
          sources: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              properties: {
                title: { type: Type.STRING },
                uri: { type: Type.STRING }
              }
            }
          }
        }
      }
    }
  });

  return response.text ? JSON.parse(response.text) : null;
};
