<template>
  <div class="about">
    <div class="about-header">
      <div class="avatar-container">
        <div class="avatar-ring"></div>
        <div class="avatar">
          <span>◈</span>
        </div>
      </div>
      <h1 class="name">开发者</h1>
      <p class="title">全栈工程师 · 技术博主</p>
      <div class="status">
        <span class="status-dot"></span>
        <span>活跃开发中</span>
      </div>
    </div>

    <div class="about-content">
      <section class="section">
        <div class="section-header">
          <span class="section-icon">◈</span>
          <h2>关于我</h2>
        </div>
        <div class="section-content">
          <p>
            你好！我是一名热爱技术的全栈开发者，专注于 Web 开发领域。
            拥有多年的前端和后端开发经验，对新技术保持着浓厚的兴趣。
          </p>
          <p>
            这个博客是我记录技术成长、分享编程心得的空间。
           希望通过分享，与更多志同道合的朋友交流学习。
          </p>
        </div>
      </section>

      <section class="section">
        <div class="section-header">
          <span class="section-icon">◈</span>
          <h2>技术栈</h2>
        </div>
        <div class="tech-grid">
          <div class="tech-category">
            <div class="category-header">
              <span class="category-icon">⟨⟩</span>
              <h3>前端</h3>
            </div>
            <div class="tech-items">
              <span class="tech-item">Vue.js</span>
              <span class="tech-item">React</span>
              <span class="tech-item">TypeScript</span>
              <span class="tech-item">CSS3</span>
              <span class="tech-item">Vite</span>
            </div>
          </div>
          <div class="tech-category">
            <div class="category-header">
              <span class="category-icon">◈</span>
              <h3>后端</h3>
            </div>
            <div class="tech-items">
              <span class="tech-item">Node.js</span>
              <span class="tech-item">Python</span>
              <span class="tech-item">Go</span>
              <span class="tech-item">MySQL</span>
              <span class="tech-item">MongoDB</span>
            </div>
          </div>
          <div class="tech-category">
            <div class="category-header">
              <span class="category-icon">⬡</span>
              <h3>DevOps</h3>
            </div>
            <div class="tech-items">
              <span class="tech-item">Docker</span>
              <span class="tech-item">Git</span>
              <span class="tech-item">CI/CD</span>
              <span class="tech-item">Nginx</span>
            </div>
          </div>
        </div>
      </section>

      <section class="section">
        <div class="section-header">
          <span class="section-icon">◈</span>
          <h2>联系方式</h2>
        </div>
        <div class="contact-grid">
          <a href="mailto:example@email.com" class="contact-card">
            <span class="contact-icon">✉</span>
            <div class="contact-info">
              <span class="contact-label">邮箱</span>
              <span class="contact-value">example@email.com</span>
            </div>
          </a>
          <a href="https://github.com" class="contact-card" target="_blank">
            <span class="contact-icon">⌥</span>
            <div class="contact-info">
              <span class="contact-label">GitHub</span>
              <span class="contact-value">github.com/user</span>
            </div>
          </a>
          <a href="https://twitter.com" class="contact-card" target="_blank">
            <span class="contact-icon">◉</span>
            <div class="contact-info">
              <span class="contact-label">Twitter</span>
              <span class="contact-value">@username</span>
            </div>
          </a>
        </div>
      </section>
    </div>
  </div>
</template>

<script setup>
</script>

<style scoped>
.about {
  max-width: 800px;
  margin: 0 auto;
}

.about-header {
  text-align: center;
  padding: 60px 0;
}

.avatar-container {
  position: relative;
  width: 140px;
  height: 140px;
  margin: 0 auto 30px;
}

.avatar-ring {
  position: absolute;
  inset: 0;
  border-radius: 50%;
  border: 2px solid transparent;
  background: linear-gradient(var(--bg-dark), var(--bg-dark)) padding-box,
              linear-gradient(135deg, var(--primary), var(--secondary)) border-box;
  animation: rotate 4s linear infinite;
}

@keyframes rotate {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}

.avatar {
  position: absolute;
  inset: 8px;
  background: var(--bg-dark);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 48px;
  color: var(--primary);
}

.name {
  font-size: 2.2rem;
  font-weight: 700;
  margin-bottom: 8px;
  background: linear-gradient(135deg, var(--text-primary) 0%, var(--primary) 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.title {
  color: var(--text-secondary);
  font-size: 1.1rem;
  margin-bottom: 16px;
}

.status {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 8px 16px;
  background: rgba(0, 212, 255, 0.08);
  border: 1px solid rgba(0, 212, 255, 0.2);
  border-radius: 20px;
  font-size: 0.85rem;
  color: var(--primary);
}

.status-dot {
  width: 8px;
  height: 8px;
  background: #22c55e;
  border-radius: 50%;
  animation: pulse 2s infinite;
}

@keyframes pulse {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.5; }
}

.about-content {
  display: flex;
  flex-direction: column;
  gap: 30px;
}

.section {
  background: var(--glass-bg);
  backdrop-filter: blur(20px);
  border: 1px solid var(--glass-border);
  border-radius: 20px;
  padding: 32px;
}

.section-header {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 24px;
  padding-bottom: 16px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.05);
}

.section-icon {
  color: var(--primary);
  font-size: 1.1rem;
}

.section-header h2 {
  font-size: 1.3rem;
  font-weight: 600;
}

.section-content p {
  line-height: 1.8;
  color: var(--text-secondary);
  margin-bottom: 16px;
}

.section-content p:last-child {
  margin-bottom: 0;
}

.tech-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 24px;
}

.tech-category {
  background: rgba(255, 255, 255, 0.02);
  border-radius: 14px;
  padding: 20px;
  transition: all 0.3s ease;
}

.tech-category:hover {
  background: rgba(0, 212, 255, 0.05);
  transform: translateY(-2px);
}

.category-header {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 16px;
}

.category-icon {
  color: var(--secondary);
  font-size: 1rem;
}

.category-header h3 {
  font-size: 1rem;
  font-weight: 600;
  color: var(--text-primary);
}

.tech-items {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.tech-item {
  padding: 6px 12px;
  background: rgba(0, 212, 255, 0.1);
  border: 1px solid rgba(0, 212, 255, 0.15);
  border-radius: 8px;
  font-size: 0.85rem;
  color: var(--primary);
  transition: all 0.3s ease;
}

.tech-item:hover {
  background: rgba(0, 212, 255, 0.2);
  border-color: rgba(0, 212, 255, 0.4);
}

.contact-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 16px;
}

.contact-card {
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 20px;
  background: rgba(255, 255, 255, 0.02);
  border: 1px solid rgba(255, 255, 255, 0.05);
  border-radius: 14px;
  transition: all 0.3s ease;
}

.contact-card:hover {
  background: rgba(0, 212, 255, 0.08);
  border-color: rgba(0, 212, 255, 0.3);
  transform: translateY(-2px);
}

.contact-icon {
  width: 44px;
  height: 44px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, var(--primary), var(--secondary));
  border-radius: 12px;
  font-size: 1.2rem;
  color: white;
}

.contact-info {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.contact-label {
  font-size: 0.8rem;
  color: var(--text-secondary);
}

.contact-value {
  font-size: 0.95rem;
  color: var(--text-primary);
  font-family: 'JetBrains Mono', monospace;
}

@media (max-width: 768px) {
  .about-header {
    padding: 40px 0;
  }
  
  .name {
    font-size: 1.8rem;
  }
  
  .tech-grid {
    grid-template-columns: 1fr;
  }
  
  .contact-grid {
    grid-template-columns: 1fr;
  }
}
</style>