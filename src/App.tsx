import { useEffect, useRef, useState } from 'react'
import { Stage, Layer, Line, Image as KImage, Group } from 'react-konva'

function generateBlobVertices(radius: number, points: number) {
  const angle = (Math.PI * 2) / points
  const arr: number[] = []
  for (let i = 0; i < points; i++) {
    const r = radius + Math.random() * 40 - 20
    const x = 175 + r * Math.cos(i * angle)
    const y = 175 + r * Math.sin(i * angle)
    arr.push(x, y)
  }
  return arr
}

export default function App() {
  const [blob, setBlob] = useState<number[]>([])
  const [image, setImage] = useState<HTMLImageElement | null>(null)
  const [twitterUser, setTwitterUser] = useState('')
  const stageRef = useRef<any>(null)

  useEffect(() => {
    setBlob(generateBlobVertices(200, 8))
  }, [])

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (!file) return
    const reader = new FileReader()
    reader.onload = () => {
      const img = new Image()
      img.src = reader.result as string
      img.onload = () => setImage(img)
    }
    reader.readAsDataURL(file)
  }

  function generateNew() {
    setBlob(generateBlobVertices(200, 8))
    setImage(null)
  }

  function handleDownload() {
    const uri = stageRef.current?.toDataURL({ pixelRatio: 2 })
    if (!uri) return
    const link = document.createElement('a')
    link.download = 'avatar.png'
    link.href = uri
    link.click()
  }

  function connectTwitter() {
    const handle = window.prompt('Enter your Twitter handle')
    if (handle) setTwitterUser(handle.replace(/^@/, ''))
  }

  function shareAvatar() {
    const url = encodeURIComponent(window.location.href)
    window.open(`https://twitter.com/intent/tweet?url=${url}`, '_blank')
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 to-blue-800 flex flex-col items-center py-12 px-4">
      <div className="bg-white bg-opacity-10 backdrop-blur-lg rounded-2xl shadow-xl p-6 w-full max-w-md space-y-6">
        <input
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          className="file:bg-indigo-500 file:text-white file:rounded file:px-4 file:py-2 hover:file:bg-indigo-600"
        />
        <Stage width={350} height={350} ref={stageRef} className="mx-auto">
          <Layer>
            <Line points={blob} closed fill="#8b5cf6" tension={0.5} />
            {image && (
              <Group
                clipFunc={(ctx) => {
                  ctx.arc(175, 175, 100, 0, Math.PI * 2, false)
                }}
              >
                <KImage image={image} x={75} y={75} width={200} height={200} />
              </Group>
            )}
          </Layer>
        </Stage>
        <div className="flex justify-center gap-2">
          <button
            className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded"
            onClick={generateNew}
          >
            Generate New
          </button>
          <button
            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
            onClick={handleDownload}
          >
            Download
          </button>
        </div>
        <div className="text-center">
          {!twitterUser ? (
            <button
              onClick={connectTwitter}
              className="bg-blue-400 hover:bg-blue-500 text-white px-4 py-2 rounded"
            >
              Connect Twitter
            </button>
          ) : (
            <div className="space-y-2">
              <div>Connected as @{twitterUser}</div>
              <button
                onClick={shareAvatar}
                className="bg-blue-400 hover:bg-blue-500 text-white px-4 py-2 rounded"
              >
                Share Avatar
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
