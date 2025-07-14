import React, { useEffect, useRef, useState } from 'react'

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

const avatarComponents = {
  colors: ['#ef4444', '#60a5fa', '#a855f7', '#facc15'],
  accessories: ['glasses', 'hat', 'earring'],
}

export default function App() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [twitterUser, setTwitterUser] = useState('')
  const [connected, setConnected] = useState(false)

  useEffect(() => {
    generatePFP()
    updateStats()
  }, [])

  function determineRarity() {
    const r = Math.random()
    if (r < 0.01) return 'Legendary'
    if (r < 0.1) return 'Epic'
    if (r < 0.3) return 'Rare'
    return 'Common'
  }

  function generateAvatarData(forced?: string) {
    return {
      color:
        avatarComponents.colors[
          Math.floor(Math.random() * avatarComponents.colors.length)
        ],
      accessory:
        avatarComponents.accessories[
          Math.floor(Math.random() * avatarComponents.accessories.length)
        ],
      rarity: forced || determineRarity(),
    }
  }

  function drawBackground(ctx: CanvasRenderingContext2D, color: string) {
    ctx.fillStyle = color
    ctx.fillRect(0, 0, 300, 300)
  }

  function drawProfileFace(ctx: CanvasRenderingContext2D) {
    ctx.fillStyle = '#fff'
    ctx.beginPath()
    ctx.arc(150, 150, 100, 0, Math.PI * 2)
    ctx.fill()
  }

  function drawAccessory(_ctx: CanvasRenderingContext2D) {}
  function drawBrainPattern(_ctx: CanvasRenderingContext2D) {}
  function drawTechAccessory(_ctx: CanvasRenderingContext2D) {}

  function drawLegendaryEffects(ctx: CanvasRenderingContext2D) {
    ctx.strokeStyle = '#ffd700'
    ctx.lineWidth = 6
    ctx.strokeRect(10, 10, 280, 280)
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

  function drawAvatar(data: { color: string; rarity: string }) {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    drawBackground(ctx, data.color)
    drawProfileFace(ctx)
    drawAccessory(ctx)
    if (data.rarity === 'Legendary') drawLegendaryEffects(ctx)
    updateRarityBadge(data.rarity)
    gameState.totalGenerated++
    if (data.rarity === 'Legendary') gameState.legendaryFound++
    gameState.currentRarity = data.rarity
  }

  function generatePFP() {
    const data = generateAvatarData()
    drawAvatar(data)
    addToGallery()
    updateStats()
  }

  function forceLegendary() {
    const data = generateAvatarData('Legendary')
    drawAvatar(data)
    addToGallery()
    updateStats()
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
    setConnected(true)
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
    <div className="container">
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
            <button className="btn" onClick={generatePFP}>
              Generate New
            </button>
            <button className="btn btn-legendary" onClick={forceLegendary}>
              Try Legendary
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
