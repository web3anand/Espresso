import { useState, type FormEvent } from 'react';
import SearchGlass from './components/SearchGlass';
import MetricsCard from './components/MetricsCard';
import BackgroundBlobs from './components/BackgroundBlobs';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import type { KaitoYapData } from '../api/kaito';

async function fetchYaps(username: string): Promise<KaitoYapData> {
  const res = await fetch(`/api/yaps?username=${encodeURIComponent(username.trim())}`);
  if (!res.ok) {
    const text = await res.text();
    throw new Error(text || 'Failed to fetch data');
  }
  return (await res.json()) as KaitoYapData;
}

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
    try {
      const res = await fetchYaps(name);
      setData(res);
    } catch (err: any) {
      setError(err.message || 'User not found');
      setData(null);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <div className="container bg-espresso-radial bg-espresso-vignette flex-1 relative">
        <BackgroundBlobs />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-black/50 pointer-events-none"></div>
        <main className="relative flex flex-col items-center justify-center text-center py-20">
          <div className="relative z-10 container">
            <h1 className="text-6xl md:text-8xl font-extrabold text-white drop-shadow-lg">
              Espresso Yaps Analytics
            </h1>
            <p className="text-lg text-gray-300 mt-4">Tokenized attention for X at a glance</p>
            <div className="mt-8 w-full flex justify-center">
              <SearchGlass
                value={username}
                onChange={setUsername}
                onSubmit={handleSubmit}
                loading={loading}
              />
            </div>
            {error && <p className="text-red-500 mt-4">{error}</p>}
          </div>
          {data && <MetricsCard data={data} className="container" />}
        </main>
      </div>
      <Footer />
    </div>
  );
}
