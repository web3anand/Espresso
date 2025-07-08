import { useState } from 'react'
import { fetchMindshare, Mindshare } from '../api/mindshare'

interface Props {
  onConnected: (data: { handle: string; name: string; mindshare: Mindshare; pfp: string }) => void
}

export default function Connect({ onConnected }: Props) {
  const [handle, setHandle] = useState('')
  const [name, setName] = useState('')
  const [loading, setLoading] = useState(false)
  const connect = async () => {
    try {
      setLoading(true)
      const mindshare = await fetchMindshare(handle)
      const pfp = `https://unavatar.io/twitter/${handle}`
      onConnected({ handle, name, mindshare, pfp })
    } finally {
      setLoading(false)
    }
  }
  return (
    <div className="space-y-4">
      <h1 className="text-3xl font-bold">Connect X</h1>
      <input
        className="border rounded px-2 py-1 text-black"
        placeholder="Handle"
        value={handle}
        onChange={(e) => setHandle(e.target.value)}
      />
      <input
        className="border rounded px-2 py-1 text-black"
        placeholder="Display Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <button onClick={connect} disabled={loading} className="bg-amber-600 px-4 py-2 rounded">
        {loading ? 'Loading...' : 'Connect'}
      </button>
    </div>
  )
}
