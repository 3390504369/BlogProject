<template>
  <div class="category-page">
    <h1>{{ categoryName }} - 分类文章</h1>
    <div class="articles">
      <article 
        v-for="article in categoryArticles" 
        :key="article.id" 
        class="article-item"
      >
        <div class="article-meta">
          <span class="date">{{ article.date }}</span>
        </div>
        <h2 class="article-title">
          <router-link :to="`/article/${article.id}`">{{ article.title }}</router-link>
        </h2>
        <p class="article-excerpt">{{ article.excerpt }}</p>
      </article>
    </div>
    <div v-if="categoryArticles.length === 0" class="empty">
      <p>该分类暂无文章</p>
      <router-link to="/articles">返回文章列表</router-link>
    </div>
  </div>
</template>

<script setup>
import { computed, ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { articles } from '../data/articles'

const route = useRoute()
const categoryName = ref('')

const categoryArticles = computed(() => {
  return articles.filter(a => a.category === categoryName.value)
    .sort((a, b) => new Date(b.date) - new Date(a.date))
})

onMounted(() => {
  categoryName.value = route.params.name
})
</script>

<style scoped>
.category-page {
  max-width: 800px;
  margin: 0 auto;
}

.category-page h1 {
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
  margin-bottom: 10px;
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