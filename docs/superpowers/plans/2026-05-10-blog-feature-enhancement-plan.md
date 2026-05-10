# 博客系统功能增强实现计划

> **面向 AI 代理的工作者：** 必需子技能：使用 superpowers:subagent-driven-development（推荐）或 superpowers:executing-plans 逐任务实现此计划。步骤使用复选框（`- [ ]`）语法来跟踪进度。

**目标：** 为博客系统增加搜索、代码高亮、复制代码按钮、404页面

**架构：** 使用 Fuse.js 做客户端搜索，Prism.js 做代码高亮，Clipboard API 做复制功能，新增 NotFound 组件处理 404

**技术栈：** Vue 3, Fuse.js, Prism.js, Clipboard API

---

## 文件结构

| 文件 | 职责 |
|------|------|
| `src/views/NotFound.vue` | 404 页面组件 |
| `src/views/Search.vue` | 搜索结果页 |
| `src/components/SearchBox.vue` | 搜索输入框组件 |
| `src/composables/useSearch.js` | 搜索逻辑封装 |
| `src/router/index.js` | 添加 404 和 search 路由 |
| `src/main.js` | 引入 Prism.js |
| `src/style.css` | 添加 Prism 主题、404样式、复制按钮样式 |
| `src/views/ArticleDetail.vue` | 添加代码高亮调用和复制按钮逻辑 |

---

## 任务 1：创建 404 页面

**文件：**
- 创建：`src/views/NotFound.vue`
- 修改：`src/router/index.js`
- 修改：`src/style.css`

- [ ] **步骤 1：创建 NotFound.vue 组件**

```vue
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
```

- [ ] **步骤 2：在 router 中添加 404 路由**

```javascript
// 在路由数组末尾添加
{
  path: '/:pathMatch(.*)*',
  name: 'NotFound',
  component: () => import('../views/NotFound.vue')
}
```

- [ ] **步骤 3：验证 404 页面**

运行：`npm run dev`
访问：`http://localhost:5173/xxx-nonexistent`
预期：显示 404 页面

- [ ] **步骤 4：Commit**

```bash
git add src/views/NotFound.vue src/router/index.js
git commit -m "feat: add 404 not found page"
```

---

## 任务 2：集成 Prism.js 代码高亮

**文件：**
- 修改：`src/main.js`
- 修改：`src/style.css`
- 修改：`src/views/ArticleDetail.vue`

- [ ] **步骤 1：在 main.js 中引入 Prism.js**

```javascript
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import Prism from 'prismjs'
import 'prismjs/components/prism-javascript'
import 'prismjs/components/prism-css'
import 'prismjs/components/prism-json'
import 'prismjs/components/prism-bash'
import 'prismjs/components/prism-python'

window.Prism = Prism

createApp(App).use(router).mount('#app')
```

- [ ] **步骤 2：添加 Prism Tomorrow Night 主题样式**

```css
/* Prism.js Tomorrow Night Theme */
code[class*="language-"],
pre[class*="language-"] {
  color: #abb2bf;
  background: none;
  font-family: 'Fira Code', 'JetBrains Mono', Consolas, Monaco, monospace;
  font-size: 14px;
  text-align: left;
  white-space: pre;
  word-spacing: normal;
  word-break: normal;
  word-wrap: normal;
  line-height: 1.6;
  tab-size: 2;
  hyphens: none;
}

pre[class*="language-"] {
  padding: 1.2em 1.5em;
  margin: 1.5em 0;
  overflow: auto;
  border-radius: 8px;
  background: #1e1e2e;
  border: 1px solid rgba(255,255,255,0.1);
}

.token.comment,
.token.prolog,
.token.doctype,
.token.cdata {
  color: #5c6370;
  font-style: italic;
}

.token.punctuation { color: #abb2bf; }
.token.property,
.token.tag,
.token.boolean,
.token.number,
.token.constant,
.token.symbol,
.token.deleted { color: #e06c75; }

.token.selector,
.token.attr-name,
.token.string,
.token.char,
.token.builtin,
.token.inserted { color: #98c379; }

.token.operator,
.token.entity,
.token.url,
.language-css .token.string,
.style .token.string { color: #56b6c2; }

.token.atrule,
.token.attr-value,
.token.keyword { color: #c678dd; }

.token.function,
.token.class-name { color: #61afef; }

.token.regex,
.token.important,
.token.variable { color: #c678dd; }

.token.important,
.token.bold { font-weight: bold; }

.token.italic { font-style: italic; }

.token.entity { cursor: help; }
```

- [ ] **步骤 3：在 ArticleDetail.vue 中调用高亮函数**

在 `<script setup>` 中添加：

```javascript
import { computed, onMounted } from 'vue'

const renderContent = computed(() => {
  return article.value.content
})

onMounted(() => {
  if (window.Prism) {
    window.Prism.highlightAll()
  }
})
```

- [ ] **步骤 4：验证代码高亮**

运行：`npm run dev`
访问文章详情页，查看代码块
预期：代码有语法高亮，颜色为暗色主题

- [ ] **步骤 5：Commit**

```bash
git add src/main.js src/style.css src/views/ArticleDetail.vue
git commit -m "feat: integrate Prism.js for code highlighting"
```

---

## 任务 3：添加复制代码按钮

**文件：**
- 修改：`src/style.css`
- 修改：`src/views/ArticleDetail.vue`

- [ ] **步骤 1：添加复制按钮样式**

