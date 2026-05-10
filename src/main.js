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

createApp(App).use(router).mount('#app')