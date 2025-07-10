import { useCallback, useState } from 'react'

export function useLocalStorage<T>(key: string, initial: T) {
  const read = (): T => {
    try {
      const raw = localStorage.getItem(key)
      return raw ? (JSON.parse(raw) as T) : initial
    } catch {
      return initial
    }
  }
  const [value, setValue] = useState<T>(read)

  const set = useCallback(
    (v: T | ((p: T) => T)) => {
      setValue((prev) => {
        const next = v instanceof Function ? v(prev) : v
        localStorage.setItem(key, JSON.stringify(next))
        return next
      })
    },
    [key]
  )

  return [value, set] as const
}
