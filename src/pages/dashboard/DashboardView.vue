<script setup>
import { storeToRefs } from 'pinia'
import useCore from '@/store/core.pinia.js'
import DashboardMenuComponent from '@/pages/dashboard/components/DashboardMenuComponent.vue'
import DashboardHeaderComponent from '@/pages/dashboard/components/DashboardHeaderComponent.vue'
import { onMounted } from 'vue'
import useUser from '@/store/user.pinia.js'
import ScreenLoaderComponent from '@/components/ScreenLoaderComponent.vue'

const corePinia = useCore()
const userPinia = useUser()

const { loadingMain } = storeToRefs(corePinia)

onMounted(() => {
  userPinia.getUserMe()
})
</script>

<template>
  <template v-if="!loadingMain">
    <div class="bg-muted-opacity min-h-screen flex">
      <div class="w-screen h-screen flex flex-col">
        <dashboard-header-component />
        <div class="h-full flex justify-between gap-4 pr-4 md:pl-4">
          <!-- <div class="my-4">
            <dashboard-menu-component class="hidden md:block lg:block "/>
          </div> -->
          <div class="overflow-y-auto flex-grow py-4">
            <div class="container">
              <router-view />
            </div>
          </div>
        </div>
      </div>
    </div>
  </template>
  <!-- loader -->
  <template v-else>
    <div class="w-screen h-screen">
      <screen-loader-component :loading="loadingMain" />
    </div>
  </template>
</template>

<style scoped lang="scss"></style>
