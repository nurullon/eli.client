<template>
  <div>
    <div class="flex justify-between mt-4 md:mt-6 lg:mt-10 mb-3 md:mb-4 lg:mb-6">
      <h3 class="text-lg md:text-xl lg:text-2xl font-semibold">Лучшие врачи</h3>
      <router-link to="/dashboard/doctors" class="text-primary hover:underline">Посмотреть всех</router-link>
    </div>

    <div v-if="loading" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <a-card v-for="i in 6" :key="i" class="rounded-xl overflow-hidden">
        <a-skeleton avatar :paragraph="{ rows: 3 }" active />
      </a-card>
    </div>

    <div v-else @click="navigateToAppointment(doctor.id)">
      <DoctorCard :data="limitedDoctors" />
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import DoctorCard from '@/components/DoctorCard.vue'
import useDoctorsStore from '@/store/doctors.pinia.js'

const doctorsStore = useDoctorsStore()
const topDoctors = ref([])
const loading = ref(true)
const router = useRouter()

const limitedDoctors = computed(() =>
  topDoctors.value.length > 3 ? topDoctors.value.slice(0, 3) : topDoctors.value
)


const navigateToAppointment = (doctorId) => {
  if (doctorId) {
    router.push(`appointments/${doctorId}`)
  } else {
    router.push('appointments'); 
  }
}

onMounted(async () => {
  loading.value = true
  await doctorsStore.fetchDoctorsWithCustom({
    RatingDesc: true,
    ExperienceDesc: true
  })
  topDoctors.value = doctorsStore.doctors
  loading.value = false
})
</script>