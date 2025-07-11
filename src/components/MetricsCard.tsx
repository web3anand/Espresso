import type { KaitoYapData } from '../../api/kaito';

interface MetricsCardProps {
  data: KaitoYapData;
  className?: string;
}

export default function MetricsCard({ data, className = '' }: MetricsCardProps) {
  return (
    <div className={`glass max-w-md w-full mt-12 p-8 space-y-4 ${className}`}>
      <div className="flex items-baseline justify-between">
        <h2 className="text-2xl text-white font-bold">{data.username}</h2>
        <span className="text-sm text-gray-400">#{data.user_id}</span>
      </div>
      <p className="text-5xl text-green-300 font-extrabold">
        {data.yaps_all.toLocaleString()}
      </p>
      <div className="grid grid-cols-2 gap-4 text-gray-200 font-mono">
        <div>
          <p className="text-xs uppercase">24h</p>
          <p>{data.yaps_l24h.toLocaleString()}</p>
        </div>
        <div>
          <p className="text-xs uppercase">48h</p>
          <p>{data.yaps_l48h.toLocaleString()}</p>
        </div>
        <div>
          <p className="text-xs uppercase">7d</p>
          <p>{data.yaps_l7d.toLocaleString()}</p>
        </div>
        <div>
          <p className="text-xs uppercase">30d</p>
          <p>{data.yaps_l30d.toLocaleString()}</p>
        </div>
        <div>
          <p className="text-xs uppercase">3m</p>
          <p>{data.yaps_l3m.toLocaleString()}</p>
        </div>
        <div>
          <p className="text-xs uppercase">6m</p>
          <p>{data.yaps_l6m.toLocaleString()}</p>
        </div>
      </div>
    </div>
  );
}
