<template>
  <div class="home">
    <!-- Profile Header -->
    <section class="profile-card glass-card">
      <div class="profile-avatar">
        <img v-if="profile.avatar" :src="profile.avatar" alt="avatar" class="avatar-img" />
        <span v-else class="avatar-icon">◈</span>
      </div>
      <div class="profile-info">
        <h1 class="profile-name">{{ profile.name }}</h1>
        <p class="profile-title">{{ profile.title }}</p>
        <p class="profile-bio">{{ profile.bio }}</p>
      </div>
    </section>

    <!-- Section Header -->
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

    <!-- Main content: articles + sidebar -->
    <div class="home-content">
      <section class="featured-articles">
        <article
          v-for="(article, index) in latestArticles"
          :key="article.id"
          class="article-card glass-card"
          :class="index % 2 === 0 ? 'anim-left' : 'anim-right'"
          :style="{
            animationDelay: `${index * 0.12}s`,
            '--cat-primary': getCatColor(article.category).primary,
            '--cat-glow': getCatColor(article.category).glow
          }"
          @click="goToArticle(article.id)"
        >
          <div
            class="card-accent"
            :style="{ background: getCatColor(article.category).gradient }"
          ></div>
          <div class="card-body">
            <div class="card-meta">
              <span
                class="category-tag"
                :style="{ color: getCatColor(article.category).primary, background: getCatColor(article.category).bg, borderColor: getCatColor(article.category).primary + '33' }"
              >{{ article.category }}</span>
              <span class="date">{{ article.date }}</span>
            </div>
            <h3 class="article-title">{{ article.title }}</h3>
            <p class="article-excerpt">{{ article.excerpt }}</p>
            <div class="card-tags">
              <span
                v-for="(tag, ti) in article.tags.slice(0, 3)"
                :key="tag"
                class="tag"
                :style="{ borderColor: TECH_PALETTE[ti % TECH_PALETTE.length] + '33', background: TECH_PALETTE[ti % TECH_PALETTE.length] + '10' }"
              >
                <router-link
                  :to="`/tag/${tag}`"
                  @click.stop
                  :style="{ color: TECH_PALETTE[ti % TECH_PALETTE.length] }"
                >#{{ tag }}</router-link>
              </span>
            </div>
          </div>
        </article>
      </section>

      <!-- Sidebar — sticky -->
      <aside class="sidebar">
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

        <div class="widget tech-widget">
          <div class="widget-header">
            <span class="widget-icon">⬡</span>
            <h3>技术栈</h3>
          </div>
          <div class="tech-tags-sidebar">
            <router-link
              v-for="(tech, i) in profile.techStack"
              :key="tech"
              :to="`/search?q=${tech}`"
              class="tech-tag-sidebar"
              :style="{ color: TECH_PALETTE[i % TECH_PALETTE.length], borderColor: TECH_PALETTE[i % TECH_PALETTE.length] + '40', background: TECH_PALETTE[i % TECH_PALETTE.length] + '12' }"
            >{{ tech }}</router-link>
          </div>
        </div>

      </aside>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import { articles, categories, categoryColors, defaultCategoryColor } from '../data/articles'
import { useProfile } from '../composables/useProfile'

const TECH_PALETTE = ['#00dcff', '#7c3aed', '#00e676', '#ff9100', '#e040fb', '#ff6d00']

const router = useRouter()
const { profile } = useProfile()

const latestArticles = computed(() => {
  return [...articles].sort((a, b) => new Date(b.date) - new Date(a.date)).slice(0, 3)
})

function getCatColor(category) {
  return categoryColors[category] || defaultCategoryColor
}

function goToArticle(id) {
  router.push(`/article/${id}`)
}
</script>

<style scoped>
/* ===== Layout ===== */
.home {
  display: flex;
  flex-direction: column;
  gap: 40px;
}

.home-content {
  display: grid;
  grid-template-columns: 1fr 300px;
  gap: 40px;
  align-items: start;
}

/* ===== Profile Card ===== */
.profile-card {
  display: flex;
  align-items: center;
  gap: 28px;
  padding: 32px 36px;
  animation: fadeInUp 0.6s ease-out forwards;
}

