<script setup>
import PageLoader from '@/assets/lottie/PageLoader.json'
import { Vue3Lottie } from 'vue3-lottie'
import { computed } from 'vue'

const props = defineProps({
  loading: Boolean,
  size: {
    type: String,
    default: 'default',
    validator: (value) => ['small', 'default', 'large'].includes(value)
  }
})
const loaderSize = computed(() => {
  if (props.size === 'default') {
    return 80
  } else if (props.size === 'large') {
    return 100
  } else if (props.size === 'small') {
    return 50
  }
})
</script>

<template>
  <div class="relative w-full h-full">
    <template v-if="loading">
      <div class="loading-mask absolute z-10 top-0 left-0 w-full h-full"></div>
      <div class="loading absolute z-20 top-0 left-0 w-full h-full flex-center">
        <vue3-lottie
          :animation-data="PageLoader"
          :width="loaderSize"
          :height="loaderSize"
          :auto-play="true"
        />
      </div>
    </template>
    <slot />
  </div>
</template>

<style scoped lang="scss">
@import '@/assets/styles/variable';

.loading-mask {
  background: rgb($muted, 0.05);
  //opacity: 0.4;
}
</style>
