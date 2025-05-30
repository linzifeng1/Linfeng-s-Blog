<script setup lang="ts">
import { ref } from 'vue'
import LinTag from '@/components/MyDesignComponents/Lin-Tag.vue'

interface Photo {
    id: number
    url: string
    title: string
    desc: string
    date: string
    tags: string[]
}

interface Props {
    photo: Photo
    index: number
}

interface Emits {
    click: [photo: Photo]
    imageLoad: [photoId: number]
}

defineProps<Props>()
defineEmits<Emits>()

// 图片加载状态
const isLoaded = ref<boolean>(false);

// 格式化简短日期
const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('zh-CN', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit'
    })
}
</script>

<template>
    <!--  这里根据卡片索引动态设置延迟 --- 实现一种照片交错出现的动画 -->
    <div class="photo-item" :style="{ '--delay': index * 0.1 + 's' }" @click="$emit('click', photo)">
        <div class="photo-card">
            <div class="photo-image-container">
                <!-- 图片加载占位符 -->
                <div v-if="!isLoaded" class="image-placeholder">
                    <div class="placeholder-spinner"></div>
                </div>

                <img :src="photo.url" :alt="photo.title" class="photo-image"
                    :class="{ 'image-loaded': isLoaded }" loading="lazy"
                    @load="isLoaded = true" />

                <div class="photo-overlay">
                    <div class="photo-info">
                        <h3 class="photo-title-overlay">{{ photo.title }}</h3>
                        <p class="photo-date">{{ formatDate(photo.date) }}</p>
                    </div>
                    <div class="photo-tags">
                        <LinTag 
                            v-for="tag in photo.tags" 
                            :key="tag" 
                            type="primary"
                            :circle="true"
                        >
                            {{ tag }}
                        </LinTag>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped lang="scss">
.photo-item {
    animation: fadeInUp 0.6s ease forwards;
    // 这里根据卡片索引动态设置延迟 --- 实现一种照片交错出现的动画
    animation-delay: var(--delay);
    opacity: 0;
    transform: translateY(30px);
}

@keyframes fadeInUp {
    to {
        opacity: 1;
        transform: translateY(0);
    }
}

.photo-card {
    background: rgba(var(--color-pure-background), 1);
    border-radius: 20px;
    overflow: hidden;
    box-shadow: 0 10px 30px rgba(var(--color-text), 0.1);
    transition: all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94);
    cursor: pointer;

    &:hover {
        transform: translateY(-10px) scale(1.02);
        box-shadow: 0 20px 50px rgba(var(--color-text), 0.2);

        .photo-image {
            transform: scale(1.1);
        }
        // 图片上遮罩层可见
        .photo-overlay {
            opacity: 1;
        }
    }
}

.photo-image-container {
    position: relative;
    // 设置容器宽高比
    aspect-ratio: 4/3;
    overflow: hidden;
}

// 图片加载占位符
.image-placeholder {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(135deg,
            rgba(var(--color-text), 0.05) 0%,
            rgba(var(--color-text), 0.1) 100%);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 1;
}

.placeholder-spinner {
    width: 30px;
    height: 30px;
    border: 3px solid rgba($lin-c-primary, 0.2);
    border-top: 3px solid $lin-c-primary;
    border-radius: 50%;
    animation: spin 1s linear infinite;
}

@keyframes spin {
    0% {
        transform: rotate(0deg);
    }

    100% {
        transform: rotate(360deg);
    }
}

.photo-image {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: all 0.4s ease;
    opacity: 0;

    &.image-loaded {
        opacity: 1;
    }
}

.photo-overlay {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(to bottom,
            transparent 0%,
            rgba(0, 0, 0, 0.3) 50%,
            rgba(0, 0, 0, 0.8) 100%);
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    padding: 1.5rem;
    opacity: 0;
    transition: opacity 0.3s ease;

    // 移动端遮罩层默认显示
    @media (max-width: 768px) {
        opacity: 1;
    }
}

.photo-info {
    .photo-title-overlay {
        color: white;
        font-size: 1.2rem;
        font-weight: 600;
        margin-bottom: 0.5rem;
        text-shadow: 0 2px 4px rgba(0, 0, 0, 0.5);
    }

    .photo-date {
        color: rgba(255, 255, 255, 0.9);
        font-size: 0.9rem;
        text-shadow: 0 1px 2px rgba(0, 0, 0, 0.5);
    }
}

.photo-tags {
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem;
}
</style>