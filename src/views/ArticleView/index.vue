<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { getData } from '@/api/articleApi/index.ts'
import LinBackground from '@/components/MyDesignComponents/Lin-Background.vue'
import LinLoading from '@/components/NewMyDesignComponents/Lin-Loading.vue'
import AritcleItem from './components/ArticleItem.vue'
import { Vue3Lottie } from 'vue3-lottie'
import LoadingAnim from "@/assets/loading.json"
import ErrorAnim from "@/assets/error.json"
import EmptyAnim from "@/assets/empty.json"

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

// 新Lin-Loading的Props
const isLoading = ref(false)
const isEmpty = ref(false)
const isLoaded = ref(false)
const isError = ref(false)

// 响应式数据
const articles = ref<Article[]>([])
const query = ref<{ page: number, size: number }>({
    page: 1,
    size: 10
})

// 获取文章数据
const loadArticles = async () => {
    const res = await getData(query.value)
    isLoading.value = false
    // 1.判断数据是否获取成功
    if (res == null) {
        isError.value = true
        return
    }
    const articleData = res.data || []
    // 2.判断是否存在数据
    if (articleData.length === 0 && query.value.page === 1) {
        isEmpty.value = true
        return
    }

    if (articleData.length === 0 && query.value.page > 1) {
        isLoaded.value = true
        return
    }
    // 3.所有判断均通过开始处理数据
    if (articles.value.length === 0) {
        articles.value = articleData
    } else {
        articles.value.push(...articleData)
    }
    // 本次数据处理完毕 --- 分页自增1
    query.value.page++
}

// 滚动监听
const handleScroll = () => {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop
    const windowHeight = window.innerHeight
    const documentHeight = document.documentElement.scrollHeight

    // 当滚动到距离底部 200px 时开始加载
    if (scrollTop + windowHeight >= documentHeight - 200) {
        isLoading.value = true
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
    // 开始加载状态
    isLoading.value = true
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
    
    <!-- 新加载状态 -->
    <LinLoading :is-loading="isLoading" height="200px" :is-empty="isEmpty" :is-loaded="isLoaded"
        :is-error="isError">
        <template #loadingContent>
            <Vue3Lottie width="160px" height="120px" :animation-data="LoadingAnim"></Vue3Lottie>
            <span style="color: rgb(var(--color-text));">正在加载</span>
        </template>
        <template #errorContent>
            <Vue3Lottie width="160px" height="120px" :animation-data="ErrorAnim"></Vue3Lottie>
            <span style="color: rgb(var(--color-text));">数据加载失败</span>
        </template>
        <template #emptyContent>
            <Vue3Lottie width="160px" height="120px" :animation-data="EmptyAnim"></Vue3Lottie>
            <span style="color: rgb(var(--color-text));">没有找到任何内容</span>
        </template>
        <template #loadedContent>
            <span style="color: rgb(var(--color-text));">没有更多数据</span>
        </template>
    </LinLoading>
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
</style>