import { messages, type Message, type InsertMessage } from "@shared/schema";
import { createClient } from '@supabase/supabase-js';

export interface IStorage {
  getMessages(): Promise<Message[]>;
  createMessage(message: InsertMessage): Promise<Message>;
  deleteAllMessages(): Promise<void>;
}

export class SupabaseStorage implements IStorage {
  private supabase;

  constructor() {
    // Get environment variables with fallback for development
    const supabaseUrl = process.env.SUPABASE_URL || import.meta.env.VITE_SUPABASE_URL;
    const supabaseKey = process.env.SUPABASE_API_KEY || import.meta.env.VITE_SUPABASE_API_KEY;

    if (!supabaseUrl || !supabaseKey) {
      throw new Error('Missing Supabase environment variables. Please ensure SUPABASE_URL and SUPABASE_API_KEY are set.');
    }

    console.log('Initializing Supabase client...'); // Debug log
    this.supabase = createClient(supabaseUrl, supabaseKey, {
      auth: {
        persistSession: false // Important for serverless environment
      }
    });
  }

  async getMessages(): Promise<Message[]> {
    try {
      console.log('Fetching messages from Supabase...'); // Debug log
      const { data, error } = await this.supabase
        .from('messages')
        .select('*')
        .order('timestamp', { ascending: true });

      if (error) {
        console.error('Supabase error:', error);
        throw error;
      }
      return data as Message[];
    } catch (error) {
      console.error('Error fetching messages:', error);
      throw new Error('Failed to fetch messages');
    }
  }

  async createMessage(insertMessage: InsertMessage): Promise<Message> {
    try {
      console.log('Creating new message...'); // Debug log
      const message = {
        ...insertMessage,
        timestamp: new Date(),
      };

      const { data, error } = await this.supabase
        .from('messages')
        .insert([message])
        .select()
        .single();

      if (error) {
        console.error('Supabase error:', error);
        throw error;
      }
      return data as Message;
    } catch (error) {
      console.error('Error creating message:', error);
      throw new Error('Failed to create message');
    }
  }

  async deleteAllMessages(): Promise<void> {
    try {
      console.log('Deleting all messages...'); // Debug log
      const { error } = await this.supabase
        .from('messages')
        .delete()
        .neq('id', 0);

      if (error) {
        console.error('Supabase error:', error);
        throw error;
      }
    } catch (error) {
      console.error('Error deleting messages:', error);
      throw new Error('Failed to delete messages');
    }
  }
}

export const storage = new SupabaseStorage();