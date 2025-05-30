<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { getData } from '@/api/recordApi/index.ts'
import LinBackground from '@/components/MyDesignComponents/Lin-Background.vue'
import LinLoading from '@/components/MyDesignComponents/Lin-Loading.vue'
import RecordItem from './components/RecordItem.vue'
import { toast } from 'vue-sonner'

// 笔记数据类型定义（移除了color和isPinned属性）
interface Note {
    id: number
    title: string
    content: string
    tags: string[]
    date: string
    mood: 'happy' | 'sad' | 'excited' | 'calm' | 'thoughtful'
}

// 响应式数据
const notes = ref<Note[]>([])
const loading = ref(false)
const loadingMore = ref(false)
const hasMore = ref(true)
const page = ref(1)
const pageSize = 10

// 获取笔记数据
const loadNotes = async (isLoadMore = false) => {
    if (loading.value || loadingMore.value || !hasMore.value)
        return

    if (isLoadMore) {
        loadingMore.value = true
    } else {
        loading.value = true
    }

    try {
        const res = await getData({ page: page.value, size: pageSize })
        const newNotes = res.data.data || []

        if (newNotes.length === 0) {
            hasMore.value = false
        } else {
            if (isLoadMore) {
                notes.value.push(...newNotes)
            } else {
                notes.value = newNotes
            }
            page.value++
        }
    } catch (error) {
        console.error('加载笔记失败:', error)
        toast.error('Error', {
            description: '获取笔记数据失败！'
        })
    } finally {
        loading.value = false
        loadingMore.value = false
    }
}

// 滚动监听
const handleScroll = () => {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop
    const windowHeight = window.innerHeight
    const documentHeight = document.documentElement.scrollHeight

    // 当滚动到距离底部 200px 时开始加载
    if (scrollTop + windowHeight >= documentHeight - 200) {
        loadNotes(true)
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
    loadNotes()
    window.addEventListener('scroll', debouncedScroll)
})

onUnmounted(() => {
    window.removeEventListener('scroll', debouncedScroll)
    if (scrollTimer) clearTimeout(scrollTimer)
})
</script>

<template>
    <div class="record-view">
        <!-- 使用背景组件 -->
        <LinBackground />

        <!-- 头部区域 -->
        <header class="header">
            <h1 class="title">随手笔记</h1>
            <span class="title-subtitle">记录生活的每一个美好瞬间</span>
        </header>

        <!-- 笔记列表 -->
        <main class="notes-container">
            <div class="notes-grid">
                <RecordItem v-for="(note, index) in notes" :key="note.id" :note="note" :index="index"
                    :style="{ '--index': index }" />
            </div>



            <!-- 空状态 -->
            <div v-if="notes.length === 0 && !loading" class="empty-state">
                <div class="empty-icon">📝</div>
                <h3 class="empty-title">还没有笔记</h3>
                <p class="empty-text">暂时没有找到任何笔记内容</p>
            </div>

            <!-- 加载状态 -->
            <LinLoading :isLoading="loading" loading-height="200px">
                <template #text>正在加载笔记...</template>
            </LinLoading>


            <!-- 没有更多数据和加载更多数据 -->
            <LinLoading :isLoading="loadingMore" :isAllLoaded="!hasMore" loadingHeight="200px">
                <template #text>加载更多</template>
                <template #allLoaded>没有更多笔记了</template>
            </LinLoading>

        </main>
    </div>
</template>

<style scoped lang="scss">
.record-view {
    background: rgb(var(--color-background));
    position: relative;
    overflow-x: hidden;
}

// 头部样式
.header {
    display: flex;
    z-index: 10;
    margin: 0 auto;
    padding: 2rem 1rem;
    max-width: 1200px;
    animation: fadeInDown 0.8s ease-out;
    justify-content: space-between;
    align-items: center;

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

    .title-subtitle {
        display: block;
        font-size: 1.1rem;
        font-weight: 400;
        color: rgba(var(--color-text), 0.6);
        margin-top: 0.25rem;
        background: none;
        -webkit-text-fill-color: rgba(var(--color-text), 0.6);
    }
}

// 笔记容器
.notes-container {
    position: relative;
    z-index: 10;
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 1rem 2rem;
}

.notes-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
    gap: 1.5rem;

    @media (max-width: 768px) {
        grid-template-columns: 1fr;
        gap: 1rem;
    }
}

// 空状态
.empty-state {
    text-align: center;
    padding: 4rem 2rem;
    animation: fadeIn 1s ease-out;
}

.empty-icon {
    font-size: 4rem;
    margin-bottom: 1rem;
    animation: pulsate 2s ease-in-out infinite;
}

.empty-title {
    font-size: 1.5rem;
    font-weight: 600;
    color: rgb(var(--color-text));
    margin: 0 0 0.5rem 0;
}

.empty-text {
    color: rgba(var(--color-text), 0.6);
    margin: 0;
}

// 动画定义
@keyframes fadeInDown {
    from {
        opacity: 0;
        transform: translateY(-30px);
    }

    to {
        opacity: 1;
        transform: translateY(0);
    }
}

@keyframes fadeIn {
    from {
        opacity: 0;
    }

    to {
        opacity: 1;
    }
}

@keyframes pulsate {

    0%,
    100% {
        transform: scale(1);
        opacity: 0.8;
    }

    50% {
        transform: scale(1.1);
        opacity: 1;
    }
}

@keyframes gradient-text {

    0%,
    100% {
        background-position: 0% 50%;
    }

    50% {
        background-position: 100% 50%;
    }
}

// 响应式设计
@media (max-width: 768px) {
    .header {
        padding: 1.5rem 1rem;
    }

    .title {
        font-size: 2rem;

        .title-subtitle {
            font-size: 0.9rem;
        }
    }
}
</style>