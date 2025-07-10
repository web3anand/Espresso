export interface KaitoYapData {
  user_id: string;
  username: string;
  yaps_all: number;
  yaps_l24h: number;
  yaps_l48h: number;
  yaps_l7d: number;
  yaps_l30d: number;
  yaps_l3m: number;
  yaps_l6m: number;
  yaps_l12m: number;
  [key: string]: unknown;
}

export async function fetchYaps(username: string): Promise<KaitoYapData> {
  const res = await fetch(`/api/yaps?username=${encodeURIComponent(username.trim())}`);
  const text = await res.text();
  if (!res.ok) {
    throw new Error(text || 'Failed to fetch data');
  }
  try {
    return JSON.parse(text) as KaitoYapData;
  } catch {
    throw new Error('Failed to parse response');
  }
}
