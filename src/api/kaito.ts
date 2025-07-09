const BASE_URL = 'https://api.kaito.ai/v1'

interface MindshareData {
  mindshare: number
  trend: 'positive' | 'neutral' | 'negative'
}

export async function fetchMindshare(topic: string): Promise<MindshareData> {
  const apiKey = import.meta.env.VITE_KAITO_API_KEY
  if (!apiKey) throw new Error('Missing KAITO API Key')

  const res = await fetch(`${BASE_URL}/mindshare?topic=${encodeURIComponent(topic)}`, {
    headers: {
      'Authorization': `Bearer ${apiKey}`,
    },
  })

  if (!res.ok) {
    throw new Error('Failed to fetch Kaito data')
  }

  return res.json() as Promise<MindshareData>
}
