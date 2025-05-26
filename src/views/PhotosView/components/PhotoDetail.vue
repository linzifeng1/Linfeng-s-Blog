<script setup lang="ts">
import { computed, watch, onMounted, onUnmounted } from 'vue'
interface Photo {
    id: number
    url: string
    title: string
    desc: string
    date: string
    tags: string[]
}
const props = defineProps<{
    photo: Photo | null
    visible: boolean
}>()
const emit = defineEmits(['close'])
const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('zh-CN', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit'
    })
}
// 禁止滚动
watch(() => props.visible, (val) => {
    document.body.style.overflow = val ? 'hidden' : 'auto'
})
onUnmounted(() => {
    document.body.style.overflow = 'auto'
})
</script>
<template>
    <Transition name="modal">
        <div v-if="visible && photo" class="photo-modal" @click="emit('close')">
            <div class="modal-content" @click.stop>
                <button class="modal-close" @click="emit('close')">✕</button>
                <div class="modal-image-container">
                    <div class="modal-image-placeholder">
                        <div class="modal-placeholder-spinner"></div>
                    </div>
                    <img :src="photo.url" :alt="photo.title" class="modal-image" @load="($event) => {
                        const target = $event.target as HTMLImageElement;
                        const prevSibling = target.previousElementSibling as HTMLElement;
                        if (prevSibling) prevSibling.style.display = 'none';
                        target.style.opacity = '1';
                    }" />
                </div>
                <div class="modal-info">
                    <h2 class="modal-title">{{ photo.title }}</h2>
                    <p class="modal-description">{{ photo.desc }}</p>
                    <div class="modal-meta">
                        <span class="modal-date">📅 {{ formatDate(photo.date) }}</span>
                        <div class="modal-tags">
                            <span v-for="tag in photo.tags" :key="tag" class="modal-tag">{{ tag }}</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </Transition>
</template>
<style scoped lang="scss">
.photo-modal {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.9);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 1000;
    padding: 2rem;
}

.modal-content {
    background: rgba(var(--color-pure-background), 1);
    border-radius: 20px;
    width: 90vw;
    max-width: 800px;
    max-height: 90vh;
    overflow: hidden;
    position: relative;
    display: flex;
    flex-direction: column;
}

.modal-close {
    position: absolute;
    top: 1rem;
    right: 1rem;
    background: rgba(0, 0, 0, 0.5);
    color: white;
    border: none;
    border-radius: 50%;
    width: 40px;
    height: 40px;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    font-size: 1.2rem;
    z-index: 10;
    transition: all 0.3s ease;
}

.modal-close:hover {
    background: rgba(0, 0, 0, 0.8);
    transform: scale(1.1);
}

.modal-image-container {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    min-height: 300px;
    padding: 1rem;
    position: relative;
}

.modal-image-placeholder {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    display: flex;
    align-items: center;
    justify-content: center;
}

.modal-placeholder-spinner {
    width: 40px;
    height: 40px;
    border: 4px solid rgba(51, 153, 255, 0.2);
    border-top: 4px solid #3399ff;
    border-radius: 50%;
    animation: spin 1s linear infinite;
}

@keyframes spin {
    to {
        transform: rotate(360deg);
    }
}

.modal-image {
    max-width: 100%;
    max-height: 60vh;
    object-fit: contain;
    border-radius: 10px;
    opacity: 0;
    transition: opacity 0.3s;
}

.modal-info {
    padding: 2rem;
    border-top: 1px solid rgba(var(--color-text), 0.1);
}

.modal-title {
    font-size: 1.5rem;
    font-weight: 600;
    color: rgba(var(--color-text), 1);
    margin-bottom: 0.5rem;
}

.modal-description {
    color: rgba(var(--color-text), 0.7);
    margin-bottom: 1rem;
    line-height: 1.6;
}

.modal-meta {
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-wrap: wrap;
    gap: 1rem;
}

.modal-date {
    color: #3399ff;
    font-weight: 500;
}

.modal-tags {
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem;
}

.modal-tag {
    background: rgba(51, 153, 255, 0.1);
    color: #3399ff;
    padding: 0.25rem 0.75rem;
    border-radius: 15px;
    font-size: 0.8rem;
    border: 1px solid rgba(51, 153, 255, 0.3);
}

.modal-enter-active,
.modal-leave-active {
    transition: all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94);
}

.modal-enter-from,
.modal-leave-to {
    opacity: 0;
}

.modal-enter-to,
.modal-leave-from {
    opacity: 1;
}
</style>