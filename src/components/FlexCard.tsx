import { useEffect, useState } from 'react';
import { fetchYaps } from '../api/kaito';

interface Props {
  username: string;
}

interface YapStats {
  yaps_all?: number;
  yaps_124h?: number;
  yaps_16m?: number;
  [key: string]: any;
}

export default function FlexCard({ username }: Props) {
  const [stats, setStats] = useState<YapStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setLoading(true);
    setError(null);
    fetchYaps(username)
      .then(setStats)
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, [username]);

  return (
    <div className="rounded-xl bg-white/10 ring-1 ring-white/20 backdrop-blur-md p-4 transition-transform hover:scale-105">
      <h2 className="text-lg font-semibold mb-2">{username}</h2>
      {loading && <p>Loading...</p>}
      {error && <p className="text-red-500">{error}</p>}
      {!loading && !error && stats && (
        <ul className="space-y-1 text-sm text-gray-200">
          <li>All: {stats.yaps_all ?? 'N/A'}</li>
          <li>24h: {stats.yaps_124h ?? 'N/A'}</li>
          <li>16m: {stats.yaps_16m ?? 'N/A'}</li>
        </ul>
      )}
    </div>
  );
}
