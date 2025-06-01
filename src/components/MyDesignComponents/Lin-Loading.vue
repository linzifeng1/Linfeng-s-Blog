<script setup lang="ts">
/**
 * isLoading: 是否显示加载中视图
 * isAllLoaded: 是否显示没有更多数据视图
 * noData: 是否显示空数据状态
 * loadingHeight: 加载容器的高度，默认为100vh
 */
defineProps<{
    isLoading: boolean,
    isAllLoaded?: boolean,
    noData?: boolean,
    loadingHeight?: string
}>();
</script>
<template>
    <div class="lin-loading-wrapper">
        <transition name="fade-slide">
            <div v-if="isLoading" class="loading-container" :style="{ height: loadingHeight || '100vh' }">
                <div class="loading-animation">
                    <div class="loading-dots">
                        <div class="dot"></div>
                        <div class="dot"></div>
                        <div class="dot"></div>
                    </div>
                    <div class="loading-text">
                        <slot name="text">加载中...</slot>
                    </div>
                </div>
            </div>
        </transition>
        
        <transition name="fade-slide">
            <div v-if="isAllLoaded && !isLoading" class="all-loaded-text">
                <div class="no-more-line"></div>
                <slot name="allLoaded">没有更多数据</slot>
                <div class="no-more-line"></div>
            </div>
        </transition>
        
        <!-- 新增空状态 -->
        <transition name="fade-slide">
            <div v-if="noData && !isLoading" class="empty-state">
                <div class="empty-icon">
                    <slot name="emptyIcon">📝</slot>
                </div>
                <h3 class="empty-title">
                    <slot name="emptyTitle">暂无数据</slot>
                </h3>
                <p class="empty-text">
                    <slot name="emptyText">暂时没有找到任何内容</slot>
                </p>
            </div>
        </transition>
    </div>
</template>
<style scoped lang="scss">
.lin-loading-wrapper {
    position: relative;
}

// 过渡动画
.fade-slide-enter-active,
.fade-slide-leave-active {
    transition: opacity 0.5s ease, transform 0.5s ease;
}

.fade-slide-enter-from {
    opacity: 0;
    transform: translateY(20px);
}

.fade-slide-leave-to {
    opacity: 0;
    transform: translateY(-20px);
}

// 优化后的加载动画
.loading-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
}

.loading-animation {
    text-align: center;
}

.loading-dots {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 0.5rem;
    margin-bottom: 2rem;

    .dot {
        width: 12px;
        height: 12px;
        border-radius: 50%;
        background: $lin-c-primary;
        animation: dotPulse 1.4s ease-in-out infinite both;

        &:nth-child(1) {
            animation-delay: -0.32s;
        }

        &:nth-child(2) {
            animation-delay: -0.16s;
        }

        &:nth-child(3) {
            animation-delay: 0s;
        }
    }
}

@keyframes dotPulse {
    0%,
    80%,
    100% {
        transform: scale(0.8);
        opacity: 0.5;
    }

    40% {
        transform: scale(1.2);
        opacity: 1;
    }
}

.loading-text {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.5rem;
    color: rgba(var(--color-text), 0.8);
    font-size: 1.2rem;
    font-weight: 500;
}

.all-loaded-text {
    display: flex;
    align-items: center;
    justify-content: center;
    color: rgba(var(--color-text), 0.5);
    text-align: center;
    font-size: 1.1rem;
    margin: 2rem 0 1rem 0;

    .no-more-line {
        flex: 1;
        margin: 2rem;
        height: 1px;
        background: rgba(var(--color-reverse-background), 0.1);
        max-width: 120px;
    }
}

// 新增空状态样式
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
</style>