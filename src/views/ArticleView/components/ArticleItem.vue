<script setup lang="ts">
import { defineProps } from 'vue'

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

const props = defineProps<{
  article: Article
  index: number
}>()

const formatNumber = (num: number): string => {
  if (num >= 1000) {
    return (num / 1000).toFixed(1) + 'k'
  }
  return num.toString()
}
</script>

<template>
  <article class="article-card">
    <div class="article-header">
      <h2 class="article-title">{{ props.article.title }}</h2>
      <div class="author-info">
        <div class="author-avatar">{{ props.article.author.charAt(0) }}</div>
        <span class="author-name">{{ props.article.author }}</span>
      </div>
    </div>
    
    <div class="article-content">
      <p class="content-preview">{{ props.article.content }}</p>
    </div>
    
    <div class="article-tags" v-if="props.article.tags.length > 0">
      <span v-for="tag in props.article.tags" :key="tag" class="tag">{{ tag }}</span>
    </div>
    
    <div class="article-footer">
      <time class="article-date">{{ props.article.date }}</time>
      <div class="article-stats">
        <span class="stat-item">
          <svg class="stat-icon" viewBox="0 0 24 24">
            <path d="M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5-5-2.24 5-5 5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z" />
          </svg>
          {{ formatNumber(props.article.readCount) }}
        </span>
        <span class="stat-item">
          <svg class="stat-icon" viewBox="0 0 24 24">
            <path d="M21.99 4c0-1.1-.89-2-2-2H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h14l4 4-.01-18zM18 14H6v-2h12v2zm0-3H6V9h12v2zm0-3H6V6h12v2z" />
          </svg>
          {{ props.article.commentCount }}
        </span>
        <span class="stat-item">
          <svg class="stat-icon" viewBox="0 0 24 24">
            <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
          </svg>
          {{ props.article.likeCount }}
        </span>
      </div>
    </div>
  </article>
</template>

<style scoped lang="scss">

.article-card {
  background: rgb(var(--color-background));
  border: 1px solid rgba(var(--color-text), 0.1);
  border-radius: 12px;
  padding: 24px;
  animation: fadeInUp 0.6s ease-out;
  transition: all 0.2s ease;
  cursor: pointer;
  
  &:hover {
    border-color: rgba(var(--color-text), 0.2);
    box-shadow: 0 4px 12px rgba(var(--color-text), 0.1);
    transform: translateY(-2px);
  }
  
  @media (max-width: 768px) {
    padding: 20px;
    margin-bottom: 16px;
  }
}

.article-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 16px;
  gap: 16px;
  
  @media (max-width: 768px) {
    flex-direction: column;
    gap: 12px;
  }
}

.article-title {
  font-size: 1.5rem;
  font-weight: 600;
  color: rgb(var(--color-text));
  margin: 0;
  line-height: 1.4;
  flex: 1;
  
  @media (max-width: 768px) {
    font-size: 1.25rem;
  }
}

.author-info {
  display: flex;
  align-items: center;
  gap: 8px;
  flex-shrink: 0;
}

.author-avatar {
  width: 32px;
  height: 32px;
  background: $lin-c-primary;
  color: $lin-c-white;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 600;
  font-size: 0.875rem;
}

.author-name {
  font-size: 0.875rem;
  color: rgba(var(--color-text), 0.7);
  font-weight: 500;
}

.article-content {
  margin-bottom: 16px;
}

.content-preview {
  font-size: 1rem;
  color: rgba(var(--color-text), 0.7);
  line-height: 1.6;
  margin: 0;
  display: -webkit-box;
  -webkit-line-clamp: 2;
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
  background: rgba(var(--color-text), 0.05);
  color: rgba(var(--color-text), 0.8);
  padding: 4px 12px;
  border-radius: 16px;
  font-size: 0.75rem;
  font-weight: 500;
  border: 1px solid rgba(var(--color-text), 0.1);
}

.article-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: 16px;
  border-top: 1px solid rgba(var(--color-text), 0.1);
  
  @media (max-width: 768px) {
    flex-direction: column;
    gap: 12px;
    align-items: flex-start;
  }
}

.article-date {
  font-size: 0.875rem;
  color: rgba(var(--color-text), 0.6);
  font-weight: 500;
}

.article-stats {
  display: flex;
  gap: 16px;
  
  @media (max-width: 768px) {
    width: 100%;
    justify-content: space-between;
  }
}

.stat-item {
  display: flex;
  align-items: center;
  gap: 4px;
  font-size: 0.875rem;
  color: rgba(var(--color-text), 0.6);
  font-weight: 500;
}

.stat-icon {
  width: 16px;
  height: 16px;
  fill: currentColor;
}
</style>