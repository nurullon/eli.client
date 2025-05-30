<script setup>
import { Vue3Lottie } from 'vue3-lottie'
import ScreenLoader from '@/assets/lottie/ScreenLoader.json'

defineProps({
  loading: Boolean
})
</script>

<template>
  <div class="relative w-full h-full">
    <div v-if="loading" class="absolute inset-0 flex items-center justify-center bg-white/70 z-50">
      <Vue3Lottie
        :animationData="ScreenLoader"
        :width="100"
        :height="100"
        :autoPlay="true"
      />
    </div>
    <slot v-else />
  </div>
</template>

<style scoped>
.flex-center {
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
