import { useEffect, useState } from 'react'
import { fetchYaps } from '../api/kaito'

export default function FlexCard({ topic }) {
  const [yaps, setYaps] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    let active = true
    async function load() {
      setLoading(true)
      setError(null)
      try {
        const data = await fetchYaps(topic)
        if (active) setYaps((Array.isArray(data) ? data : []).slice(0, 3))
      } catch (err) {
        if (active) setError(err.message)
      } finally {
        if (active) setLoading(false)
      }
    }
    load()
    return () => {
      active = false
    }
  }, [topic])

  return (
    <div className="rounded-xl bg-white/10 backdrop-blur-md p-5 shadow-lg hover:shadow-xl transition transform hover:-translate-y-1 flex flex-col justify-between">
      <div>
        <h2 className="text-xl font-semibold mb-3">{topic}</h2>
        {loading && <p>Loading...</p>}
        {error && <p className="text-red-500">{error}</p>}
        {!loading && !error && (
          <ul className="space-y-2">
            {yaps.map((y, idx) => (
              <li key={idx} className="text-sm leading-snug">{y}</li>
            ))}
          </ul>
        )}
      </div>
      <a
        href={`https://kaito.ai/search?q=${encodeURIComponent(topic)}`}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-4 self-start text-blue-400 hover:underline"
      >
        View on Kaito
      </a>
    </div>
  )
}
