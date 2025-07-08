import FlexCard from '../components/FlexCard'
import { Mindshare } from '../api/mindshare'

interface Props {
  data: { handle: string; name: string; pfp: string; mindshare: Mindshare; nft?: string }
  onUploadClick: () => void
}

export default function ViewFlex({ data, onUploadClick }: Props) {
  return (
    <div className="space-y-4">
      <FlexCard
        name={data.name}
        handle={data.handle}
        pfp={data.nft ?? data.pfp}
        mindshare={data.mindshare}
      />
      <button onClick={onUploadClick} className="bg-amber-600 px-4 py-2 rounded">
        Upload NFT
      </button>
    </div>
  )
}
