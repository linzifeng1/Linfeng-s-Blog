<script setup lang="ts">
import { RouterView } from 'vue-router'
import { Toaster } from 'vue-sonner'
import 'vue-sonner/style.css'

document.documentElement.setAttribute('data-theme', 'light')
</script>

<template>
  <Toaster position="top-center"  />
  <RouterView />
</template>

<style scoped lang="scss"></style>
