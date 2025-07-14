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
  { name: 'wood',    draw: drawWoodBg },
  { name: 'concrete',draw: drawConcreteBg },
  { name: 'fabric',  draw: drawFabricBg },
  { name: 'gradient',draw: drawGradientBg },
  { name: 'marble',  draw: drawMarbleBg },
  { name: 'crystal', draw: drawCrystalBg },
] as const



const hairColors = [
  '#EC4899',
  '#3B82F6',
  '#10B981',
  '#F59E0B',
  '#8B5CF6',
  '#EF4444',
] as const


const glassesStyles = [
  { type: 'pixel',     draw: drawPixelGlasses },
  { type: 'visor',     draw: drawVisorGlasses },
  { type: 'round',     draw: drawRoundGlasses },
  { type: 'aviator',   draw: drawAviatorGlasses },
  { type: 'futuristic',draw: drawFuturisticGlasses },
] as const

const accessories = [
  { name: 'earring',    draw: drawEarring },
  { name: 'crown',      draw: drawCrown },
  { name: 'hairPin',    draw: drawHairPin },
  { name: 'headphones', draw: drawHeadphones },
  { name: 'cigar',      draw: drawCigar },
  { name: 'necklace',   draw: drawNecklace },
  { name: 'mask',       draw: drawMask },
  { name: 'none',       draw: () => {} },
] as const

function pick<T>(arr: readonly T[]): T {
  return arr[Math.floor(Math.random() * arr.length)]
}

function drawWoodBg(ctx: CanvasRenderingContext2D) {
  ctx.fillStyle = '#D4A574'
  ctx.fillRect(0, 0, 300, 300)
}

function drawConcreteBg(ctx: CanvasRenderingContext2D) {
  ctx.fillStyle = '#95A5A6'
  ctx.fillRect(0, 0, 300, 300)
}

function drawFabricBg(ctx: CanvasRenderingContext2D) {
  ctx.fillStyle = '#8D6E63'
  ctx.fillRect(0, 0, 300, 300)
}

function drawGradientBg(ctx: CanvasRenderingContext2D) {
  const g = ctx.createLinearGradient(0, 0, 300, 300)
  g.addColorStop(0, '#FFB347')
  g.addColorStop(1, '#FFCC33')
  ctx.fillStyle = g
  ctx.fillRect(0, 0, 300, 300)
}

function drawMarbleBg(ctx: CanvasRenderingContext2D) {
  ctx.fillStyle = '#ECECEC'
  ctx.fillRect(0, 0, 300, 300)
}

function drawCrystalBg(ctx: CanvasRenderingContext2D) {
  ctx.fillStyle = '#B9F2FF'
  ctx.fillRect(0, 0, 300, 300)
}
function drawProfileFace(ctx: CanvasRenderingContext2D) {
  ctx.fillStyle = '#ffe0bd'
  ctx.beginPath()
  ctx.moveTo(150, 70)
  ctx.bezierCurveTo(100, 70, 90, 150, 110, 210)
  ctx.quadraticCurveTo(150, 230, 190, 210)
  ctx.bezierCurveTo(210, 150, 200, 70, 150, 70)
  ctx.closePath()
  ctx.fill()
}

function drawHair(ctx: CanvasRenderingContext2D, color: string) {
  ctx.fillStyle = color
  ctx.beginPath()
  ctx.moveTo(60, 80)
  ctx.bezierCurveTo(90, 20, 210, 20, 240, 80)
  ctx.lineTo(240, 120)
  ctx.bezierCurveTo(200, 80, 100, 80, 60, 120)
  ctx.closePath()
  ctx.fill()
}

function drawFaceFeatures(ctx: CanvasRenderingContext2D) {
  ctx.fillStyle = '#000'
  ctx.beginPath()
  ctx.arc(125, 150, 6, 0, Math.PI * 2)
  ctx.arc(175, 150, 6, 0, Math.PI * 2)
  ctx.fill()
  ctx.beginPath()
  ctx.moveTo(150, 160)
  ctx.lineTo(150, 180)
  ctx.strokeStyle = '#000'
  ctx.lineWidth = 2
  ctx.stroke()
  ctx.beginPath()
  ctx.arc(150, 200, 18, 0, Math.PI)
  ctx.stroke()
}

function drawPixelGlasses(ctx: CanvasRenderingContext2D) {
  ctx.fillStyle = '#333'
  ctx.fillRect(90, 130, 40, 20)
  ctx.fillRect(170, 130, 40, 20)
  ctx.fillRect(130, 135, 40, 10)
  ctx.fillStyle = '#fff'
  ctx.fillRect(92, 132, 16, 16)
  ctx.fillRect(172, 132, 16, 16)
}

