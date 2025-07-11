import { useParams } from '../router'
import YapCard from '../components/YapCard'
import { useLocalStorage } from '../hooks/useLocalStorage'
import type { Groups } from '../components/GroupManager'
import { useLiveYaps } from '../hooks/useLiveYaps'

export default function GroupPage() {
  const { slug } = useParams<{ slug: string }>()
  const [groups] = useLocalStorage<Groups>('groups', {})
  const users = groups[slug] || []

  return (
    <div className="space-y-4 p-4">
      <h2 className="text-2xl font-bold">Group: {slug}</h2>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {users.map((u) => (
          <UserItem key={u} username={u} />
        ))}
      </div>
    </div>
  )
}

function UserItem({ username }: { username: string }) {
  const { data } = useLiveYaps(username)
  return data ? <YapCard data={data} /> : null
}
