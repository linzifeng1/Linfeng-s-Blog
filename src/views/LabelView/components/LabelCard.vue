<script setup lang="ts">
import { defineProps } from 'vue'
import LinTag from '@/components/MyDesignComponents/Lin-Tag.vue'

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

const props = defineProps<{
  label: Label
  index: number
}>()

// 分类图标映射
const categoryIcons = {
  tech: '💻',
  life: '🌱', 
  design: '🎨',
  thought: '💭',
  other: '📝'
}

// 分类名称映射
const categoryNames = {
  tech: '技术',
  life: '生活',
  design: '设计', 
  thought: '思考',
  other: '其他'
}

// 动态计算动画延迟
const animationDelay = Math.min(props.index * 0.1, 1) + 's'
</script>

<template>
  <div class="label-card" :style="{ animationDelay }">
    <!-- 卡片头部 -->
    <div class="label-header">
      <div class="label-icon" :style="{ backgroundColor: label.color }">
        {{ categoryIcons[label.category] }}
      </div>
      <div class="label-info">
        <h3 class="label-name">{{ label.name }}</h3>
        <div class="label-meta">
          <LinTag :circle="true" type="primary">{{ categoryNames[label.category] }}</LinTag>
          <span class="article-count">{{ label.count }} 篇文章</span>
        </div>
      </div>
    </div>

    <!-- 标签描述 -->
    <div class="label-description">
      <p>{{ label.description }}</p>
    </div>

    <!-- 最新文章预览 -->
    <div class="recent-articles" v-if="label.articles.length > 0">
      <h4 class="section-title">最新文章</h4>
      <div class="article-list">
        <div 
          v-for="article in label.articles.slice(0, 3)" 
          :key="article.id"
          class="article-item"
        >
          <div class="article-dot"></div>
          <div class="article-content">
            <span class="article-title">{{ article.title }}</span>
            <span class="article-date">{{ article.date }}</span>
          </div>
        </div>
      </div>
    </div>

    <!-- 卡片底部 -->
    <div class="label-footer">
      <div class="create-time">创建于 {{ label.createTime }}</div>
      <div class="view-more">
        <span>查看全部</span>
        <svg class="arrow-icon" viewBox="0 0 24 24" fill="none">
          <path d="M7 17L17 7M17 7H7M17 7V17" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.label-card {
  background: rgba(255, 255, 255, 0.8);
  backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 20px;
  padding: 1.5rem;
  margin-bottom: 1.5rem;
  transition: all 0.4s cubic-bezier(0.23, 1, 0.32, 1);
  animation: labelCardFadeIn 0.6s ease-out forwards;
  opacity: 0;
  transform: translateY(30px);
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 2px;
    background: linear-gradient(90deg, transparent, rgba(77, 163, 255, 0.6), transparent);
    transition: left 0.6s ease;
  }

  &:hover {
    transform: translateY(-8px) scale(1.02);
    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
    border-color: rgba(77, 163, 255, 0.3);

    &::before {
      left: 100%;
    }

    .view-more {
      color: #4da3ff;
      
      .arrow-icon {
        transform: translate(4px, -4px);
      }
    }
  }
}

.label-header {
  display: flex;
  align-items: center;
  margin-bottom: 1rem;

  .label-icon {
    width: 3rem;
    height: 3rem;
    border-radius: 12px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1.2rem;
    margin-right: 1rem;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  }

  .label-info {
    flex: 1;

    .label-name {
      font-size: 1.25rem;
      font-weight: 600;
      color: #2c3e50;
      margin: 0 0 0.5rem 0;
    }

    .label-meta {
      display: flex;
      align-items: center;
      gap: 0.75rem;

      .article-count {
        font-size: 0.875rem;
        color: #64748b;
        font-weight: 500;
      }
    }
  }
}

.label-description {
  margin-bottom: 1.5rem;
  
  p {
    color: #475569;
    line-height: 1.6;
    margin: 0;
    font-size: 0.95rem;
  }
}

.recent-articles {
  margin-bottom: 1.5rem;

  .section-title {
    font-size: 0.875rem;
    font-weight: 600;
    color: #374151;
    margin: 0 0 0.75rem 0;
    text-transform: uppercase;
    letter-spacing: 0.5px;
  }

  .article-list {
    .article-item {
      display: flex;
      align-items: center;
      padding: 0.5rem 0;
      border-bottom: 1px solid rgba(0, 0, 0, 0.05);
      transition: all 0.3s ease;

      &:last-child {
        border-bottom: none;
      }

      &:hover {
        background: rgba(77, 163, 255, 0.05);
        border-radius: 8px;
        padding-left: 0.5rem;
        padding-right: 0.5rem;
      }

      .article-dot {
        width: 6px;
        height: 6px;
        background: #4da3ff;
        border-radius: 50%;
        margin-right: 0.75rem;
        flex-shrink: 0;
      }

      .article-content {
        flex: 1;
        display: flex;
        justify-content: space-between;
        align-items: center;

        .article-title {
          font-size: 0.875rem;
          color: #374151;
          font-weight: 500;
          flex: 1;
          margin-right: 1rem;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        .article-date {
          font-size: 0.75rem;
          color: #9ca3af;
          flex-shrink: 0;
        }
      }
    }
  }
}

.label-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: 1rem;
  border-top: 1px solid rgba(0, 0, 0, 0.05);

  .create-time {
    font-size: 0.75rem;
    color: #9ca3af;
  }

  .view-more {
    display: flex;
    align-items: center;
    gap: 0.25rem;
    font-size: 0.875rem;
    color: #64748b;
    font-weight: 500;
    cursor: pointer;
    transition: all 0.3s ease;

    .arrow-icon {
      width: 1rem;
      height: 1rem;
      transition: transform 0.3s ease;
    }
  }
}

// 暗色模式适配
@media (prefers-color-scheme: dark) {
  .label-card {
    background: rgba(30, 41, 59, 0.8);
    border-color: rgba(255, 255, 255, 0.1);

    .label-name {
      color: #f1f5f9;
    }

    .label-description p {
      color: #cbd5e1;
    }

    .section-title {
      color: #e2e8f0;
    }

    .article-title {
      color: #e2e8f0;
    }

    .article-item:hover {
      background: rgba(77, 163, 255, 0.1);
    }

    .label-footer {
      border-top-color: rgba(255, 255, 255, 0.1);
    }
  }
}
</style>