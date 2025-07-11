import { useState } from 'react'
import type { FormEvent } from 'react'
import { useLocalStorage } from '../hooks/useLocalStorage'
import { Link } from '../router'

export interface Groups {
  [name: string]: string[]
}

export default function GroupManager() {
  const [groups, setGroups] = useLocalStorage<Groups>('groups', {})
  const [name, setName] = useState('')
  const [user, setUser] = useState('')

  function addGroup(e: FormEvent) {
    e.preventDefault()
    if (!name) return
    setGroups({ ...groups, [name]: [] })
    setName('')
  }

  function addUser(e: FormEvent) {
    e.preventDefault()
    if (!user || !name) return
    setGroups({ ...groups, [name]: [...(groups[name] || []), user] })
    setUser('')
  }

  function removeUser(g: string, u: string) {
    setGroups({ ...groups, [g]: groups[g].filter((n) => n !== u) })
  }

  return (
    <div className="space-y-4">
      <form onSubmit={addGroup} className="space-x-2">
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="New group name"
          className="rounded border px-2 py-1"
        />
        <button type="submit" className="rounded bg-blue-600 px-3 py-1 text-white">
          Add Group
        </button>
      </form>
      {Object.keys(groups).map((g) => (
        <div key={g} className="rounded border p-4">
          <h3 className="font-semibold">
            <Link to={`/groups/${encodeURIComponent(g)}`}>{g}</Link>
          </h3>
          <form onSubmit={addUser} className="mt-2 flex space-x-2">
            <input
              value={user}
              onChange={(e) => setUser(e.target.value)}
              placeholder="Add username"
              className="flex-grow rounded border px-2 py-1"
            />
            <button
              type="submit"
              onClick={() => setName(g)}
              className="rounded bg-green-600 px-3 py-1 text-white"
            >
              Add
            </button>
          </form>
          <ul className="mt-2 space-y-1 text-sm">
            {(groups[g] || []).map((u) => (
              <li key={u} className="flex justify-between">
                <span>{u}</span>
                <button
                  className="text-red-600"
                  onClick={() => removeUser(g, u)}
                >
                  remove
                </button>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  )
}
