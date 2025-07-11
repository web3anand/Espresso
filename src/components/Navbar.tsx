import { useState } from 'react'

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const links = [
    { href: '#', label: 'Dashboard' },
    { href: '#', label: 'Groups' },
    { href: '#', label: 'Insights' },
  ]

  return (
    <nav className="fixed top-0 inset-x-0 h-16 glass bg-white/10 backdrop-blur-md flex items-center justify-between px-6 z-50">
      <div className="font-bold text-xl">EspressoYaps</div>
      <div className="hidden md:flex space-x-6">
        {links.map((l) => (
          <a key={l.label} href={l.href} className="hover:underline">
            {l.label}
          </a>
        ))}
      </div>
      <button
        aria-label="Menu"
        className="md:hidden focus:outline-none"
        onClick={() => setOpen((o) => !o)}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6 text-white"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          {open ? (
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          ) : (
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 6h16M4 12h16M4 18h16"
            />
          )}
        </svg>
      </button>
      {open && (
        <div className="absolute top-16 right-4 w-40 space-y-2 glass bg-white/10 backdrop-blur-md p-4 md:hidden">
          {links.map((l) => (
            <a
              key={l.label}
              href={l.href}
              className="block hover:underline"
              onClick={() => setOpen(false)}
            >
              {l.label}
            </a>
          ))}
        </div>
      )}
    </nav>
  )
}
