import { storage } from '../server/storage';
import { insertMessageSchema } from '../shared/schema';
import type { VercelRequest, VercelResponse } from '@vercel/node';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  try {
    switch (req.method) {
      case 'GET':
        const messages = await storage.getMessages();
        return res.json(messages);

      case 'POST':
        const result = insertMessageSchema.safeParse(req.body);
        if (!result.success) {
          return res.status(400).json({ error: result.error });
        }
        const message = await storage.createMessage(result.data);
        return res.json(message);

      case 'DELETE':
        await storage.deleteAllMessages();
        return res.status(204).send(null);

      default:
        res.setHeader('Allow', ['GET', 'POST', 'DELETE']);
        return res.status(405).end(`Method ${req.method} Not Allowed`);
    }
  } catch (error) {
    console.error('API error:', error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
}
