import { messages, type Message, type InsertMessage } from "@shared/schema";
import { createClient } from '@supabase/supabase-js';

export interface IStorage {
  getMessages(): Promise<Message[]>;
  createMessage(message: InsertMessage): Promise<Message>;
}

export class SupabaseStorage implements IStorage {
  private supabase;

  constructor() {
    const supabaseUrl = process.env.SUPABASE_URL;
    const supabaseKey = process.env.SUPABASE_API_KEY;

    if (!supabaseUrl || !supabaseKey) {
      throw new Error('Missing Supabase environment variables. Please ensure SUPABASE_URL and SUPABASE_API_KEY are set.');
    }

    this.supabase = createClient(supabaseUrl, supabaseKey);
  }

  async getMessages(): Promise<Message[]> {
    try {
      const { data, error } = await this.supabase
        .from('messages')
        .select('*')
        .order('timestamp', { ascending: true });

      if (error) throw error;
      return data as Message[];
    } catch (error) {
      console.error('Error fetching messages:', error);
      throw new Error('Failed to fetch messages');
    }
  }

  async createMessage(insertMessage: InsertMessage): Promise<Message> {
    try {
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
    } catch (error) {
      console.error('Error creating message:', error);
      throw new Error('Failed to create message');
    }
  }
}

// Only initialize storage if environment variables are available
let storage: IStorage;

try {
  storage = new SupabaseStorage();
} catch (error) {
  console.error('Failed to initialize Supabase storage:', error);
  throw error;
}

export { storage };