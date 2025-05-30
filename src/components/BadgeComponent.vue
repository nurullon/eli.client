<script setup>
import { ref } from 'vue'

const props = defineProps({
  status: {
    type: String,
    default: 'default'
  },
  type: {
    type: String,
    default: 'default'
  },
  content: {
    type: String
  }
})

const statusList = ref({
  CREATED: 'green',
  APPROVED: 'green',
  CANCELED: 'red',
  ON_APPEAL: 'orange',
  SENT: 'orange',
  CONFIRMED: 'green',
  ACCEPTED: 'green',
  ACCEPTED_BY_BANK: 'blue',
  REJECTED: 'red',
  DELETED: 'red',
  PENDING: 'orange',
  ERROR: 'red',
  FINISHED: 'green',
  default: 'grey',
  UNKNOWN_IN_BANK: 'orange',
  TO_APPROVE: 'blue'
})
</script>

<template>
  <a-tag :bordered="false" class="m-0 badge" :class="statusList[status]">
    <template v-if="content">
      {{ content }}
    </template>
    <template v-else>
      {{ $t(`badge_component.${status}`) }}
    </template>
  </a-tag>
</template>

<style lang="scss" scoped>
.badge {
  font-weight: 600;
  font-family: 'Gilroy', 'sans-serif';
  padding: 5px 8px;
  font-size: 12px;
  line-height: 14px;
  border: none !important;
}

.circle {
  border-radius: 10px !important;
}

.outline {
  background: transparent !important;
}

.orange {
  background-color: rgba(255, 165, 0, 0.1);
  color: rgb(255, 165, 0);
}

.blue {
  color: rgb(89, 105, 255);
  background-color: rgba(89, 105, 255, 0.1);
}

.red {
  color: rgb(255, 59, 48);
  background-color: rgba(255, 59, 48, 0.1);
}

.green {
  background-color: rgba(52, 199, 89, 0.1);
  color: rgb(52, 199, 89);
}

.grey {
  color: rgb(155, 162, 177);
  background-color: rgba(155, 162, 177, 0.1);
}
</style>
