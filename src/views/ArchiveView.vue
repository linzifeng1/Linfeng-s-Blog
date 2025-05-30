<script setup lang="ts">
import { ref, computed } from 'vue'
import LinBackground from '@/components/MyDesignComponents/Lin-Background.vue'
import LinTag from '@/components/MyDesignComponents/Lin-Tag.vue'

// 文章数据类型
interface Article {
  id: number
  title: string
  summary: string
  date: string
  category: string
  tags: string[]
  readCount: number
  wordCount: number
}

// 模拟归档数据
const articles = ref<Article[]>([
  {
    id: 1,
    title: 'Vue 3 Composition API 深度解析',
    summary: '详细介绍Vue 3 Composition API的使用方法和最佳实践',
    date: '2024-01-15',
    category: '前端开发',
    tags: ['Vue.js', 'JavaScript', 'Web开发'],
    readCount: 1250,
    wordCount: 3200
  },
  {
    id: 2,
    title: 'TypeScript 高级类型系统',
    summary: '探索TypeScript的高级类型特性，提升代码质量',
    date: '2024-01-12',
    category: '编程语言',
    tags: ['TypeScript', '类型系统', '编程'],
    readCount: 980,
    wordCount: 2800
  },
  {
    id: 3,
    title: '现代CSS布局技术',
    summary: 'Grid、Flexbox等现代CSS布局方法的实战应用',
    date: '2024-01-10',
    category: '前端开发',
    tags: ['CSS', '布局', '响应式'],
    readCount: 1100,
    wordCount: 2500
  },
  {
    id: 4,
    title: 'Node.js 性能优化实践',
    summary: '从多个维度优化Node.js应用的性能表现',
    date: '2024-01-08',
    category: '后端开发',
    tags: ['Node.js', '性能优化', '服务端'],
    readCount: 850,
    wordCount: 3500
  },
  {
    id: 5,
    title: '设计系统构建指南',
    summary: '如何构建一套完整的设计系统，提升团队协作效率',
    date: '2024-01-05',
    category: '设计',
    tags: ['设计系统', 'UI/UX', '团队协作'],
    readCount: 720,
    wordCount: 2200
  },
  {
    id: 6,
    title: 'React Hooks 最佳实践',
    summary: '深入理解React Hooks的工作原理和使用技巧',
    date: '2024-01-03',
    category: '前端开发',
    tags: ['React', 'Hooks', 'JavaScript'],
    readCount: 1350,
    wordCount: 2900
  },
  {
    id: 7,
    title: '微前端架构设计',
    summary: '探讨微前端架构的设计思路和实现方案',
    date: '2023-12-28',
    category: '架构设计',
    tags: ['微前端', '架构', '工程化'],
    readCount: 650,
    wordCount: 4100
  },
  {
    id: 8,
    title: 'Web安全防护策略',
    summary: '常见的Web安全威胁及其防护措施',
    date: '2023-12-25',
    category: '网络安全',
    tags: ['Web安全', '防护', '安全策略'],
    readCount: 890,
    wordCount: 3300
  }
])

// 按年份分组
const articlesByYear = computed(() => {
  const grouped = articles.value.reduce((acc, article) => {
    const year = new Date(article.date).getFullYear()
    if (!acc[year]) {
      acc[year] = []
    }
    acc[year].push(article)
    return acc
  }, {} as Record<number, Article[]>)
  
  // 按年份降序排列
  return Object.keys(grouped)
    .map(year => parseInt(year))
    .sort((a, b) => b - a)
    .map(year => ({
      year,
      articles: grouped[year].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    }))
})

// 统计数据
const totalArticles = computed(() => articles.value.length)
const totalReads = computed(() => articles.value.reduce((sum, article) => sum + article.readCount, 0))
const totalWords = computed(() => articles.value.reduce((sum, article) => sum + article.wordCount, 0))

// 格式化数字
const formatNumber = (num: number) => {
  if (num >= 1000) {
    return (num / 1000).toFixed(1) + 'k'
  }
  return num.toString()
}

// 格式化日期
const formatDate = (dateStr: string) => {
  const date = new Date(dateStr)
  return date.toLocaleDateString('zh-CN', {
    month: 'long',
    day: 'numeric'
  })
}
</script>

