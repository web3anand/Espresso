const BASE_URL = 'https://api.kaito.ai/api/v1/yaps'

export async function fetchYaps(topic) {
  const apiKey = import.meta.env.VITE_KAITO_API_KEY
  if (!apiKey) {
    throw new Error('Missing KAITO API Key')
  }

  const res = await fetch(`${BASE_URL}?topic=${encodeURIComponent(topic)}`, {
    headers: {
      Authorization: `Bearer ${apiKey}`,
    },
  })

  if (!res.ok) {
    throw new Error('Failed to fetch Yaps')
  }

  const data = await res.json()
  if (Array.isArray(data)) return data
  if (Array.isArray(data.yaps)) return data.yaps
  if (Array.isArray(data.data)) return data.data
  return []
}
