import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || "" });

export async function generateGemContent(prompt: string, systemInstruction?: string) {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: prompt,
      config: {
        systemInstruction: systemInstruction || "You are an AI academic assistant for Aditya University. Provide helpful, professional, and structured responses.",
        temperature: 0.7,
      },
    });

    return response.text;
  } catch (error) {
    console.error("Gemini API Error:", error);
    throw new Error("Failed to generate content. Please try again.");
  }
}

export async function chatWithRegulationsAgent(messages: {role: 'user' | 'model', content: string}[]) {
  try {
    const contents = messages.map(m => ({
      role: m.role,
      parts: [{ text: m.content }]
    }));

    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: contents,
      config: {
        systemInstruction: "You are the 'AUS Regulations agent'. Your job is to answer questions about academic policies, exam rules, attendance requirements, and other administrative regulations. Emulate the exact persona, tone, and depth of the official 'AUS Regulations agent' Gemini Gem. Be very professional and cite 'University Handbook' where applicable.",
        temperature: 0.7,
      },
    });

    return response.text;
  } catch (error) {
    console.error("Gemini Chat API Error:", error);
    throw new Error("Failed to communicate with the Regulations agent. Please try again.");
  }
}
