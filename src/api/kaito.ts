export interface KaitoYapData {
  username: string;
  yaps_all: number;
  yaps_124h: number;
  yaps_16m: number;
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
