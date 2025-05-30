<script setup>
import { useRouter } from 'vue-router'

const router = useRouter()
const goHome = () => {
  router.push('/')
}
</script>

<template>
  <div class="h-screen flex-center flex-col">
    <h1 class="font-bold text-2xl">
      {{ $t('error_page.internal_server_error') }}
    </h1>
    <a-button @click="goHome" type="primary" size="large">
      {{ $t('error_page.go_home') }}
    </a-button>
  </div>
</template>

<style scoped>
.title {
  line-height: 32px;
  font-weight: bolder;
}
</style>
