import { useState, type FormEvent } from 'react'
import YapCard from './components/YapCard'
import { fetchYaps, type KaitoYapData } from './api/kaito'

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
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="bg-white shadow-xl rounded-2xl p-8 w-full max-w-xl space-y-6 text-center">
        <div className="space-y-2">
          <h1 className="text-4xl font-bold font-sans">Espresso Yaps</h1>
          <p className="text-gray-600 text-xl">Tokenized attention for X (Twitter) at a glance</p>
        </div>
        <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row items-center gap-4">
          <input
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Enter X username"
            className="w-full rounded-lg border border-gray-300 px-4 py-2 text-lg focus:outline-none focus:ring focus:ring-blue-500"
          />
          <button
            type="submit"
            className="rounded-lg bg-blue-600 px-6 py-2 font-bold text-white hover:bg-blue-700"
          >
            Search
          </button>
        </form>
        {loading && (
          <div className="flex justify-center">
            <div className="h-6 w-6 animate-spin rounded-full border-4 border-blue-600 border-t-transparent" />
          </div>
        )}
        {error && <p className="text-red-500">{error}</p>}
        {data && <YapCard data={data} />}
      </div>
    </div>
  )
}
