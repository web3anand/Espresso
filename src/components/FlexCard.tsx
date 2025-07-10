import type { KaitoYapData } from '../api/kaito'
export default function FlexCard({ data }: { data: KaitoYapData }) {
  return (
    <div className="rounded-xl border bg-white shadow p-4">
      <p>
        <span className="font-semibold">Username:</span> {data.username}
      </p>
      <p>
        <span className="font-semibold">Yaps All:</span> {data.yaps_all}
      </p>
      <p>
        <span className="font-semibold">Yaps 24h:</span> {data.yaps_l24h}
      </p>
      <p>
        <span className="font-semibold">Yaps 48h:</span> {data.yaps_l48h}
      </p>
      <p>
        <span className="font-semibold">Yaps 7d:</span> {data.yaps_l7d}
      </p>
      <p>
        <span className="font-semibold">Yaps 30d:</span> {data.yaps_l30d}
      </p>
      <p>
        <span className="font-semibold">Yaps 3m:</span> {data.yaps_l3m}
      </p>
      <p>
        <span className="font-semibold">Yaps 6m:</span> {data.yaps_l6m}
      </p>
    </div>
  );
}
