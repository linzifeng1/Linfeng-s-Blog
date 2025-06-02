<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import LinBackground from '@/components/MyDesignComponents/Lin-Background.vue'
import LinLoading from '@/components/NewMyDesignComponents/Lin-Loading.vue'
import LabelCard from './components/LabelCard.vue'
import LabelStats from './components/LabelStats.vue'

// 标签数据类型定义
interface Label {
  id: number
  name: string
  description: string
  count: number
  color: string
  category: 'tech' | 'life' | 'design' | 'thought' | 'other'
  createTime: string
  articles: Array<{
    id: number
    title: string
    date: string
  }>
}

interface StatsData {
  totalLabels: number
  totalArticles: number
  mostUsedLabel: string
  recentlyAdded: number
}

// 加载状态管理
const isLoading = ref(false)
const isEmpty = ref(false)
const isLoaded = ref(false)
const isError = ref(false)

// 响应式数据
const labels = ref<Label[]>([])
const stats = ref<StatsData>({
  totalLabels: 0,
  totalArticles: 0,
  mostUsedLabel: '',
  recentlyAdded: 0
})
const query = ref<{ page: number, size: number }>({
  page: 1,
  size: 12
})

// 模拟数据（实际项目中会从API获取）
const mockLabels: Label[] = [
  {
    id: 1,
    name: 'Vue.js',
    description: '现代化的渐进式JavaScript框架，用于构建用户界面和单页应用程序。',
    count: 15,
    color: '#4fc08d',
    category: 'tech',
    createTime: '2024-01-15',
    articles: [
      { id: 1, title: 'Vue 3 Composition API 深度解析', date: '2024-01-20' },
      { id: 2, title: 'Vue Router 4 新特性详解', date: '2024-01-18' },
      { id: 3, title: 'Pinia 状态管理最佳实践', date: '2024-01-16' }
    ]
  },
  {
    id: 2,
    name: 'TypeScript',
    description: 'JavaScript的超集，添加了静态类型定义，提高代码质量和开发效率。',
    count: 12,
    color: '#3178c6',
    category: 'tech',
    createTime: '2024-01-10',
    articles: [
      { id: 4, title: 'TypeScript 高级类型技巧', date: '2024-01-19' },
      { id: 5, title: '泛型在实际项目中的应用', date: '2024-01-17' }
    ]
  },
  {
    id: 3,
    name: '生活感悟',
    description: '记录生活中的点点滴滴，分享人生感悟和思考。',
    count: 8,
    color: '#10b981',
    category: 'life',
    createTime: '2024-01-05',
    articles: [
      { id: 6, title: '慢生活的艺术', date: '2024-01-21' },
      { id: 7, title: '时间管理的哲学思考', date: '2024-01-15' }
    ]
  },
  {
    id: 4,
    name: 'UI设计',
    description: '探索用户界面设计的原则、趋势和最佳实践。',
    count: 10,
    color: '#f59e0b',
    category: 'design',
    createTime: '2024-01-08',
    articles: [
      { id: 8, title: '现代化设计系统构建指南', date: '2024-01-22' },
      { id: 9, title: '色彩心理学在界面设计中的应用', date: '2024-01-14' }
    ]
  },
  {
    id: 5,
    name: '技术思考',
    description: '对技术发展趋势、架构设计和编程哲学的深度思考。',
    count: 6,
    color: '#8b5cf6',
    category: 'thought',
    createTime: '2024-01-12',
    articles: [
      { id: 10, title: '微前端架构的思考与实践', date: '2024-01-23' },
      { id: 11, title: '代码质量与团队协作', date: '2024-01-13' }
    ]
  },
  {
    id: 6,
    name: 'React',
    description: '用于构建用户界面的JavaScript库，组件化开发的典型代表。',
    count: 9,
    color: '#61dafb',
    category: 'tech',
    createTime: '2024-01-07',
    articles: [
      { id: 12, title: 'React Hooks 最佳实践', date: '2024-01-24' },
      { id: 13, title: 'React 18 并发特性详解', date: '2024-01-11' }
    ]
  }
]

const mockStats: StatsData = {
  totalLabels: 6,
  totalArticles: 60,
  mostUsedLabel: 'Vue.js',
  recentlyAdded: 2
}

// 获取标签数据
const loadLabels = async () => {
  try {
    // 模拟API调用延迟
    await new Promise(resolve => setTimeout(resolve, 800))
    
    // 实际项目中使用API调用
    // const res = await getData(query.value)
    // if (res == null) {
    //   isError.value = true
    //   return
    // }
    // const labelData = res.data || []
    
    // 使用模拟数据
    const labelData = mockLabels.slice((query.value.page - 1) * query.value.size, query.value.page * query.value.size)
    
    isLoading.value = false
    
    // 判断是否存在数据
    if (labelData.length === 0 && query.value.page === 1) {
      isEmpty.value = true
      return
    }
    
    if (labelData.length === 0 && query.value.page > 1) {
      isLoaded.value = true
      return
    }
    
    // 处理数据
    if (labels.value.length === 0) {
      labels.value = labelData
      stats.value = mockStats
    } else {
      labels.value.push(...labelData)
    }
    
    // 分页自增
    query.value.page++
  } catch (error) {
    isLoading.value = false
    isError.value = true
  }
}

