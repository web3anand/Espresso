export interface Mindshare {
  d1: number
  d7: number
  d30: number
  all: number
}

export async function fetchMindshare(handle: string): Promise<Mindshare> {
  const res = await fetch(`/api/mindshare?handle=${encodeURIComponent(handle)}`)
  if (!res.ok) throw new Error('Failed to fetch mindshare')
  return res.json()
}
