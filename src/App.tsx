import React, { useEffect, useRef, useState } from 'react'
import { Stage, Layer, Line, Image as KImage } from 'react-konva'
import useImage from 'use-image'

function generateBlobVertices(radius: number, points: number): number[] {
  const coords: number[] = []
  for (let i = 0; i < points; i++) {
    const angle = (Math.PI * 2 * i) / points
    const dist = radius + Math.random() * 40 - 20
    const x = 200 + dist * Math.cos(angle)
    const y = 200 + dist * Math.sin(angle)
    coords.push(x, y)
  }
  return coords
}

export default function App() {
  const [imgUrl, setImgUrl] = useState('')
  const [blobPoints, setBlobPoints] = useState<number[]>([])
  const stageRef = useRef<any>(null)
  const [image] = useImage(imgUrl, 'anonymous')

  useEffect(() => {
    setBlobPoints(generateBlobVertices(200, 8))
  }, [])

  function handleFile(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (file) {
      setImgUrl(URL.createObjectURL(file))
    }
  }

  function handleSample(e: React.ChangeEvent<HTMLSelectElement>) {
    setImgUrl(e.target.value)
  }

  function handleDownload() {
    const uri = stageRef.current?.toDataURL({ pixelRatio: 2 })
    if (!uri) return
    const link = document.createElement('a')
    link.download = 'pfp.png'
    link.href = uri
    link.click()
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center py-12 px-4">
      <div className="bg-white rounded-xl shadow-lg p-6 max-w-lg w-full flex flex-col items-center">
        <h1 className="text-3xl font-bold mb-8">Custom PFP Generator</h1>
        <div className="flex flex-col sm:flex-row items-center gap-4 mb-6">
          <input
            type="file"
            accept="image/*"
            onChange={handleFile}
            className="file:bg-indigo-600 file:text-white file:px-4 file:py-2 file:rounded file:hover:bg-indigo-700"
          />
          <select onChange={handleSample} className="border rounded px-3 py-2">
            <option value="">Load Sample</option>
            <option value="/samples/sample1.png">Sample 1</option>
            <option value="/samples/sample2.png">Sample 2</option>
            <option value="/samples/sample3.png">Sample 3</option>
          </select>
          <button
            onClick={handleDownload}
            className="bg-indigo-600 text-white px-4 py-2 rounded transition hover:bg-indigo-700"
          >
            Generate &amp; Download PFP
          </button>
        </div>
        <Stage ref={stageRef} width={400} height={400} className="mx-auto">
          <Layer>
            <Line points={blobPoints} closed fill="#A78BFA" opacity={0.6} />
          </Layer>
          <Layer>
            {image && (
              <KImage
                x={100}
                y={100}
                width={200}
                height={200}
                image={image}
                clipFunc={(ctx) => {
                  ctx.arc(100, 100, 100, 0, Math.PI * 2)
                }}
              />
            )}
          </Layer>
        </Stage>
      </div>
    </div>
  )
}