<template>
  <div class="archive-view">
    <!-- 背景组件 -->
    <LinBackground />

    <!-- 头部区域 -->
    <header class="header">
      <div class="header-content">
        <h1 class="title">文章归档</h1>
        <p class="subtitle">时间的足迹，知识的积淀</p>
        
        <!-- 统计信息 -->
        <div class="stats-grid">
          <div class="stat-card">
            <div class="stat-number">{{ totalArticles }}</div>
            <div class="stat-label">篇文章</div>
          </div>
          <div class="stat-card">
            <div class="stat-number">{{ formatNumber(totalReads) }}</div>
            <div class="stat-label">次阅读</div>
          </div>
          <div class="stat-card">
            <div class="stat-number">{{ formatNumber(totalWords) }}</div>
            <div class="stat-label">字数</div>
          </div>
        </div>
      </div>
    </header>

    <!-- 归档列表 -->
    <main class="archive-container">
      <div class="archive-timeline">
        <div 
          v-for="(yearGroup, yearIndex) in articlesByYear" 
          :key="yearGroup.year"
          class="year-section"
          :style="{ '--year-index': yearIndex }"
        >
          <!-- 年份标题 -->
          <div class="year-header">
            <h2 class="year-title">{{ yearGroup.year }}</h2>
            <span class="year-count">{{ yearGroup.articles.length }} 篇</span>
          </div>

          <!-- 文章列表 -->
          <div class="articles-list">
            <div 
              v-for="(article, articleIndex) in yearGroup.articles" 
              :key="article.id"
              class="article-item"
              :style="{ '--article-index': articleIndex }"
            >
              <!-- 时间线 -->
              <div class="timeline-marker">
                <div class="marker-dot"></div>
                <div class="marker-line"></div>
              </div>

              <!-- 文章卡片 -->
              <div class="article-card">
                <div class="article-header">
                  <div class="article-date">{{ formatDate(article.date) }}</div>
                  <LinTag :type="'primary'" size="small">{{ article.category }}</LinTag>
                </div>
                
                <h3 class="article-title">{{ article.title }}</h3>
                <p class="article-summary">{{ article.summary }}</p>
                
                <div class="article-footer">
                  <div class="article-tags">
                    <LinTag 
                      v-for="tag in article.tags" 
                      :key="tag" 
                      type="secondary"
                      size="small"
                      :circle="true"
                    >
                      {{ tag }}
                    </LinTag>
                  </div>
                  
                  <div class="article-meta">
                    <span class="meta-item">
                      <svg class="meta-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                        <circle cx="12" cy="12" r="3"></circle>
                      </svg>
                      {{ formatNumber(article.readCount) }}
                    </span>
                    <span class="meta-item">
                      <svg class="meta-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                        <polyline points="14,2 14,8 20,8"></polyline>
                        <line x1="16" y1="13" x2="8" y2="13"></line>
                        <line x1="16" y1="17" x2="8" y2="17"></line>
                        <polyline points="10,9 9,9 8,9"></polyline>
                      </svg>
                      {{ formatNumber(article.wordCount) }} 字
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<style scoped lang="scss">
.archive-view {
  min-height: 100vh;
  position: relative;
  padding: 2rem 1rem;
}

.header {
  text-align: center;
  margin-bottom: 4rem;
  animation: archiveHeaderSlide 1s ease-out;
}

.header-content {
  max-width: 800px;
  margin: 0 auto;
}

.title {
  font-size: 3.5rem;
  font-weight: 800;
  background: linear-gradient(135deg, rgb(var(--color-primary)), rgb(var(--color-primary-light)));
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  margin-bottom: 1rem;
  animation: gradient-text 3s ease-in-out infinite;
}

.subtitle {
  font-size: 1.3rem;
  color: rgba(var(--color-text), 0.7);
  margin-bottom: 3rem;
}

.stats-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 2rem;
  max-width: 600px;
  margin: 0 auto;
}

