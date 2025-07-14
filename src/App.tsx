import { useEffect, useRef, useState, useCallback } from 'react'

interface GameState {
  totalGenerated: number
  legendaryFound: number
  currentRarity: string
}

const gameState: GameState = {
  totalGenerated: 0,
  legendaryFound: 0,
  currentRarity: 'Common',
}

const backgrounds = [
  { name: 'wood', color: '#D4A574' },
  { name: 'concrete', color: '#95A5A6' },
  { name: 'fabric', color: '#8D6E63' },
  { name: 'gradient', colors: ['#FFB347', '#FFCC33'] },
] as const

const glassesStyles = [
  { type: 'pixel', frame: '#333', pixelColor: '#fff' },
  { type: 'visor', frame: '#000', accent: '#FF1493' },
  { type: 'round', frame: '#222', accent: '#20B2AA' },
] as const

const hairTypes = [
  { type: 'short', color: '#EC4899', draw: drawShortHair },
  { type: 'long', color: '#3B82F6', draw: drawLongHair },
  { type: 'braid', color: '#10B981', draw: drawBraidHair },
] as const

const accessories = [
  { type: 'earring', color: '#FFD700', draw: drawEarring },
  { type: 'crown', color: '#C0C0C0', draw: drawCrown },
  { type: 'none', color: '', draw: () => {} },
] as const

function pick<T>(arr: readonly T[]): T {
  return arr[Math.floor(Math.random() * arr.length)]
}

function drawBackground(
  ctx: CanvasRenderingContext2D,
  bg: (typeof backgrounds)[number]
) {
  if ('colors' in bg) {
    const grad = ctx.createLinearGradient(0, 0, 300, 300)
    grad.addColorStop(0, bg.colors[0])
    grad.addColorStop(1, bg.colors[1])
    ctx.fillStyle = grad
  } else {
    ctx.fillStyle = bg.color
  }
  ctx.fillRect(0, 0, 300, 300)
}

function drawProfileFace(ctx: CanvasRenderingContext2D) {
  ctx.fillStyle = '#fff'
  ctx.beginPath()
  ctx.arc(150, 150, 80, 0, Math.PI * 2)
  ctx.fill()
}

function drawShortHair(ctx: CanvasRenderingContext2D, color: string) {
  ctx.fillStyle = color
  ctx.beginPath()
  ctx.arc(150, 110, 80, Math.PI, Math.PI * 2)
  ctx.fill()
}

function drawLongHair(ctx: CanvasRenderingContext2D, color: string) {
  ctx.fillStyle = color
  ctx.beginPath()
  ctx.arc(150, 90, 90, Math.PI, Math.PI * 2)
  ctx.fill()
  ctx.fillRect(60, 90, 180, 120)
}

function drawBraidHair(ctx: CanvasRenderingContext2D, color: string) {
  ctx.fillStyle = color
  ctx.beginPath()
  ctx.arc(150, 100, 80, Math.PI, Math.PI * 2)
  ctx.fill()
  for (let i = 0; i < 3; i++) {
    ctx.beginPath()
    ctx.arc(150, 160 + i * 20, 20, 0, Math.PI * 2)
    ctx.fill()
  }
}

function drawPixelGlasses(
  ctx: CanvasRenderingContext2D,
  frame: string,
  pixel: string
) {
  ctx.fillStyle = frame
  ctx.fillRect(90, 130, 40, 20)
  ctx.fillRect(170, 130, 40, 20)
  ctx.fillRect(130, 135, 40, 10)
  ctx.fillStyle = pixel
  ctx.fillRect(92, 132, 16, 16)
  ctx.fillRect(172, 132, 16, 16)
}

function drawVisorGlasses(
  ctx: CanvasRenderingContext2D,
  frame: string,
  accent: string
) {
  ctx.fillStyle = frame
  ctx.fillRect(90, 130, 120, 20)
  ctx.strokeStyle = accent
  ctx.lineWidth = 4
  ctx.beginPath()
  ctx.moveTo(90, 130)
  ctx.lineTo(210, 130)
  ctx.stroke()
}

function drawRoundGlasses(
  ctx: CanvasRenderingContext2D,
  frame: string,
  accent: string
) {
  ctx.strokeStyle = frame
  ctx.lineWidth = 4
  ctx.beginPath()
  ctx.arc(120, 140, 20, 0, Math.PI * 2)
  ctx.arc(180, 140, 20, 0, Math.PI * 2)
  ctx.stroke()
  ctx.beginPath()
  ctx.moveTo(140, 140)
  ctx.lineTo(160, 140)
  ctx.stroke()
  ctx.strokeStyle = accent
  ctx.beginPath()
  ctx.moveTo(200, 140)
  ctx.lineTo(210, 140)
  ctx.stroke()
}

function drawEarring(ctx: CanvasRenderingContext2D, color: string) {
  ctx.fillStyle = color
  ctx.beginPath()
  ctx.arc(220, 170, 5, 0, Math.PI * 2)
  ctx.fill()
}

function drawCrown(ctx: CanvasRenderingContext2D, color: string) {
  ctx.fillStyle = color
  ctx.beginPath()
  ctx.moveTo(120, 80)
  ctx.lineTo(150, 40)
  ctx.lineTo(180, 80)
  ctx.closePath()
  ctx.fill()
}