function drawVisorGlasses(ctx: CanvasRenderingContext2D) {
  ctx.fillStyle = '#000'
  ctx.fillRect(90, 130, 120, 20)
  ctx.strokeStyle = '#FF1493'
  ctx.lineWidth = 4
  ctx.beginPath()
  ctx.moveTo(90, 130)
  ctx.lineTo(210, 130)
  ctx.stroke()
}

function drawRoundGlasses(ctx: CanvasRenderingContext2D) {
  ctx.strokeStyle = '#222'
  ctx.lineWidth = 4
  ctx.beginPath()
  ctx.arc(120, 140, 20, 0, Math.PI * 2)
  ctx.arc(180, 140, 20, 0, Math.PI * 2)
  ctx.stroke()
  ctx.beginPath()
  ctx.moveTo(140, 140)
  ctx.lineTo(160, 140)
  ctx.stroke()
  ctx.strokeStyle = '#20B2AA'
  ctx.beginPath()
  ctx.moveTo(200, 140)
  ctx.lineTo(210, 140)
  ctx.stroke()
}

function drawAviatorGlasses(ctx: CanvasRenderingContext2D) {
  ctx.strokeStyle = '#222'
  ctx.lineWidth = 4
  ctx.beginPath()
  ctx.moveTo(100, 130)
  ctx.bezierCurveTo(120, 120, 140, 120, 160, 130)
  ctx.bezierCurveTo(140, 160, 120, 160, 100, 130)
  ctx.moveTo(200, 130)
  ctx.bezierCurveTo(180, 120, 160, 120, 140, 130)
  ctx.bezierCurveTo(160, 160, 180, 160, 200, 130)
  ctx.stroke()
  ctx.beginPath()
  ctx.moveTo(140, 140)
  ctx.lineTo(160, 140)
  ctx.stroke()
}

function drawFuturisticGlasses(ctx: CanvasRenderingContext2D) {
  ctx.fillStyle = '#0ff'
  ctx.fillRect(90, 135, 120, 15)
  ctx.fillStyle = '#000'
  ctx.fillRect(90, 132, 5, 20)
  ctx.fillRect(205, 132, 5, 20)
}

function drawEarring(ctx: CanvasRenderingContext2D) {
  ctx.fillStyle = '#FFD700'
  ctx.beginPath()
  ctx.arc(220, 170, 5, 0, Math.PI * 2)
  ctx.fill()
}

function drawCrown(ctx: CanvasRenderingContext2D) {
  ctx.fillStyle = '#C0C0C0'
  ctx.beginPath()
  ctx.moveTo(120, 80)
  ctx.lineTo(150, 40)
  ctx.lineTo(180, 80)
  ctx.closePath()
  ctx.fill()
}

function drawHairPin(ctx: CanvasRenderingContext2D) {
  ctx.fillStyle = '#FFD700'
  ctx.fillRect(190, 100, 4, 30)
}

function drawHeadphones(ctx: CanvasRenderingContext2D) {
  ctx.strokeStyle = '#555'
  ctx.lineWidth = 8
  ctx.beginPath()
  ctx.arc(150, 120, 90, Math.PI * 1.2, Math.PI * 1.8)
  ctx.stroke()
  ctx.fillStyle = '#000'
  ctx.fillRect(60, 120, 20, 40)
  ctx.fillRect(220, 120, 20, 40)
}

function drawCigar(ctx: CanvasRenderingContext2D) {
  ctx.fillStyle = '#8B4513'
  ctx.fillRect(170, 180, 40, 8)
  ctx.fillStyle = '#f00'
  ctx.fillRect(210, 180, 6, 8)
}

function drawNecklace(ctx: CanvasRenderingContext2D) {
  ctx.strokeStyle = '#FFD700'
  ctx.lineWidth = 4
  ctx.beginPath()
  ctx.arc(150, 220, 40, 0, Math.PI)
  ctx.stroke()
}

function drawMask(ctx: CanvasRenderingContext2D) {
  ctx.fillStyle = '#ccc'
  ctx.fillRect(110, 160, 80, 30)
}

export default function App() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [twitterUser, setTwitterUser] = useState('')

  const drawAvatar = useCallback((ctx: CanvasRenderingContext2D) => {
    const bg = pick(backgrounds)
    const hairColor = pick(hairColors)
    const g = pick(glassesStyles)
    const acc = pick(accessories)

    ctx.clearRect(0, 0, 300, 300)
    bg.draw(ctx)
    drawProfileFace(ctx)
    drawHair(ctx, hairColor)
    drawFaceFeatures(ctx)
    g.draw(ctx)
    acc.draw(ctx)

    updateRarityBadge(determineRarity())
    gameState.totalGenerated++
    if (gameState.currentRarity === 'Legendary') gameState.legendaryFound++
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
