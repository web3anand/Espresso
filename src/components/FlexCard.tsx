import { useEffect, useState } from 'react'
import { fetchMindshare } from '../api/kaito'

interface Props {
  topic: string
}

interface Data {
  mindshare: number
  trend: string
}

export default function FlexCard({ topic }: Props) {
  const [data, setData] = useState<Data | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    let mounted = true
    let timer: number | undefined

    async function load() {
      setLoading(true)
      setError(null)
      try {
        const res = await fetchMindshare(topic)
        if (mounted) {
          setData(res)
        }
      } catch (err) {
        if (mounted) {
          setError((err as Error).message)
        }
      } finally {
        if (mounted) setLoading(false)
      }
    }

    load()
    timer = window.setInterval(load, 60_000)

    return () => {
      mounted = false
      if (timer) clearInterval(timer)
    }
  }, [topic])

  return (
    <div
      className="rounded-xl bg-white/10 backdrop-blur-md p-4 transition-transform transform hover:scale-105 hover:shadow-xl"
    >
      {loading && (
        <div className="flex items-center justify-center h-24">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white"></div>
        </div>
      )}
      {error && <p className="text-red-500">{error}</p>}
      {!loading && !error && data && (
        <>
          <h2 className="text-lg font-semibold mb-2">{topic}</h2>
          <p className="mb-1">Mindshare: <span className="font-bold">{data.mindshare}</span></p>
          <p className="mb-2">Trend: <span className="capitalize">{data.trend}</span></p>
          <a
            href={`https://kaito.ai/search?q=${encodeURIComponent(topic)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-400 underline"
          >
            View on Kaito
          </a>
        </>
      )}
    </div>
  )
}
