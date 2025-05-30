<script setup>
import { onMounted, ref, watch } from 'vue'
import useKey from '@/composables/e-imzo/web/useKey.js'
// import PageLoaderComponent from '@/components/PageLoaderComponent.vue'
import { formatDate } from '@/helpers/index.js'

// store
import { storeToRefs } from 'pinia'
import useCore from '@/store/core.pinia.js'

const corePinia = useCore()
const { eimzoError } = storeToRefs(corePinia)
const [keys, pkcs7_64, getItem] = useKey()

//refs
const emits = defineEmits(['sign', 'cancel', 'change'])
const error = ref()
const selectedKey = ref(null)
const loading = ref(false)
const selectedKeyModel = defineModel('value')

function handleChangeSelect() {
  selectedKeyModel.value = keys.value.find(
    (key) => key.serialNumber === selectedKey.value
  )
  error.value = null
  emits('change')
}

watch(pkcs7_64, () => {
  if (
    pkcs7_64.value === 'error' ||
    pkcs7_64.value === 'ERI_PASSWORD_ENTRY_CANCELED' ||
    pkcs7_64.value === 'ERI_INVALID_PASSWORD'
  ) {
    corePinia.setToast({
      type: 'warning',
      locale: `eri_component.${pkcs7_64.value.toLowerCase()}`
    })
  } else if (pkcs7_64.value) {
    emits('sign', pkcs7_64.value)
  }
})

const generatePkcs7 = (data) => {
  if (selectedKey.value) {
    loading.value = true
    error.value = null
    pkcs7_64.value = null
    console.log(data)
    const a = keys.value?.filter((k) => k.serialNumber === selectedKey.value)
    getItem({
      ...a[0],
      UUID: data
    })
  } else {
    error.value = 'select_eri_key'
  }
}

defineExpose({
  generatePkcs7
})
</script>

