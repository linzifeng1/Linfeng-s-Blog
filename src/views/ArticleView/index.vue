<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import LinLoading from '@/components/MyDesignComponents/Lin-Loading.vue'
import AritcleItem from './components/ArticleItem.vue'
import { getData } from '@/api/articleApi/index.ts'
import LinBackground from '@/components/MyDesignComponents/Lin-Background.vue'

// 文章数据类型定义
interface Article {
  id: number
  title: string
  content: string
  tags: string[]
  date: string
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

// 加载文章数据
const loadArticles = async () => {
  if (loading.value || !hasMore.value) return
  loading.value = true
  try {
    const res = await getData({ page: page.value, size: pageSize })
    const newArticles = res.data.data || []
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
    <!-- 添加背景组件 -->
    <LinBackground />
    <!-- 头部标题 -->
    <div class="header">
      <h1 class="title">全部文章</h1>
      <p class="subtitle">分享各种技术与开发经验</p>
    </div>

    <!-- 文章列表 -->
    <div class="article-list">
      <AritcleItem v-for="(article, index) in articles" :key="article.id" :article="article" :index="index" />
    </div>
    <!-- 加载状态和空状态部分保持不变 -->
    <LinLoading :is-loading="loading" :is-all-loaded="!hasMore && articles.length > 0" loading-height="200px">
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
  display: flex;
  flex-direction: column;
  max-width: 1200px;
  width: 100%;
  margin: 0 auto;
  background: rgb(var(--color-background));

  @media (max-width: 768px) {
    padding: 0 1rem;
  }
}

.header {
  display: flex;
  width: 100%;
  max-width: 1200px;
  padding: 2rem 0;
  margin: 0 auto;
  align-items: center;
  justify-content: space-between;
  animation: fadeInDown 0.8s ease-out;

  @media (max-width: 768px) {
    flex-direction: column;
    justify-content: center;
  }

  .title {
    font-size: 2.5rem;
    font-weight: 700;
    background: linear-gradient(135deg, $lin-c-primary, #9333ea);
    background-clip: text;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    animation: gradient-text 3s ease-in-out infinite;
  }

  .subtitle {
    display: block;
    font-size: 1.1rem;
    font-weight: 400;
    color: rgba(var(--color-text), 0.6);
    margin-top: 0.25rem;
    background: none;
    -webkit-text-fill-color: rgba(var(--color-text), 0.6);
  }
}

.article-list {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.loading {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 40px 20px;
  color: rgba(var(--color-text), 0.7);
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
</style>