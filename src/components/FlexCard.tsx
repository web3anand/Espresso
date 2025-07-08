import { Mindshare } from '../api/mindshare'

interface Props {
  name: string
  handle: string
  pfp: string
  mindshare: Mindshare
}

export default function FlexCard({ name, handle, pfp, mindshare }: Props) {
  return (
    <div className="bg-gradient-to-br from-amber-700 via-amber-900 to-black p-6 rounded-xl shadow-lg w-80 text-center space-y-3">
      <img src={pfp} alt="pfp" className="w-24 h-24 rounded-full mx-auto border-4 border-amber-600" />
      <h2 className="text-xl font-bold">{name}</h2>
      <p className="text-amber-400">@{handle}</p>
      <div className="grid grid-cols-2 gap-2 text-sm">
        <div>
          <p className="font-semibold">1D</p>
          <p>{mindshare.d1}</p>
        </div>
        <div>
          <p className="font-semibold">7D</p>
          <p>{mindshare.d7}</p>
        </div>
        <div>
          <p className="font-semibold">30D</p>
          <p>{mindshare.d30}</p>
        </div>
        <div>
          <p className="font-semibold">All</p>
          <p>{mindshare.all}</p>
        </div>
      </div>
    </div>
  )
}