<template>
  <div class="eri-key-select mb-2">
    <a-select
      v-model:value="selectedKey"
      @change="handleChangeSelect"
      class="eimzo-select"
      allow-clear
      placeholder="E-imzo kalitini tanlang"
    >
      <a-select-option
        v-for="(item, number) in keys"
        :value="item.serialNumber"
        :key="number"
        class="mb-2 min-h-[50px]"
      >
        <div class="w-full h-full rounded-xl" :disabled="item.expired">
          <div
            class="px-2 py-1 flex justify-start items-center bg-white rounded-xl"
          >
            <div class="flex-center">
              <svg
                width="40"
                height="40"
                viewBox="0 0 56 55"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  :class="{
                    'eimzo-icon-svg-disable': item.expired
                  }"
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M12.8148 4.66663C8.31467 4.66663 4.66663 8.31472 4.66663 12.8148V25.4074C4.66663 25.6119 4.83245 25.7777 5.037 25.7777H7.62959C7.83414 25.7777 7.99996 25.6119 7.99996 25.4074V16.1481C7.99996 11.6481 11.648 7.99996 16.1481 7.99996H39.8518C44.3519 7.99996 48 11.6481 48 16.1481V25.4074C48 25.6119 48.1658 25.7777 48.3703 25.7777H50.9629C51.1675 25.7777 51.3333 25.6119 51.3333 25.4074V12.8148C51.3333 8.31472 47.6852 4.66663 43.1851 4.66663H12.8148ZM51.3333 30.5926C51.3333 30.388 51.1675 30.2222 50.9629 30.2222H48.3703C48.1658 30.2222 48 30.388 48 30.5926V39.8518C48 44.3519 44.3519 48 39.8518 48H16.1481C11.648 48 7.99996 44.3519 7.99996 39.8518V30.5926C7.99996 30.388 7.83414 30.2222 7.62959 30.2222H5.037C4.83245 30.2222 4.66663 30.388 4.66663 30.5926V43.1851C4.66663 47.6852 8.31467 51.3333 12.8148 51.3333H43.1851C47.6852 51.3333 51.3333 47.6852 51.3333 43.1851V30.5926ZM39.8518 8.37033H16.1481C11.8526 8.37033 8.37033 11.8526 8.37033 16.1481V25.4074C8.37033 25.6119 8.53615 25.7777 8.7407 25.7777H10.0327C10.2195 25.7777 10.3768 25.6377 10.4033 25.4528C11.6388 16.841 19.0464 10.2222 28 10.2222C36.9535 10.2222 44.3611 16.841 45.5966 25.4528C45.6232 25.6377 45.7804 25.7777 45.9672 25.7777H47.2592C47.4638 25.7777 47.6296 25.6119 47.6296 25.4074V16.1481C47.6296 11.8526 44.1474 8.37033 39.8518 8.37033ZM42.9709 25.7777C43.1963 25.7777 43.3696 25.5773 43.3316 25.3551C42.0759 18.0238 35.6895 12.4444 28 12.4444C20.3104 12.4444 13.9241 18.0238 12.6683 25.3551C12.6303 25.5773 12.8036 25.7777 13.029 25.7777H15.6707C15.8495 25.7777 16.0022 25.6495 16.0389 25.4746C17.2025 19.9362 22.1156 15.7777 28 15.7777C33.8843 15.7777 38.7975 19.9362 39.961 25.4746C39.9977 25.6495 40.1504 25.7777 40.3292 25.7777H42.9709ZM12.6683 30.6448C12.6303 30.4226 12.8036 30.2222 13.029 30.2222H15.6707C15.8495 30.2222 16.0022 30.3504 16.0389 30.5253C17.2025 36.0637 22.1156 40.2222 28 40.2222C33.8843 40.2222 38.7975 36.0637 39.961 30.5253C39.9977 30.3504 40.1504 30.2222 40.3292 30.2222H42.9709C43.1963 30.2222 43.3696 30.4226 43.3316 30.6448C42.0759 37.9761 35.6895 43.5555 28 43.5555C20.3104 43.5555 13.9241 37.9761 12.6683 30.6448ZM10.0327 30.2222C10.2195 30.2222 10.3768 30.3622 10.4033 30.5471C11.6388 39.1589 19.0464 45.7777 28 45.7777C36.9535 45.7777 44.3611 39.1589 45.5966 30.5471C45.6232 30.3622 45.7804 30.2222 45.9672 30.2222H47.2592C47.4638 30.2222 47.6296 30.388 47.6296 30.5926V39.8518C47.6296 44.1473 44.1474 47.6296 39.8518 47.6296H16.1481C11.8526 47.6296 8.37033 44.1473 8.37033 39.8518V30.5926C8.37033 30.388 8.53615 30.2222 8.7407 30.2222H10.0327ZM28 35.7777C32.2955 35.7777 35.7777 32.2955 35.7777 28C35.7777 23.7044 32.2955 20.2222 28 20.2222C23.7044 20.2222 20.2222 23.7044 20.2222 28C20.2222 32.2955 23.7044 35.7777 28 35.7777ZM27.2592 25.7777C26.0319 25.7777 25.037 26.7727 25.037 28C25.037 29.2273 26.0319 30.2222 27.2592 30.2222H30.7777C30.9823 30.2222 31.1481 30.388 31.1481 30.5926V31.3333C31.1481 31.5378 30.9823 31.7037 30.7777
 31.7037H27.2592C25.2137 31.7037 23.5555 30.0455 23.5555 28C23.5555 25.9544 25.2137 24.2963 27.2592 24.2963H30.7777C30.9823 24.2963 31.1481 24.4621 31.1481 24.6666V25.4074C31.1481 25.6119 30.9823 25.7777 30.7777 25.7777H27.2592ZM30.9629 28.3703C30.9629 28.5749 30.7971 28.7407 30.5926 28.7407H27.6296C27.425 28.7407 27.2592 28.5749 27.2592 28.3703V27.6296C27.2592 27.425 27.425 27.2592 27.6296 27.2592H30.5926C30.7971 27.2592 30.9629 27.425 30.9629 27.6296V28.3703Z"
                  fill="#34C759"
                />
              </svg>
            </div>
            <div class="pl-2">
              <div class="eimzo-info mx-2">
                <span class="pnfl text-start">
                  {{ item.PINFL }}
                </span>
                <p class="line-clamp m-0 organization text-start">
                  {{ item.O ? item.O : item.CN }}
                </p>
                <span class="user text-start"
                  >{{ item.O ? item.CN : '' }}
                </span>
              </div>
            </div>
          </div>
        </div>
      </a-select-option>
    </a-select>

    <span
      class="eimzo-error-message"
      :class="{
        'on-error': error || selectedKeyModel?.expired,
        'text-danger': selectedKeyModel?.expired
      }"
    >
      {{
        selectedKeyModel?.expired
          ? `${$t('eri_component.eri_expired')}: ${formatDate(selectedKeyModel.validTo)}`
          : ''
      }}
      {{ error ? $t(`eri_component.${error?.toLowerCase()}`) : '' }}
    </span>
  </div>
</template>

<style scoped lang="scss">
@import '@/assets/styles/variable';

:deep(.ant-select-selection-placeholder)::before {
  content: url('@/components/icons/eri.svg');
  margin: 10px 10px 0 6px;
  opacity: 0.6;
}

:deep(.ant-select) {
  width: 100% !important;

  .ant-select-selection-placeholder {
    display: flex;
    font-size: 16px;
    align-items: center;
  }
}

:deep(.eimzo-select .ant-select-selector) {
  padding-left: 0 !important;
  height: 52px !important;
}

.eimzo-info {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  justify-items: flex-start;
  line-height: normal;

  .pnfl {
    font-size: 12px;
    color: $muted;
  }

  .user {
    font-size: 8px;
    color: $muted;
  }

  .organization {
    font-size: 16px;
    font-weight: 600;
    line-height: 18px;
    color: $body;
  }
}

.eimzo-icon-svg-disable {
  fill: $muted !important;
}

.border-danger {
  border: 1px solid $danger !important;
}

.eimzo-error-message {
  //position: absolute;
  //bottom: -5px;
  //left: 8px;
  line-height: normal;
  //opacity: 0;
  color: $danger;
  transition: all 0.3s ease-in-out;
}

.on-error {
  opacity: 1;
  transform: translateY(15px);
}
</style>
