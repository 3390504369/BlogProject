<template>
  <div class="tag-page">
    <h1>{{ tagName }} - 标签文章</h1>
    <div class="articles">
      <article 
        v-for="article in tagArticles" 
        :key="article.id" 
        class="article-item"
      >
        <div class="article-meta">
          <span class="category">{{ article.category }}</span>
          <span class="date">{{ article.date }}</span>
        </div>
        <h2 class="article-title">
          <router-link :to="`/article/${article.id}`">{{ article.title }}</router-link>
        </h2>
        <p class="article-excerpt">{{ article.excerpt }}</p>
      </article>
    </div>
    <div v-if="tagArticles.length === 0" class="empty">
      <p>该标签暂无文章</p>
      <router-link to="/articles">返回文章列表</router-link>
    </div>
  </div>
</template>

<script setup>
import { computed, ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { articles } from '../data/articles'

const route = useRoute()
const tagName = ref('')

const tagArticles = computed(() => {
  return articles.filter(a => a.tags.includes(tagName.value))
    .sort((a, b) => new Date(b.date) - new Date(a.date))
})

onMounted(() => {
  tagName.value = route.params.name
})
</script>

<style scoped>
.tag-page {
  max-width: 800px;
  margin: 0 auto;
}

.tag-page h1 {
  font-size: 2rem;
  margin-bottom: 30px;
  padding-bottom: 15px;
  border-bottom: 2px solid rgba(0, 212, 255, 0.3);
}

.articles {
  display: flex;
  flex-direction: column;
  gap: 25px;
}

.article-item {
  background: rgba(255, 255, 255, 0.05);
  border-radius: 12px;
  padding: 24px;
  transition: transform 0.3s ease;
}

.article-item:hover {
  transform: translateX(8px);
}

.article-meta {
  display: flex;
  gap: 15px;
  margin-bottom: 10px;
}

.category {
  background: rgba(0, 212, 255, 0.2);
  color: #00d4ff;
  padding: 4px 12px;
  border-radius: 16px;
  font-size: 0.85rem;
}

.date {
  color: #888;
  font-size: 0.9rem;
}

.article-title {
  font-size: 1.3rem;
  margin-bottom: 10px;
}

.article-title a {
  color: #e8e8e8;
  transition: color 0.3s ease;
}

.article-title a:hover {
  color: #00d4ff;
}

.article-excerpt {
  color: #888;
  line-height: 1.6;
}

.empty {
  text-align: center;
  padding: 60px 0;
  color: #666;
}

.empty p {
  margin-bottom: 20px;
}
</style>