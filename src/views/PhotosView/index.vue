<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { getData } from '@/api/photoApi/index.ts'
import LinBackground from '@/components/MyDesignComponents/Lin-Background.vue'
import LinLoading from '@/components/NewMyDesignComponents/Lin-Loading.vue'
import LinButton from '@/components/MyDesignComponents/Lin-Button.vue'
import PhotoCard from './components/PhotoCard.vue'
import PhotoDetail from './components/PhotoDetail.vue'
import { Vue3Lottie } from 'vue3-lottie'
import LoadingAnim from "@/assets/loading.json"
import ErrorAnim from "@/assets/error.json"
import EmptyAnim from "@/assets/empty.json"

// 图片数据类型定义
interface Photo {
    id: number
    url: string
    title: string
    desc: string
    date: string
    tags: string[]
}

// 新Lin-Loading的Props
const isLoading = ref(false)
const isEmpty = ref(false)
const isLoaded = ref(false)
const isError = ref(false)

// 响应式数据
const photoGroups = ref<any[]>([])
const query = ref<{ page: number, size: number, order: 'desc' | 'asc' }>({
    page: 1,
    size: 10,
    order: 'desc'
})

// 总照片数量
const totalPhotos = ref<number>(0)

// 获取照片数据
const loadPhotos = async () => {
    const res = await getData(query.value)
    isLoading.value = false
    // 1.判断数据是否获取成功
    if (res == null) {
        isError.value = true
        return
    }
    const photoData = res.data || []
    // 2.判断是否存在数据
    if (photoData.length === 0 && query.value.page === 1) {
        isEmpty.value = true
        return
    }

    if (photoData.length === 0 && query.value.page > 1) {
        isLoaded.value = true
        return
    }
    // 3.所有判断均通过开始处理数据
    if (photoGroups.value.length === 0) {
        photoGroups.value = photoData
    } else {
        photoGroups.value.push(...photoData)
    }
    
    // 更新总数
    if (res.data.pagination) {
        totalPhotos.value = res.data.pagination.totalPhotos
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
        loadPhotos()
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
    loadPhotos()
    window.addEventListener('scroll', debouncedScroll)
})

onUnmounted(() => {
    window.removeEventListener('scroll', debouncedScroll)
    if (scrollTimer) clearTimeout(scrollTimer)
})

/**
 * 格式化日期显示
 * @param dateString 未格式化的数据
 */
const formatDateDisplay = (dateString: string) => {
    const date = new Date(dateString)
    return {
        year: date.getFullYear(),
        month: date.toLocaleDateString('zh-CN', { month: 'long' }),
        day: date.getDate(),
        weekday: date.toLocaleDateString('zh-CN', { weekday: 'long' })
    }
}

/**
 * 切换排序方式
 */
const toggleOrder = () => {
    query.value.order = query.value.order === 'desc' ? 'asc' : 'desc'
    query.value.page = 1
    photoGroups.value = []
    isLoading.value = true
    loadPhotos()
}

/**
 * 打开照片详情部分
 */
const selectedPhoto = ref<Photo | null>(null)
const isModalOpen = ref(false)

// 打开照片详情
const openPhotoModal = (photo: Photo) => {
    selectedPhoto.value = photo
    isModalOpen.value = true
}

// 关闭照片详情
const closePhotoModal = () => {
    isModalOpen.value = false
    selectedPhoto.value = null
}
</script>

<template>
    <div class="photo-container">
        <!-- 添加背景组件 -->
        <LinBackground />

        <!-- 头部始终渲染 -->
        <div class="photo-header">
            <h1 class="photo-title">我的相册</h1>
            <div class="photo-controls">
                <LinButton @click="toggleOrder()" :disabled="isLoading">{{ query.order == 'desc' ? '最新优先' : '最早优先' }}
                </LinButton>
                <div class="photo-count">
                    <span class="count-text">共 {{ totalPhotos }} 张</span>
                </div>
            </div>
        </div>

        <!-- 内容部分 -->
        <div class="photo-content">
            <div class="photo-timeline">
                <div v-for="(group, index) in photoGroups" :key="group.date" class="date-group">
                    <!-- 日期分割线 -->
                    <div class="date-divider" :class="{ first: index === 0 }">
                        <div class="date-info">
                            <div class="date-main">
                                <span class="date-day">{{ formatDateDisplay(group.date).day }}</span>
                                <div class="date-details">
                                    <span class="date-month">{{ formatDateDisplay(group.date).month }}</span>
                                    <span class="date-year">{{ formatDateDisplay(group.date).year }}</span>
                                </div>
                            </div>
                            <span class="date-weekday">{{ formatDateDisplay(group.date).weekday }}</span>
                        </div>
                        <div class="divider-line">
                            <div class="line-gradient"></div>
                            <div class="line-dot"></div>
                        </div>
                    </div>

                    <!-- 照片网格 -->
                    <div class="photo-grid">
                        <PhotoCard @click="openPhotoModal" v-for="(photo, index) in group.data"
                            :key="photo.id + '-' + index" :photo="{ ...photo, date: group.date, tags: photo.tag }"
                            :index="index" />
                    </div>
                </div>
            </div>
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

        <!-- 点击展开图片详情 -->
        <PhotoDetail :photo="selectedPhoto" :visible="isModalOpen" @close="closePhotoModal" />
    </div>
