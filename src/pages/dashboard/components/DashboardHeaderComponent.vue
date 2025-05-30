<template>
  <div class="dashboard-header w-full flex justify-end bg-white px-14 py-2">
    <div class="w-full flex justify-between items-center">
      <div class="flex gap-2 items-center">
        <router-link to="/dashboard">
          <img class="w-20 mr-2" src="@/assets/images/logo_2.svg" alt="" />
        </router-link>
      </div>

      <div class="self-center">
        <dashboard-menu-component />
      </div>

      <div class="flex items-center gap-10">
        <a-dropdown trigger="click">
          <header-user-component :user="user" />
          <template #overlay>
            <a-menu>
              <a-dropdown placement="leftTop">
                <a-menu-item>
                  <template #icon>
                    <IconTranslate />
                  </template>
                  {{ $t('header_component.language') }}
                  ({{ $t(`translate_component.${langObj[lang]}`) }})
                </a-menu-item>
                <template #overlay>
                  <translate-component />
                </template>
              </a-dropdown>
              <a-menu-item class="!text-red" @click="authStore.logout">
                <template #icon>
                  <IconLogOut />
                </template>
                {{ $t('header_component.logout') }}
              </a-menu-item>
            </a-menu>
          </template>
        </a-dropdown>
      </div>
    </div>
  </div>
</template>


<script setup>
import useUser from '@/store/user.pinia.js'
import { storeToRefs } from 'pinia'
import HeaderUserComponent from '@/pages/dashboard/components/HeaderUserComponent.vue'
import useCore from '@/store/core.pinia.js'
import useAuth from '@/store/auth.pinia.js'
import TranslateComponent from '@/components/TranslateComponent.vue'
import { ref } from 'vue'

// icons
import IconNotification from '@/components/icons/IconNotification.vue'
import IconTranslate from '@/components/icons/IconTranslate.vue'
import IconLogOut from '@/components/icons/IconLogOut.vue'
import DashboardMenuComponent from './DashboardMenuComponent.vue'

const coreStore = useCore()
const userStore = useUser()
const authStore = useAuth()
const { user } = storeToRefs(userStore)

const lang = localStorage.getItem('lang') ?? 'ru'
const langObj = ref({
  ru: 'russian',
  en: 'english'
})
</script>

<style scoped lang="scss">
.dashboard-header {
  -webkit-box-shadow: -6px -4px 10px -3px rgba(0, 0, 0, 0.75);
  -moz-box-shadow: -6px -4px 10px -3px rgba(0, 0, 0, 0.75);
  box-shadow: -6px -4px 10px -3px rgba(0, 0, 0, 0.75);
}
</style>
