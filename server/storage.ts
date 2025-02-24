import { messages, type Message, type InsertMessage } from "@shared/schema";
import { createClient } from '@supabase/supabase-js';

export interface IStorage {
  getMessages(): Promise<Message[]>;
  createMessage(message: InsertMessage): Promise<Message>;
}

export class SupabaseStorage implements IStorage {
  private supabase;

  constructor() {
    if (!process.env.SUPABASE_URL || !process.env.SUPABASE_API_KEY) {
      throw new Error('Missing Supabase environment variables');
    }

    this.supabase = createClient(
      process.env.SUPABASE_URL,
      process.env.SUPABASE_API_KEY
    );
  }

  async getMessages(): Promise<Message[]> {
    const { data, error } = await this.supabase
      .from('messages')
      .select('*')
      .order('timestamp', { ascending: true });

    if (error) throw error;
    return data as Message[];
  }

  async createMessage(insertMessage: InsertMessage): Promise<Message> {
    const message = {
      ...insertMessage,
      timestamp: new Date(),
    };

    const { data, error } = await this.supabase
      .from('messages')
      .insert([message])
      .select()
      .single();

    if (error) throw error;
    return data as Message;
  }
}

export const storage = new SupabaseStorage();