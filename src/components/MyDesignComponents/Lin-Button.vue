<script setup lang="ts">
defineProps({
    type: {
        type: String,
        default: 'primary',
        validator: (value: string) => {
            return ['primary', 'success', 'warning', 'error'].includes(value);
        },
    },
    disabled: {
        type: Boolean,
        default: false,
    }
});
</script>
<template>
    <button
        class="lin-btn"
        :class="{
            'lin-btn--primary': type === 'primary',
            'lin-btn--success': type === 'success',
            'lin-btn--warning': type === 'warning',
            'lin-btn--error': type === 'error',
            'is-disabled': disabled
        }"
        :disabled="disabled"
    >
        <slot></slot>
    </button>
</template>
<style scoped lang="scss">
.lin-btn {
    padding: 0.5rem 1.5rem;
    border-radius: 12px;
    font-size: 1rem;
    font-weight: 600;
    border: 1px solid transparent;
    cursor: pointer;
    transition: all 0.3s cubic-bezier(0.23, 1, 0.32, 1);
    outline: none;
    background: white;
    box-shadow: none;
    &:hover:not(.is-disabled) {
        transform: translateY(-3px) scale(1.03);
        box-shadow: 0 4px 12px rgba(77, 163, 255, 0.10);
    }
    &.is-disabled {
        opacity: 0.6;
        cursor: not-allowed;
        pointer-events: none;
    }
}
.lin-btn--primary {
    background: rgba(77, 163, 255, 0.08);
    border: 1px solid rgba(77, 163, 255, 0.15);
    color: $lin-c-primary;
    &:hover:not(.is-disabled) {
        background: rgba(77, 163, 255, 0.15);
        box-shadow: 0 4px 12px rgba(77, 163, 255, 0.15);
    }
}
.lin-btn--success {
    background: rgba(76, 175, 80, 0.08);
    border: 1px solid rgba(76, 175, 80, 0.15);
    color: $lin-c-success;
    &:hover:not(.is-disabled) {
        background: rgba(76, 175, 80, 0.15);
        box-shadow: 0 4px 12px rgba(76, 175, 80, 0.15);
    }
}
.lin-btn--warning {
    background: rgba(255, 152, 0, 0.08);
    border: 1px solid rgba(255, 152, 0, 0.15);
    color: $lin-c-warning;
    &:hover:not(.is-disabled) {
        background: rgba(255, 152, 0, 0.15);
        box-shadow: 0 4px 12px rgba(255, 152, 0, 0.15);
    }
}
.lin-btn--error {
    background: rgba(255, 82, 82, 0.08);
    border: 1px solid rgba(255, 82, 82, 0.15);
    color: $lin-c-error;
    &:hover:not(.is-disabled) {
        background: rgba(255, 82, 82, 0.15);
        box-shadow: 0 4px 12px rgba(255, 82, 82, 0.15);
    }
}
</style>