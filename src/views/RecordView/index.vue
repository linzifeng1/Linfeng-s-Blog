<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { getData } from '@/api/recordApi/index.ts'
import LinBackground from '@/components/MyDesignComponents/Lin-Background.vue'
import LinLoading from '@/components/NewMyDesignComponents/Lin-Loading.vue'
import RecordItem from './components/RecordItem.vue'
import { Vue3Lottie } from 'vue3-lottie'
import LoadingAnim from "@/assets/loading.json"
import ErrorAnim from "@/assets/error.json"
import EmptyAnim from "@/assets/empty.json"

// 笔记数据类型定义（移除了color和isPinned属性）
interface Note {
    id: number
    title: string
    content: string
    tags: string[]
    date: string
    mood: 'happy' | 'sad' | 'excited' | 'calm' | 'thoughtful'
}

// 新Lin-Loading的Props
const isLoading = ref(false)
const isEmpty = ref(false)
const isLoaded = ref(false)
const isError = ref(false)

// 响应式数据
const notes = ref<Note[]>([])
const query = ref<{ page: number, size: number }>({
    page: 1,
    size: 10
})

// 动画索引计数器
const animationIndex = ref(0)

// 获取笔记数据
const loadNotes = async () => {
    const res = await getData(query.value)
    isLoading.value = false
    // 1.判断数据是否获取成功
    if (res == null) {
        isError.value = true
        return
    }
    const noteData = res.data || []
    // 2.判断是否存在数据
    if (noteData.length === 0 && query.value.page === 1) {
        isEmpty.value = true
        return
    }

    if (noteData.length === 0 && query.value.page > 1) {
        isLoaded.value = true
        return
    }
    // 3.所有判断均通过开始处理数据
    if (notes.value.length === 0) {
        notes.value = noteData
        // 首次加载，重置动画索引
        animationIndex.value = 0
    } else {
        notes.value.push(...noteData)
        // 新数据加载，重置动画索引为当前批次的起始
        animationIndex.value = 0
    }
    // 本次数据处理完毕 --- 分页自增1
    query.value.page++
}

// 滚动监听
const handleScroll = () => {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop
    const windowHeight = window.innerHeight
    const documentHeight = document.documentElement.scrollHeight

    // 当滚动到距离底部 200px 时开始加载
    if (scrollTop + windowHeight >= documentHeight - 200) {
        isLoading.value = true
        loadNotes()
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
    // 开始加载状态
    isLoading.value = true
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
                <RecordItem 
                    v-for="(note, index) in notes" 
                    :key="note.id" 
                    :note="note" 
                    :index="index"
                    :animation-index="index >= notes.length - query.size ? index - (notes.length - query.size) : index"
                    :style="{ '--animation-index': index >= notes.length - query.size ? index - (notes.length - query.size) : index }" 
                />
            </div>

            <!-- 新加载状态 -->
            <LinLoading :is-loading="isLoading" height="200px" :is-empty="isEmpty" :is-loaded="isLoaded"
                :is-error="isError">
                <template #loadingContent>
                    <Vue3Lottie width="160px" height="120px" :animation-data="LoadingAnim"></Vue3Lottie>
                    <span style="color: rgb(var(--color-text));">正在加载</span>
                </template>
                <template #errorContent>
                    <Vue3Lottie width="160px" height="120px" :animation-data="ErrorAnim"></Vue3Lottie>
                    <span style="color: rgb(var(--color-text));">数据加载失败</span>
                </template>
                <template #emptyContent>
                    <Vue3Lottie width="160px" height="120px" :animation-data="EmptyAnim"></Vue3Lottie>
                    <span style="color: rgb(var(--color-text));">没有找到任何内容</span>
                </template>
                <template #loadedContent>
                    <span style="color: rgb(var(--color-text));">没有更多数据</span>
                </template>
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