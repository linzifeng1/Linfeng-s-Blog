<script setup lang="ts">
defineProps<{direction: string}>();
</script>
<template>
    <div class="nav-container" :class="{'direction': direction === 'column'}">
        <slot></slot>
    </div>
</template>
<style scoped lang="scss">
.nav-container {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;
    max-height: 60px;
}

.direction {
    flex-direction: column;
    max-height: none;
}
</style>