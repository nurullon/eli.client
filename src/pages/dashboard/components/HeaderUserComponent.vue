<template>
  <a-dropdown trigger="click">
    <div
      class="flex gap-3 items-center cursor-pointer hover:bg-gray-100 px-3 py-2 rounded-xl transition-all duration-200"
    >
      <div>
        <avatar-component :name="fullName" size="large" />
      </div>

      <div class="flex flex-col justify-center">
        <h3 class="text-base font-semibold text-gray-800 m-0 leading-tight">
          {{ fullName }}
        </h3>
        <p class="text-xs text-gray-400 m-0 mt-[2px]">Добро пожаловать!</p>
      </div>
    </div>
  </a-dropdown>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import AvatarComponent from '@/components/AvatarComponent.vue'
import usePatient from '@/store/patient.pinia.js'

const patientStore = usePatient()
const fullName = ref('')

onMounted(async () => {
  await patientStore.getPatient()
  const user = patientStore.patient?.user
  if (user) {
    fullName.value = `${user.firstName ?? ''} ${user.lastName ?? ''}`.trim()
  }
})
</script>

