<script setup lang="ts">
import { onMounted, ref, onUnmounted } from 'vue'
import { getData } from '@/api/photoApi/index.ts'
import LinLoading from '@/components/MyDesignComponents/Lin-Loading.vue'
import LinButton from '@/components/MyDesignComponents/Lin-Button.vue'
import PhotoCard from './components/PhotoCard.vue'
import PhotoDetail from './components/PhotoDetail.vue'
import { toast } from 'vue-sonner'


// 分页查询参数 //
const query = ref<{
    page: number
    size: number
    order: 'desc' | 'asc'
}>({
    page: 1,
    size: 10,
    order: 'desc'
})

// 图片数据集 //
interface Photo {
    id: number
    url: string
    title: string
    desc: string
    date: string
    tags: string[]  // 注意字段名与JSON中的'tag'保持一致
}
const photos = ref<Photo[]>([])

// 是否显示加载页面 //
const isLoading = ref<boolean>(false)
// 是否正在加载更多 //
const isLoadingMore = ref<boolean>(false)
// 是否已加载全部数据 //
const isAllLoaded = ref<boolean>(false)

// 照片组数据集 //
const photoGroups = ref<any[]>([])

// 总照片数量 // 
const totalPhotos = ref<number>(0)

// 获取图片数据
const initData = async () => {
    try {
        isLoading.value = true
        query.value.page = 1 // 重置页码
        isAllLoaded.value = false // 重置加载状态

        const res = await getData(query.value)
        console.log(res)
        photoGroups.value = res.data.data // 直接保存分组数据
        totalPhotos.value = res.data.pagination.totalPhotos
    } catch (error) {
        toast.error('Error', {
            description: '获取相册数据失败！'
        })
        console.log(error);
    } finally {
        isLoading.value = false
    }
}

/**
 * 加载更多数据的方法
 */
const loadMoreData = async () => {
    if (isLoadingMore.value || isAllLoaded.value)
        return

    try {
        isLoadingMore.value = true
        query.value.page += 1 // 增加页码

        const res = await getData(query.value)
        console.log('加载更多:', res)

        // 检查是否有新数据
        if (!res.data.data || res.data.data.length === 0) {
            isAllLoaded.value = true
            return
        }

        // 将新数据添加到现有数据中
        photoGroups.value = [...photoGroups.value, ...res.data.data]
        totalPhotos.value = res.data.pagination.totalPhotos
    } catch (error) {
        toast.error('Error', {
            description: '加载更多数据失败！'
        })
        console.log(error)
        isAllLoaded.value = true // 出错时也标记为加载完成
    } finally {
        isLoadingMore.value = false
    }
}

/**
 * 检查滚动位置的方法
 */
const checkScrollPosition = () => {
    // 如果已经加载全部或正在加载中，则不处理
    if (isAllLoaded.value || isLoadingMore.value || isLoading.value)
        return

    const scrollPosition = window.scrollY
    const windowHeight = window.innerHeight
    const documentHeight = document.documentElement.scrollHeight

    // 当滚动到距离底部200px时触发加载更多
    if (scrollPosition + windowHeight >= documentHeight - 200) {
        loadMoreData()
    }
}

// 添加防抖处理
let scrollTimeout: number | null = null
const handleScroll = () => {
    if (scrollTimeout) {
        clearTimeout(scrollTimeout)
    }

    scrollTimeout = window.setTimeout(() => {
        checkScrollPosition()
    }, 200) // 200ms防抖
}

onMounted(() => {
    initData()
    // 添加滚动监听
    window.addEventListener('scroll', handleScroll)
})

onUnmounted(() => {
    // 移除滚动监听
    window.removeEventListener('scroll', handleScroll)
    if (scrollTimeout) {
        clearTimeout(scrollTimeout)
    }
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
    initData()
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
        <!-- 加载动画 -->
        <LinLoading :is-loading="isLoading">正在加载相册...</LinLoading>

        <!-- 相册内容 -->
        <div v-if="!isLoading" class="photo-content">
            <!-- 头部控制区 -->
            <div class="photo-header">
                <h1 class="photo-title">
                    我的相册
                </h1>
                <div class="photo-controls">
                    <LinButton @click="toggleOrder()">{{ query.order == 'desc' ? '最新优先' : '最早优先' }}</LinButton>
                    <div class="photo-count">
                        <span class="count-text">共 {{ totalPhotos }} 张</span>
                    </div>
                </div>
            </div>
            <div class="photo-timeline">
                <div v-for="group in photoGroups" :key="group.date" class="date-group">
                    <!-- 日期分割线 -->
                    <div class="date-divider">
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

            <!-- 加载更多提示 - 使用 LinLoading 组件替换原有加载动画 -->
            <div class="loading-more-container">
                <LinLoading :is-loading="isLoadingMore"
                    :is-all-loaded="isAllLoaded && !isLoadingMore && photoGroups.length > 0">
                    <template #text>加载更多照片...</template>
                    <template #allLoaded>已经到底啦</template>
                </LinLoading>
            </div>
        </div>
        <PhotoDetail :photo="selectedPhoto" :visible="isModalOpen" @close="closePhotoModal" />
    </div>
</template>
<style scoped lang="scss">
.photo-container {
    min-height: 100vh;
    background: linear-gradient(135deg,
            rgba(var(--color-background), 1) 0%,
            rgba(var(--color-background), 0.95) 100%);
    padding: 2rem;
    padding-top: 6rem;

    @media (max-width: 768px) {
        padding: 1rem;
        padding-top: 5rem;
    }
}


// 头部区域
.photo-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 3rem;
    padding-bottom: 1.5rem;
    border-bottom: 2px solid rgba(var(--color-text), 0.1);

    @media (max-width: 768px) {
        flex-direction: column;
        gap: 1.5rem;
        text-align: center;
    }
}

.photo-title {
    font-size: 2.5rem;
    font-weight: 700;
    color: rgba(var(--color-text), 1);
    display: flex;
    align-items: center;
    gap: 0.5rem;

    @media (max-width: 768px) {
        font-size: 2rem;
    }
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




// 时间线布局
.photo-timeline {
    .date-group {
        margin-bottom: 4rem;

        &:last-child {
            margin-bottom: 0;
        }
    }
}

// 重新设计的日期分割线
.date-divider {
    display: flex;
    align-items: center;
    margin-bottom: 2.5rem;
    position: relative;
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

// 加载更多容器样式
.loading-more-container {
    padding: 1rem 0;

    :deep(.loading-container) {
        height: auto;
        min-height: 100px;
    }
}

// 移除原有的 .loading-more 和 .loading-spinner 样式

// 移除原有的 @keyframes spin 动画

.all-loaded {
    text-align: center;
    padding: 2rem 0;
    color: rgba(var(--color-text), 0.5);
    font-size: 0.9rem;
    font-style: italic;
}
</style>