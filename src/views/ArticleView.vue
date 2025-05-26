<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import LinLoading from '@/components/MyDesignComponents/Lin-Loading.vue'

// 文章数据类型定义
interface Article {
  id: number
  title: string
  content: string
  excerpt: string
  tags: string[]
  updateTime: string
  readCount: number
  commentCount: number
  likeCount: number
  author: string
}

// 响应式数据
const articles = ref<Article[]>([])
const loading = ref(false)
const hasMore = ref(true)
const page = ref(1)
const pageSize = 10

// 模拟文章数据
const mockArticles: Article[] = [
  {
    id: 1,
    title: "Vue 3 Composition API 深度解析",
    content: "Vue 3 带来了全新的 Composition API，它为我们提供了更灵活的组件逻辑组织方式。本文将深入探讨 Composition API 的设计理念、核心概念以及实际应用场景，帮助开发者更好地理解和使用这一强大的特性。",
    excerpt: "Vue 3 带来了全新的 Composition API，它为我们提供了更灵活的组件逻辑组织方式...",
    tags: ["Vue", "JavaScript", "前端开发"],
    updateTime: "2024-01-15",
    readCount: 1234,
    commentCount: 23,
    likeCount: 89,
    author: "林峰"
  },
  {
    id: 2,
    title: "TypeScript 进阶技巧与最佳实践",
    content: "TypeScript 作为 JavaScript 的超集，为前端开发带来了强类型系统的优势。本文将分享一些 TypeScript 的进阶技巧，包括泛型的高级用法、条件类型、映射类型等，以及在实际项目中的最佳实践。",
    excerpt: "TypeScript 作为 JavaScript 的超集，为前端开发带来了强类型系统的优势...",
    tags: ["TypeScript", "JavaScript", "类型系统"],
    updateTime: "2024-01-12",
    readCount: 987,
    commentCount: 15,
    likeCount: 67,
    author: "林峰"
  },
  {
    id: 3,
    title: "现代 CSS 布局技术全解析",
    content: "CSS 布局技术在不断发展，从传统的 float 布局到现代的 Grid 和 Flexbox，每一种技术都有其独特的优势和适用场景。本文将全面解析现代 CSS 布局技术，帮助开发者选择最适合的布局方案。",
    excerpt: "CSS 布局技术在不断发展，从传统的 float 布局到现代的 Grid 和 Flexbox...",
    tags: ["CSS", "布局", "前端开发"],
    updateTime: "2024-01-10",
    readCount: 756,
    commentCount: 12,
    likeCount: 45,
    author: "林峰"
  },
  {
    id: 4,
    title: "Node.js 性能优化实战指南",
    content: "Node.js 作为服务端 JavaScript 运行环境，其性能优化是开发者关注的重点。本文将从内存管理、事件循环、异步编程等多个角度，分享 Node.js 性能优化的实战经验和技巧。",
    excerpt: "Node.js 作为服务端 JavaScript 运行环境，其性能优化是开发者关注的重点...",
    tags: ["Node.js", "性能优化", "后端开发"],
    updateTime: "2024-01-08",
    readCount: 543,
    commentCount: 8,
    likeCount: 32,
    author: "林峰"
  },
  {
    id: 5,
    title: "微前端架构设计与实践",
    content: "微前端架构是近年来前端领域的热门话题，它将微服务的理念应用到前端开发中。本文将探讨微前端的核心概念、技术选型、架构设计以及在实际项目中的应用实践。",
    excerpt: "微前端架构是近年来前端领域的热门话题，它将微服务的理念应用到前端开发中...",
    tags: ["微前端", "架构设计", "前端工程化"],
    updateTime: "2024-01-05",
    readCount: 432,
    commentCount: 6,
    likeCount: 28,
    author: "林峰"
  },
  {
    id: 6,
    title: "React Hooks 深入理解与应用",
    content: "React Hooks 改变了我们编写 React 组件的方式，让函数组件拥有了状态管理和生命周期的能力。本文将深入解析常用 Hooks 的原理和用法，以及如何编写自定义 Hooks。",
    excerpt: "React Hooks 改变了我们编写 React 组件的方式，让函数组件拥有了状态管理和生命周期的能力...",
    tags: ["React", "Hooks", "前端开发"],
    updateTime: "2024-01-03",
    readCount: 678,
    commentCount: 14,
    likeCount: 52,
    author: "林峰"
  },
  {
    id: 7,
    title: "Webpack 5 新特性与配置优化",
    content: "Webpack 5 带来了许多令人兴奋的新特性，包括模块联邦、持久化缓存、Tree Shaking 优化等。本文将详细介绍这些新特性，并分享 Webpack 5 的配置优化技巧。",
    excerpt: "Webpack 5 带来了许多令人兴奋的新特性，包括模块联邦、持久化缓存、Tree Shaking 优化等...",
    tags: ["Webpack", "构建工具", "前端工程化"],
    updateTime: "2024-01-01",
    readCount: 345,
    commentCount: 5,
    likeCount: 21,
    author: "林峰"
  },
  {
    id: 8,
    title: "GraphQL 入门与实践",
    content: "GraphQL 是一种用于 API 的查询语言和运行时，它提供了一种更高效、强大和灵活的数据获取方式。本文将从基础概念开始，逐步介绍 GraphQL 的核心特性和实际应用。",
    excerpt: "GraphQL 是一种用于 API 的查询语言和运行时，它提供了一种更高效、强大和灵活的数据获取方式...",
    tags: ["GraphQL", "API", "后端开发"],
    updateTime: "2023-12-28",
    readCount: 234,
    commentCount: 3,
    likeCount: 15,
    author: "林峰"
  },
  {
    id: 9,
    title: "PWA 渐进式 Web 应用开发指南",
    content: "PWA（Progressive Web App）是一种新的 Web 应用开发模式，它结合了 Web 和原生应用的优势。本文将介绍 PWA 的核心技术，包括 Service Worker、Web App Manifest 等。",
    excerpt: "PWA（Progressive Web App）是一种新的 Web 应用开发模式，它结合了 Web 和原生应用的优势...",
    tags: ["PWA", "Web应用", "移动开发"],
    updateTime: "2023-12-25",
    readCount: 456,
    commentCount: 7,
    likeCount: 34,
    author: "林峰"
  },
  {
    id: 10,
    title: "Docker 容器化部署实战",
    content: "Docker 容器化技术已经成为现代应用部署的标准方案。本文将从 Docker 基础概念开始，介绍如何使用 Docker 进行应用的容器化部署，包括 Dockerfile 编写、镜像构建等。",
    excerpt: "Docker 容器化技术已经成为现代应用部署的标准方案...",
    tags: ["Docker", "容器化", "DevOps"],
    updateTime: "2023-12-22",
    readCount: 567,
    commentCount: 9,
    likeCount: 41,
    author: "林峰"
  },
  {
    id: 11,
    title: "Vue Router 4 路由管理最佳实践",
    content: "Vue Router 4 是 Vue 3 的官方路由管理器，它提供了更好的 TypeScript 支持和更灵活的路由配置。本文将分享 Vue Router 4 的最佳实践，包括路由守卫、懒加载、动态路由等。",
    excerpt: "Vue Router 4 是 Vue 3 的官方路由管理器，它提供了更好的 TypeScript 支持和更灵活的路由配置...",
    tags: ["Vue Router", "Vue", "前端路由"],
    updateTime: "2023-12-20",
    readCount: 389,
    commentCount: 6,
    likeCount: 27,
    author: "林峰"
  },
  {
    id: 12,
    title: "前端性能监控与优化策略",
    content: "前端性能直接影响用户体验，性能监控和优化是前端开发的重要环节。本文将介绍前端性能监控的指标体系、监控工具以及常见的性能优化策略和技巧。",
    excerpt: "前端性能直接影响用户体验，性能监控和优化是前端开发的重要环节...",
    tags: ["性能优化", "监控", "前端开发"],
    updateTime: "2023-12-18",
    readCount: 612,
    commentCount: 11,
    likeCount: 48,
    author: "林峰"
  }
]

