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
  ctx.moveTo(120, 220)
  ctx.quadraticCurveTo(130, 180, 120, 130)
  ctx.quadraticCurveTo(130, 60, 180, 60)
  ctx.quadraticCurveTo(210, 70, 210, 120)
  ctx.quadraticCurveTo(220, 145, 210, 160)
  ctx.quadraticCurveTo(205, 170, 190, 172)
  ctx.quadraticCurveTo(170, 175, 170, 190)
  ctx.quadraticCurveTo(150, 200, 120, 220)
  ctx.closePath()
  ctx.fill()
}

function drawHair(ctx: CanvasRenderingContext2D, color: string) {
  ctx.fillStyle = color
  ctx.beginPath()
  ctx.moveTo(115, 80)
  ctx.quadraticCurveTo(120, 30, 180, 30)
  ctx.quadraticCurveTo(220, 40, 230, 80)
  ctx.lineTo(210, 120)
  ctx.quadraticCurveTo(200, 70, 150, 60)
  ctx.quadraticCurveTo(130, 60, 115, 80)
  ctx.closePath()
  ctx.fill()
}

function drawFaceFeatures(ctx: CanvasRenderingContext2D) {
  ctx.fillStyle = '#000'
  ctx.beginPath()
  ctx.arc(190, 120, 8, 0, Math.PI * 2)
  ctx.fill()
  ctx.beginPath()
  ctx.moveTo(210, 120)
  ctx.quadraticCurveTo(215, 135, 210, 150)
  ctx.strokeStyle = '#000'
  ctx.lineWidth = 2
  ctx.stroke()
  ctx.beginPath()
  ctx.arc(150, 150, 12, Math.PI * 0.5, Math.PI * 1.5)
  ctx.stroke()
}

function drawPixelGlasses(ctx: CanvasRenderingContext2D) {
  ctx.fillStyle = '#333'
  ctx.fillRect(175, 110, 30, 18)
  ctx.fillRect(205, 114, 18, 6)
  ctx.fillStyle = '#fff'
  ctx.fillRect(177, 112, 14, 14)
}

function drawVisorGlasses(ctx: CanvasRenderingContext2D) {
  ctx.fillStyle = '#000'
  ctx.fillRect(170, 112, 50, 16)
  ctx.strokeStyle = '#FF1493'
  ctx.lineWidth = 4
  ctx.beginPath()
  ctx.moveTo(170, 112)
  ctx.lineTo(220, 112)
  ctx.stroke()
}

function drawRoundGlasses(ctx: CanvasRenderingContext2D) {
  ctx.strokeStyle = '#222'
  ctx.lineWidth = 4
  ctx.beginPath()
  ctx.arc(190, 120, 18, 0, Math.PI * 2)
  ctx.stroke()
  ctx.beginPath()
  ctx.moveTo(208, 120)
  ctx.lineTo(226, 120)
  ctx.stroke()
  ctx.strokeStyle = '#20B2AA'
  ctx.beginPath()
  ctx.moveTo(208, 120)
  ctx.lineTo(226, 120)
  ctx.stroke()
}

function drawAviatorGlasses(ctx: CanvasRenderingContext2D) {
  ctx.strokeStyle = '#222'
  ctx.lineWidth = 4
  ctx.beginPath()
  ctx.moveTo(170, 116)
  ctx.bezierCurveTo(185, 108, 205, 108, 218, 116)
  ctx.bezierCurveTo(205, 140, 185, 140, 170, 116)
  ctx.stroke()
  ctx.beginPath()
  ctx.moveTo(188, 120)
  ctx.lineTo(206, 120)
  ctx.stroke()
}

function drawFuturisticGlasses(ctx: CanvasRenderingContext2D) {
  ctx.fillStyle = '#0ff'
  ctx.fillRect(170, 116, 50, 12)
  ctx.fillStyle = '#000'
  ctx.fillRect(170, 114, 6, 16)
  ctx.fillRect(214, 114, 6, 16)
}

function drawEarring(ctx: CanvasRenderingContext2D) {
  ctx.fillStyle = '#FFD700'
  ctx.beginPath()
  ctx.arc(158, 150, 4, 0, Math.PI * 2)
  ctx.fill()
}

function drawCrown(ctx: CanvasRenderingContext2D) {
  ctx.fillStyle = '#C0C0C0'
  ctx.beginPath()
  ctx.moveTo(140, 40)
  ctx.lineTo(170, 20)
  ctx.lineTo(200, 40)
  ctx.closePath()
  ctx.fill()
}

function drawHairPin(ctx: CanvasRenderingContext2D) {
  ctx.fillStyle = '#FFD700'
  ctx.fillRect(200, 90, 4, 30)
}

function drawHeadphones(ctx: CanvasRenderingContext2D) {
  ctx.strokeStyle = '#555'
  ctx.lineWidth = 8
  ctx.beginPath()
  ctx.arc(150, 120, 90, Math.PI * 1.3, Math.PI * 1.9)
  ctx.stroke()
  ctx.fillStyle = '#000'
  ctx.fillRect(60, 120, 20, 40)
}

function drawCigar(ctx: CanvasRenderingContext2D) {
  ctx.fillStyle = '#8B4513'
  ctx.fillRect(200, 160, 40, 6)
  ctx.fillStyle = '#f00'
  ctx.fillRect(240, 160, 6, 6)
}

function drawNecklace(ctx: CanvasRenderingContext2D) {
  ctx.strokeStyle = '#FFD700'
  ctx.lineWidth = 4
  ctx.beginPath()
  ctx.arc(140, 220, 40, Math.PI * 0.1, Math.PI * 0.9)
  ctx.stroke()
}

function drawMask(ctx: CanvasRenderingContext2D) {
  ctx.fillStyle = '#ccc'
  ctx.fillRect(160, 140, 60, 40)
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
