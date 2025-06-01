<script setup lang="ts">
import LinTag from '@/components/MyDesignComponents/Lin-Tag.vue'

// 笔记数据类型定义（移除了color和isPinned属性）
interface Note {
  id: number
  title: string
  content: string
  tags: string[]
  date: string
  mood: 'happy' | 'sad' | 'excited' | 'calm' | 'thoughtful'
}

interface Props {
  note: Note
  index: number
  animationIndex?: number
}

withDefaults(defineProps<Props>(), {
  animationIndex: 0
})

// 心情图标映射
const moodIcons = {
  happy: '😊',
  sad: '😢',
  excited: '🤩',
  calm: '😌',
  thoughtful: '🤔'
}

// 根据心情生成渐变色
const getMoodGradient = (mood: string) => {
  const gradients = {
    happy: 'from-yellow-400 to-orange-500',
    sad: 'from-blue-400 to-indigo-500',
    excited: 'from-pink-400 to-red-500',
    calm: 'from-green-400 to-teal-500',
    thoughtful: 'from-purple-400 to-blue-500'
  }
  return gradients[mood as keyof typeof gradients] || 'from-gray-400 to-gray-500'
}
</script>

<template>
  <div class="note-card" :style="{ '--animation-index': animationIndex }">
    <!-- 渐变背景 -->
    <div class="note-bg" :class="`bg-gradient-to-br ${getMoodGradient(note.mood)}`"></div>

    <!-- 笔记内容 -->
    <div class="note-content">
      <div class="note-header">
        <h3 class="note-title">{{ note.title }}</h3>
        <div class="note-mood">
          <span class="mood-icon">{{ moodIcons[note.mood] }}</span>
        </div>
      </div>

      <p class="note-text">{{ note.content }}</p>

      <div class="note-footer">
        <div class="note-tags">
          <LinTag v-for="tag in note.tags" :key="tag" type="primary" :circle="true">
            #{{ tag }}
          </LinTag>
        </div>
        <div class="note-meta">
          <span class="date">{{ note.date }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.note-card {
  position: relative;
  border-radius: 20px;
  overflow: hidden;
  cursor: pointer;
  transition: all 0.3s ease;
  
  // 初始状态：完全隐藏
  opacity: 0;
  transform: translateY(30px);
  
  // 动画：延迟后淡入上移 - 使用 animation-index 而不是 index
  animation: fadeInUp 0.6s ease-out forwards;
  animation-delay: calc(var(--animation-index, 0) * 0.1s);

  &:hover {
    transform: translateY(-5px) scale(1.02);
    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.15);
  }
}

.note-bg {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  opacity: 0.8;
}

.note-content {
  position: relative;
  z-index: 2;
  padding: 1.5rem;
  background: rgba(255, 255, 255, 0.9);
  backdrop-filter: blur(10px);
  height: 100%;
  display: flex;
  flex-direction: column;

  [data-theme='dark'] & {
    background: rgba(0, 0, 0, 0.7);
  }
}

.note-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 1rem;
}

.note-title {
  font-size: 1.25rem;
  font-weight: 700;
  color: rgb(var(--color-text));
  margin: 0;
  flex: 1;
  line-height: 1.3;
}

.note-mood {
  display: flex;
  align-items: center;
}

.mood-icon {
  font-size: 1.5rem;
  animation: pulse 2s ease-in-out infinite;
}

.note-text {
  color: rgba(var(--color-text), 0.8);
  line-height: 1.6;
  margin: 0 0 1rem 0;
  flex: 1;
  display: -webkit-box;
  -webkit-line-clamp: 4;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.note-footer {
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  gap: 1rem;
  margin-top: auto;
}

.note-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 0.25rem;
}

.note-meta {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.875rem;
  color: rgba(var(--color-text), 0.6);
}

.date {
  font-weight: 500;
}

// 动画
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

@keyframes pulse {
  0%, 100% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.1);
  }
}

// 响应式设计
@media (max-width: 768px) {
  .note-content {
    padding: 1.25rem;
  }
  
  .note-footer {
    flex-direction: column;
    align-items: flex-start;
    gap: 0.75rem;
  }
}
</style>