.profile-avatar {
  width: 100px;
  height: 100px;
  border-radius: 50%;
  overflow: hidden;
  flex-shrink: 0;
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
  font-size: 2.5rem;
  color: var(--primary);
}

.profile-info {
  flex: 1;
  min-width: 0;
}

.profile-name {
  font-size: 1.8rem;
  font-weight: 700;
  margin-bottom: 4px;
  background: linear-gradient(135deg, var(--text-primary) 0%, var(--primary) 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.profile-title {
  color: var(--primary);
  font-size: 0.95rem;
  font-weight: 500;
  margin-bottom: 8px;
  font-family: 'JetBrains Mono', monospace;
}

.profile-bio {
  color: var(--text-secondary);
  font-size: 0.9rem;
  line-height: 1.6;
}

/* ===== Section Header ===== */
.section-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-bottom: 20px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.05);
}

[data-theme="light"] .section-header {
  border-bottom-color: rgba(0, 0, 0, 0.06);
}

.section-title-group {
  display: flex;
  align-items: baseline;
  gap: 16px;
}

.section-number {
  font-size: 0.8rem;
  font-family: 'JetBrains Mono', monospace;
  color: var(--primary);
  font-weight: 600;
  padding: 4px 10px;
  background: rgba(0, 220, 255, 0.1);
  border: 1px solid rgba(0, 220, 255, 0.2);
  border-radius: 6px;
}

.section-title {
  font-size: 1.6rem;
  font-weight: 700;
}

.section-link {
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 6px 14px;
  font-size: 0.8rem;
  font-family: 'JetBrains Mono', monospace;
  font-weight: 600;
  color: var(--primary);
  background: rgba(0, 220, 255, 0.1);
  border: 1px solid rgba(0, 220, 255, 0.2);
  border-radius: 6px;
  transition: all 0.3s ease;
}

.section-link:hover {
  color: var(--accent);
  background: rgba(0, 220, 255, 0.18);
  border-color: rgba(0, 220, 255, 0.4);
}

.section-link:hover .arrow {
  animation: arrowBounce 0.5s ease-in-out;
}

.arrow {
  transition: transform 0.3s ease;
}

/* ===== Article Cards ===== */
.featured-articles {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.article-card {
  display: flex;
  overflow: hidden;
  cursor: pointer;
  transition: all 0.35s cubic-bezier(0.4, 0, 0.2, 1);
  opacity: 0;
  animation-duration: 0.55s;
  animation-timing-function: ease-out;
  animation-fill-mode: forwards;
}

.article-card.anim-left {
  animation-name: fadeInLeft;
}

.article-card.anim-right {
  animation-name: fadeInRight;
}

.article-card:hover {
  transform: translateY(-4px);
  border-color: rgba(var(--cat-primary, 0, 220, 255), 0.45);
  box-shadow:
    0 16px 40px rgba(0, 0, 0, 0.3),
    0 0 60px var(--cat-glow, rgba(0, 220, 255, 0.15));
}

.article-card:hover .article-title {
  transform: translateX(4px);
}

.article-card:hover .tag {
  transform: scale(1.05);
}

.card-accent {
  width: 4px;
  flex-shrink: 0;
}

.card-body {
  padding: 20px 24px;
  flex: 1;
  min-width: 0;
}

.card-meta {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 10px;
  margin-bottom: 8px;
}

.category-tag {
  padding: 3px 10px;
  border-radius: 5px;
  font-size: 0.72rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  white-space: nowrap;
  border: 1px solid transparent;
}

.date {
  font-size: 0.8rem;
  color: var(--text-tertiary);
  font-family: 'JetBrains Mono', monospace;
}

.article-title {
  font-size: 1.1rem;
  font-weight: 600;
  margin-bottom: 6px;
  color: var(--text-primary);
  transition: transform 0.3s ease;
  line-height: 1.4;
}

.article-excerpt {
  color: var(--text-secondary);
  font-size: 0.85rem;
  line-height: 1.5;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  margin-bottom: 10px;
}

.card-tags {
  display: flex;
  gap: 8px;
  justify-content: flex-end;
}

.tag {
  padding: 3px 8px;
  border: 1px solid transparent;
  border-radius: 5px;
  font-size: 0.75rem;
  transition: transform 0.25s ease, border-color 0.25s ease;
  cursor: pointer;
}

.tag a {
  transition: color 0.25s ease;
}

.tag:hover {
  transform: scale(1.05);
  border-color: var(--primary);
}

.tag a:hover {
  filter: brightness(1.3);
}

/* ===== Sidebar ===== */
.sidebar {
  display: flex;
  flex-direction: column;
  gap: 20px;
  position: sticky;
  top: 100px;
}

.widget {
  background: var(--glass-bg);
  backdrop-filter: blur(20px);
  border: 1px solid var(--glass-border);
  border-radius: 16px;
  padding: 22px;
}

.widget-header {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 16px;
  padding-bottom: 12px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.05);
}

