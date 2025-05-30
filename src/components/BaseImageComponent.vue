<script setup>
import { ref } from 'vue'

const emits = defineEmits(['loaded', 'error'])
const props = defineProps({
  src: String,
  alt: String
})

const loading = ref(true)
const error = ref(false)

function onLoad() {
  loading.value = false
  emits('loaded')
}

function onError() {
  error.value = false
  emits('error')
}
</script>

<template>
  <div class="relative w-full h-full">
    <div
      v-if="loading && !src && !error"
      class="absolute top-0 left-0 z-10 w-full h-full"
    >
      <a-skeleton-image class="skeleton !w-full !h-full" />
    </div>
    <div v-if="src" class="absolute top-0 left-0 z-0 w-full h-full">
      <img
        @load="onLoad"
        @error="onError"
        :src="src"
        :alt="alt"
        class="base-image"
      />
    </div>
  </div>
</template>

<style scoped lang="scss">
.base-image {
  display: inline-block;
  width: 100%;
  height: 100%;
}

.skeleton {
  &:deep(.ant-skeleton-image) {
    width: 100%;
    height: 100%;
  }
}
</style>
