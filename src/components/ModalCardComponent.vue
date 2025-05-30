<script setup>
import useModal from '@/store/modal.pinia.js'
import IconClose from '@/components/icons/IconClose.vue'
import PageLoaderComponent from '@/components/PageLoaderComponent.vue'
import { useSlots } from 'vue'

const props = defineProps({
  title: String,
  description: String,
  closeBtn: {
    type: Boolean,
    default: true
  },
  width: String,
  loading: {
    type: Boolean,
    default: false
  },
  opacity: Boolean,
  backBtn: {
    type: Boolean,
    default: false
  },
  modalKey: {
    type: [Number, String],
    required: true
  }
})

const modalPinia = useModal()
</script>

<template>
  <page-loader-component :loading="loading" size="small">
    <div
      :style="{ width: width }"
      class="flex flex-col max-h-[80vh] p-4"
      :class="{ 'pb-0': $slots.footer, 'opacity-0': opacity }"
    >
      <div class="header flex-center-between pb-4">
        <div class="flex-y-center gap-4 pl-4">
          <div>
            <h2
              v-show="title"
              class="line-clamp-1 text-base leading-[18px] font-bold !m-0"
            >
              {{ title }}
            </h2>
            <p
              v-show="description"
              class="line-clamp-1 text-sm font-semibold leading-4 text-muted !m-0"
            >
              {{ description }}
            </p>
          </div>
        </div>
        <div>
          <a-space>
            <slot name="actions" />
            <a-button
              v-if="closeBtn"
              @click="modalPinia.close(modalKey)"
              class="border-none !rounded-xl text-xl !w-10 !h-10"
              size="middle"
            >
              <template #icon>
                <IconClose />
              </template>
            </a-button>
          </a-space>
        </div>
      </div>
      <div class="body overflow-y-auto">
        <slot name="body" />
      </div>
      <div
        v-if="$slots.footer"
        class="footer py-4 px-4 mx-[-16px] border-t-[1px] border-t-gray-200"
      >
        <slot name="footer" />
      </div>
    </div>
  </page-loader-component>
</template>

<style scoped lang="scss"></style>
