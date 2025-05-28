<script setup lang="ts">

</script>


<template>
    <div class="lin-background">
        <div class="floating-shape shape-1"></div>
        <div class="floating-shape shape-2"></div>
        <div class="floating-shape shape-3"></div>
    </div>
</template>


<style scoped lang="scss">
.lin-background {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    pointer-events: none;
    z-index: 0;
}

.floating-shape {
    position: absolute;
    border-radius: 50%;
    background: linear-gradient(45deg, rgba(77, 163, 255, 0.1), rgba(77, 163, 255, 0.1));

    &.shape-1 {
        width: 300px;
        height: 300px;
        top: 10%;
        right: -150px;
        animation: slideInRight 2s ease;
    }

    &.shape-2 {
        width: 200px;
        height: 200px;
        bottom: 20%;
        left: -100px;
        animation: slideInLeft 2s ease;
    }

    &.shape-3 {
        width: 150px;
        height: 150px;
        top: 60%;
        right: 20%;
        animation: popIn 2s ease;
    }
}
</style>