.stat-card {
  background: rgba(var(--color-bg), 0.8);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(var(--color-primary), 0.1);
  border-radius: 16px;
  padding: 1.5rem;
  text-align: center;
  transition: all 0.3s ease;
  animation: statCardFloat 0.8s ease-out;
  animation-delay: calc(var(--index, 0) * 0.1s);
  animation-fill-mode: both;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 10px 30px rgba(var(--color-primary), 0.15);
  }
}

.stat-number {
  font-size: 2.5rem;
  font-weight: 700;
  color: rgb(var(--color-primary));
  margin-bottom: 0.5rem;
}

.stat-label {
  font-size: 0.875rem;
  color: rgba(var(--color-text), 0.6);
  font-weight: 500;
}

.archive-container {
  max-width: 900px;
  margin: 0 auto;
}

.year-section {
  margin-bottom: 4rem;
  animation: yearSectionSlide 0.8s ease-out;
  animation-delay: calc(var(--year-index, 0) * 0.2s);
  animation-fill-mode: both;
}

.year-header {
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 2rem;
  padding-bottom: 1rem;
  border-bottom: 2px solid rgba(var(--color-primary), 0.1);
}

.year-title {
  font-size: 2.5rem;
  font-weight: 700;
  color: rgb(var(--color-primary));
  margin: 0;
}

.year-count {
  background: rgba(var(--color-primary), 0.1);
  color: rgb(var(--color-primary));
  padding: 0.5rem 1rem;
  border-radius: 50px;
  font-size: 0.875rem;
  font-weight: 600;
}

.articles-list {
  position: relative;
}

.article-item {
  display: flex;
  margin-bottom: 2rem;
  animation: articleSlideIn 0.6s ease-out;
  animation-delay: calc(var(--article-index, 0) * 0.1s);
  animation-fill-mode: both;

  &:last-child {
    .marker-line {
      display: none;
    }
  }
}

.timeline-marker {
  position: relative;
  margin-right: 2rem;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.marker-dot {
  width: 12px;
  height: 12px;
  background: rgb(var(--color-primary));
  border-radius: 50%;
  border: 3px solid rgba(var(--color-bg), 1);
  box-shadow: 0 0 0 2px rgba(var(--color-primary), 0.2);
}

.marker-line {
  width: 2px;
  height: 80px;
  background: linear-gradient(to bottom, rgba(var(--color-primary), 0.3), rgba(var(--color-primary), 0.1));
  margin-top: 1rem;
}

.article-card {
  flex: 1;
  background: rgba(var(--color-bg), 0.8);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(var(--color-primary), 0.1);
  border-radius: 16px;
  padding: 1.5rem;
  transition: all 0.3s ease;
  cursor: pointer;

  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 10px 25px rgba(var(--color-primary), 0.15);
    border-color: rgba(var(--color-primary), 0.3);
  }
}

.article-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
}

.article-date {
  font-size: 0.875rem;
  color: rgba(var(--color-text), 0.6);
  font-weight: 500;
}

.article-title {
  font-size: 1.25rem;
  font-weight: 600;
  color: rgb(var(--color-text));
  margin-bottom: 0.75rem;
  line-height: 1.4;
}

.article-summary {
  color: rgba(var(--color-text), 0.7);
  line-height: 1.6;
  margin-bottom: 1rem;
}

.article-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 1rem;
}

.article-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.article-meta {
  display: flex;
  gap: 1rem;
}

.meta-item {
  display: flex;
  align-items: center;
  gap: 0.25rem;
  font-size: 0.75rem;
  color: rgba(var(--color-text), 0.5);
}

.meta-icon {
  width: 0.875rem;
  height: 0.875rem;
}

// 响应式设计
@media (max-width: 768px) {
  .archive-view {
    padding: 1rem;
  }

  .title {
    font-size: 2.5rem;
  }

  .stats-grid {
    grid-template-columns: 1fr;
    gap: 1rem;
  }

  .article-item {
    flex-direction: column;
  }

  .timeline-marker {
    margin-right: 0;
    margin-bottom: 1rem;
    flex-direction: row;
  }

  .marker-line {
    width: 50px;
    height: 2px;
    margin-top: 0;
    margin-left: 1rem;
  }

  .article-footer {
    flex-direction: column;
    align-items: flex-start;
    gap: 1rem;
  }
}
</style>