import { useState } from 'react'
import type { FormEvent } from 'react'
import { useNavigate } from '../router'

const popular = ['elonmusk', 'jack', 'naval', 'a16z', 'vitalik']

export default function SearchBar() {
  const navigate = useNavigate()
  const [query, setQuery] = useState('')
  const matches =
    query.length === 0
      ? []
      : popular.filter((n) => n.startsWith(query.toLowerCase()))

  function onSubmit(e: FormEvent) {
    e.preventDefault()
    if (!query) return
    navigate(`/dashboard?u=${encodeURIComponent(query)}`)
  }

  return (
    <form onSubmit={onSubmit} className="relative w-full max-w-sm">
      <input
        className="w-full rounded-lg border border-gray-300 bg-white/80 px-3 py-2 text-black focus:outline-none"
        placeholder="Search username"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      {matches.length > 0 && (
        <ul className="absolute z-10 w-full divide-y rounded bg-white shadow">
          {matches.map((m) => (
            <li
              key={m}
              className="cursor-pointer px-3 py-1 hover:bg-gray-100"
              onMouseDown={() => {
                setQuery(m)
                navigate(`/dashboard?u=${encodeURIComponent(m)}`)
              }}
            >
              {m}
            </li>
          ))}
        </ul>
      )}
    </form>
  )
}
