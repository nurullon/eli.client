<script setup>
import { computed, ref } from 'vue'
import { useRoute } from 'vue-router'
import IconArrowNarrowLeft from '@/components/icons/IconArrowNarrowLeft.vue'
import { useRouterHistoryCounter } from '@/composables/router.js'

const { back } = useRouterHistoryCounter()
const title = ref(document.title)

const route = useRoute()

const showCloseBtn = computed(() => Object.keys(route.params).length)
</script>

<template>
  <div class="flex justify-between items-center mb-4">
    <div class="flex items-center gap-2 pl-2">
      <a-button
        v-if="showCloseBtn"
        @click="back"
        class="!w-[40px] !h-[40px] border-none rounded-2xl shadow-none"
      >
        <template #icon>
          <IconArrowNarrowLeft class="text-xl" />
        </template>
      </a-button>
      <h1 class="m-0 text-2xl font-bold">{{ title }}</h1>
    </div>
    <a-space>
      <slot />
    </a-space>
  </div>
</template>

<style scoped lang="scss"></style>
