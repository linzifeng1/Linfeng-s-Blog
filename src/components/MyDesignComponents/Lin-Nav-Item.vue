<script setup lang="ts">
defineProps<{ index: string }>();
</script>
<template>
    <RouterLink :to="index" active-class="item-active" class="nav-item">
        <slot></slot>
    </RouterLink>
</template>
<style scoped lang="scss">
.nav-item {
    position: relative;
    display: flex;
    margin: 12px;
    font-size: 16px;
    color: rgb(var(--color-text));
    cursor: pointer;
    transition: all .3s, transform 0.15s cubic-bezier(0.4, 0, 0.2, 1);

    &:hover {
        color: $lin-c-primary;
        text-shadow: rgba(0, 123, 255, 0.5) 0px 0px 10px;
    }

    &::after {
        content: "";
        position: absolute;
        left: 0;
        bottom: -2px;
        width: 0;
        height: 2px;
        border-radius: 1px;
        background: $lin-c-primary;
        transition: width .3s;
    }

    &:hover::after {
        width: 100%;
    }

    &:active {
        transform: scale(0.92);
        transition: transform 0.12s cubic-bezier(0.4, 0, 0.2, 1);
    }

    &.item-active {
        color: $lin-c-primary;
        text-shadow: rgba(0, 123, 255, 0.5) 0px 0px 10px;

        &::after {
            width: 100%;
        }
    }
}
</style>