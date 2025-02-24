import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Send, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { sendMessage } from "@/lib/gemini";
import { apiRequest } from "@/lib/queryClient";
import type { Message } from "@shared/schema";

export const ChatInterface = () => {
  const [input, setInput] = useState("");
  const queryClient = useQueryClient();

  const clearChatMutation = useMutation({
    mutationFn: async () => {
      await apiRequest("DELETE", "/api/messages");
    },
    onSuccess: () => {
      queryClient.setQueryData(["/api/messages"], []);
    },
  });

  const { data: messages = [] } = useQuery<Message[]>({
    queryKey: ["/api/messages"],
  });

  const mutation = useMutation({
    mutationFn: async (content: string) => {
      await sendMessage(content);
    },
    onMutate: async (content) => {
      await queryClient.cancelQueries({ queryKey: ["/api/messages"] });
      const previousMessages = queryClient.getQueryData<Message[]>(["/api/messages"]) || [];

      const optimisticUserMessage = {
        id: Date.now(),
        content,
        role: "user" as const,
        timestamp: new Date(),
      };

      queryClient.setQueryData<Message[]>(["/api/messages"], [
        ...previousMessages,
        optimisticUserMessage,
      ]);

      return { previousMessages };
    },
    onError: (_error, _variables, context) => {
      if (context?.previousMessages) {
        queryClient.setQueryData(["/api/messages"], context.previousMessages);
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/messages"] });
    },
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    mutation.mutate(input);
    setInput("");
  };

  return (
    <Card className="w-full max-w-3xl mx-auto bg-black/80 border-purple-500/50">
      <div className="p-4 border-b border-purple-500/30 flex justify-between items-center">
        <h2 className="text-green-400 font-mono">Neural Interface Terminal</h2>
        <Button
          variant="ghost"
          size="icon"
          onClick={() => clearChatMutation.mutate()}
          disabled={clearChatMutation.isPending || messages.length === 0}
          className="text-red-400 hover:text-red-300"
        >
          <Trash2 className="h-4 w-4" />
        </Button>
      </div>
      <ScrollArea className="h-[500px] p-4">
        {messages.map((message, i) => (
          <motion.div
            key={message.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className={`mb-4 ${
              message.role === "assistant" ? "text-green-400" : "text-blue-400"
            }`}
          >
            <div className="font-mono text-sm">
              {message.role === "assistant" ? "ZERO" : "USER"} {message.content}
            </div>
          </motion.div>
        ))}
        {mutation.isPending && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-green-400 font-mono text-sm"
          >
            ZERO Processing neural response...
          </motion.div>
        )}
      </ScrollArea>
      <form onSubmit={handleSubmit} className="p-4 border-t border-purple-500/30">
        <div className="flex gap-2">
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Enter your message..."
            className="bg-black/50 border-purple-500/50 text-green-400 font-mono"
            disabled={mutation.isPending}
          />
          <Button type="submit" disabled={mutation.isPending}>
            <Send className="h-4 w-4" />
          </Button>
        </div>
      </form>
    </Card>
  );
};