<script setup lang="ts">
import { ref } from 'vue'
import LinBackground from '@/components/MyDesignComponents/Lin-Background.vue'
import LinTag from '@/components/MyDesignComponents/Lin-Tag.vue'

// 思考类型
interface Thought {
  id: number
  title: string
  content: string
  category: 'philosophy' | 'technology' | 'life' | 'design' | 'future'
  date: string
  readTime: number
  tags: string[]
  mood: 'deep' | 'curious' | 'inspired' | 'contemplative'
}

// 模拟思考数据
const thoughts = ref<Thought[]>([
  {
    id: 1,
    title: '关于代码的哲学思考',
    content: '代码不仅仅是指令的集合，它是思想的具象化表达。每一行代码都承载着开发者的逻辑思维和创造力。当我们编写代码时，我们实际上是在构建一个数字世界的规则体系...',
    category: 'philosophy',
    date: '2024-01-15',
    readTime: 5,
    tags: ['编程哲学', '思维模式', '创造力'],
    mood: 'deep'
  },
  {
    id: 2,
    title: '人工智能时代的思考',
    content: 'AI的快速发展让我们重新审视人类的价值。在机器能够完成越来越多任务的今天，人类的独特性在哪里？我认为答案在于我们的创造力、情感和对美的感知...',
    category: 'technology',
    date: '2024-01-12',
    readTime: 8,
    tags: ['人工智能', '未来', '人类价值'],
    mood: 'contemplative'
  },
  {
    id: 3,
    title: '简约设计的力量',
    content: '真正的简约不是减少，而是去除不必要的元素，让核心价值更加突出。在设计中，每一个元素都应该有其存在的理由，每一个决定都应该服务于用户体验...',
    category: 'design',
    date: '2024-01-10',
    readTime: 4,
    tags: ['设计哲学', '用户体验', '简约主义'],
    mood: 'inspired'
  },
  {
    id: 4,
    title: '时间的相对性',
    content: '在忙碌的工作中，时间似乎过得飞快；在等待的时候，时间又变得漫长。时间的感知是主观的，它与我们的注意力和情绪状态密切相关...',
    category: 'life',
    date: '2024-01-08',
    readTime: 6,
    tags: ['时间管理', '生活感悟', '心理学'],
    mood: 'curious'
  },
  {
    id: 5,
    title: '数字化生活的反思',
    content: '我们生活在一个高度数字化的时代，但这是否让我们更加快乐？技术应该是工具，而不是主人。我们需要在数字世界和现实世界之间找到平衡...',
    category: 'future',
    date: '2024-01-05',
    readTime: 7,
    tags: ['数字化', '生活方式', '平衡'],
    mood: 'contemplative'
  }
])

// 分类映射
const categoryMap = {
  philosophy: { name: '哲学', icon: '🤔', color: 'purple' },
  technology: { name: '科技', icon: '💻', color: 'blue' },
  life: { name: '生活', icon: '🌱', color: 'green' },
  design: { name: '设计', icon: '🎨', color: 'pink' },
  future: { name: '未来', icon: '🚀', color: 'orange' }
}

// 心情映射
const moodMap = {
  deep: { icon: '🌊', color: 'indigo' },
  curious: { icon: '🔍', color: 'yellow' },
  inspired: { icon: '✨', color: 'purple' },
  contemplative: { icon: '🧘', color: 'teal' }
}
</script>

<template>
  <div class="mind-view">
    <!-- 背景组件 -->
    <LinBackground />

    <!-- 头部区域 -->
    <header class="header">
      <div class="header-content">
        <h1 class="title">思考空间</h1>
        <p class="subtitle">记录思维的轨迹，探索内心的声音</p>
        <div class="quote">
          <span class="quote-text">"思考是人类最高贵的活动"</span>
          <span class="quote-author">— 亚里士多德</span>
        </div>
      </div>
    </header>

    <!-- 思考列表 -->
    <main class="thoughts-container">
      <div class="thoughts-timeline">
        <div 
          v-for="(thought, index) in thoughts" 
          :key="thought.id"
          class="thought-item"
          :style="{ '--index': index }"
        >
          <!-- 时间线节点 -->
          <div class="timeline-node">
            <div class="node-dot"></div>
            <div class="node-line"></div>
          </div>

          <!-- 思考卡片 -->
          <div class="thought-card">
            <div class="thought-header">
              <div class="thought-meta">
                <div class="category-badge">
                  <span class="category-icon">{{ categoryMap[thought.category].icon }}</span>
                  <span class="category-name">{{ categoryMap[thought.category].name }}</span>
                </div>
                <div class="mood-indicator">
                  <span class="mood-icon">{{ moodMap[thought.mood].icon }}</span>
                </div>
              </div>
              <div class="thought-date">{{ thought.date }}</div>
            </div>

            <h3 class="thought-title">{{ thought.title }}</h3>
            <p class="thought-content">{{ thought.content }}</p>

            <div class="thought-footer">
              <div class="thought-tags">
                <LinTag 
                  v-for="tag in thought.tags" 
                  :key="tag" 
                  :type="categoryMap[thought.category].color"
                  size="small"
                  :circle="true"
                >
                  {{ tag }}
                </LinTag>
              </div>
              <div class="read-time">
                <svg class="clock-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <circle cx="12" cy="12" r="10"></circle>
                  <polyline points="12,6 12,12 16,14"></polyline>
                </svg>
                <span>{{ thought.readTime }} 分钟阅读</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<style scoped lang="scss">
