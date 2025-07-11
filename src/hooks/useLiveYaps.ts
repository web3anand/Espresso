import { useEffect, useState, useCallback } from 'react'
import type { YapMetrics } from '../api/kaito'
import { fetchYaps } from '../api/kaito'

export function useLiveYaps(username: string) {
  const [data, setData] = useState<YapMetrics | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const load = useCallback(async () => {
    if (!username) return
    setLoading(true)
    setError('')
    try {
      const res = await fetchYaps(username)
      setData(res)
    } catch (err: any) {
      setError(err.message || 'Failed to fetch')
    } finally {
      setLoading(false)
    }
  }, [username])

  useEffect(() => {
    void load()
  }, [load])

  return { data, loading, error, refresh: load }
}
