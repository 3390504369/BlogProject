const t=[{id:1,title:"Vue 3 Composition API 入门指南",excerpt:"本文详细介绍 Vue 3 的 Composition API，包括 setup、ref、reactive 等核心概念...",content:`# Vue 3 Composition API 入门指南

## 什么是 Composition API

Composition API 是 Vue 3 引入的一组基于函数的 API，它允许我们使用函数来组织组件逻辑。

## 核心概念

### setup 函数

setup 是 Composition API 的入口函数，在组件创建之前执行。

\`\`\`javascript
import { ref } from 'vue'

export default {
  setup() {
    const count = ref(0)
    return { count }
  }
}
\`\`\`

### ref 和 reactive

- **ref**：用于创建响应式的基本类型数据
- **reactive**：用于创建响应式的对象

\`\`\`javascript
import { ref, reactive } from 'vue'

const name = ref('John')
const state = reactive({
  age: 25,
  isActive: true
})
\`\`\`

## 总结

Composition API 提供了更灵活的代码组织方式，特别适合处理复杂的组件逻辑。`,category:"前端开发",tags:["Vue","JavaScript","前端"],date:"2024-01-15",author:"作者"},{id:2,title:"TypeScript 高级类型技巧",excerpt:"深入探讨 TypeScript 的高级类型系统，包括泛型、条件类型、映射类型等...",content:`# TypeScript 高级类型技巧

## 泛型

泛型允许我们创建可重用的组件，同时保持类型安全。

\`\`\`typescript
function identity<T>(arg: T): T {
  return arg
}
\`\`\`

## 条件类型

条件类型允许我们根据类型关系选择类型。

\`\`\`typescript
type IsString<T> = T extends string ? true : false
\`\`\`

## 映射类型

映射类型可以基于旧类型创建新类型。

\`\`\`typescript
type Readonly<T> = {
  readonly [P in keyof T]: T[P]
}
\`\`\``,category:"前端开发",tags:["TypeScript","JavaScript"],date:"2024-01-12",author:"作者"},{id:3,title:"CSS Grid 布局完全指南",excerpt:"从基础到高级，全面掌握 CSS Grid 布局技术...",content:`# CSS Grid 布局完全指南

## 什么是 Grid 布局

CSS Grid 是一种二维布局系统，可以同时处理行和列。

## 基础用法

\`\`\`css
.container {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 20px;
}
\`\`\`

## 高级技巧

### 网格线命名

\`\`\`css
.container {
  grid-template-columns: [col-start] 1fr [col-end];
}
\`\`\``,category:"前端开发",tags:["CSS","布局"],date:"2024-01-10",author:"作者"},{id:4,title:"Node.js 性能优化实战",excerpt:"分享 Node.js 应用性能优化的实用技巧和最佳实践...",content:`# Node.js 性能优化实战

## 使用缓存

缓存是提升性能的有效手段。

\`\`\`javascript
const cache = new Map()

function getData(key) {
  if (cache.has(key)) {
    return cache.get(key)
  }
  const data = fetchData(key)
  cache.set(key, data)
  return data
}
\`\`\`

## 使用 Stream

对于大文件处理，使用 Stream 可以节省内存。`,category:"后端开发",tags:["Node.js","性能优化"],date:"2024-01-08",author:"作者"},{id:5,title:"Git 工作流最佳实践",excerpt:"介绍团队协作中常用的 Git 工作流，包括 Git Flow、GitHub Flow 等...",content:`# Git 工作流最佳实践

## Git Flow

Git Flow 是一种经典的工作流模式。

### 主要分支

- **main**：主分支
- **develop**：开发分支
- **feature**：功能分支
- **release**：发布分支
- **hotfix**：修复分支

## GitHub Flow

GitHub Flow 更加简化，适合持续部署。`,category:"开发工具",tags:["Git","版本控制"],date:"2024-01-05",author:"作者"},{id:6,title:"Docker 容器化部署指南",excerpt:"从零开始学习 Docker，掌握容器化部署的核心技能...",content:`# Docker 容器化部署指南

## Dockerfile 编写

\`\`\`dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY . .
EXPOSE 3000
CMD ["node", "server.js"]
\`\`\`

## Docker Compose

使用 Docker Compose 管理多容器应用。`,category:"DevOps",tags:["Docker","容器化"],date:"2024-01-03",author:"作者"}],e=[{name:"前端开发",count:3},{name:"后端开发",count:1},{name:"开发工具",count:1},{name:"DevOps",count:1}],o=[{name:"Vue",count:1},{name:"JavaScript",count:2},{name:"前端",count:1},{name:"TypeScript",count:1},{name:"CSS",count:1},{name:"布局",count:1},{name:"Node.js",count:1},{name:"性能优化",count:1},{name:"Git",count:1},{name:"版本控制",count:1},{name:"Docker",count:1},{name:"容器化",count:1}];export{t as a,e as c,o as t};
