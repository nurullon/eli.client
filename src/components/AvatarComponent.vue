<script setup>
import { ref, watch } from 'vue'

const props = defineProps({
  name: {
    type: String,
    default: ''
  },
  image: String
})
const nameLetter = ref('')
watch(
  () => props.name,
  () => {
    const name = props.name.split(' ')
    if (name.length) {
      if (name[0] && name[1]) {
        nameLetter.value = `${name?.[0]?.slice(0, 1).toUpperCase()}${name?.[1]?.slice(0, 1).toUpperCase()}`
      } else {
        nameLetter.value = `${name?.[0]?.slice(0, 1).toUpperCase()}`
      }
    }
  },
  { immediate: true }
)
</script>

<template>
  <a-flex class="avatar" align="center" gap="small">
    <a-badge dot>
      <a-avatar v-if="image" :src="image" size="large"></a-avatar>
      <a-avatar v-else :src="image" size="large">
        <span>{{ nameLetter }}</span>
      </a-avatar>
    </a-badge>
  </a-flex>
</template>

<style lang="scss" scoped>
@use '@/assets/styles/variable' as *;


:deep(.ant-badge-dot) {
  right: 6px;
  top: 6px;
}

.avatar {
  .ant-avatar {
    border: 1px solid rgba(88, 179, 211, 0.1);
    background-color: rgba(88, 179, 211, 0.1);
  }

  span {
    color: $primary;
    font-weight: bold;
  }
}

.avatar-info {
  h3 {
    margin-bottom: 4px !important;
    font-size: 14px;
    text-transform: capitalize;
  }

  p {
    font-size: 12px;
    margin-bottom: 0 !important;
  }
}
</style>
