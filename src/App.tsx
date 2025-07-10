import { useState, type FormEvent } from 'react'
import { fetchYaps } from './api/kaito'
import type { KaitoYapData } from './api/kaito'
import FlexCard from './components/FlexCard'

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
    } catch (err) {
      setError('User not found or request failed')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <div className="w-full max-w-md space-y-4">
        <form onSubmit={handleSubmit} className="flex space-x-2">
          <input
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Enter X username"
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
        {data && <FlexCard data={data} />}
      </div>
    </div>
  )
}
