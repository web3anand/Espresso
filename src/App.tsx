import { useState, type FormEvent } from 'react'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import DashboardLayout from './components/DashboardLayout'
import InsightsModal from './components/InsightsModal'
import Footer from './components/Footer'
import type { KaitoYapData } from './types'


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
  const [showInsights, setShowInsights] = useState(false)

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
    <div>
      <Navbar />
      <Hero username={username} onUsernameChange={setUsername} onSubmit={handleSubmit} />
      {loading && <p className="text-center mt-4">Loading...</p>}
      {error && <p className="text-center text-red-500 mt-4">{error}</p>}
      {data && (
        <>
          <DashboardLayout data={data} onShowInsights={() => setShowInsights(true)} />
          <InsightsModal
            open={showInsights}
            onClose={() => setShowInsights(false)}
            points={[data.yaps_l24h, data.yaps_l7d, data.yaps_l30d, data.yaps_l6m]}
          />
        </>
      )}
      <Footer />
    </div>
  )
}
