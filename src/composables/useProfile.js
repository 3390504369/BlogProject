// src/composables/useProfile.js
import { reactive, toRefs } from 'vue'
import { defaultProfile } from '../data/profile'

const STORAGE_KEY = 'blog-profile'

function loadProfile() {
  try {
    const stored = localStorage.getItem(STORAGE_KEY)
    if (stored) {
      return { ...defaultProfile, ...JSON.parse(stored) }
    }
  } catch (e) {
    // ignore parse errors
  }
  return { ...defaultProfile }
}

// Module-level state (singleton) so all consumers share the same reactive object
const profile = reactive(loadProfile())

function saveProfile() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(profile))
}

export function useProfile() {
  function updateProfile(partial) {
    Object.assign(profile, partial)
    saveProfile()
  }

  function resetProfile() {
    Object.assign(profile, defaultProfile)
    localStorage.removeItem(STORAGE_KEY)
  }

  return {
    profile,
    ...toRefs(profile),
    updateProfile,
    resetProfile
  }
}
