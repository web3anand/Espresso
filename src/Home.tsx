import { useState } from 'react'
import FlexCard from './components/FlexCard'

const defaultTopics = ['Bitcoin', 'Ethereum', 'Solana', 'Starknet']

export default function Home() {
  const [topics, setTopics] = useState<string[]>(defaultTopics)
  const [input, setInput] = useState('')

  function addTopic(e: React.FormEvent) {
    e.preventDefault()
    const t = input.trim()
    if (t && !topics.includes(t)) {
      setTopics([...topics, t])
    }
    setInput('')
  }

  return (
    <div className="min-h-screen flex flex-col font-sans text-white bg-gradient-to-br from-zinc-900 to-zinc-800">
      <header className="p-6 text-center">
        <h1 className="text-3xl font-bold">Espresso Flex Cards</h1>
        <p className="text-gray-400">Crypto mindshare at a glance</p>
      </header>
      <main className="flex-grow px-4 pb-8" id="main">
        <form onSubmit={addTopic} className="mb-6 flex justify-center">
          <input
            type="text"
            value={input}
            onChange={e => setInput(e.target.value)}
            placeholder="Add a topic"
            className="rounded-l px-3 py-2 text-black focus:outline-none"
          />
          <button type="submit" className="bg-blue-600 text-white px-4 rounded-r">Add</button>
        </form>
        <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {topics.map(topic => (
            <FlexCard key={topic} topic={topic} />
          ))}
        </div>
      </main>
      <footer className="p-4 text-center text-sm text-gray-500">
        &copy; {new Date().getFullYear()} Espresso
      </footer>
    </div>
  )
}
