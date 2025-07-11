import { useState } from 'react'
import { useLiveYaps } from '../hooks/useLiveYaps'
import YapCard from '../components/YapCard'
import SearchBar from '../components/SearchBar'
import TrendingLeaderboard from '../components/TrendingLeaderboard'
import InsightsModal from '../components/InsightsModal'

function useQuery() {
  return new URLSearchParams(window.location.search)
}

export default function Dashboard() {
  const query = useQuery()
  const username = query.get('u') || ''
  const { data } = useLiveYaps(username)
  const [open, setOpen] = useState(false)

  return (
    <div className="space-y-6 p-4">
      <SearchBar />
      {data && (
        <div className="animate-fade-in">
          <YapCard data={data} />
          <button
            onClick={() => setOpen(true)}
            className="mt-2 underline"
          >
            View Insights
          </button>
        </div>
      )}
      <TrendingLeaderboard />
      {open && data && <InsightsModal data={data} onClose={() => setOpen(false)} />}
    </div>
  )
}
