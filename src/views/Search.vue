<template>
  <div class="search-page">
    <div class="page-header">
      <div class="header-icon">🔍</div>
      <h1 class="page-title">搜索结果</h1>
      <p class="page-subtitle">关键词: "{{ keyword }}"，共 {{ results.length }} 个结果</p>
    </div>

    <div v-if="results.length > 0" class="search-results">
      <article 
        v-for="result in results" 
        :key="result.item.id"
        class="result-item"
      >
        <div class="article-meta">
          <span class="category-badge">{{ result.item.category }}</span>
          <span class="date">{{ result.item.date }}</span>
        </div>
        <h2 class="result-title">
          <router-link :to="`/article/${result.item.id}`">
            {{ result.item.title }}
          </router-link>
        </h2>
        <p class="result-excerpt" v-html="highlightMatch(result.item.excerpt)"></p>
        <div class="result-tags">
          <span v-for="tag in result.item.tags" :key="tag" class="tag">#{{ tag }}</span>
        </div>
      </article>
    </div>

    <div v-else class="empty-state">
      <div class="empty-icon">📭</div>
      <h2>未找到相关文章</h2>
      <p>试试其他关键词，或浏览全部文章</p>
      <router-link to="/articles" class="browse-link">浏览全部 →</router-link>
    </div>
  </div>
</template>

<script setup>
import { computed, ref } from 'vue'
import { useRoute } from 'vue-router'
import { useSearch } from '../composables/useSearch'

const route = useRoute()
const keyword = computed(() => route.query.q || '')
const query = ref(keyword.value)
const { results } = useSearch(query)

const highlightMatch = (text) => {
  if (!keyword.value) return text
  const regex = new RegExp(`(${keyword.value})`, 'gi')
  return text.replace(regex, '<mark class="highlight">$1</mark>')
}
</script>

<style scoped>
.search-page {
  padding: 40px 0;
  animation: fadeInUp 0.5s ease-out;
}

.page-header {
  text-align: center;
  margin-bottom: 50px;
}

.header-icon {
  font-size: 48px;
  margin-bottom: 20px;
}

.page-title {
  font-size: 36px;
  margin-bottom: 12px;
}

.page-subtitle {
  color: var(--text-secondary);
  font-size: 18px;
}

.search-results {
  display: flex;
  flex-direction: column;
  gap: 24px;
}

.result-item {
  padding: 24px;
  background: var(--glass-bg);
  border: 1px solid var(--glass-border);
  border-radius: 12px;
  transition: all 0.3s ease;
}

.result-item:hover {
  border-color: var(--border-glow);
  transform: translateX(8px);
}

.article-meta {
  display: flex;
  gap: 16px;
  margin-bottom: 12px;
}

.category-badge {
  background: linear-gradient(135deg, var(--primary), var(--secondary));
  padding: 4px 12px;
  border-radius: 20px;
  font-size: 12px;
  color: white;
}

.date {
  color: var(--text-secondary);
  font-size: 14px;
  display: flex;
  align-items: center;
}

.result-title a {
  font-size: 22px;
  color: var(--text-primary);
  margin-bottom: 12px;
  display: block;
}

.result-title a:hover {
  color: var(--primary);
}

.result-excerpt {
  color: var(--text-secondary);
  line-height: 1.6;
  margin-bottom: 16px;
}

:deep(.highlight) {
  background: rgba(0, 212, 255, 0.3);
  color: var(--primary);
  padding: 2px 4px;
  border-radius: 3px;
}

.result-tags {
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
}

.tag {
  font-size: 12px;
  color: var(--primary);
}

.empty-state {
  text-align: center;
  padding: 80px 0;
}

.empty-icon {
  font-size: 80px;
  margin-bottom: 24px;
}

.empty-state h2 {
  margin-bottom: 12px;
}

.empty-state p {
  color: var(--text-secondary);
  margin-bottom: 24px;
}

.browse-link {
  color: var(--primary);
  font-weight: 600;
}

@keyframes fadeInUp {
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
}
</style>