[data-theme="light"] .widget-header {
  border-bottom: 1px solid rgba(0, 0, 0, 0.05);
}

.widget-icon {
  color: var(--primary);
  font-size: 1rem;
}

.widget-header h3 {
  font-size: 1rem;
  font-weight: 600;
}

/* Categories */
.category-list {
  list-style: none;
}

.category-item {
  margin-bottom: 8px;
}

.category-link {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 9px 12px;
  background: var(--surface-bg);
  border-radius: 8px;
  color: var(--text-secondary);
  transition: all 0.3s ease;
}

.category-link:hover {
  background: rgba(0, 220, 255, 0.08);
  color: var(--primary);
  transform: translateX(4px);
}

.category-link:hover .category-count {
  animation: countPop 0.4s ease;
}

.category-count {
  padding: 2px 10px;
  background: rgba(0, 220, 255, 0.12);
  border-radius: 10px;
  font-size: 0.75rem;
  color: var(--primary);
  font-family: 'JetBrains Mono', monospace;
  font-weight: 600;
}

/* Tech stack sidebar */
.tech-tags-sidebar {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
}

.tech-tag-sidebar {
  padding: 4px 12px;
  border: 1px solid;
  border-radius: 4px;
  font-size: 0.72rem;
  font-family: 'JetBrains Mono', monospace;
  font-weight: 500;
  transition: all 0.3s ease;
}

.tech-tag-sidebar:hover {
  transform: translateY(-1px);
  filter: brightness(1.2);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
}

/* ===== Responsive ===== */
@media (min-width: 1200px) and (max-width: 1599px) {
  .home-content {
    grid-template-columns: 1fr 300px;
    gap: 40px;
  }
}

@media (min-width: 1600px) {
  .home-content {
    grid-template-columns: 1fr 320px;
    gap: 48px;
  }

  .profile-card {
    padding: 40px 48px;
  }
}

@media (max-width: 1199px) {
  .home-content {
    grid-template-columns: 1fr 240px;
    gap: 24px;
  }

  .card-body {
    padding: 16px 18px;
  }

  .article-title {
    font-size: 1rem;
  }

  .profile-card {
    padding: 24px 28px;
    gap: 20px;
  }

  .profile-avatar {
    width: 80px;
    height: 80px;
  }

  .profile-name {
    font-size: 1.5rem;
  }

  .profile-bio {
    font-size: 0.82rem;
  }
}

@media (max-width: 768px) {
  .home {
    gap: 24px;
  }

  .home-content {
    grid-template-columns: 1fr;
  }

  .sidebar {
    position: static;
    top: auto;
  }

  .profile-card {
    flex-direction: column;
    text-align: center;
    padding: 28px 20px;
  }

  .profile-avatar {
    width: 80px;
    height: 80px;
  }

  .profile-name {
    font-size: 1.4rem;
  }

  .section-title {
    font-size: 1.3rem;
  }

  .article-card {
    flex-direction: column;
  }

  .card-accent {
    width: 100%;
    height: 3px;
  }

  .card-body {
    padding: 16px;
  }
}
</style>
