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
  [key: string]: unknown;
}


export async function fetchYaps(username: string): Promise<KaitoYapData> {
  const res = await fetch(
    `https://api.kaito.ai/api/v1/yaps?username=${encodeURIComponent(username)}`
  );

  if (!res.ok) {
    throw new Error('Failed to fetch data');
  }

  return (await res.json()) as KaitoYapData;
}
