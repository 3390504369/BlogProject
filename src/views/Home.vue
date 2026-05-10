<template>
  <div class="home">
    <section class="hero">
      <div class="hero-bg">
        <div class="hero-orb hero-orb-1"></div>
        <div class="hero-orb hero-orb-2"></div>
        <div class="hero-grid"></div>
      </div>
      <div class="hero-content">
        <div class="hero-badge">
          <span class="badge-dot"></span>
          <span>Welcome to my digital space</span>
        </div>
        <h1 class="hero-title">
          <span class="hero-line">记录</span>
          <span class="hero-line gradient-text">技术成长</span>
        </h1>
        <p class="hero-subtitle">
          全栈开发者的技术博客，分享前端、后端、DevOps 等领域的实践与思考
        </p>
        <div class="hero-stats">
          <div class="stat-item">
            <span class="stat-value">{{ articles.length }}</span>
            <span class="stat-label">篇文章</span>
          </div>
          <div class="stat-divider"></div>
          <div class="stat-item">
            <span class="stat-value">{{ categories.length }}</span>
            <span class="stat-label">个分类</span>
          </div>
          <div class="stat-divider"></div>
          <div class="stat-item">
            <span class="stat-value">{{ totalTags }}</span>
            <span class="stat-label">个标签</span>
          </div>
        </div>
      </div>
    </section>

    <section class="featured-articles">
      <div class="section-header">
        <div class="section-title-group">
          <span class="section-number">01</span>
          <h2 class="section-title">最新文章</h2>
        </div>
        <router-link to="/articles" class="section-link">
          查看全部
          <span class="arrow">→</span>
        </router-link>
      </div>
      <div class="article-cards">
        <article 
          v-for="(article, index) in latestArticles" 
          :key="article.id" 
          class="article-card"
          :style="{ animationDelay: `${index * 0.1}s` }"
        >
          <div class="card-glow"></div>
          <div class="card-content">
            <div class="article-meta">
              <span class="category-tag">{{ article.category }}</span>
              <span class="date">{{ article.date }}</span>
            </div>
            <h3 class="article-title">
              <router-link :to="`/article/${article.id}`">
                {{ article.title }}
                <span class="title-arrow">→</span>
              </router-link>
            </h3>
            <p class="article-excerpt">{{ article.excerpt }}</p>
            <div class="article-footer">
              <div class="author">
                <span class="author-avatar">◈</span>
                <span class="author-name">{{ article.author }}</span>
              </div>
              <div class="tags">
                <span 
                  v-for="tag in article.tags.slice(0, 2)" 
                  :key="tag" 
                  class="tag"
                >
                  <router-link :to="`/tag/${tag}`">#{{ tag }}</router-link>
                </span>
              </div>
            </div>
          </div>
        </article>
      </div>
    </section>

    <section class="sidebar-section">
      <div class="widget categories-widget">
        <div class="widget-header">
          <span class="widget-icon">◈</span>
          <h3>分类</h3>
        </div>
        <ul class="category-list">
          <li v-for="cat in categories" :key="cat.name" class="category-item">
            <router-link :to="`/category/${cat.name}`" class="category-link">
              <span class="category-name">{{ cat.name }}</span>
              <span class="category-count">{{ cat.count }}</span>
            </router-link>
          </li>
        </ul>
      </div>

      <div class="widget tags-widget">
        <div class="widget-header">
          <span class="widget-icon">#</span>
          <h3>标签云</h3>
        </div>
        <div class="tag-cloud">
          <span 
            v-for="tag in tags" 
            :key="tag.name" 
            class="tag-item"
          >
            <router-link :to="`/tag/${tag.name}`">{{ tag.name }}</router-link>
          </span>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { articles, categories, tags } from '../data/articles'

const latestArticles = computed(() => {
  return [...articles].sort((a, b) => new Date(b.date) - new Date(a.date)).slice(0, 3)
})

const totalTags = computed(() => tags.length)
</script>

<style scoped>
.home {
  display: grid;
  grid-template-columns: 1fr 280px;
  gap: 50px;
}

.hero {
  grid-column: 1 / -1;
  position: relative;
  padding: 50px 0;
  overflow: hidden;
}

.hero-bg {
  position: absolute;
  inset: 0;
  pointer-events: none;
}

