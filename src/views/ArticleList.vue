<template>
  <div class="article-list">
    <div class="page-header">
      <div class="header-content">
        <div class="header-icon">
          <span>☰</span>
        </div>
        <h1 class="page-title">所有文章</h1>
        <p class="page-subtitle">共计 {{ filteredArticles.length }} 篇文章</p>
      </div>
      <div class="header-decoration">
        <div class="decoration-line"></div>
        <div class="decoration-grid"></div>
      </div>
    </div>

    <div class="filter-section">
      <div class="filter-label">
        <span class="filter-icon">◈</span>
        <span>筛选分类</span>
      </div>
      <div class="filter-buttons">
        <button 
          :class="['filter-btn', { active: selectedCategory === '' }]"
          @click="selectedCategory = ''"
        >
          全部
        </button>
        <button 
          v-for="cat in categories" 
          :key="cat.name"
          :class="['filter-btn', { active: selectedCategory === cat.name }]"
          @click="selectedCategory = cat.name"
        >
          {{ cat.name }}
        </button>
      </div>
    </div>

    <div class="articles">
      <article 
        v-for="(article, index) in filteredArticles" 
        :key="article.id" 
        class="article-item"
        :style="{ animationDelay: `${index * 0.05}s` }"
      >
        <div class="article-line"></div>
        <div class="article-content">
          <div class="article-header">
            <div class="article-meta">
              <span class="category-badge">{{ article.category }}</span>
              <span class="date">{{ article.date }}</span>
            </div>
            <h2 class="article-title">
              <router-link :to="`/article/${article.id}`">
                {{ article.title }}
                <span class="read-more">阅读 →</span>
              </router-link>
            </h2>
          </div>
          <p class="article-excerpt">{{ article.excerpt }}</p>
          <div class="article-tags">
            <span 
              v-for="tag in article.tags" 
              :key="tag" 
              class="tag"
            >
              <router-link :to="`/tag/${tag}`">#{{ tag }}</router-link>
            </span>
          </div>
        </div>
      </article>
    </div>

    <div v-if="filteredArticles.length === 0" class="empty-state">
      <div class="empty-icon">◈</div>
      <p>暂无文章</p>
      <router-link to="/articles" class="back-link">返回文章列表</router-link>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { articles, categories } from '../data/articles'

const selectedCategory = ref('')

const filteredArticles = computed(() => {
  if (!selectedCategory.value) {
    return articles.sort((a, b) => new Date(b.date) - new Date(a.date))
  }
  return articles.filter(a => a.category === selectedCategory.value)
    .sort((a, b) => new Date(b.date) - new Date(a.date))
})
</script>

<style scoped>
.article-list {
  max-width: 850px;
  margin: 0 auto;
}

.page-header {
  position: relative;
  padding: 50px 0;
  margin-bottom: 40px;
  overflow: hidden;
}

.header-content {
  position: relative;
  z-index: 1;
}

.header-icon {
  width: 60px;
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, var(--primary), var(--secondary));
  border-radius: 14px;
  margin-bottom: 20px;
  font-size: 1.5rem;
  color: white;
}

