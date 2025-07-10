import type { KaitoYapData } from '../api/kaito'

export default function FlexCard({ data }: { data: KaitoYapData }) {
  return (
    <div className="rounded-lg bg-white p-4 shadow-md">
      <h2 className="mb-2 text-lg font-semibold">{data.username}</h2>
      <ul className="space-y-1">
        <li>yaps_all: {data.yaps_all}</li>
        <li>yaps_124h: {data.yaps_124h}</li>
        <li>yaps_16m: {data.yaps_16m}</li>
      </ul>
    </div>
  )
}
