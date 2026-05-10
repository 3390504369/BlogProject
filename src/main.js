import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import './style.css'
import Prism from 'prismjs'
import 'prismjs/components/prism-javascript'
import 'prismjs/components/prism-css'
import 'prismjs/components/prism-json'
import 'prismjs/components/prism-bash'
import 'prismjs/components/prism-python'

window.Prism = Prism

// Initialize theme on startup
const savedTheme = localStorage.getItem('blog-theme') || 'dark'
document.documentElement.setAttribute('data-theme', savedTheme)

createApp(App).use(router).mount('#app')