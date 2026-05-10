<template>
  <div class="archive">
    <div class="page-header">
      <div class="header-icon">
        <span>◈</span>
      </div>
      <h1 class="page-title">文章归档</h1>
      <p class="page-subtitle">共计 {{ totalArticles }} 篇文章</p>
    </div>

    <div class="timeline">
      <div 
        v-for="(yearArticles, year) in groupedArticles" 
        :key="year" 
        class="year-group"
      >
        <div class="year-marker">
          <div class="year-dot"></div>
          <span class="year-label">{{ year }}</span>
        </div>
        <div class="year-content">
          <div 
            v-for="(monthArticles, month) in yearArticles" 
            :key="month" 
            class="month-group"
          >
            <div class="month-header">
              <span class="month-label">{{ month }} 月</span>
              <span class="month-count">{{ monthArticles.length }} 篇</span>
            </div>
            <ul class="article-list">
              <li 
                v-for="article in monthArticles" 
                :key="article.id" 
                class="article-item"
              >
                <span class="article-date">{{ article.date }}</span>
                <router-link :to="`/article/${article.id}`" class="article-title">
                  {{ article.title }}
                </router-link>
                <span class="article-category">{{ article.category }}</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>

    <div v-if="Object.keys(groupedArticles).length === 0" class="empty-state">
      <p>暂无文章归档</p>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { articles } from '../data/articles'

const totalArticles = computed(() => articles.length)

const groupedArticles = computed(() => {
  const sortedArticles = [...articles].sort((a, b) => new Date(b.date) - new Date(a.date))
  
  const groups = {}
  sortedArticles.forEach(article => {
    const date = new Date(article.date)
    const year = date.getFullYear().toString()
    const month = (date.getMonth() + 1).toString().padStart(2, '0')
    
    if (!groups[year]) {
      groups[year] = {}
    }
    if (!groups[year][month]) {
      groups[year][month] = []
    }
    groups[year][month].push(article)
  })
  
  return groups
})
</script>

<style scoped>
.archive {
  max-width: 900px;
  margin: 0 auto;
}

.page-header {
  text-align: center;
  padding: 50px 0;
}

.header-icon {
  width: 60px;
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, var(--primary), var(--secondary));
  border-radius: 14px;
  margin: 0 auto 20px;
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

.timeline {
  position: relative;
  padding-left: 60px;
}

.timeline::before {
  content: '';
  position: absolute;
  left: 28px;
  top: 0;
  bottom: 0;
  width: 2px;
  background: linear-gradient(180deg, var(--primary), var(--secondary), transparent);
}

.year-group {
  position: relative;
  margin-bottom: 50px;
}

.year-marker {
  position: absolute;
  left: -60px;
  display: flex;
  align-items: center;
  gap: 12px;
}

.year-dot {
  width: 18px;
  height: 18px;
  background: var(--primary);
  border-radius: 50%;
  border: 3px solid var(--bg-dark);
  box-shadow: 0 0 20px rgba(0, 212, 255, 0.5);
}

.year-label {
  font-size: 1.5rem;
  font-weight: 700;
  color: var(--primary);
  font-family: 'JetBrains Mono', monospace;
}

.year-content {
  background: var(--glass-bg);
  backdrop-filter: blur(20px);
  border: 1px solid var(--glass-border);
  border-radius: 16px;
  padding: 30px;
}

.month-group {
  margin-bottom: 30px;
}

.month-group:last-child {
  margin-bottom: 0;
}

.month-header {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 16px;
  padding-bottom: 10px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.05);
}

.month-label {
  font-size: 1rem;
  font-weight: 600;
  color: var(--text-primary);
}

.month-count {
  padding: 3px 10px;
  background: rgba(124, 58, 237, 0.2);
  border-radius: 10px;
  font-size: 0.75rem;
  color: var(--secondary);
  font-family: 'JetBrains Mono', monospace;
}

.article-list {
  list-style: none;
}

.article-item {
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 12px 16px;
  background: rgba(255, 255, 255, 0.02);
  border-radius: 10px;
  margin-bottom: 8px;
  transition: all 0.3s ease;
}

.article-item:last-child {
  margin-bottom: 0;
}

.article-item:hover {
  background: rgba(0, 212, 255, 0.08);
  transform: translateX(4px);
}

.article-date {
  font-size: 0.8rem;
  color: var(--text-secondary);
  font-family: 'JetBrains Mono', monospace;
  white-space: nowrap;
}

.article-title {
  flex: 1;
  color: var(--text-primary);
  font-size: 0.95rem;
  transition: color 0.3s ease;
}

.article-title:hover {
  color: var(--primary);
}

.article-category {
  padding: 4px 10px;
  background: rgba(0, 212, 255, 0.1);
  border-radius: 6px;
  font-size: 0.75rem;
  color: var(--primary);
  white-space: nowrap;
}

.empty-state {
  text-align: center;
  padding: 60px 0;
  color: var(--text-secondary);
}

@media (max-width: 768px) {
  .timeline {
    padding-left: 44px;
  }
  
  .timeline::before {
    left: 17px;
  }
  
  .year-marker {
    left: -44px;
  }
  
  .year-dot {
    width: 14px;
    height: 14px;
  }
  
  .year-label {
    font-size: 1.2rem;
  }
  
  .year-content {
    padding: 20px;
  }
  
  .article-item {
    flex-wrap: wrap;
    gap: 8px;
  }
  
  .article-category {
    margin-left: auto;
  }
}
</style>