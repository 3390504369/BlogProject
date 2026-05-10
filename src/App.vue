<template>
  <div class="app" @mousemove="handleMouseMove">
    <div class="bg-container">
      <div class="bg-grid"></div>
      <div class="bg-stars">
        <span v-for="n in 80" :key="n" class="star" :style="getStarStyle(n)"></span>
      </div>
      <div class="bg-orb orb-1"></div>
      <div class="bg-orb orb-2"></div>
      <div class="bg-orb orb-3"></div>
      <div class="bg-orb orb-4"></div>
      <div class="bg-orb orb-5"></div>
      <div class="bg-orb orb-6"></div>
      <div class="bg-mesh"></div>
      <div class="bg-noise"></div>
      <div class="bg-particles">
        <span v-for="n in 30" :key="n" class="particle" :style="getParticleStyle(n)"></span>
      </div>
      <div class="bg-lines">
        <span v-for="n in 12" :key="n" class="bg-line" :style="getLineStyle(n)"></span>
      </div>
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
            <span class="footer-year">© 2024</span>
          </div>
        </div>
      </div>
    </footer>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import SearchBox from './components/SearchBox.vue'

const navItems = [
  { path: '/', name: '首页', icon: '⌂' },
  { path: '/articles', name: '文章', icon: '☰' },
  { path: '/archive', name: '归档', icon: '◈' },
  { path: '/about', name: '关于', icon: '◉' }
]

const cursorX = ref(0)
const cursorY = ref(0)
const cursorStyle = ref({
  left: '0px',
  top: '0px'
})

const handleMouseMove = (e) => {
  cursorX.value = e.clientX
  cursorY.value = e.clientY
  cursorStyle.value = {
    left: `${e.clientX}px`,
    top: `${e.clientY}px`
  }
}

const getStarStyle = (n) => {
  const x = (n * 47 + n * 13) % 100
  const y = (n * 37 + n * 23) % 100
  const size = 2 + (n % 4)
  const duration = 1.5 + (n % 3)
  const delay = (n * 0.2) % 4
  const colors = ['#00d4ff', '#7c3aed', '#00ffff', '#ff0080', '#ffffff']
  const color = colors[n % colors.length]
  return {
    left: `${x}%`,
    top: `${y}%`,
    width: `${size}px`,
    height: `${size}px`,
    '--duration': `${duration}s`,
    '--star-color': color,
    animationDelay: `${delay}s`
  }
}

const getParticleStyle = (n) => {
  const x = (n * 67) % 100
  const duration = 8 + (n * 1.5) % 12
  const delay = (n * 0.8) % 10
  const size = 3 + (n % 3)
  const colors = ['#00d4ff', '#7c3aed', '#00ffff', '#ff0080', '#ff6600']
  const color = colors[n % colors.length]
  return {
    left: `${x}%`,
    '--duration': `${duration}s`,
    '--particle-color': color,
    animationDelay: `${delay}s`,
    width: `${size}px`,
    height: `${size}px`
  }
}

const getLineStyle = (n) => {
  const x = (n * 31 + n * 7) % 100
  const duration = 6 + (n * 1.2) % 8
  const delay = (n * 0.5) % 6
  return {
    left: `${x}%`,
    '--duration': `${duration}s`,
    animationDelay: `${delay}s`
  }
}
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
  background: rgba(0, 212, 255, 0.08);
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