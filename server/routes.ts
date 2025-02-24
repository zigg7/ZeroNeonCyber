import type { Express } from "express";
import { createServer } from "http";
import { storage } from "./storage";
import { insertMessageSchema } from "@shared/schema";

export async function registerRoutes(app: Express) {
  app.get("/api/messages", async (_req, res) => {
    try {
      const messages = await storage.getMessages();
      res.json(messages);
    } catch (error) {
      console.error('Error getting messages:', error);
      res.status(500).json({ error: 'Failed to fetch messages' });
    }
  });

  app.post("/api/messages", async (req, res) => {
    try {
      const result = insertMessageSchema.safeParse(req.body);
      if (!result.success) {
        return res.status(400).json({ error: result.error });
      }

      const message = await storage.createMessage(result.data);
      res.json(message);
    } catch (error) {
      console.error('Error creating message:', error);
      res.status(500).json({ error: 'Failed to create message' });
    }
  });

  app.delete("/api/messages", async (_req, res) => {
    try {
      await storage.deleteAllMessages();
      res.status(204).send();
    } catch (error) {
      console.error('Error deleting messages:', error);
      res.status(500).json({ error: 'Failed to delete messages' });
    }
  });

  return createServer(app);
}