<template>
  <div class="home">
    <section class="profile-header">
      <div class="profile-avatar">
        <img v-if="profile.avatar" :src="profile.avatar" alt="avatar" class="avatar-img" />
        <span v-else class="avatar-icon">◈</span>
      </div>
      <h1 class="profile-name">{{ profile.name }}</h1>
      <p class="profile-title">{{ profile.title }}</p>
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
    </section>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { articles, categories } from '../data/articles'
import { useProfile } from '../composables/useProfile'

const { profile } = useProfile()

const latestArticles = computed(() => {
  return [...articles].sort((a, b) => new Date(b.date) - new Date(a.date)).slice(0, 3)
})
</script>

<style scoped>
.home {
  display: grid;
  grid-template-columns: 1fr 280px;
  gap: 50px;
}

/* Profile header */
.profile-header {
  grid-column: 1 / -1;
  text-align: center;
  padding: 40px 0 30px;
}

.profile-avatar {
  width: 90px;
  height: 90px;
  border-radius: 50%;
  margin: 0 auto 16px;
  overflow: hidden;
  border: 2px solid transparent;
  background: linear-gradient(var(--bg-dark), var(--bg-dark)) padding-box,
              linear-gradient(135deg, var(--primary), var(--secondary)) border-box;
  display: flex;
  align-items: center;
  justify-content: center;
}

.avatar-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.avatar-icon {
  font-size: 2.2rem;
  color: var(--primary);
}

.profile-name {
  font-size: 1.8rem;
  font-weight: 700;
  margin-bottom: 6px;
}

.profile-title {
  color: var(--text-secondary);
  font-size: 1rem;
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

@media (max-width: 900px) {
  .home {
    grid-template-columns: 1fr;
  }
  
  .profile-header {
    padding: 30px 0 20px;
  }

  .profile-name {
    font-size: 1.5rem;
  }

  .profile-avatar {
    width: 70px;
    height: 70px;
  }
}
</style>