import type { KaitoYapData } from '../types'

interface Props {
  data: KaitoYapData
  onShowInsights: () => void
}

export default function YapCard({ data, onShowInsights }: Props) {
  return (
    <div className="glass p-6 transition transform hover:scale-105">
      <header className="mb-4">
        <p className="font-semibold">
          {data.username} <span className="text-gray-400">({data.user_id})</span>
        </p>
      </header>
      <div className="text-4xl text-green-300 font-bold mb-4">{data.yaps_all}</div>
      <div className="grid grid-cols-2 gap-2 text-sm">
        <div>
          <p className="text-gray-300">24h</p>
          <p className="font-mono text-white">{data.yaps_l24h}</p>
        </div>
        <div>
          <p className="text-gray-300">48h</p>
          <p className="font-mono text-white">{data.yaps_l48h}</p>
        </div>
        <div>
          <p className="text-gray-300">7d</p>
          <p className="font-mono text-white">{data.yaps_l7d}</p>
        </div>
        <div>
          <p className="text-gray-300">30d</p>
          <p className="font-mono text-white">{data.yaps_l30d}</p>
        </div>
      </div>
      <button className="mt-4 text-sm text-blue-300 hover:underline" onClick={onShowInsights}>
        View Insights
      </button>
    </div>
  )
}
