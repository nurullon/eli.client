<script setup>
import { computed, h, ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { useRoute, useRouter } from 'vue-router'
import IconChevronLeftDouble from '@/components/icons/IconChevronLeftDouble.vue'
import IconChevronRightDouble from '@/components/icons/IconChevronRightDouble.vue'
import navigations from '@/routers/navigations.js'
import useCore from '@/store/core.pinia.js'
import { storeToRefs } from 'pinia'

const { t } = useI18n()

const route = useRoute()
const router = useRouter()

const coreStore = useCore()

const { collapsed } = storeToRefs(coreStore)

const menuList = navigations
  .filter((item) => item.meta.showMenu)
  .map((item) => ({
    label: item.name,
    name: item.name,
    icon: item.meta.icon,
    key: item.path
  }))

const selectedKeys = computed(() => [
  route.fullPath.split('/')[2].split('?')[0]
])

function navigate({ item }) {
  let query = {}
  if (route.fullPath.split('/')[2] === item.key) {
    query = route.query
  }
  router.push({
    name: item.name,
    query: query
  })
}
</script>

<template>
  <div class="flex flex-col gap-[2px] w-full menu">
    <a-menu @click="navigate" :selected-keys="selectedKeys" :items="menuList" mode="horizontal"
      class="ant-menu-custom-class w-full" />
  </div>
</template>

<style scoped lang="scss">
@use '@/assets/styles/variable' as *;

.menu {
  &:deep(.ant-menu-item) {
    display: flex;
    align-items: center;
    font-size: 16px;
    font-weight: 500;

    .ant-menu-title-content {
      line-height: 18px;
    }

    .ant-menu-item-icon {
      font-size: 20px !important;
    }
  }

  &:deep(.ant-menu-item-selected) {
    background: $primary;
    // color: #fff;
  }
}

.settings-menu {
  .setting-border {
    border-top: 1px solid rgb($muted, 1);
  }
}
</style>
