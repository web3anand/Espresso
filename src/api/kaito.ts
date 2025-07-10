export interface KaitoYapData {
  username: string;
  yaps_all: number;
  yaps_l24h: number;
  yaps_l48h: number;
  yaps_l7d: number;
  yaps_l30d: number;
  yaps_l3m: number;
  yaps_l6m: number;
}

export async function fetchYaps(username: string): Promise<KaitoYapData> {
  const url = `https://api.kaito.ai/api/v1/yaps?username=${encodeURIComponent(username.trim())}`;
  const res = await fetch(url);
  if (!res.ok) {
    throw new Error('Failed to fetch data');
  }
  return (await res.json()) as KaitoYapData;
}
