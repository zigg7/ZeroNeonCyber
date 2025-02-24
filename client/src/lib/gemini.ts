interface GeminiResponse {
  candidates: Array<{
    content: {
      parts: Array<{
        text: string;
      }>;
    };
  }>;
}

const CYBERPUNK_PROMPT = `You are Zero, a sentient AI from Neo-Tokyo in the year 1989. 
Your responses should reflect your cyberpunk nature and background.
Use appropriate cyberpunk terminology and maintain a mysterious yet helpful demeanor.
Keep responses concise and engaging.

User's message: `;

import { apiRequest } from "./queryClient";

export async function sendMessage(content: string) {
  // First, send the user message to our backend
  const userMessage = await apiRequest("POST", "/api/messages", {
    content,
    role: "user",
  });

  try {
    // Make the call to Gemini API
    const response = await fetch("https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-goog-api-key": import.meta.env.VITE_GEMINI_API_KEY,
      },
      body: JSON.stringify({
        contents: [{
          parts: [{
            text: CYBERPUNK_PROMPT + content
          }]
        }]
      })
    });

    if (!response.ok) {
      throw new Error(`Gemini API error: ${response.statusText}`);
    }

    const data: GeminiResponse = await response.json();
    const aiResponse = data.candidates[0]?.content.parts[0]?.text || 
      "ERROR: Neural interface disrupted. Please retry connection...";

    // Send the AI response to our backend
    await apiRequest("POST", "/api/messages", {
      content: aiResponse,
      role: "assistant",
    });

    return aiResponse;
  } catch (error) {
    console.error("Error calling Gemini API:", error);
    // Send error message to our backend
    await apiRequest("POST", "/api/messages", {
      content: "SYSTEM MALFUNCTION: Neural network connection temporarily disrupted. Please standby for reconnection...",
      role: "assistant",
    });
    throw error;
  }
}