// 滚动监听
const handleScroll = () => {
  if (isLoading.value || isLoaded.value || isError.value || isEmpty.value) return
  
  const scrollTop = window.pageYOffset || document.documentElement.scrollTop
  const windowHeight = window.innerHeight
  const documentHeight = document.documentElement.scrollHeight
  
  // 当滚动到距离底部 200px 时开始加载
  if (scrollTop + windowHeight >= documentHeight - 200) {
    isLoading.value = true
    loadLabels()
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
  isLoading.value = true
  loadLabels()
  window.addEventListener('scroll', debouncedScroll)
})

onUnmounted(() => {
  window.removeEventListener('scroll', debouncedScroll)
  if (scrollTimer) clearTimeout(scrollTimer)
})
</script>

<template>
  <div class="label-view">
    <!-- 背景组件 -->
    <LinBackground />
    
    <!-- 主要内容区域 -->
    <div class="content-container">
      <!-- 页面头部 -->
      <header class="page-header">
        <div class="header-content">
          <h1 class="page-title">标签管理</h1>
          <p class="page-subtitle">探索知识的分类与组织，发现内容的关联与价值</p>
        </div>
        <div class="header-decoration">
          <div class="decoration-circle circle-1"></div>
          <div class="decoration-circle circle-2"></div>
          <div class="decoration-circle circle-3"></div>
        </div>
      </header>
      
      <!-- 统计信息 -->
      <LabelStats v-if="!isEmpty && !isError" :stats="stats" />
      
      <!-- 标签列表 -->
      <div class="labels-grid" v-if="labels.length > 0">
        <LabelCard 
          v-for="(label, index) in labels" 
          :key="label.id"
          :label="label"
          :index="index"
        />
      </div>
      
      <!-- 加载状态 -->
      <LinLoading 
        :loading="isLoading"
        :no-data="isEmpty"
        :error="isError"
        :loaded="isLoaded"
        loading-text="正在加载标签数据..."
        empty-text="暂无标签数据"
        error-text="加载失败，请稍后重试"
        loaded-text="所有标签已加载完成"
      />
    </div>
  </div>
</template>

<style scoped lang="scss">
.label-view {
  min-height: 100vh;
  position: relative;
}

.content-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem 1rem;
  position: relative;
  z-index: 1;
}

.page-header {
  text-align: center;
  margin-bottom: 3rem;
  position: relative;
  
  .header-content {
    position: relative;
    z-index: 2;
    
    .page-title {
      font-size: 3rem;
      font-weight: 800;
      background: linear-gradient(135deg, #4da3ff 0%, #8b5cf6 100%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
      margin: 0 0 1rem 0;
      animation: titleFadeIn 1s ease-out;
    }
    
    .page-subtitle {
      font-size: 1.125rem;
      color: #64748b;
      margin: 0;
      max-width: 600px;
      margin: 0 auto;
      line-height: 1.6;
      animation: subtitleFadeIn 1s ease-out 0.2s both;
    }
  }
  
  .header-decoration {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: 1;
    
    .decoration-circle {
      position: absolute;
      border-radius: 50%;
      opacity: 0.1;
      
      &.circle-1 {
        width: 200px;
        height: 200px;
        background: linear-gradient(45deg, #4da3ff, #8b5cf6);
        top: -100px;
        left: -100px;
        animation: float 6s ease-in-out infinite;
      }
      
      &.circle-2 {
        width: 150px;
        height: 150px;
        background: linear-gradient(45deg, #10b981, #f59e0b);
        top: -75px;
        right: -200px;
        animation: float 8s ease-in-out infinite reverse;
      }
      
      &.circle-3 {
        width: 100px;
        height: 100px;
        background: linear-gradient(45deg, #f59e0b, #ef4444);
        bottom: -150px;
        left: -150px;
        animation: float 10s ease-in-out infinite;
      }
    }
  }
}

.labels-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(400px, 1fr));
  gap: 1.5rem;
  margin-bottom: 2rem;
}

// 响应式设计
@media (max-width: 768px) {
  .content-container {
    padding: 1rem;
  }
  
  .page-header .page-title {
    font-size: 2rem;
  }
  
  .labels-grid {
    grid-template-columns: 1fr;
    gap: 1rem;
  }
}

// 暗色模式适配
@media (prefers-color-scheme: dark) {
  .page-header {
    .page-subtitle {
      color: #94a3b8;
    }
  }
}
</style>