// 模拟 API 请求
const fetchArticles = async (pageNum: number): Promise<Article[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const start = (pageNum - 1) * pageSize
      const end = start + pageSize
      const pageData = mockArticles.slice(start, end)
      resolve(pageData)
    }, 800) // 模拟网络延迟
  })
}

// 加载文章数据
const loadArticles = async () => {
  if (loading.value || !hasMore.value) return
  
  loading.value = true
  try {
    const newArticles = await fetchArticles(page.value)
    if (newArticles.length === 0) {
      hasMore.value = false
    } else {
      articles.value.push(...newArticles)
      page.value++
    }
  } catch (error) {
    console.error('加载文章失败:', error)
  } finally {
    loading.value = false
  }
}

// 滚动监听
const handleScroll = () => {
  const scrollTop = window.pageYOffset || document.documentElement.scrollTop
  const windowHeight = window.innerHeight
  const documentHeight = document.documentElement.scrollHeight
  
  // 当滚动到距离底部 200px 时开始加载
  if (scrollTop + windowHeight >= documentHeight - 200) {
    loadArticles()
  }
}

// 防抖处理
let scrollTimer: number | null = null
const debouncedScroll = () => {
  if (scrollTimer) clearTimeout(scrollTimer)
  scrollTimer = setTimeout(handleScroll, 100)
}

