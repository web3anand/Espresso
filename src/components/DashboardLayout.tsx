import type { KaitoYapData } from '../types'
import YapCard from './YapCard'

interface DashboardLayoutProps {
  data: KaitoYapData
  onShowInsights: () => void
}

export default function DashboardLayout({ data, onShowInsights }: DashboardLayoutProps) {
  return (
    <div className="max-w-7xl mx-auto mt-10 px-4 grid grid-cols-1 md:grid-cols-[300px_1fr] gap-6">
      <aside className="glass p-4">
        <h2 className="font-semibold mb-2">Trending</h2>
        <ul className="space-y-1 text-sm text-gray-300">
          <li>#coffee</li>
          <li>#yaps</li>
          <li>#analytics</li>
        </ul>
      </aside>
      <main className="grid gap-4 sm:grid-cols-2">
        <YapCard data={data} onShowInsights={onShowInsights} />
      </main>
    </div>
  )
}