.mind-view {
  min-height: 100vh;
  position: relative;
  padding: 2rem 1rem;
}

.header {
  text-align: center;
  margin-bottom: 4rem;
  animation: mindHeaderFadeIn 1s ease-out;
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
  margin-bottom: 2rem;
  line-height: 1.6;
}

.quote {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  font-style: italic;
}

.quote-text {
  font-size: 1.1rem;
  color: rgba(var(--color-text), 0.8);
}

.quote-author {
  font-size: 0.9rem;
  color: rgba(var(--color-text), 0.6);
}

.thoughts-container {
  max-width: 900px;
  margin: 0 auto;
}

.thoughts-timeline {
  position: relative;
}

.thought-item {
  display: flex;
  margin-bottom: 3rem;
  animation: thoughtSlideIn 0.8s ease-out;
  animation-delay: calc(var(--index, 0) * 0.2s);
  animation-fill-mode: both;

  &:last-child {
    .node-line {
      display: none;
    }
  }
}

.timeline-node {
  position: relative;
  margin-right: 2rem;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.node-dot {
  width: 16px;
  height: 16px;
  background: linear-gradient(135deg, rgb(var(--color-primary)), rgb(var(--color-primary-light)));
  border-radius: 50%;
  border: 3px solid rgba(var(--color-bg), 1);
  box-shadow: 0 0 0 3px rgba(var(--color-primary), 0.2);
  animation: nodePulse 2s ease-in-out infinite;
}

.node-line {
  width: 2px;
  height: 100px;
  background: linear-gradient(to bottom, rgba(var(--color-primary), 0.3), rgba(var(--color-primary), 0.1));
  margin-top: 1rem;
}

.thought-card {
  flex: 1;
  background: rgba(var(--color-bg), 0.8);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(var(--color-primary), 0.1);
  border-radius: 20px;
  padding: 2rem;
  transition: all 0.3s ease;
  cursor: pointer;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 15px 40px rgba(var(--color-primary), 0.15);
    border-color: rgba(var(--color-primary), 0.3);
  }
}

.thought-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 1.5rem;
}

.thought-meta {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.category-badge {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  background: rgba(var(--color-primary), 0.1);
  padding: 0.5rem 1rem;
  border-radius: 50px;
  font-size: 0.875rem;
  font-weight: 500;
  color: rgb(var(--color-primary));
}

.category-icon {
  font-size: 1.1rem;
}

.mood-indicator {
  display: flex;
  align-items: center;
}

.mood-icon {
  font-size: 1.5rem;
  animation: moodFloat 3s ease-in-out infinite;
}

.thought-date {
  font-size: 0.875rem;
  color: rgba(var(--color-text), 0.6);
  font-weight: 500;
}

.thought-title {
  font-size: 1.5rem;
  font-weight: 700;
  color: rgb(var(--color-text));
  margin-bottom: 1rem;
  line-height: 1.3;
}

.thought-content {
  color: rgba(var(--color-text), 0.8);
  line-height: 1.7;
  margin-bottom: 1.5rem;
  font-size: 1rem;
}

.thought-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 1rem;
}

.thought-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.read-time {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.875rem;
  color: rgba(var(--color-text), 0.6);
}

.clock-icon {
  width: 1rem;
  height: 1rem;
}

// 响应式设计
@media (max-width: 768px) {
  .mind-view {
    padding: 1rem;
  }

  .title {
    font-size: 2.5rem;
  }

  .thought-item {
    flex-direction: column;
  }

  .timeline-node {
    margin-right: 0;
    margin-bottom: 1rem;
    flex-direction: row;
  }

  .node-line {
    width: 50px;
    height: 2px;
    margin-top: 0;
    margin-left: 1rem;
  }

  .thought-card {
    padding: 1.5rem;
  }

  .thought-footer {
    flex-direction: column;
    align-items: flex-start;
    gap: 1rem;
  }
}
</style>