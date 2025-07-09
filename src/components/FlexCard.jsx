import { useEffect, useState } from 'react'
import { fetchYaps } from '../api/kaito'

export default function FlexCard({ topic }) {
  const [yaps, setYaps] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    let mounted = true
    async function load() {
      setLoading(true)
      setError(null)
      try {
        const data = await fetchYaps(topic)
        if (mounted) {
          setYaps(Array.isArray(data) ? data.slice(0, 3) : [])
        }
      } catch (err) {
        if (mounted) setError(err.message)
      } finally {
        if (mounted) setLoading(false)
      }
    }
    load()
    return () => {
      mounted = false
    }
  }, [topic])

  return (
    <div className="rounded-xl bg-white/10 ring-1 ring-white/20 backdrop-blur-md p-4 transition-transform hover:scale-105 hover:shadow-xl">
      {loading && <p>Loading...</p>}
      {error && <p className="text-red-500">{error}</p>}
      {!loading && !error && (
        <>
          <h2 className="text-lg font-semibold mb-2">{topic}</h2>
          <ul className="space-y-2 mb-4">
            {yaps.map((yap, idx) => (
              <li key={idx} className="text-sm text-gray-200">
                {typeof yap === 'string' ? yap : yap.text || JSON.stringify(yap)}
              </li>
            ))}
          </ul>
          <a
            href={`https://kaito.ai/search?q=${encodeURIComponent(topic)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block px-3 py-1 rounded bg-white/20 text-sm hover:bg-white/30"
          >
            View on Kaito
          </a>
        </>
      )}
    </div>
  )
}
