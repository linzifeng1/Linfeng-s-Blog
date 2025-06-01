<script setup lang="ts">


interface Props {
    isLoading: boolean,
    isEmpty?: boolean,
    isLoaded?: boolean,
    isError?: boolean,
    height?: string,
}
const props = defineProps<Props>()
</script>
<template>
    <div class="lin-loading-wrapper" :style="{ height: props.height || '100vh', position: 'relative' }">
        <TransitionGroup name="fade" tag="div">
            <div v-if="props.isLoading" key="loading" class="state-container">
                <div class="loading-container">
                    <slot name="loadingContent">正在加载</slot>
                </div>
            </div>
            <div v-else-if="props.isEmpty" key="empty" class="state-container">
                <div class="empty-container">
                    <slot name="emptyContent">没有找到任何内容</slot>
                </div>
            </div>
            <div v-else-if="props.isError" key="error" class="state-container">
                <div class="error-container">
                    <slot name="errorContent">数据加载失败</slot>
                </div>
            </div>
            <div v-else-if="props.isLoaded" key="loaded" class="state-container">
                <div class="loaded-container">
                    <slot name="loadedContent">没有更多数据</slot>
                </div>
            </div>
        </TransitionGroup>
    </div>
</template>
<style scoped lang="scss">
.lin-loading-wrapper {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    position: relative;
}

.state-container {
    position: absolute;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
}

.loading-container,
.empty-container,
.error-container,
.loaded-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
}

// 过度动画
.fade-enter-active,
.fade-leave-active {
    transition: opacity 0.6s cubic-bezier(0.4, 0, 0.2, 1);
    pointer-events: none;
}

.fade-enter-from,
.fade-leave-to {
    opacity: 0;
}

.fade-enter-to,
.fade-leave-from {
    opacity: 1;
}
</style>