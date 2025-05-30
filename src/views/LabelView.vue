<script setup lang="ts">
import { ref, computed } from 'vue'
import LinBackground from '@/components/MyDesignComponents/Lin-Background.vue'
import LinTag from '@/components/MyDesignComponents/Lin-Tag.vue'

// 标签数据类型
interface TagData {
  id: number
  name: string
  count: number
  color: string
  description: string
}

// 模拟标签数据
const tags = ref<TagData[]>([
  { id: 1, name: 'Vue.js', count: 15, color: 'green', description: '现代前端框架' },
  { id: 2, name: 'TypeScript', count: 12, color: 'blue', description: '类型安全的JavaScript' },
  { id: 3, name: '前端开发', count: 20, color: 'purple', description: '用户界面开发技术' },
  { id: 4, name: 'Node.js', count: 8, color: 'emerald', description: '服务端JavaScript运行时' },
  { id: 5, name: '设计模式', count: 6, color: 'orange', description: '软件设计最佳实践' },
  { id: 6, name: 'CSS', count: 18, color: 'pink', description: '样式表语言' },
  { id: 7, name: 'JavaScript', count: 25, color: 'yellow', description: '动态编程语言' },
  { id: 8, name: 'React', count: 10, color: 'cyan', description: 'Facebook开发的UI库' },
  { id: 9, name: '算法', count: 7, color: 'red', description: '问题解决方法' },
  { id: 10, name: '数据结构', count: 5, color: 'indigo', description: '数据组织方式' },
  { id: 11, name: 'Git', count: 9, color: 'gray', description: '版本控制系统' },
  { id: 12, name: '性能优化', count: 4, color: 'teal', description: '提升应用性能' }
])

// 搜索关键词
const searchKeyword = ref('')

// 过滤后的标签
const filteredTags = computed(() => {
  if (!searchKeyword.value) return tags.value
  return tags.value.filter(tag => 
    tag.name.toLowerCase().includes(searchKeyword.value.toLowerCase()) ||
    tag.description.toLowerCase().includes(searchKeyword.value.toLowerCase())
  )
})

// 标签总数
const totalArticles = computed(() => {
  return tags.value.reduce((sum, tag) => sum + tag.count, 0)
})
</script>

<template>
  <div class="label-view">
    <!-- 背景组件 -->
    <LinBackground />

    <!-- 头部区域 -->
    <header class="header">
      <div class="header-content">
        <h1 class="title">标签云</h1>
        <p class="subtitle">探索知识的分类与连接</p>
        <div class="stats">
          <span class="stat-item">
            <span class="stat-number">{{ tags.length }}</span>
            <span class="stat-label">个标签</span>
          </span>
          <span class="stat-item">
            <span class="stat-number">{{ totalArticles }}</span>
            <span class="stat-label">篇文章</span>
          </span>
        </div>
      </div>
    </header>

    <!-- 搜索区域 -->
    <section class="search-section">
      <div class="search-container">
        <div class="search-box">
          <svg class="search-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <circle cx="11" cy="11" r="8"></circle>
            <path d="m21 21-4.35-4.35"></path>
          </svg>
          <input 
            v-model="searchKeyword" 
            type="text" 
            placeholder="搜索标签..."
            class="search-input"
          />
        </div>
      </div>
    </section>

    <!-- 标签网格 -->
    <main class="tags-container">
      <div class="tags-grid">
        <div 
          v-for="(tag, index) in filteredTags" 
          :key="tag.id"
          class="tag-card"
          :style="{ '--index': index }"
        >
          <div class="tag-content">
            <div class="tag-header">
              <LinTag :type="tag.color" size="large" class="tag-name">
                {{ tag.name }}
              </LinTag>
              <span class="tag-count">{{ tag.count }}</span>
            </div>
            <p class="tag-description">{{ tag.description }}</p>
            <div class="tag-progress">
              <div 
                class="tag-progress-bar" 
                :style="{ width: `${(tag.count / Math.max(...tags.map(t => t.count))) * 100}%` }"
              ></div>
            </div>
          </div>
        </div>
      </div>

      <!-- 空状态 -->
      <div v-if="filteredTags.length === 0" class="empty-state">
        <div class="empty-icon">🏷️</div>
        <h3 class="empty-title">没有找到相关标签</h3>
        <p class="empty-text">尝试使用其他关键词搜索</p>
      </div>
    </main>
  </div>
</template>

<style scoped lang="scss">
.label-view {
  min-height: 100vh;
  position: relative;
  padding: 2rem 1rem;
}