```css
/* Code Block Copy Button */
.code-block-wrapper {
  position: relative;
  margin: 1.5em 0;
}

.code-block-wrapper pre {
  margin: 0;
}

.copy-button {
  position: absolute;
  top: 12px;
  right: 12px;
  padding: 6px 12px;
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 4px;
  color: var(--text-secondary);
  font-size: 12px;
  cursor: pointer;
  opacity: 0;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  gap: 4px;
}

.code-block-wrapper:hover .copy-button {
  opacity: 1;
}

.copy-button:hover {
  background: rgba(255, 255, 255, 0.2);
  color: var(--text-primary);
}

.copy-button.copied {
  background: rgba(0, 212, 255, 0.3);
  border-color: var(--primary);
  color: var(--primary);
}

.copy-icon {
  font-size: 14px;
}
```

- [ ] **步骤 2：在 ArticleDetail.vue 中添加复制逻辑**

在 `<script setup>` 中添加：

```javascript
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
```

- [ ] **步骤 3：修改 ArticleDetail.vue 模板，包裹 code block**

将 article-content 中的 `<pre><code>` 包裹成：

```html
<div class="code-block-wrapper">
  <pre><code class="language-javascript">...</code></pre>
  <button class="copy-button" @click="copyCode">
    <span class="copy-icon">📋</span> 复制
  </button>
</div>
```

同时在渲染 content 时需要用正则替换添加 wrapper：

```javascript
const renderContent = computed(() => {
  let content = article.value.content
  content = content.replace(/<pre><code class="language-(\w+)">/g, 
    '<div class="code-block-wrapper"><pre><code class="language-$1">')
  content = content.replace(/<\/code><\/pre>/g, '</code></pre><button class="copy-button" @click="copyCode"><span class="copy-icon">📋</span> 复制</button></div>')
  return content
})
```

- [ ] **步骤 4：验证复制按钮**

运行：`npm run dev`
访问文章详情页，鼠标悬停在代码块上
预期：右上角显示"复制"按钮，点击后变为"已复制!"

- [ ] **步骤 5：Commit**

```bash
git add src/style.css src/views/ArticleDetail.vue
git commit -m "feat: add copy code button to code blocks"
```

---

## 任务 4：实现搜索功能

**文件：**
- 创建：`src/composables/useSearch.js`
- 创建：`src/components/SearchBox.vue`
- 创建：`src/views/Search.vue`
- 修改：`src/router/index.js`
- 修改：`src/App.vue` (Header 添加搜索框)

- [ ] **步骤 1：创建 useSearch.js**

```javascript
import { ref, computed } from 'vue'
import Fuse from 'fuse.js'
import { articles } from '../data/articles'

const fuse = new Fuse(articles, {
  keys: ['title', 'excerpt', 'tags', 'category'],
  threshold: 0.4,
  includeMatches: true
})

export function useSearch(query) {
  const results = computed(() => {
    if (!query.value || query.value.trim() === '') {
      return []
    }
    return fuse.search(query.value)
  })

  return { results }
}
```

- [ ] **步骤 2：创建 SearchBox.vue**

```vue
<template>
  <div class="search-box">
    <span class="search-icon">🔍</span>
    <input 
      type="text"
      v-model="searchQuery"
      placeholder="搜索文章..."
      @keyup.enter="handleSearch"
      class="search-input"
    />
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const searchQuery = ref('')

const handleSearch = () => {
  if (searchQuery.value.trim()) {
    router.push({ path: '/search', query: { q: searchQuery.value } })
  }
}
</script>

<style scoped>
.search-box {
  position: relative;
  display: flex;
  align-items: center;
}

.search-icon {
  position: absolute;
  left: 12px;
  font-size: 14px;
  opacity: 0.6;
}

.search-input {
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 20px;
  padding: 8px 16px 8px 36px;
  color: var(--text-primary);
  font-size: 14px;
  width: 200px;
  transition: all 0.3s ease;
}

.search-input:focus {
  outline: none;
  border-color: var(--primary);
  width: 260px;
  box-shadow: 0 0 20px rgba(0, 212, 255, 0.2);
}

.search-input::placeholder {
  color: var(--text-secondary);
}
</style>
```

- [ ] **步骤 3：创建 Search.vue**

```vue
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
```

- [ ] **步骤 4：在 router 中添加搜索路由**

```javascript
{
  path: '/search',
  name: 'Search',
  component: () => import('../views/Search.vue')
}
```

- [ ] **步骤 5：在 Header 添加搜索框**

在 App.vue 的 header 中添加 SearchBox 组件：

```vue
<script setup>
import SearchBox from './components/SearchBox.vue'
// ... existing code
</script>

<template>
  <!-- 在 nav 后面添加 -->
  <SearchBox />
</template>
```

- [ ] **步骤 6：安装 Fuse.js**

```bash
npm install fuse.js
```

- [ ] **步骤 7：验证搜索功能**

运行：`npm run dev`
在顶部搜索框输入 "Vue"
预期：跳转到搜索结果页，显示匹配文章

- [ ] **步骤 8：Commit**

```bash
git add src/composables/useSearch.js src/components/SearchBox.vue src/views/Search.vue src/router/index.js src/App.vue package.json
git commit -m "feat: add search functionality with Fuse.js"
```

---

## 验收标准检查

- [ ] 访问不存在的路由显示 404 页面
- [ ] 代码块有语法高亮，颜色与博客主题匹配
- [ ] 代码块右上角有复制按钮，点击可复制代码
- [ ] 搜索可匹配标题、摘要、标签、分类
- [ ] 搜索结果高亮匹配文字
