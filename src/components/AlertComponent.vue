<script setup>
import IconExclamationTriangle from '@/components/icons/IconExclamationTriangle.vue'
import IconCloseCircle from '@/components/icons/IconCloseCircle.vue'
import IconCheck from '@/components/icons/IconCheck.vue'
import IconQuestion from '@/components/icons/IconQuestion.vue'

const props = defineProps({
  type: {
    type: String,
    default: 'info'
  },
  content: {
    type: String
  }
})
</script>
<template>
  <a-alert :description="content" :type="type" show-icon>
    <template #icon>
      <template v-if="type === 'succes'">
        <IconCheck />
      </template>
      <template v-else-if="type === 'error'">
        <IconCloseCircle />
      </template>
      <template v-else-if="type === 'warning'">
        <IconQuestion />
      </template>
      <template v-else>
        <IconExclamationTriangle />
      </template>
    </template>
  </a-alert>
</template>

<style lang="scss">
.ant-alert-with-description {
  padding: 8px !important;
}

.ant-alert-icon {
  font-size: 18px !important;
  margin-right: 8px !important;
}

.ant-alert-content {
  font-size: 16px !important;
  line-height: 18px !important;
}

.ant-alert-info1 {
  color: rgb(89, 105, 255);
  border: 1px solid rgb(89, 105, 255);
  background-color: rgba(89, 105, 255, 0.1);
}

.ant-alert-info {
  color: rgb(89, 105, 255);
  border: 1px solid rgb(89, 105, 255);
  background-color: rgba(89, 105, 255, 0.1);
}

.ant-alert-info .ant-alert-icon {
  color: rgb(89, 105, 255) !important;
}

.ant-alert-error {
  color: rgb(255, 59, 48);
  background-color: rgba(255, 59, 48, 0.1);
  border: 1px solid rgb(255, 59, 48);
}

.ant-alert-error .ant-alert-icon {
  color: rgb(255, 59, 48) !important;
}

.ant-alert-succes {
  background-color: rgba(52, 199, 89, 0.1);
  color: rgb(52, 199, 89);
  border: 1px solid rgb(52, 199, 89);
}

.ant-alert-succes .ant-alert-icon {
  color: rgb(52, 199, 89) !important;
}

.ant-alert-warning {
  background-color: rgba(255, 165, 0, 0.1) !important;
  border: 1px solid rgb(255, 165, 0) !important;
  color: rgb(255, 165, 0) !important;
}

.ant-alert-warning .ant-alert-icon {
  color: rgb(255, 165, 0) !important;
}
</style>
