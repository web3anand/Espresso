import { useEffect, useMemo } from 'react'
import type { YapMetrics } from '../api/kaito'
import { useCryptoPrice } from '../hooks/useCryptoPrice'

interface Props {
  data: YapMetrics
  onClose: () => void
}

export default function InsightsModal({ data, onClose }: Props) {
  const price = useCryptoPrice()

  const series = useMemo(() => {
    const points = 30
    return Array.from({ length: points }, (_, i) => data.yaps_l30d * (i + 1) / points)
  }, [data])

  const corr = useMemo(() => {
    if (!price) return 0
    const prices = Array(30).fill(price)
    const meanA = series.reduce((a, b) => a + b) / series.length
    const meanB = price
    let num = 0
    let den1 = 0
    let den2 = 0
    for (let i = 0; i < series.length; i++) {
      const a = series[i] - meanA
      const b = prices[i] - meanB
      num += a * b
      den1 += a * a
      den2 += b * b
    }
    return num / Math.sqrt(den1 * den2)
  }, [price, series])

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && onClose()
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [onClose])

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="rounded bg-white p-4 text-black max-w-lg w-full space-y-4">
        <h3 className="text-xl font-semibold">Insights</h3>
        <svg viewBox="0 0 300 100" className="w-full h-24">
          <polyline
            fill="none"
            stroke="green"
            strokeWidth="2"
            points={series
              .map((v, i) => `${(i / (series.length - 1)) * 300},${100 - (v / series[series.length - 1]) * 100}`)
              .join(' ')}
          />
        </svg>
        {price && <p>ETH Price: ${price}</p>}
        <p>Correlation with ETH: {corr.toFixed(2)}</p>
        <button onClick={onClose} className="rounded bg-blue-600 px-3 py-1 text-white">
          Close
        </button>
      </div>
    </div>
  )
}
