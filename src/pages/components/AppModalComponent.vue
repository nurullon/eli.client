<script setup>
import useModal from '@/store/modal.pinia.js'
import { storeToRefs } from 'pinia'
import { ref } from 'vue'

const modalPinia = useModal()
const { modals, visibleModal } = storeToRefs(modalPinia)
</script>

<template>
  <div v-for="modal in modals" :key="modal.props.modalKey" class="modal">
    <a-modal @cancel="modalPinia.close(modal.props.modalKey)" :open="visibleModal.has(modal.props.modalKey)"
      width="max-content" :footer="false" :title="false" :closable="false" :centered="true" destroy-on-close
      class="app-modal">
      <div class="modal-body max-w-[80vw] min-w-[200px] max-h-[80vh] min-h-[200px] flex-grow overflow-auto">
        <component :is="modal.component" v-bind="modal.props" v-on="modal?.emits" />
      </div>
    </a-modal>
  </div>
</template>

<style scoped lang="scss"></style>
