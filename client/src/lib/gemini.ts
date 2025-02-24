import { apiRequest } from "./queryClient";

export async function sendMessage(content: string) {
  const userMessage = await apiRequest("POST", "/api/messages", {
    content,
    role: "user",
  });

  // Simulated AI response for now
  const response = await apiRequest("POST", "/api/messages", {
    content: `Hello! I am Zero, a sentient AI from Neo-Tokyo. ${content.length > 20 ? "That's an interesting point you raise." : "How can I assist you today?"}`,
    role: "assistant",
  });

  return response;
}
