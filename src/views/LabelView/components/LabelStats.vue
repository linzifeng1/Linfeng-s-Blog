<script setup lang="ts">
import { defineProps } from 'vue'

interface StatsData {
  totalLabels: number
  totalArticles: number
  mostUsedLabel: string
  recentlyAdded: number
}

const props = defineProps<{
  stats: StatsData
}>()

const statsItems = [
  {
    label: '标签总数',
    value: props.stats.totalLabels,
    icon: '🏷️',
    color: '#4da3ff',
    bgColor: 'rgba(77, 163, 255, 0.1)'
  },
  {
    label: '文章总数', 
    value: props.stats.totalArticles,
    icon: '📝',
    color: '#10b981',
    bgColor: 'rgba(16, 185, 129, 0.1)'
  },
  {
    label: '最热标签',
    value: props.stats.mostUsedLabel,
    icon: '🔥',
    color: '#f59e0b',
    bgColor: 'rgba(245, 158, 11, 0.1)'
  },
  {
    label: '本月新增',
    value: props.stats.recentlyAdded,
    icon: '✨',
    color: '#8b5cf6',
    bgColor: 'rgba(139, 92, 246, 0.1)'
  }
]
</script>

<template>
  <div class="label-stats">
    <div 
      v-for="(item, index) in statsItems" 
      :key="item.label"
      class="stats-item"
      :style="{ animationDelay: index * 0.1 + 's' }"
    >
      <div class="stats-icon" :style="{ color: item.color, backgroundColor: item.bgColor }">
        {{ item.icon }}
      </div>
      <div class="stats-content">
        <div class="stats-value" :style="{ color: item.color }">
          {{ typeof item.value === 'number' ? item.value : item.value }}
        </div>
        <div class="stats-label">{{ item.label }}</div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.label-stats {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1rem;
  margin-bottom: 2rem;
}

.stats-item {
  background: rgba(255, 255, 255, 0.8);
  backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 16px;
  padding: 1.5rem;
  display: flex;
  align-items: center;
  gap: 1rem;
  transition: all 0.3s cubic-bezier(0.23, 1, 0.32, 1);
  animation: statsItemFadeIn 0.6s ease-out forwards;
  opacity: 0;
  transform: translateY(20px);

  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 12px 24px rgba(0, 0, 0, 0.1);
  }
}

.stats-icon {
  width: 3rem;
  height: 3rem;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.25rem;
  flex-shrink: 0;
}

.stats-content {
  flex: 1;

  .stats-value {
    font-size: 1.5rem;
    font-weight: 700;
    margin-bottom: 0.25rem;
  }

  .stats-label {
    font-size: 0.875rem;
    color: #64748b;
    font-weight: 500;
  }
}

// 暗色模式适配
@media (prefers-color-scheme: dark) {
  .stats-item {
    background: rgba(30, 41, 59, 0.8);
    border-color: rgba(255, 255, 255, 0.1);

    .stats-label {
      color: #94a3b8;
    }
  }
}
</style>