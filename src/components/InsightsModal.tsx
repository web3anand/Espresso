interface InsightsModalProps {
  open: boolean
  onClose: () => void
  points: number[]
}

export default function InsightsModal({ open, onClose, points }: InsightsModalProps) {
  if (!open) return null

  const width = 400
  const height = 200
  const max = Math.max(...points, 1)
  const step = width / (points.length - 1)
  const d = points
    .map((p, i) => `${i === 0 ? 'M' : 'L'}${i * step},${height - (p / max) * height}`)
    .join(' ')

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white/5 backdrop-blur-xl border border-white/20 rounded-3xl p-8 max-w-2xl glass relative">
        <button
          className="absolute top-4 right-4 text-sm text-gray-300 hover:underline"
          onClick={onClose}
        >
          Close
        </button>
        <svg width={width} height={height} className="w-full h-48 mt-4">
          <path d={d} fill="none" stroke="#a5f3fc" strokeWidth="2" />
        </svg>
      </div>
    </div>
  )
}
