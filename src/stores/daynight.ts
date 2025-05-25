import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useDayNightStore = defineStore('daynight', () => {
    const isNight = ref<boolean>(false)
    const toggleMode = () => {
        isNight.value = !isNight.value
        // 切换主题颜色
        document.documentElement.setAttribute('data-theme', isNight.value ? 'dark' : 'light')
    }

    return {
        isNight,
        toggleMode
    }
})