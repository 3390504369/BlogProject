<template>
  <div class="app" @mousemove="handleMouseMove">
    <div class="bg-container">
      <canvas ref="bgCanvas" class="bg-canvas"></canvas>
      <div class="bg-grid"></div>
      <div class="bg-orb orb-1"></div>
      <div class="bg-orb orb-2"></div>
      <div class="bg-orb orb-3"></div>
      <div class="bg-orb orb-4"></div>
      <div class="bg-orb orb-5"></div>
      <div class="bg-orb orb-6"></div>
      <div class="bg-mesh"></div>
      <div class="bg-scanline"></div>
      <div class="bg-vignette"></div>
      <div class="cursor-glow" :style="cursorStyle"></div>
    </div>
    <header class="header">
      <div class="container">
        <div class="header-content">
          <router-link to="/" class="logo">
            <span class="logo-bracket">[</span>
            <span class="logo-text">DEVLOG</span>
            <span class="logo-bracket">]</span>
          </router-link>
          <nav class="nav">
            <router-link
              v-for="item in navItems"
              :key="item.path"
              :to="item.path"
              class="nav-link"
            >
              <span class="nav-icon">{{ item.icon }}</span>
              <span class="nav-text">{{ item.name }}</span>
            </router-link>
          </nav>
          <SearchBox />
        </div>
      </div>
    </header>
    <main class="main">
      <div class="container">
        <router-view />
      </div>
    </main>
    <footer class="footer">
      <div class="container">
        <div class="footer-content">
          <div class="footer-right">
            <span class="footer-year">&copy; 2024</span>
          </div>
        </div>
      </div>
    </footer>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import SearchBox from './components/SearchBox.vue'

const navItems = [
  { path: '/', name: '首页', icon: '⌂' },
  { path: '/articles', name: '文章', icon: '☰' },
  { path: '/archive', name: '归档', icon: '◈' },
  { path: '/admin', name: '管理', icon: '⬡' },
  { path: '/about', name: '关于', icon: '◉' },
  { path: '/settings', name: '设置', icon: '⚙' }
]

// Cursor glow
const cursorStyle = ref({ left: '0px', top: '0px' })
let cursorRAF = null
const handleMouseMove = (e) => {
  if (cursorRAF) return
  cursorRAF = requestAnimationFrame(() => {
    cursorStyle.value = { left: `${e.clientX}px`, top: `${e.clientY}px` }
    cursorRAF = null
  })
}

// Canvas background — replaces DOM stars/particles/lines
const bgCanvas = ref(null)
let animId = null
let canvasCtx = null
let stars = []
let particles = []
let lines = []

const STAR_COUNT = 60
const PARTICLE_COUNT = 20
const LINE_COUNT = 8
const COLORS = ['#00dcff', '#7c3aed', '#00ffff', '#ff0080', '#ff6600', '#ffffff']

function rand(min, max) { return Math.random() * (max - min) + min }
function pick(arr) { return arr[Math.floor(Math.random() * arr.length)] }

function initCanvasData(w, h) {
  stars = Array.from({ length: STAR_COUNT }, () => ({
    x: Math.random() * w,
    y: Math.random() * h,
    r: rand(1, 3),
    color: pick(COLORS),
    speed: rand(0.3, 1.2),
    phase: Math.random() * Math.PI * 2
  }))
  particles = Array.from({ length: PARTICLE_COUNT }, () => ({
    x: Math.random() * w,
    y: Math.random() * h,
    r: rand(2, 4),
    color: pick(COLORS),
    speed: rand(0.2, 0.6),
    drift: rand(-0.3, 0.3),
    opacity: 0
  }))
  lines = Array.from({ length: LINE_COUNT }, () => ({
    x: Math.random() * w,
    y: Math.random() * h,
    len: rand(80, 250),
    speed: rand(0.4, 1.0),
    opacity: 0
  }))
}

