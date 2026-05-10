<template>
  <div class="admin">
    <div class="page-header">
      <h1 class="page-title">后台管理</h1>
      <p class="page-subtitle">博客数据统计</p>
    </div>

    <!-- 概览卡片 -->
    <div class="stats-grid">
      <div class="stat-card">
        <div class="stat-icon articles-icon">☰</div>
        <div class="stat-info">
          <span class="stat-value">{{ totalArticles }}</span>
          <span class="stat-label">文章总数</span>
        </div>
      </div>
      <div class="stat-card">
        <div class="stat-icon categories-icon">◈</div>
        <div class="stat-info">
          <span class="stat-value">{{ categories.length }}</span>
          <span class="stat-label">分类总数</span>
        </div>
      </div>
      <div class="stat-card">
        <div class="stat-icon tags-icon">#</div>
        <div class="stat-info">
          <span class="stat-value">{{ tags.length }}</span>
          <span class="stat-label">标签总数</span>
        </div>
      </div>
    </div>

    <!-- 分类分布 -->
    <div class="data-section">
      <div class="section-header"><h2>分类分布</h2></div>
      <div class="data-table">
        <div class="table-row table-header">
          <span class="col-name">分类名称</span>
          <span class="col-count">文章数</span>
          <span class="col-bar">占比</span>
        </div>
        <div v-for="cat in categories" :key="cat.name" class="table-row">
          <span class="col-name">{{ cat.name }}</span>
          <span class="col-count">{{ cat.count }}</span>
          <span class="col-bar">
            <span class="bar-fill" :style="{ width: (cat.count / maxCategoryCount * 100) + '%' }"></span>
          </span>
        </div>
      </div>
    </div>

    <!-- 标签列表 -->
    <div class="data-section">
      <div class="section-header"><h2>标签列表</h2></div>
      <div class="tag-grid">
        <span v-for="tag in tags" :key="tag.name" class="admin-tag">
          <span class="tag-name">#{{ tag.name }}</span>
          <span class="tag-count">{{ tag.count }} 篇</span>
        </span>
      </div>
      <p v-if="tags.length === 0" class="empty-note">暂无标签</p>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { articles, categories, tags } from '../data/articles'

const totalArticles = computed(() => articles.length)

const maxCategoryCount = computed(() => {
  return Math.max(...categories.map(c => c.count), 1)
})
</script>

<style scoped>
.admin {
  max-width: 800px;
  margin: 0 auto;
}

.page-header {
  text-align: center;
  padding: 40px 0;
}

.page-title {
  font-size: 2rem;
  font-weight: 800;
  margin-bottom: 8px;
  background: linear-gradient(135deg, var(--text-primary) 0%, var(--primary) 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.page-subtitle {
  color: var(--text-secondary);
  font-size: 1rem;
}

/* Stats Grid */
.stats-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
  margin-bottom: 32px;
}

.stat-card {
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 24px;
  background: var(--glass-bg);
  backdrop-filter: blur(20px);
  border: 1px solid var(--glass-border);
  border-radius: 16px;
  transition: all 0.3s ease;
}

.stat-card:hover {
  border-color: rgba(0, 212, 255, 0.3);
  transform: translateY(-2px);
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.2);
}

.stat-icon {
  width: 50px;
  height: 50px;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.4rem;
  flex-shrink: 0;
}

.articles-icon {
  background: linear-gradient(135deg, #00d4ff, #0099cc);
  color: white;
}

.categories-icon {
  background: linear-gradient(135deg, #7c3aed, #a855f7);
  color: white;
}

.tags-icon {
  background: linear-gradient(135deg, #f59e0b, #ef4444);
  color: white;
}

.stat-info {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.stat-value {
  font-size: 1.8rem;
  font-weight: 700;
  color: var(--text-primary);
  font-family: 'JetBrains Mono', monospace;
  line-height: 1;
}

.stat-label {
  font-size: 0.85rem;
  color: var(--text-secondary);
}

/* Data Section */
.data-section {
  background: var(--glass-bg);
  backdrop-filter: blur(20px);
  border: 1px solid var(--glass-border);
  border-radius: 20px;
  padding: 28px;
  margin-bottom: 28px;
}

.section-header {
  margin-bottom: 20px;
  padding-bottom: 14px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.05);
}

.section-header h2 {
  font-size: 1.15rem;
  font-weight: 600;
}

/* Data Table */
.data-table {
  display: grid;
  grid-template-columns: 1fr 80px 1fr;
  gap: 0;
}

.table-row {
  display: contents;
}

.table-header {
  font-size: 0.8rem;
  font-weight: 600;
  color: var(--text-secondary);
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.table-row:not(.table-header) .col-name,
.table-row:not(.table-header) .col-count {
  padding-top: 12px;
  padding-bottom: 12px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.04);
}

.table-row:not(.table-header) .col-name {
  font-size: 0.95rem;
  color: var(--text-primary);
}

.table-row:not(.table-header) .col-count {
  font-size: 0.9rem;
  color: var(--text-secondary);
  font-family: 'JetBrains Mono', monospace;
  text-align: center;
}

.col-bar {
  display: flex;
  align-items: center;
  padding-top: 12px;
  padding-bottom: 12px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.04);
}

.bar-fill {
  height: 10px;
  background: linear-gradient(90deg, var(--primary), var(--secondary));
  border-radius: 5px;
  min-width: 4px;
  transition: width 0.6s ease;
  box-shadow: 0 0 10px rgba(0, 212, 255, 0.3);
}

/* Tag Grid */
.tag-grid {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
}

.admin-tag {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 10px 16px;
  background: var(--glass-bg);
  backdrop-filter: blur(20px);
  border: 1px solid var(--glass-border);
  border-radius: 10px;
  transition: all 0.3s ease;
  cursor: default;
}

.admin-tag:hover {
  border-color: rgba(0, 212, 255, 0.4);
  box-shadow: 0 0 20px rgba(0, 212, 255, 0.15), 0 0 40px rgba(124, 58, 237, 0.1);
  transform: translateY(-2px);
}

.tag-name {
  font-size: 0.85rem;
  font-weight: 500;
  color: var(--primary);
}

.tag-count {
  font-size: 0.75rem;
  color: var(--text-secondary);
  font-family: 'JetBrains Mono', monospace;
}

.empty-note {
  color: var(--text-secondary);
  font-size: 0.9rem;
  opacity: 0.6;
  text-align: center;
  padding: 20px 0;
}

/* Responsive */
@media (max-width: 768px) {
  .stats-grid {
    grid-template-columns: 1fr;
    gap: 14px;
  }

  .page-title {
    font-size: 1.6rem;
  }

  .data-table {
    grid-template-columns: 1fr 60px 1fr;
  }

  .data-section {
    padding: 20px;
  }
}
</style>