.page-title {
  font-size: 2.5rem;
  font-weight: 800;
  margin-bottom: 10px;
  background: linear-gradient(135deg, var(--text-primary) 0%, var(--primary) 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.page-subtitle {
  color: var(--text-secondary);
  font-size: 1rem;
  font-family: 'JetBrains Mono', monospace;
}

.header-decoration {
  position: absolute;
  top: 0;
  right: 0;
  width: 300px;
  height: 100%;
  pointer-events: none;
}

.decoration-line {
  position: absolute;
  top: 50%;
  right: 0;
  width: 100px;
  height: 1px;
  background: linear-gradient(90deg, var(--primary), transparent);
}

.decoration-grid {
  position: absolute;
  top: 20px;
  right: 20px;
  width: 100px;
  height: 100px;
  background-image: 
    linear-gradient(rgba(0, 212, 255, 0.1) 1px, transparent 1px),
    linear-gradient(90deg, rgba(0, 212, 255, 0.1) 1px, transparent 1px);
  background-size: 15px 15px;
  opacity: 0.5;
}

.filter-section {
  display: flex;
  align-items: center;
  gap: 20px;
  padding: 20px 24px;
  background: var(--glass-bg);
  backdrop-filter: blur(20px);
  border: 1px solid var(--glass-border);
  border-radius: 12px;
  margin-bottom: 35px;
}

.filter-label {
  display: flex;
  align-items: center;
  gap: 8px;
  color: var(--text-secondary);
  font-size: 0.9rem;
  white-space: nowrap;
}

.filter-icon {
  color: var(--primary);
}

.filter-buttons {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.filter-btn {
  padding: 8px 16px;
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 8px;
  color: var(--text-secondary);
  font-size: 0.85rem;
  cursor: pointer;
  transition: all 0.3s ease;
}

.filter-btn:hover {
  background: rgba(0, 212, 255, 0.1);
  border-color: rgba(0, 212, 255, 0.3);
  color: var(--primary);
}

.filter-btn.active {
  background: linear-gradient(135deg, rgba(0, 212, 255, 0.15), rgba(124, 58, 237, 0.15));
  border-color: rgba(0, 212, 255, 0.4);
  color: var(--primary);
}

.articles {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.article-item {
  position: relative;
  display: flex;
  gap: 24px;
  padding: 28px;
  background: var(--glass-bg);
  backdrop-filter: blur(20px);
  border: 1px solid var(--glass-border);
  border-radius: 14px;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  animation: fadeInUp 0.5s ease-out forwards;
  opacity: 0;
}

.article-item:hover {
  transform: translateX(8px);
  border-color: rgba(0, 212, 255, 0.3);
  box-shadow: 
    0 10px 30px rgba(0, 0, 0, 0.2),
    0 0 40px rgba(0, 212, 255, 0.08);
}

.article-line {
  position: absolute;
  left: 0;
  top: 20px;
  bottom: 20px;
  width: 3px;
  background: linear-gradient(180deg, var(--primary), var(--secondary));
  border-radius: 2px;
  opacity: 0;
  transition: opacity 0.3s ease;
}

.article-item:hover .article-line {
  opacity: 1;
}

.article-content {
  flex: 1;
}

.article-header {
  margin-bottom: 14px;
}

.article-meta {
  display: flex;
  align-items: center;
  gap: 14px;
  margin-bottom: 12px;
}

.category-badge {
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
  font-size: 1.4rem;
  font-weight: 600;
}

.article-title a {
  color: var(--text-primary);
  display: flex;
  align-items: center;
  gap: 12px;
  transition: all 0.3s ease;
}

.article-title a:hover {
  color: var(--primary);
}

.read-more {
  font-size: 0.85rem;
  color: var(--text-secondary);
  opacity: 0;
  transform: translateX(-10px);
  transition: all 0.3s ease;
}

.article-title a:hover .read-more {
  opacity: 1;
  transform: translateX(0);
}

.article-excerpt {
  color: var(--text-secondary);
  line-height: 1.7;
  margin-bottom: 16px;
  font-size: 0.95rem;
}

.article-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.tag {
  padding: 5px 12px;
  background: rgba(0, 212, 255, 0.08);
  border: 1px solid rgba(0, 212, 255, 0.15);
  border-radius: 6px;
  font-size: 0.8rem;
}

.tag a {
  color: var(--primary);
}

.tag a:hover {
  color: var(--accent);
}

.empty-state {
  text-align: center;
  padding: 80px 0;
}

.empty-icon {
  font-size: 3rem;
  color: var(--secondary);
  margin-bottom: 20px;
  opacity: 0.5;
}

.empty-state p {
  color: var(--text-secondary);
  font-size: 1.1rem;
  margin-bottom: 20px;
}

.back-link {
  color: var(--primary);
}

@media (max-width: 768px) {
  .filter-section {
    flex-direction: column;
    align-items: flex-start;
    gap: 12px;
  }
  
  .page-title {
    font-size: 2rem;
  }
  
  .article-item {
    padding: 20px;
  }
  
  .article-title {
    font-size: 1.2rem;
  }
  
  .read-more {
    display: none;
  }
}
</style>