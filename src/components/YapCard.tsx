import { useRef } from 'react'
import type { YapMetrics } from '../api/kaito'

function nodeToPng(node: HTMLElement): Promise<string> {
  const width = node.offsetWidth
  const height = node.offsetHeight
  const clone = node.cloneNode(true) as HTMLElement
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}">
    <foreignObject width="100%" height="100%">${new XMLSerializer().serializeToString(clone)}</foreignObject>
  </svg>`
  const blob = new Blob([svg], { type: 'image/svg+xml;charset=utf-8' })
  const url = URL.createObjectURL(blob)
  return new Promise((resolve) => {
    const img = new Image()
    img.onload = () => {
      const canvas = document.createElement('canvas')
      canvas.width = width
      canvas.height = height
      const ctx = canvas.getContext('2d')!
      ctx.drawImage(img, 0, 0)
      URL.revokeObjectURL(url)
      resolve(canvas.toDataURL('image/png'))
    }
    img.src = url
  })
}

export default function YapCard({ data }: { data: YapMetrics }) {
  const ref = useRef<HTMLDivElement>(null)

  async function download() {
    if (!ref.current) return
    const png = await nodeToPng(ref.current)
    const a = document.createElement('a')
    a.href = png
    a.download = `${data.username}.png`
    a.click()
  }

  function share() {
    const text = `Yaps for ${data.username}: ${data.yaps_all}`
    const url = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}`
    window.open(url, '_blank')
  }

  const metrics = [
    ['24h', data.yaps_l24h],
    ['48h', data.yaps_l48h],
    ['7d', data.yaps_l7d],
    ['30d', data.yaps_l30d],
    ['3m', data.yaps_l3m],
    ['6m', data.yaps_l6m],
  ]

  return (
    <div
      ref={ref}
      className="bg-neutral-900/80 backdrop-blur-lg rounded-2xl shadow-2xl p-8 max-w-md mx-auto text-center space-y-4"
    >
      <h3 className="text-xl font-bold">{data.username}</h3>
      <p className="text-4xl font-bold text-green-400">{data.yaps_all}</p>
      <div className="grid grid-cols-2 gap-2 text-sm">
        {metrics.map(([k, v]) => (
          <div key={k} className="flex justify-between">
            <span>{k}</span>
            <span>{v || '–'}</span>
          </div>
        ))}
      </div>
      <div className="flex justify-center gap-4 text-sm">
        <button onClick={download} className="underline">
          Download PNG
        </button>
        <button onClick={share} className="underline">
          Share to Twitter
        </button>
      </div>
    </div>
  )
}