.hero-orb {
  position: absolute;
  border-radius: 50%;
  filter: blur(80px);
  opacity: 0.4;
}

.hero-orb-1 {
  width: 400px;
  height: 400px;
  background: radial-gradient(circle, rgba(0, 212, 255, 0.3) 0%, transparent 70%);
  top: -100px;
  right: 10%;
  animation: float 8s ease-in-out infinite;
}

.hero-orb-2 {
  width: 300px;
  height: 300px;
  background: radial-gradient(circle, rgba(124, 58, 237, 0.3) 0%, transparent 70%);
  bottom: -50px;
  left: 5%;
  animation: float 10s ease-in-out infinite reverse;
}

.hero-grid {
  position: absolute;
  inset: 0;
  background-image: 
    linear-gradient(rgba(0, 212, 255, 0.03) 1px, transparent 1px),
    linear-gradient(90deg, rgba(0, 212, 255, 0.03) 1px, transparent 1px);
  background-size: 40px 40px;
  mask-image: radial-gradient(ellipse at center, black 0%, transparent 70%);
}

.hero-content {
  position: relative;
  z-index: 1;
  text-align: center;
  max-width: 700px;
  margin: 0 auto;
}

.hero-badge {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 8px 16px;
  background: rgba(0, 212, 255, 0.08);
  border: 1px solid rgba(0, 212, 255, 0.2);
  border-radius: 20px;
  font-size: 0.85rem;
  color: var(--primary);
  margin-bottom: 20px;
  font-family: 'JetBrains Mono', monospace;
}

.badge-dot {
  width: 6px;
  height: 6px;
  background: var(--primary);
  border-radius: 50%;
  animation: pulse-glow 2s infinite;
}

.hero-title {
  font-size: 2.8rem;
  font-weight: 800;
  line-height: 1.2;
  margin-bottom: 18px;
}

.hero-line {
  display: block;
}

.gradient-text {
  background: linear-gradient(135deg, var(--primary) 0%, var(--accent) 50%, var(--secondary) 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  background-size: 200% 200%;
  animation: gradient-shift 5s ease infinite;
}

@keyframes gradient-shift {
  0%, 100% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
}

.hero-subtitle {
  font-size: 1.05rem;
  color: var(--text-secondary);
  line-height: 1.7;
  margin-bottom: 28px;
  max-width: 550px;
  margin-left: auto;
  margin-right: auto;
}

.hero-stats {
  display: inline-flex;
  align-items: center;
  gap: 30px;
  padding: 20px 40px;
  background: rgba(255, 255, 255, 0.02);
  border: 1px solid rgba(255, 255, 255, 0.05);
  border-radius: 12px;
}

.stat-item {
  text-align: center;
}

.stat-value {
  display: block;
  font-size: 1.8rem;
  font-weight: 700;
  color: var(--primary);
  font-family: 'JetBrains Mono', monospace;
}

.stat-label {
  font-size: 0.85rem;
  color: var(--text-secondary);
}

.stat-divider {
  width: 1px;
  height: 40px;
  background: linear-gradient(180deg, transparent, rgba(255, 255, 255, 0.1), transparent);
}

.section-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 30px;
}

.section-title-group {
  display: flex;
  align-items: baseline;
  gap: 16px;
}

.section-number {
  font-size: 0.85rem;
  font-family: 'JetBrains Mono', monospace;
  color: var(--secondary);
  font-weight: 600;
}

.section-title {
  font-size: 1.6rem;
  font-weight: 700;
}

.section-link {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 0.9rem;
  color: var(--text-secondary);
  transition: all 0.3s ease;
}

.section-link:hover {
  color: var(--primary);
}

.arrow {
  transition: transform 0.3s ease;
}

.section-link:hover .arrow {
  transform: translateX(4px);
}

.article-cards {
  display: flex;
  flex-direction: column;
  gap: 24px;
}

.article-card {
  position: relative;
  background: var(--glass-bg);
  backdrop-filter: blur(20px);
  border: 1px solid var(--glass-border);
  border-radius: 16px;
  overflow: hidden;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  animation: fadeInUp 0.6s ease-out forwards;
  opacity: 0;
}

