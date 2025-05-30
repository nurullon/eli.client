<script setup>
import useCore from '@/store/core.pinia.js'
import IconChevronRight from '@/components/icons/IconChevronRight.vue'
import { storeToRefs } from 'pinia'
import IconCheck from '@/components/icons/IconCheck.vue'

const corePinia = useCore()
const { locale } = storeToRefs(corePinia)

function handleChangeTranslate(value) {
  corePinia.changeLocale(value)
}
</script>

<template>
  <a-menu class="">
    <a-menu-item @click="handleChangeTranslate('uz')" class="cursor-pointer">
      <template #icon>
      </template>
      <div class="dropdown-content flex justify-between items-center ml-2">
        <span class="dropdown-content-title">
          {{ $t('translate_component.latin') }}
        </span>
        <div class="chevron-right-con flex items-center">
          <span
            v-if="locale === 'uz'"
            class="text-primary flex items-center ml-3"
          >
            <span class="!leading-4 text-sm font-medium text-primary">
              <IconCheck />
            </span>
          </span>
        </div>
      </div>
    </a-menu-item>
    <a-menu-item @click="handleChangeTranslate('ru')" class="cursor-pointer">
      <template #icon>
      </template>
      <div class="dropdown-content flex justify-between items-center ml-2">
        <span class="dropdown-content-title">
          {{ $t('translate_component.russian') }}
        </span>
        <div class="chevron-right-con flex items-center text-sm font-medium">
          <span
            v-if="locale === 'ru'"
            class="text-primary flex items-center mr-3"
          >
            <span class="!leading-4 text-sm font-medium text-primary">
              <IconCheck />
            </span>
          </span>
        </div>
      </div>
    </a-menu-item>
  </a-menu>
</template>

<style scoped lang="scss"></style>
