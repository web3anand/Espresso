import YapCard from './YapCard'
import { useLiveYaps } from '../hooks/useLiveYaps'

const trendingUsers = ['elonmusk', 'jack', 'vitalik', 'a16z', 'naval']

function UserItem({ username }: { username: string }) {
  const { data } = useLiveYaps(username)
  return data ? <YapCard data={data} /> : null
}

export default function TrendingLeaderboard() {
  return (
    <div className="flex overflow-x-auto gap-4 py-4">
      {trendingUsers.map((u) => (
        <div key={u} className="min-w-[16rem] flex-shrink-0">
          <UserItem username={u} />
        </div>
      ))}
    </div>
  )
}