.article-card:hover {
  transform: translateY(-4px);
  border-color: rgba(0, 212, 255, 0.3);
  box-shadow: 
    0 20px 40px rgba(0, 0, 0, 0.3),
    0 0 60px rgba(0, 212, 255, 0.1);
}

.card-glow {
  position: absolute;
  top: 0;
  left: 0;
  width: 200px;
  height: 200px;
  background: radial-gradient(circle, rgba(0, 212, 255, 0.15) 0%, transparent 70%);
  opacity: 0;
  transition: opacity 0.4s ease;
  pointer-events: none;
}

.article-card:hover .card-glow {
  opacity: 1;
}

.card-content {
  position: relative;
  padding: 28px;
  z-index: 1;
}

.article-meta {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 14px;
}

.category-tag {
  padding: 5px 12px;
  background: linear-gradient(135deg, var(--primary), var(--secondary));
  border-radius: 6px;
  font-size: 0.75rem;
  font-weight: 600;
  color: white;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.date {
  font-size: 0.85rem;
  color: var(--text-secondary);
  font-family: 'JetBrains Mono', monospace;
}

.article-title {
  font-size: 1.35rem;
  font-weight: 600;
  margin-bottom: 12px;
}

.article-title a {
  color: var(--text-primary);
  display: flex;
  align-items: center;
  gap: 8px;
  transition: all 0.3s ease;
}

.article-title a:hover {
  color: var(--primary);
}

.title-arrow {
  opacity: 0;
  transform: translateX(-8px);
  transition: all 0.3s ease;
}

.article-title a:hover .title-arrow {
  opacity: 1;
  transform: translateX(0);
}

.article-excerpt {
  color: var(--text-secondary);
  line-height: 1.7;
  margin-bottom: 20px;
  font-size: 0.95rem;
}

.article-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: 16px;
  border-top: 1px solid rgba(255, 255, 255, 0.05);
}

.author {
  display: flex;
  align-items: center;
  gap: 10px;
  color: var(--text-secondary);
  font-size: 0.9rem;
}

.author-avatar {
  color: var(--secondary);
}

.tags {
  display: flex;
  gap: 8px;
}

.tag {
  padding: 4px 10px;
  background: rgba(0, 212, 255, 0.08);
  border-radius: 6px;
  font-size: 0.8rem;
}

.tag a {
  color: var(--primary);
}

.tag a:hover {
  color: var(--accent);
}

.sidebar-section {
  display: flex;
  flex-direction: column;
  gap: 24px;
}

.widget {
  background: var(--glass-bg);
  backdrop-filter: blur(20px);
  border: 1px solid var(--glass-border);
  border-radius: 16px;
  padding: 24px;
}

.widget-header {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 20px;
  padding-bottom: 14px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.05);
}

.widget-icon {
  color: var(--primary);
  font-size: 1rem;
}

.widget-header h3 {
  font-size: 1.05rem;
  font-weight: 600;
}

.category-list {
  list-style: none;
}

.category-item {
  margin-bottom: 10px;
}

.category-link {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 14px;
  background: rgba(255, 255, 255, 0.02);
  border-radius: 8px;
  color: var(--text-secondary);
  transition: all 0.3s ease;
}

.category-link:hover {
  background: rgba(0, 212, 255, 0.08);
  color: var(--primary);
}

.category-count {
  padding: 3px 10px;
  background: rgba(124, 58, 237, 0.2);
  border-radius: 10px;
  font-size: 0.8rem;
  color: var(--secondary);
  font-family: 'JetBrains Mono', monospace;
}

.tag-cloud {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.tag-item {
  padding: 6px 12px;
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(255, 255, 255, 0.05);
  border-radius: 8px;
  font-size: 0.85rem;
  transition: all 0.3s ease;
}

.tag-item:hover {
  background: rgba(0, 212, 255, 0.1);
  border-color: rgba(0, 212, 255, 0.3);
}

.tag-item a {
  color: var(--text-secondary);
}

.tag-item:hover a {
  color: var(--primary);
}

@media (max-width: 900px) {
  .home {
    grid-template-columns: 1fr;
  }
  
  .hero {
    padding: 35px 0;
  }
  
  .hero-title {
    font-size: 2.2rem;
  }
  
  .hero-stats {
    padding: 14px 20px;
    gap: 20px;
  }
  
  .stat-value {
    font-size: 1.3rem;
  }
}
</style>