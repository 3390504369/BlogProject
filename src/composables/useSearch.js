import { ref, watch } from 'vue'
import Fuse from 'fuse.js'
import { articles } from '../data/articles'

const fuse = new Fuse(articles, {
  keys: ['title', 'excerpt', 'tags', 'category'],
  threshold: 0.4,
  includeMatches: true
})

export function useSearch(queryRef) {
  const results = ref([])

  watch(queryRef, (newQuery) => {
    if (!newQuery || newQuery.trim() === '') {
      results.value = []
      return
    }
    results.value = fuse.search(newQuery)
  }, { immediate: true })

  return { results }
}