// 格式化数字
const formatNumber = (num: number): string => {
  if (num >= 1000) {
    return (num / 1000).toFixed(1) + 'k'
  }
  return num.toString()
}

// 生命周期
onMounted(() => {
  loadArticles()
  window.addEventListener('scroll', debouncedScroll)
})

onUnmounted(() => {
  window.removeEventListener('scroll', debouncedScroll)
  if (scrollTimer) clearTimeout(scrollTimer)
})
</script>

<template>
  <div class="article-view">
    <!-- 头部标题 -->
    <div class="header">
      <h1 class="title">全部文章</h1>
      <p class="subtitle">分享各种技术与开发经验</p>
    </div>

    <!-- 文章列表 -->
    <div class="article-list">
      <div 
        v-for="(article, index) in articles" 
        :key="article.id"
        class="article-card"
        :style="{ animationDelay: `${index * 0.1}s` }"
      >
        <!-- 文章内容 -->
        <div class="article-content">
          <!-- 标题 -->
          <h2 class="article-title">{{ article.title }}</h2>
          
          <!-- 摘要 -->
          <p class="article-excerpt">{{ article.excerpt }}</p>
          
          <!-- 标签 -->
          <div class="article-tags">
            <span 
              v-for="tag in article.tags" 
              :key="tag"
              class="tag"
            >
              {{ tag }}
            </span>
          </div>
          
          <!-- 元信息 -->
          <div class="article-meta">
            <div class="meta-left">
              <span class="author">{{ article.author }}</span>
              <span class="update-time">{{ article.updateTime }}</span>
            </div>
            <div class="meta-right">
              <div class="stat-item">
                <svg class="icon" viewBox="0 0 24 24">
                  <path d="M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5-5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z"/>
                </svg>
                <span>{{ formatNumber(article.readCount) }}</span>
              </div>
              <div class="stat-item">
                <svg class="icon" viewBox="0 0 24 24">
                  <path d="M21.99 4c0-1.1-.89-2-2-2H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h14l4 4-.01-18zM18 14H6v-2h12v2zm0-3H6V9h12v2zm0-3H6V6h12v2z"/>
                </svg>
                <span>{{ article.commentCount }}</span>
              </div>
              <div class="stat-item">
                <svg class="icon" viewBox="0 0 24 24">
                  <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
                </svg>
                <span>{{ article.likeCount }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 加载状态 - 使用 Lin-Loading 组件替换原有加载动画 -->
    <LinLoading :is-loading="loading" :is-all-loaded="!hasMore && articles.length > 0">
      <template #text>正在加载...</template>
      <template #allLoaded>没有更多文章了</template>
    </LinLoading>

    <!-- 空状态 -->
    <div v-if="!loading && articles.length === 0" class="empty-state">
      <div class="empty-icon">📝</div>
      <p>暂无文章</p>
    </div>
  </div>
</template>

<style scoped lang="scss">
.article-view {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
  padding-top: 6rem;
  background: rgb(var(--color-background));
  
  @media (max-width: 768px) {
    padding: 15px;
  }
}

.header {
  text-align: center;
  margin-bottom: 40px;
  animation: fadeInDown 0.8s ease-out;
  
  .title {
    font-size: 2.5rem;
    font-weight: 700;
    color: rgb(var(--color-text));
    margin-bottom: 10px;
    
    @media (max-width: 768px) {
      font-size: 2rem;
    }
  }
  
  .subtitle {
    font-size: 1.1rem;
    color: rgba(var(--color-text), 0.7);
    margin: 0;
  }
}

.article-list {
  display: flex;
  flex-direction: column;
  gap: 24px;
}

.article-card {
  background: rgb(var(--color-pure-background));
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 4px 12px rgba(var(--color-reverse-background), 0.08);
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  animation: fadeInUp 0.6s ease-out both;
  cursor: pointer;
  border: 1px solid rgba(var(--color-reverse-background), 0.1);
  
  &:hover {
    transform: translateY(-8px);
    box-shadow: 0 8px 24px rgba(var(--color-reverse-background), 0.12);
    
    .article-title {
      color: $lin-c-primary;
    }
  }
}

.article-content {
  padding: 24px;
  
  @media (max-width: 768px) {
    padding: 20px;
  }
}

.article-title {
  font-size: 1.5rem;
  font-weight: 600;
  color: rgb(var(--color-text));
  margin: 0 0 12px 0;
  line-height: 1.4;
  transition: color 0.3s ease;
  
  @media (max-width: 768px) {
    font-size: 1.3rem;
  }
}

.article-excerpt {
  font-size: 0.95rem;
  color: rgba(var(--color-text), 0.7);
  line-height: 1.6;
  margin: 0 0 16px 0;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.article-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-bottom: 16px;
}

.tag {
  display: inline-block;
  padding: 4px 12px;
  background: rgba($lin-c-primary, 0.1);
  color: $lin-c-primary;
  border-radius: 20px;
  font-size: 0.8rem;
  font-weight: 500;
  transition: all 0.3s ease;
  
  &:hover {
    transform: translateY(-2px);
    background: rgba($lin-c-primary, 0.2);
  }
}

.article-meta {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: 16px;
  border-top: 1px solid rgba(var(--color-reverse-background), 0.1);
  
  @media (max-width: 768px) {
    flex-direction: column;
    gap: 12px;
    align-items: flex-start;
  }
}

.meta-left {
  display: flex;
  align-items: center;
  gap: 12px;
  font-size: 0.85rem;
  color: rgba(var(--color-text), 0.6);
  
  .author {
    font-weight: 500;
    color: rgba(var(--color-text), 0.8);
  }
}

.meta-right {
  display: flex;
  align-items: center;
  gap: 16px;
}

.stat-item {
  display: flex;
  align-items: center;
  gap: 4px;
  font-size: 0.85rem;
  color: rgba(var(--color-text), 0.6);
  transition: color 0.3s ease;
  
  &:hover {
    color: $lin-c-primary;
  }
  
  .icon {
    width: 16px;
    height: 16px;
    fill: currentColor;
  }
}

.loading {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 40px 20px;
  color: rgba(var(--color-text), 0.7);
  
  .loading-spinner {
    width: 40px;
    height: 40px;
    border: 3px solid rgba(var(--color-text), 0.1);
    border-top: 3px solid $lin-c-primary;
    border-radius: 50%;
    animation: spin 1s linear infinite;
    margin-bottom: 16px;
  }
  
  p {
    margin: 0;
    font-size: 1rem;
  }
}

.empty-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 80px 20px;
  color: rgba(var(--color-text), 0.6);
  
  .empty-icon {
    font-size: 4rem;
    margin-bottom: 16px;
    opacity: 0.6;
  }
  
  p {
    margin: 0;
    font-size: 1.1rem;
    opacity: 0.8;
  }
}

// 动画定义
@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes fadeInDown {
  from {
    opacity: 0;
    transform: translateY(-30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

// 移除原有的 @keyframes spin 动画

@keyframes spin {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}

// 响应式优化
@media (max-width: 480px) {
  .article-view {
    padding: 10px;
  }
  
  .article-card {
    border-radius: 12px;
  }
  
  .article-content {
    padding: 16px;
  }
  
  .article-title {
    font-size: 1.2rem;
  }
  
  .meta-right {
    gap: 12px;
  }
}
</style>