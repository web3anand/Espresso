export async function fetchYaps(username: string) {
  const url = `https://api.kaito.ai/api/v1/yaps?username=${encodeURIComponent(username)}`;
  const res = await fetch(url);
  if (!res.ok) {
    throw new Error('Failed to fetch Yaps');
  }
  return res.json();
}