.header {
  text-align: center;
  margin-bottom: 3rem;
  animation: slideInFromTop 0.8s ease-out;
}

.header-content {
  max-width: 600px;
  margin: 0 auto;
}

.title {
  font-size: 3rem;
  font-weight: 800;
  background: linear-gradient(135deg, rgb(var(--color-primary)), rgb(var(--color-primary-light)));
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  margin-bottom: 1rem;
  animation: gradient-text 3s ease-in-out infinite;
}

.subtitle {
  font-size: 1.2rem;
  color: rgba(var(--color-text), 0.7);
  margin-bottom: 2rem;
}

.stats {
  display: flex;
  justify-content: center;
  gap: 2rem;
}

.stat-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.25rem;
}

.stat-number {
  font-size: 2rem;
  font-weight: 700;
  color: rgb(var(--color-primary));
}

.stat-label {
  font-size: 0.875rem;
  color: rgba(var(--color-text), 0.6);
}

.search-section {
  margin-bottom: 3rem;
  animation: slideInFromBottom 0.8s ease-out 0.2s both;
}

.search-container {
  max-width: 500px;
  margin: 0 auto;
}

.search-box {
  position: relative;
  display: flex;
  align-items: center;
}

.search-icon {
  position: absolute;
  left: 1rem;
  width: 1.25rem;
  height: 1.25rem;
  color: rgba(var(--color-text), 0.5);
  z-index: 2;
}

.search-input {
  width: 100%;
  padding: 1rem 1rem 1rem 3rem;
  border: 2px solid rgba(var(--color-primary), 0.2);
  border-radius: 50px;
  background: rgba(var(--color-bg), 0.8);
  backdrop-filter: blur(10px);
  color: rgb(var(--color-text));
  font-size: 1rem;
  transition: all 0.3s ease;

  &:focus {
    outline: none;
    border-color: rgb(var(--color-primary));
    box-shadow: 0 0 0 3px rgba(var(--color-primary), 0.1);
  }

  &::placeholder {
    color: rgba(var(--color-text), 0.5);
  }
}

.tags-container {
  max-width: 1200px;
  margin: 0 auto;
}

.tags-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 1.5rem;
}

.tag-card {
  background: rgba(var(--color-bg), 0.8);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(var(--color-primary), 0.1);
  border-radius: 16px;
  padding: 1.5rem;
  transition: all 0.3s ease;
  cursor: pointer;
  animation: tagCardSlideIn 0.6s ease-out;
  animation-delay: calc(var(--index, 0) * 0.1s);
  animation-fill-mode: both;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 10px 30px rgba(var(--color-primary), 0.15);
    border-color: rgba(var(--color-primary), 0.3);
  }
}

.tag-content {
  height: 100%;
  display: flex;
  flex-direction: column;
}

.tag-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
}

.tag-name {
  font-weight: 600;
}

.tag-count {
  background: rgba(var(--color-primary), 0.1);
  color: rgb(var(--color-primary));
  padding: 0.25rem 0.75rem;
  border-radius: 50px;
  font-size: 0.875rem;
  font-weight: 600;
}

.tag-description {
  color: rgba(var(--color-text), 0.7);
  line-height: 1.5;
  margin-bottom: 1rem;
  flex: 1;
}

.tag-progress {
  height: 4px;
  background: rgba(var(--color-primary), 0.1);
  border-radius: 2px;
  overflow: hidden;
}

.tag-progress-bar {
  height: 100%;
  background: linear-gradient(90deg, rgb(var(--color-primary)), rgb(var(--color-primary-light)));
  border-radius: 2px;
  transition: width 0.8s ease;
  animation: progressGrow 1s ease-out 0.5s both;
}

.empty-state {
  text-align: center;
  padding: 4rem 2rem;
  animation: fadeIn 0.6s ease-out;
}

.empty-icon {
  font-size: 4rem;
  margin-bottom: 1rem;
}

.empty-title {
  font-size: 1.5rem;
  font-weight: 600;
  color: rgb(var(--color-text));
  margin-bottom: 0.5rem;
}

.empty-text {
  color: rgba(var(--color-text), 0.6);
}

// 响应式设计
@media (max-width: 768px) {
  .label-view {
    padding: 1rem;
  }

  .title {
    font-size: 2.5rem;
  }

  .stats {
    gap: 1rem;
  }

  .tags-grid {
    grid-template-columns: 1fr;
    gap: 1rem;
  }
}
</style>