export default function App() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [twitterUser, setTwitterUser] = useState('')

  const drawAvatar = useCallback((ctx: CanvasRenderingContext2D) => {
    const bg = pick(backgrounds)
    const glasses = pick(glassesStyles)
    const hair = pick(hairTypes)
    const acc = pick(accessories)

    ctx.clearRect(0, 0, 300, 300)
    drawBackground(ctx, bg)
    drawProfileFace(ctx)
    hair.draw(ctx, hair.color)
    if (glasses.type === 'pixel')
      drawPixelGlasses(ctx, glasses.frame, glasses.pixelColor)
    if (glasses.type === 'visor')
      drawVisorGlasses(ctx, glasses.frame, glasses.accent)
    if (glasses.type === 'round')
      drawRoundGlasses(ctx, glasses.frame, glasses.accent)
    acc.draw(ctx, acc.color)

    const rarity = determineRarity()
    gameState.currentRarity = rarity
    updateRarityBadge(rarity)
    gameState.totalGenerated++
    if (rarity === 'Legendary') gameState.legendaryFound++
  }, [])

  const handleGenerate = useCallback(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d') as CanvasRenderingContext2D | null
    if (!ctx) return
    drawAvatar(ctx)
    addToGallery()
    updateStats()
  }, [drawAvatar])



  useEffect(() => {
    handleGenerate()
  }, [handleGenerate])

  function determineRarity() {
    const r = Math.random()
    if (r < 0.01) return 'Legendary'
    if (r < 0.1) return 'Epic'
    if (r < 0.3) return 'Rare'
    return 'Common'
  }

  function updateRarityBadge(rarity: string) {
    const badge = document.getElementById('rarityBadge')
    if (badge) {
      badge.textContent = rarity
      badge.className = 'rarity-badge ' + rarity.toLowerCase()
    }
  }

  function updateStats() {
    const total = document.getElementById('totalGenerated')
    const leg = document.getElementById('legendaryFound')
    const curr = document.getElementById('currentRarity')
    if (total) total.textContent = String(gameState.totalGenerated)
    if (leg) leg.textContent = String(gameState.legendaryFound)
    if (curr) curr.textContent = gameState.currentRarity
  }


  function addToGallery() {
    const canvas = canvasRef.current
    if (!canvas) return
    const img = new Image()
    img.src = canvas.toDataURL('image/png')
    const gallery = document.getElementById('gallery')
    if (gallery) gallery.appendChild(img)
  }

  function showLegendaryModal() {
    const modal = document.getElementById('shareModal')
    if (modal) modal.style.display = 'flex'
  }

  function closeModal() {
    const modal = document.getElementById('shareModal')
    if (modal) modal.style.display = 'none'
  }

  function downloadPFP() {
    const canvas = canvasRef.current
    if (!canvas) return
    const link = document.createElement('a')
    link.download = 'avatar.png'
    link.href = canvas.toDataURL('image/png')
    link.click()
  }

  function connectTwitter() {
    setTwitterUser('anon')
    const status = document.getElementById('twitterStatus')
    if (status) status.style.display = 'block'
  }

  function shareToTwitter() {
    showLegendaryModal()
  }

  function copyShareLink() {
    navigator.clipboard.writeText(window.location.href)
  }

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if ((e.target as HTMLElement).classList.contains('modal')) {
        closeModal()
      }
    }
    window.addEventListener('click', handler)
    return () => window.removeEventListener('click', handler)
  }, [])

  return (
    <div className="container min-h-screen bg-gradient-to-br from-black via-gray-900 to-black">
      <header className="header">
        <h1>✨ AI Avatar Generator ✨</h1>
        <p>Generate unique profile pictures with legendary rarity system</p>
      </header>
      <div className="main-content">
        <section className="generator-section">
          <div className="pfp-display" id="pfpDisplay">
            <canvas
              id="pfpCanvas"
              width={300}
              height={300}
              ref={canvasRef}
            ></canvas>
            <div id="rarityBadge" className="rarity-badge common">
              Common
            </div>
          </div>
          <div className="controls">
            <button className="btn" onClick={handleGenerate}>
              Generate New
            </button>
            <button className="btn" onClick={downloadPFP}>
              Download
            </button>
          </div>
        </section>

        <section className="generator-section">
          <button className="btn btn-twitter" onClick={connectTwitter}>
            Connect Twitter
          </button>
          <div id="twitterStatus">
            Connected as {twitterUser}
            <button className="btn" onClick={shareToTwitter}>
              Share Avatar
            </button>
          </div>
        </section>

        <section className="generator-section">
          <div className="controls">
            <span className="rarity-badge common">Common 69%</span>
            <span className="rarity-badge rare">Rare 20%</span>
            <span className="rarity-badge epic">Epic 10%</span>
            <span className="rarity-badge legendary">Legendary 1%</span>
          </div>
        </section>

        <section className="stats-section">
          <div>
            Total Generated: <span id="totalGenerated">0</span>
          </div>
          <div>
            Legendary Found: <span id="legendaryFound">0</span>
          </div>
          <div>
            Current Rarity: <span id="currentRarity">Common</span>
          </div>
        </section>

        <div className="gallery" id="gallery"></div>

        <div id="shareModal" className="modal">
          <div className="modal-content">
            <span className="close" onClick={closeModal}>
              &times;
            </span>
            <p>Share this avatar on Twitter!</p>
            <button className="btn" onClick={copyShareLink}>
              Copy Link
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
