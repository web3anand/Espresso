import type { KaitoYapData } from '../api/kaito'

const nf = new Intl.NumberFormat('en-US', { maximumFractionDigits: 2 })

function formatValue(value: number): string {
  return value === 0 ? '–' : nf.format(value)
}

export default function YapCard({ data }: { data: KaitoYapData }) {
  return (
    <div className="animate-fade-in-up space-y-6">
      <h2 className="text-2xl font-bold text-gray-800">{data.username}</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-2 gap-x-8 text-lg">
        <span className="font-semibold">Yaps All</span>
        <span className="text-right">{formatValue(data.yaps_all)}</span>
        <span className="font-semibold">Yaps 24h</span>
        <span className="text-right">{formatValue(data.yaps_l24h)}</span>
        <span className="font-semibold">Yaps 48h</span>
        <span className="text-right">{formatValue(data.yaps_l48h)}</span>
        <span className="font-semibold">Yaps 7d</span>
        <span className="text-right">{formatValue(data.yaps_l7d)}</span>
        <span className="font-semibold">Yaps 30d</span>
        <span className="text-right">{formatValue(data.yaps_l30d)}</span>
        <span className="font-semibold">Yaps 3m</span>
        <span className="text-right">{formatValue(data.yaps_l3m)}</span>
        <span className="font-semibold">Yaps 6m</span>
        <span className="text-right">{formatValue(data.yaps_l6m)}</span>
        <span className="font-semibold">Yaps 12m</span>
        <span className="text-right">{formatValue(data.yaps_l12m)}</span>
      </div>
    </div>
  )
}
