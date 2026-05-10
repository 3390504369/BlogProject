<template>
  <div class="article-detail">
    <article v-if="article" class="article">
      <div class="article-glow"></div>
      <header class="article-header">
        <div class="header-meta">
          <span class="category-badge">{{ article.category }}</span>
          <span class="date">{{ article.date }}</span>
        </div>
        <h1 class="article-title">{{ article.title }}</h1>
        <div class="article-info">
          <div class="author">
            <span class="author-icon">◈</span>
            <span>{{ article.author }}</span>
          </div>
          <div class="reading-time">
            <span class="time-icon">�</span>
            <span>约 {{ readingTime }} 分钟阅读</span>
          </div>
        </div>
      </header>

      <div class="article-divider">
        <div class="divider-line"></div>
        <div class="divider-icon">◈</div>
        <div class="divider-line"></div>
      </div>

      <div class="article-content" v-html="renderContent"></div>

      <footer class="article-footer">
        <div class="tags-section">
          <span class="tags-label">标签</span>
          <div class="tags">
            <span 
              v-for="tag in article.tags" 
              :key="tag" 
              class="tag"
            >
              <router-link :to="`/tag/${tag}`">#{{ tag }}</router-link>
            </span>
          </div>
        </div>
      </footer>

      <nav class="article-nav">
        <div v-if="prevArticle" class="nav-item prev">
          <span class="nav-label">
            <span class="nav-arrow">←</span> 上一篇
          </span>
          <router-link :to="`/article/${prevArticle.id}`" class="nav-title">
            {{ prevArticle.title }}
          </router-link>
        </div>
        <div v-if="nextArticle" class="nav-item next">
          <span class="nav-label">
            下一篇 <span class="nav-arrow">→</span>
          </span>
          <router-link :to="`/article/${nextArticle.id}`" class="nav-title">
            {{ nextArticle.title }}
          </router-link>
        </div>
      </nav>
    </article>

    <div v-else class="not-found">
      <div class="not-found-icon">◈</div>
      <h2>文章未找到</h2>
      <router-link to="/articles" class="back-link">← 返回文章列表</router-link>
    </div>
  </div>
</template>

