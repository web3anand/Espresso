import type { KaitoYapData } from '../../api/kaito'

export default function FlexCard({ data }: { data: KaitoYapData }) {
  return (
    <div className="rounded-xl border border-white/40 bg-white/70 p-4 shadow backdrop-blur-md">
      <div className="space-y-1">
        <p className="flex justify-between">
          <span className="font-semibold">Username:</span> <span>{data.username}</span>
        </p>
        <p className="flex justify-between">
          <span className="font-semibold">Yaps All:</span> <span>{data.yaps_all}</span>
        </p>
        <p className="flex justify-between">
          <span className="font-semibold">Yaps 24h:</span> <span>{data.yaps_l24h}</span>
        </p>
        <p className="flex justify-between">
          <span className="font-semibold">Yaps 48h:</span> <span>{data.yaps_l48h}</span>
        </p>
        <p className="flex justify-between">
          <span className="font-semibold">Yaps 7d:</span> <span>{data.yaps_l7d}</span>
        </p>
        <p className="flex justify-between">
          <span className="font-semibold">Yaps 30d:</span> <span>{data.yaps_l30d}</span>
        </p>
        <p className="flex justify-between">
          <span className="font-semibold">Yaps 3m:</span> <span>{data.yaps_l3m}</span>
        </p>
        <p className="flex justify-between">
          <span className="font-semibold">Yaps 6m:</span> <span>{data.yaps_l6m}</span>
        </p>
      </div>
    </div>
  )
}
