// /api/yaps.ts (for Vercel/Next.js serverless function)
export default async function handler(req, res) {
  const { username } = req.query;
  const url = `https://api.kaito.ai/api/v1/yaps?username=${encodeURIComponent(username)}`;
  const response = await fetch(url);
  const data = await response.json();

  // Optionally: pass along the real status code!
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.status(response.status).json(data);
}