<script setup>
import { computed, ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { articles } from '../data/articles'

const route = useRoute()
const articleId = ref(parseInt(route.params.id))

const article = computed(() => {
  return articles.find(a => a.id === articleId.value)
})

const readingTime = computed(() => {
  if (!article.value) return 0
  const words = article.value.content.replace(/[#*`\n]/g, '').length
  return Math.ceil(words / 400)
})

const prevArticle = computed(() => {
  const sorted = [...articles].sort((a, b) => new Date(b.date) - new Date(a.date))
  const index = sorted.findIndex(a => a.id === articleId.value)
  if (index < sorted.length - 1) {
    return sorted[index + 1]
  }
  return null
})

const nextArticle = computed(() => {
  const sorted = [...articles].sort((a, b) => new Date(b.date) - new Date(a.date))
  const index = sorted.findIndex(a => a.id === articleId.value)
  if (index > 0) {
    return sorted[index - 1]
  }
  return null
})

const renderContent = computed(() => {
  if (!article.value) return ''
  let content = article.value.content
  
  content = content.replace(/^### (.+)$/gm, '<h3>$1</h3>')
  content = content.replace(/^## (.+)$/gm, '<h2>$1</h2>')
  content = content.replace(/^# (.+)$/gm, '<h1>$1</h1>')
  content = content.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
  content = content.replace(/`([^`]+)`/g, '<code>$1</code>')
  content = content.replace(/```(\w+)?\n([\s\S]*?)```/g, 
    '<div class="code-block-wrapper"><pre><code class="language-$1">$2</code></pre><button class="copy-button" @click="copyCode"><span class="copy-icon">📋</span> 复制</button></div>')
  content = content.replace(/\n\n/g, '</p><p>')
  content = '<p>' + content + '</p>'
  
  return content
})

const copyCode = async (e) => {
  const btn = e.currentTarget
  const wrapper = btn.closest('.code-block-wrapper')
  const code = wrapper.querySelector('code').textContent

  try {
    await navigator.clipboard.writeText(code)
    btn.classList.add('copied')
    btn.innerHTML = '<span class="copy-icon">✓</span> 已复制!'
    setTimeout(() => {
      btn.classList.remove('copied')
      btn.innerHTML = '<span class="copy-icon">📋</span> 复制'
    }, 2000)
  } catch (err) {
    console.error('复制失败:', err)
  }
}

onMounted(() => {
  window.scrollTo(0, 0)
  if (window.Prism) {
    window.Prism.highlightAll()
  }
})
</script>

<style scoped>
.article-detail {
  max-width: 800px;
  margin: 0 auto;
}

.article {
  position: relative;
}

.article-glow {
  position: absolute;
  top: -100px;
  left: 50%;
  transform: translateX(-50%);
  width: 500px;
  height: 300px;
  background: radial-gradient(ellipse, rgba(0, 212, 255, 0.1) 0%, transparent 70%);
  pointer-events: none;
}

.article-header {
  text-align: center;
  padding: 40px 0 50px;
}

.header-meta {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 16px;
  margin-bottom: 24px;
}

.category-badge {
  padding: 6px 14px;
  background: linear-gradient(135deg, var(--primary), var(--secondary));
  border-radius: 6px;
  font-size: 0.8rem;
  font-weight: 600;
  color: white;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.date {
  font-size: 0.9rem;
  color: var(--text-secondary);
  font-family: 'JetBrains Mono', monospace;
}

.article-title {
  font-size: 2.8rem;
  font-weight: 800;
  line-height: 1.3;
  margin-bottom: 24px;
  background: linear-gradient(135deg, var(--text-primary) 0%, var(--primary) 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.article-info {
  display: flex;
  justify-content: center;
  gap: 30px;
  color: var(--text-secondary);
  font-size: 0.9rem;
}

.author, .reading-time {
  display: flex;
  align-items: center;
  gap: 8px;
}

.author-icon {
  color: var(--secondary);
}

.time-icon {
  color: var(--primary);
}

.article-divider {
  display: flex;
  align-items: center;
  gap: 20px;
  margin: 40px 0;
}

.divider-line {
  flex: 1;
  height: 1px;
  background: linear-gradient(90deg, transparent, rgba(0, 212, 255, 0.3), transparent);
}

.divider-icon {
  color: var(--primary);
  font-size: 1.2rem;
}

.article-content {
  background: var(--glass-bg);
  backdrop-filter: blur(20px);
  border: 1px solid var(--glass-border);
  border-radius: 20px;
  padding: 50px;
  line-height: 1.9;
  font-size: 1.05rem;
}

:deep(.article-content h1) {
  font-size: 1.8rem;
  margin: 35px 0 20px;
  color: var(--primary);
  font-weight: 700;
}

:deep(.article-content h2) {
  font-size: 1.5rem;
  margin: 30px 0 18px;
  color: var(--text-primary);
  padding-bottom: 12px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
}

:deep(.article-content h3) {
  font-size: 1.25rem;
  margin: 25px 0 15px;
  color: var(--text-primary);
}

:deep(.article-content p) {
  margin-bottom: 18px;
  color: var(--text-secondary);
}

:deep(.article-content strong) {
  color: var(--primary);
  font-weight: 600;
}

:deep(.article-content code) {
  background: rgba(0, 212, 255, 0.12);
  padding: 4px 10px;
  border-radius: 6px;
  font-family: 'JetBrains Mono', 'Fira Code', monospace;
  color: var(--accent);
  font-size: 0.9em;
}

:deep(.article-content pre) {
  background: rgba(0, 0, 0, 0.4);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 12px;
  padding: 24px;
  overflow-x: auto;
  margin: 24px 0;
}

:deep(.article-content pre code) {
  background: none;
  padding: 0;
  color: #e8e8e8;
  font-size: 0.9rem;
  line-height: 1.7;
}

.article-footer {
  margin-top: 50px;
  padding: 30px;
  background: var(--glass-bg);
  backdrop-filter: blur(20px);
  border: 1px solid var(--glass-border);
  border-radius: 16px;
}

.tags-section {
  display: flex;
  align-items: center;
  gap: 16px;
}

.tags-label {
  color: var(--text-secondary);
  font-size: 0.9rem;
}

.tags {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
}

.tag {
  padding: 6px 14px;
  background: rgba(0, 212, 255, 0.1);
  border: 1px solid rgba(0, 212, 255, 0.2);
  border-radius: 8px;
  font-size: 0.85rem;
}

.tag a {
  color: var(--primary);
}

.tag a:hover {
  color: var(--accent);
}

.article-nav {
  display: flex;
  justify-content: space-between;
  margin-top: 40px;
  padding-top: 30px;
  border-top: 1px solid rgba(255, 255, 255, 0.05);
}

.nav-item {
  max-width: 45%;
}

.nav-label {
  display: flex;
  align-items: center;
  gap: 8px;
  color: var(--text-secondary);
  font-size: 0.85rem;
  margin-bottom: 8px;
}

.nav-arrow {
  color: var(--primary);
}

.nav-title {
  display: block;
  color: var(--text-primary);
  font-size: 1rem;
  font-weight: 500;
  transition: color 0.3s ease;
}

.nav-title:hover {
  color: var(--primary);
}

.nav-item.next {
  text-align: right;
}

.not-found {
  text-align: center;
  padding: 100px 0;
}

.not-found-icon {
  font-size: 4rem;
  color: var(--secondary);
  margin-bottom: 24px;
  opacity: 0.5;
}

.not-found h2 {
  font-size: 1.8rem;
  color: var(--text-secondary);
  margin-bottom: 20px;
}

.back-link {
  color: var(--primary);
  font-size: 1.1rem;
}

@media (max-width: 768px) {
  .article-title {
    font-size: 2rem;
  }
  
  .article-info {
    flex-direction: column;
    gap: 12px;
  }
  
  .article-content {
    padding: 28px;
  }
  
  :deep(.article-content h1) {
    font-size: 1.5rem;
  }
  
  :deep(.article-content h2) {
    font-size: 1.3rem;
  }
  
  .article-nav {
    flex-direction: column;
    gap: 24px;
  }
  
  .nav-item {
    max-width: 100%;
  }
  
  .nav-item.next {
    text-align: left;
  }
}
</style>