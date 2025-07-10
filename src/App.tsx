import { useState, type FormEvent } from 'react';
import { fetchYaps } from './api/kaito';
import type { KaitoYapData } from './api/kaito';

export default function App() {
  const [username, setUsername] = useState('');
  const [data, setData] = useState<KaitoYapData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const name = username.trim();
    if (!name) return;
    setLoading(true);
    setError('');
    setData(null);
    try {
      const result = await fetchYaps(name);
      setData(result);
    } catch {
      setError('User not found or request failed');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <div className="w-full max-w-md space-y-4">
        <form onSubmit={handleSubmit} className="flex space-x-2">
          <input
            type="text"
            placeholder="Enter X username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="flex-grow rounded border border-gray-300 px-3 py-2 focus:outline-none"
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
        {data && (
          <div className="rounded-lg bg-white p-4 shadow">
            <h2 className="mb-2 text-lg font-semibold">{data.username}</h2>
            <ul className="space-y-1">
              <li>yaps_all: {data.yaps_all}</li>
              <li>yaps_l24h: {data.yaps_l24h}</li>
              <li>yaps_l48h: {data.yaps_l48h}</li>
              <li>yaps_l7d: {data.yaps_l7d}</li>
              <li>yaps_l30d: {data.yaps_l30d}</li>
              <li>yaps_l3m: {data.yaps_l3m}</li>
              <li>yaps_l6m: {data.yaps_l6m}</li>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}
