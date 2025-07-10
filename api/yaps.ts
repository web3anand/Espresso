import type { VercelRequest, VercelResponse } from '@vercel/node'

export default async function handler(req: VercelRequest, res: VercelResponse) {
  try {
    const { username } = req.query;
    if (!username || typeof username !== 'string') {
      res.status(400).json({ error: 'Username is required' });
      return;
    }
    const url = `https://api.kaito.ai/api/v1/yaps?username=${encodeURIComponent(username)}`;
    const response = await fetch(url);
    const data = await response.json();
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.status(response.status).json(data);
  } catch (err: any) {
    // Log error for debugging in Vercel dashboard
    console.error('API error:', err);
    res.status(500).json({ error: String(err) });
  }
}
