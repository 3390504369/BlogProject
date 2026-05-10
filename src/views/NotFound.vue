<template>
  <div class="not-found">
    <div class="not-found-glow">
      <span class="glow-digit">4</span>
      <span class="glow-digit">0</span>
      <span class="glow-digit">4</span>
    </div>
    <h1 class="not-found-title">页面未找到</h1>
    <p class="not-found-desc">抱歉，您访问的页面不存在或已被删除</p>
    <router-link to="/" class="back-home">
      <span class="back-arrow">←</span> 返回首页
    </router-link>
    <div class="quick-nav">
      <router-link to="/" class="nav-icon">⌂</router-link>
      <router-link to="/articles" class="nav-icon">☰</router-link>
      <router-link to="/archive" class="nav-icon">◈</router-link>
      <router-link to="/about" class="nav-icon">◉</router-link>
    </div>
  </div>
</template>

<style scoped>
.not-found {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 70vh;
  text-align: center;
  animation: fadeInUp 0.6s ease-out;
}

.not-found-glow {
  display: flex;
  gap: 20px;
  margin-bottom: 30px;
}

.glow-digit {
  font-size: 120px;
  font-weight: 900;
  color: var(--primary);
  text-shadow: 0 0 40px rgba(0, 212, 255, 0.8),
               0 0 80px rgba(0, 212, 255, 0.5);
  animation: pulseGlow 2s ease-in-out infinite;
}

.glow-digit:nth-child(2) { animation-delay: 0.2s; }
.glow-digit:nth-child(3) { animation-delay: 0.4s; }

@keyframes pulseGlow {
  0%, 100% { opacity: 0.7; transform: scale(1); }
  50% { opacity: 1; transform: scale(1.05); }
}

.not-found-title {
  font-size: 36px;
  margin-bottom: 16px;
  color: var(--text-primary);
}

.not-found-desc {
  font-size: 18px;
  color: var(--text-secondary);
  margin-bottom: 40px;
}

.back-home {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 14px 32px;
  background: linear-gradient(135deg, var(--primary), var(--secondary));
  border-radius: 8px;
  color: white;
  font-weight: 600;
  transition: all 0.3s ease;
}

.back-home:hover {
  transform: translateY(-2px);
  box-shadow: 0 10px 40px rgba(0, 212, 255, 0.4);
  color: white;
}

.quick-nav {
  display: flex;
  gap: 24px;
  margin-top: 48px;
}

.nav-icon {
  font-size: 24px;
  color: var(--text-secondary);
  transition: all 0.3s ease;
}

.nav-icon:hover {
  color: var(--primary);
  transform: scale(1.2);
}

@keyframes fadeInUp {
  from { opacity: 0; transform: translateY(30px); }
  to { opacity: 1; transform: translateY(0); }
}
</style>