function draw(now) {
  const cw = bgCanvas.value.width
  const ch = bgCanvas.value.height
  canvasCtx.clearRect(0, 0, cw, ch)

  // Stars
  for (const s of stars) {
    const alpha = 0.2 + 0.6 * ((Math.sin(now * 0.001 * s.speed + s.phase) + 1) / 2)
    canvasCtx.beginPath()
    canvasCtx.arc(s.x, s.y, s.r, 0, Math.PI * 2)
    canvasCtx.fillStyle = s.color
    canvasCtx.globalAlpha = alpha
    canvasCtx.fill()
    canvasCtx.shadowColor = s.color
    canvasCtx.shadowBlur = s.r * 2
    canvasCtx.fill()
    canvasCtx.shadowBlur = 0
  }
  canvasCtx.globalAlpha = 1

  // Particles
  for (const p of particles) {
    p.y -= p.speed
    p.x += p.drift
    p.opacity = Math.min(1, p.opacity + 0.02)
    if (p.y < -10) {
      p.y = ch + 10
      p.x = Math.random() * cw
      p.opacity = 0
    }
    if (p.x < 0) p.x = cw
    if (p.x > cw) p.x = 0
    canvasCtx.beginPath()
    canvasCtx.arc(p.x, p.y, p.r, 0, Math.PI * 2)
    canvasCtx.fillStyle = p.color
    canvasCtx.globalAlpha = p.opacity * 0.7
    canvasCtx.fill()
    canvasCtx.shadowColor = p.color
    canvasCtx.shadowBlur = p.r * 3
    canvasCtx.fill()
    canvasCtx.shadowBlur = 0
  }
  canvasCtx.globalAlpha = 1

  // Lines
  for (const l of lines) {
    l.y += l.speed
    l.opacity = Math.min(0.7, l.opacity + 0.03)
    if (l.y > ch + l.len) {
      l.y = -l.len
      l.x = Math.random() * cw
      l.opacity = 0
    }
    const gradient = canvasCtx.createLinearGradient(0, l.y, 0, l.y + l.len)
    gradient.addColorStop(0, 'rgba(0, 220, 255, 0)')
    gradient.addColorStop(0.5, `rgba(0, 220, 255, ${l.opacity})`)
    gradient.addColorStop(1, 'rgba(0, 220, 255, 0)')
    canvasCtx.beginPath()
    canvasCtx.moveTo(l.x, l.y)
    canvasCtx.lineTo(l.x, l.y + l.len)
    canvasCtx.strokeStyle = gradient
    canvasCtx.lineWidth = 1.5
    canvasCtx.stroke()
  }

  animId = requestAnimationFrame(draw)
}

function resizeCanvas() {
  const el = bgCanvas.value
  if (!el) return
  el.width = window.innerWidth
  el.height = window.innerHeight
  initCanvasData(el.width, el.height)
}

let resizeTimer = null
function onResize() {
  clearTimeout(resizeTimer)
  resizeTimer = setTimeout(resizeCanvas, 150)
}

onMounted(() => {
  canvasCtx = bgCanvas.value.getContext('2d')
  resizeCanvas()
  animId = requestAnimationFrame(draw)
  window.addEventListener('resize', onResize)
})

onUnmounted(() => {
  if (animId) cancelAnimationFrame(animId)
  window.removeEventListener('resize', onResize)
})
</script>

<style scoped>
.app {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.header {
  position: sticky;
  top: 0;
  z-index: 100;
  background: rgba(10, 10, 15, 0.8);
  backdrop-filter: blur(20px);
  border-bottom: 1px solid rgba(255, 255, 255, 0.05);
  padding: 16px 0;
}

[data-theme="light"] .header {
  background: rgba(245, 245, 248, 0.85);
  border-bottom: 1px solid rgba(0, 0, 0, 0.06);
}

.header-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 24px;
}

.logo {
  display: flex;
  align-items: center;
  gap: 4px;
  font-family: 'JetBrains Mono', monospace;
  font-weight: 800;
  font-size: 1.25rem;
  letter-spacing: 1px;
  white-space: nowrap;
}

.logo-bracket {
  color: var(--primary);
  font-size: 1.4rem;
}

.nav {
  display: flex;
  align-items: center;
  gap: 32px;
  flex: 1;
  justify-content: center;
}

.nav-link {
  display: flex;
  align-items: center;
  gap: 8px;
  color: var(--text-secondary);
  font-size: 0.95rem;
  transition: all 0.3s ease;
  padding: 8px 12px;
  border-radius: 8px;
}

.nav-link:hover,
.nav-link.router-link-active {
  color: var(--primary);
  background: rgba(0, 220, 255, 0.08);
}

.nav-icon {
  font-size: 1rem;
}

.main {
  flex: 1;
  padding-top: 24px;
}

.footer {
  padding: 32px 0;
  margin-top: 48px;
  border-top: 1px solid rgba(255, 255, 255, 0.05);
}

[data-theme="light"] .footer {
  border-top: 1px solid rgba(0, 0, 0, 0.06);
}

.footer-content {
  display: flex;
  justify-content: flex-end;
}

.footer-year {
  color: var(--text-secondary);
  font-size: 0.9rem;
  font-family: 'JetBrains Mono', monospace;
}

@media (max-width: 768px) {
  .header-content {
    flex-wrap: wrap;
    justify-content: space-between;
  }

  .nav {
    order: 3;
    width: 100%;
    justify-content: center;
    gap: 16px;
    margin-top: 12px;
  }

  .nav-link {
    font-size: 0.85rem;
    padding: 6px 10px;
  }

  .nav-text {
    display: none;
  }
}
</style>
