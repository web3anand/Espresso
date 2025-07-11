import { type FormEvent, useEffect, useState } from 'react'

interface HeroProps {
  username: string
  onUsernameChange: (v: string) => void
  onSubmit: (e: FormEvent<HTMLFormElement>) => void
}

export default function Hero({ username, onUsernameChange, onSubmit }: HeroProps) {
  const [visible, setVisible] = useState(false)
  useEffect(() => {
    setVisible(true)
  }, [])

  return (
    <section className="min-h-screen flex items-center justify-center pt-16">
      <div
        className={`text-center transition-all duration-700 ease-out transform ${
          visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}
      >
        <h1 className="text-5xl md:text-7xl font-extrabold text-white">Espresso Yaps Analytics</h1>
        <p className="mt-4 text-lg text-gray-300">Tokenized attention for X at a glance</p>
        <form
          onSubmit={onSubmit}
          className="mt-8 max-w-lg mx-auto bg-white/20 backdrop-blur-md border border-white/30 rounded-full p-4 flex items-center"
        >
          <input
            value={username}
            onChange={(e) => onUsernameChange(e.target.value)}
            placeholder="Search username"
            className="flex-grow bg-transparent placeholder-gray-400 focus:outline-none px-3"
          />
          <button type="submit" className="text-white hover:underline">
            Search
          </button>
        </form>
      </div>
    </section>
  )
}
