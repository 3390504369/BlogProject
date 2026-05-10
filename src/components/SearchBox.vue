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