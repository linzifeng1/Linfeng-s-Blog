<script setup lang="ts">
defineProps({
    type: {
        type: String,
        default: 'primary',
        validator: (value: string) => {
            return ['primary', 'success', 'warning', 'error'].includes(value);
        },
    },
    circle: {
        type: Boolean,
        default: false,
    },
});
</script>
<template>
    <div class="lin-tag" :class="{
        'lin-tag--primary': type === 'primary',
        'lin-tag--success': type === 'success',
        'lin-tag--warning': type === 'warning',
        'lin-tag--error': type === 'error',
        'lin-tag--circle': circle,
    }">
        <slot></slot>
    </div>
</template>
<style scoped lang="scss">
.lin-tag {
    // 形状与内边距
    padding: 0.35rem 0.9rem;
    border-radius: 12px;
    font-size: 0.85rem;
    font-weight: 500;

    // 过渡效果
    transition: all 0.3s cubic-bezier(0.23, 1, 0.32, 1); // 平滑过渡

    // 基础悬停效果
    &:hover {
        transform: translateY(-3px); // 上浮效果
    }

    // 圆角样式
    &.lin-tag--circle {
        border-radius: 50px; // 设置为高度的一半，实现左右纯圆角
    }
}

.lin-tag--primary {
    background: rgba(77, 163, 255, 0.08); // 淡蓝色背景
    border: 1px solid rgba(77, 163, 255, 0.15); // 细边框
    color: $lin-c-primary;

    &:hover {
        background: rgba(77, 163, 255, 0.15); // 加深背景色
        box-shadow: 0 4px 12px rgba(77, 163, 255, 0.15); // 添加阴影
    }
}

.lin-tag--success {
    background: rgba(76, 175, 80, 0.08); // 淡绿色背景
    border: 1px solid rgba(76, 175, 80, 0.15); // 细边框
    color: $lin-c-success;

    &:hover {
        background: rgba(76, 175, 80, 0.15); // 加深背景色
        box-shadow: 0 4px 12px rgba(76, 175, 80, 0.15); // 添加阴影
    }
}

.lin-tag--warning {
    background: rgba(255, 152, 0, 0.08); // 淡橙色背景
    border: 1px solid rgba(255, 152, 0, 0.15); // 细边框
    color: $lin-c-warning;

    &:hover {
        background: rgba(255, 152, 0, 0.15); // 加深背景色
        box-shadow: 0 4px 12px rgba(255, 152, 0, 0.15); // 添加阴影
    }
}

.lin-tag--error {
    background: rgba(255, 82, 82, 0.08); // 淡红色背景
    border: 1px solid rgba(255, 82, 82, 0.15); // 细边框
    color: $lin-c-error;

    &:hover {
        background: rgba(255, 82, 82, 0.15); // 加深背景色
        box-shadow: 0 4px 12px rgba(255, 82, 82, 0.15); // 添加阴影
    }
}
</style>
