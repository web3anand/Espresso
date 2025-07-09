const BASE_URL = 'https://api.kaito.ai/api/v1/yaps'

export async function fetchYaps(topic) {
  const apiKey = import.meta.env.VITE_KAITO_API_KEY
  if (!apiKey) throw new Error('Missing VITE_KAITO_API_KEY')

  const res = await fetch(`${BASE_URL}?topic=${encodeURIComponent(topic)}`, {
    headers: {
      Authorization: `Bearer ${apiKey}`,
    },
  })

  if (!res.ok) {
    const text = await res.text()
    throw new Error(text || 'Failed to fetch Yaps')
  }

  const data = await res.json()
  return Array.isArray(data) ? data : data.yaps ?? []
}
