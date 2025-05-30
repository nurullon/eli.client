<script setup>
import AuthBannerComponent from '@/pages/auth/components/AuthBannerComponent.vue'
</script>

<template>
  <div class=" w-screen h-screen">
    <a-row class="h-full" justify="center">
      <a-col :sm="24" :md="24" :lg="12" :xl="14">
        <div
          class="h-full bg-slate-200 container px-16">
          <AuthBannerComponent />
        </div>
      </a-col>
      <a-col :sm="24" :md="24" :lg="12" :xl="10">
        <div
          class="h-full flex justify-center items-center ">

          <router-view></router-view>

        </div>
      </a-col>
    </a-row>
  </div>
</template>

<style scoped lang="scss">
@use '@/assets/styles/variable' as *;
</style>