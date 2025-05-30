<script setup>
import { computed, onMounted, ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useQueryParams } from '@/composables/router.js'

const route = useRoute()
const router = useRouter()

const { setQueries } = useQueryParams()

const emits = defineEmits(['changeSize', 'changePage'])
const pageSizeOptions = ref([10, 20, 30, 40, 50])

const currentPage = computed(() => (route.query.page ? +route.query.page : 1))
const size = computed(() => (route.query.size ? +route.query.size : 10))

const props = defineProps({
  total: {
    type: Number,
    default: 100
  }
})

function handleChangeSelect(event) {
  emits('changeSize', event)
  setQueries({
    page: 1,
    size: event
  })
}

const onChange = (e) => {
  emits('changePage', e)
  setQueries({
    page: e
  })
}
</script>

<template>
  <div class="pagination w-full flex-center-between">
    <div class="p-[8px] bg-white rounded-2xl">
      <a-select
        size="large"
        ref="select"
        :value="size"
        style="width: 180px"
        @change="handleChangeSelect"
      >
        <a-select-option
          v-for="item in pageSizeOptions"
          :value="item"
          :key="item"
        >
          <p class="flex flex-col">
            <span class="text-xs text-muted">
              {{ $t('pagination_component.show_by') }}
            </span>
            <span class="text-sm font-bold">{{ item }}</span>
          </p>
        </a-select-option>
      </a-select>
    </div>
    <div class="p-[8px] bg-white rounded-2xl">
      <a-pagination
        :current="currentPage"
        :page-size="size"
        :total="total"
        :show-size-changer="false"
        @change="onChange"
      />
    </div>
  </div>
</template>

<style lang="scss">
@import '@/assets/styles/variable.scss';

.pagination {
  .ant-pagination {
    .ant-pagination-prev,
    .ant-pagination-next {
      button {
        color: $muted !important;
      }

      button:hover {
        color: $primary !important;
      }
    }

    .ant-pagination-item {
      a {
        color: $muted !important;
      }
    }

    .ant-pagination-item-active {
      border: none !important;
      background-color: $light !important;

      a {
        color: #000 !important;
      }
    }
  }

  .ant-select-selector {
    border-color: $light !important;
  }
}
</style>
