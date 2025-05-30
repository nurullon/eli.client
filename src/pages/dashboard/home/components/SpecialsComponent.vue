<template>
  <div>
    <div class="flex justify-between mt-6 mb-4">
      <h3 class="text-lg md:text-xl lg:text-2xl font-semibold">Популярные специализации</h3>
      <router-link to="/dashboard/specialities" class="text-primary hover:underline">Посмотреть все</router-link>
    </div>

    <div v-if="loading" class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
      <div
        v-for="i in 6"
        :key="i"
        class="rounded-xl bg-white p-3 shadow-custom animate-pulse"
      >
        <div class="w-full aspect-square bg-gray-200 rounded-xl mb-3"></div>
        <div class="h-4 bg-gray-300 rounded w-3/4 mx-auto"></div>
      </div>
    </div>

    <a-row v-else :gutter="[24, 24]">
      <a-col
        v-for="item in limitedSpecialties"
        :key="item.id"
        :xs="12"
        :sm="8"
        :md="6"
        :lg="4"
        :xl="4"
        class="text-center cursor-pointer"
        @click="goToDoctors(item.id)"
      >
        <img
          :src="getImageUrl(item.imageUrl)"
          alt="Специализация"
          class="w-full aspect-square object-cover rounded-2xl shadow-custom transition-all hover:shadow-lg"
        />
        <h3 class="mt-2 text-base md:text-lg font-semibold text-gray-700">{{ item.name }}</h3>
      </a-col>
    </a-row>
  </div>
</template>

<script setup>
import { onMounted, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useSpecialtiesStore } from '@/store/specialties.pinia.js'

const router = useRouter()
const store = useSpecialtiesStore()

const specialties = computed(() => store.specialties)
const loading = computed(() => store.loading)

const limitedSpecialties = computed(() =>
  specialties.value.length > 6 ? specialties.value.slice(0, 6) : specialties.value
)

onMounted(() => {
  store.getAllSpecialties()
})

import spec1 from '@/assets/images/spec1.jpg'

const getImageUrl = (path) => {
  if (!path || typeof path !== 'string' || !path.trim()) {
    return spec1
  }
  return `${import.meta.env.VITE_API_URL}/${path}`
}
const goToDoctors = (id) => {
  router.push({ path: '/dashboard/doctors', query: { specializationId: id } })
}
</script>

<style scoped lang="scss">
.shadow-custom {
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}
</style>