</template>

<style scoped lang="scss">
.photo-container {
    display: flex;
    flex-direction: column;
    max-width: 1200px;
    width: 100%;
    margin: 0 auto;
    background: linear-gradient(135deg,
            rgba(var(--color-background), 1) 0%,
            rgba(var(--color-background), 0.95) 100%);

    @media (max-width: 768px) {
        padding: 0 1rem;
    }
}

// 头部区域
.photo-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 2rem 0;
    animation: fadeInDown 0.8s ease-out;

    @media (max-width: 768px) {
        flex-direction: column;
        gap: 1.5rem;
        text-align: center;
    }
}

.photo-title {
    font-size: 2.5rem;
    font-weight: 700;
    background: linear-gradient(135deg, $lin-c-primary, #9333ea);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    animation: gradient-text 3s ease-in-out infinite;
    background-clip: text;
    display: flex;
    align-items: center;
    gap: 0.5rem;
}

.photo-controls {
    display: flex;
    align-items: center;
    gap: 1rem;

    @media (max-width: 768px) {
        flex-direction: row;
        justify-content: center;
        gap: 1rem;
        width: 100%;
    }
}

.photo-count {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    padding: 0.6rem 1.2rem;
    background: rgba(var(--color-text), 0.05);
    border-radius: 20px;
    color: rgba(var(--color-text), 0.7);
    font-size: 0.9rem;
    white-space: nowrap;

    @media (max-width: 768px) {
        padding: 0.6rem 1rem;

        .count-text {
            font-size: 0.85rem;
        }
    }
}

// 重新设计的日期分割线
.date-divider {
    display: flex;
    align-items: center;
    margin: 2rem 0;
    position: relative;

    &.first {
        margin-top: 0;
    }
}

.date-info {
    display: flex;
    align-items: center;
    gap: 1rem;
    background: rgba(var(--color-pure-background), 1);
    padding: 1rem 1.5rem;
    border-radius: 20px;
    box-shadow: 0 4px 20px rgba(var(--color-text), 0.1);
    border: 2px solid rgba($lin-c-primary, 0.1);
    margin-right: 1.5rem;
    min-width: 200px;

    @media (max-width: 768px) {
        min-width: 160px;
        padding: 0.8rem 1.2rem;
        gap: 0.8rem;
    }
}

.date-main {
    display: flex;
    align-items: center;
    gap: 0.8rem;
}

.date-day {
    font-size: 2rem;
    font-weight: 700;
    color: $lin-c-primary;
    line-height: 1;

    @media (max-width: 768px) {
        font-size: 1.6rem;
    }
}

.date-details {
    display: flex;
    flex-direction: column;
    gap: 0.2rem;
}

.date-month {
    font-size: 0.9rem;
    font-weight: 600;
    color: rgba(var(--color-text), 0.8);
    line-height: 1;
}

.date-year {
    font-size: 0.8rem;
    color: rgba(var(--color-text), 0.6);
    line-height: 1;
}

.date-weekday {
    font-size: 0.85rem;
    color: rgba(var(--color-text), 0.7);
    font-weight: 500;

    @media (max-width: 768px) {
        font-size: 0.8rem;
    }
}

.divider-line {
    flex: 1;
    height: 2px;
    position: relative;
    display: flex;
    align-items: center;
}

.line-gradient {
    flex: 1;
    height: 2px;
    background: linear-gradient(90deg,
            rgba($lin-c-primary, 0.6) 0%,
            rgba($lin-c-primary, 0.3) 50%,
            rgba($lin-c-primary, 0.1) 100%);
    border-radius: 1px;
}

.line-dot {
    width: 8px;
    height: 8px;
    background: $lin-c-primary;
    border-radius: 50%;
    margin-left: -4px;
    box-shadow: 0 0 0 3px rgba($lin-c-primary, 0.2);
}

// 照片网格
.photo-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
    gap: 2rem;

    @media (max-width: 768px) {
        grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
        gap: 1rem;
    }

    @media (max-width: 480px) {
        grid-template-columns: 1fr;
    }
}
</style>