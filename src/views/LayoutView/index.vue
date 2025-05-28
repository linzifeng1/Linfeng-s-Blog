<script setup lang="ts">
import { RouterView } from 'vue-router'
import LayoutNavbar from './components/LayoutNavbar.vue';
import LayoutFooter from './components/LayoutFooter.vue';

</script>
<template>
    <div class="layout-container">
        <LayoutNavbar class="navbar-slide-down" />
        <RouterView />
        <LayoutFooter />
    </div>
</template>
<style scoped lang="scss">
.layout-container {
    display: flex;
    flex-direction: column;
    width: 100%;
    padding-top: 4rem;// 留出顶部nav的空间
}


.navbar-slide-down {
    position: fixed;
    z-index: 999;
    animation: navbarDropDown 1s cubic-bezier(0.23, 1, 0.32, 1);
    top: 0;
    left: 0;
}

@keyframes navbarDropDown {
    0% {
        opacity: 0;
        transform: translateY(-60px);
    }

    100% {
        opacity: 1;
        transform: translateY(0);
    }
}
</style>