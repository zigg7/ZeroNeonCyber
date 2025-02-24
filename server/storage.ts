import { messages, type Message, type InsertMessage } from "@shared/schema";

export interface IStorage {
  getMessages(): Promise<Message[]>;
  createMessage(message: InsertMessage): Promise<Message>;
}

export class MemStorage implements IStorage {
  private messages: Message[];
  private currentId: number;

  constructor() {
    this.messages = [];
    this.currentId = 1;
  }

  async getMessages(): Promise<Message[]> {
    return this.messages;
  }

  async createMessage(insertMessage: InsertMessage): Promise<Message> {
    const message: Message = {
      id: this.currentId++,
      content: insertMessage.content,
      role: insertMessage.role,
      timestamp: new Date(),
    };
    this.messages.push(message);
    return message;
  }
}

export const storage = new MemStorage();
