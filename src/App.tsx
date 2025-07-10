import { useState, type FormEvent } from 'react'
// We will define fetchYaps inline for clarity, or you can update your ./api/kaito file.
import FlexCard from './components/FlexCard'

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

// Proxy endpoint: /api/yaps?username=...
export async function fetchYaps(username: string): Promise<KaitoYapData> {
  const res = await fetch(`/api/yaps?username=${encodeURIComponent(username.trim())}`);

  const text = await res.text();
  try {
    if (!res.ok) {
      throw new Error(text || 'Failed to fetch data');
    }
    return JSON.parse(text) as KaitoYapData;
  } catch (err) {
    throw new Error(text || 'Failed to fetch data');
  }
}

export default function App() {
  const [username, setUsername] = useState('')
  const [data, setData] = useState<KaitoYapData | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const name = username.trim()
    if (!name) return
    setLoading(true)
    setError('')
    setData(null)
    try {
      const res = await fetchYaps(name)
      setData(res)
    } catch (err: any) {
      setError(err.message || 'User not found or request failed')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="w-full max-w-xl space-y-4 rounded-xl bg-white/30 backdrop-blur-md p-6 shadow-lg">
        <form
          onSubmit={handleSubmit}
          className="flex flex-col items-center space-y-2 sm:flex-row sm:space-y-0 sm:space-x-2"
        >
          <input
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Enter X username"
            className="w-full max-w-sm flex-grow rounded border border-gray-300 bg-white/80 px-3 py-2 focus:outline-none"
          />
          <button
            type="submit"
            className="rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
          >
            Submit
          </button>
        </form>
        {loading && <p className="text-center">Loading...</p>}
        {error && <p className="text-center text-red-500">{error}</p>}
        {data && <FlexCard data={data} />}
      </div>
    </div>
  )
}
