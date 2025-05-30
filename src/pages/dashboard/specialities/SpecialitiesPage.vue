<template>
  <div class="mb-4">
    <div class="flex justify-end mb-6">
      <a-input-search
        v-model:value="search"
        placeholder="Поиск специализаций"
        allowClear
        enter-button
        @search="onSearch"
        class="w-full md:w-[300px]"
      />
    </div>

    <div
      v-if="specialtiesStore.loading"
      class="flex justify-center items-center h-64"
    >
      <a-spin size="large" />
    </div>

    <div
      v-else
      class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 md:px-20 xl:px-40"
    >
      <a-card
        hoverable
        v-for="item in specialties"
        :key="item.id"
        @click="goToDoctors(item.id)"
        class="cursor-pointer"
      >
        <a-row :gutter="[20, 0]" class="items-center">
          <a-col span="8">
            <img
              :src="getImageUrl(item.imageUrl)"
              class="w-full rounded-xl aspect-square shadow-xl object-cover"
              alt="specialization"
            />
          </a-col>
          <a-col span="16">
            <h3 class="text-lg font-semibold">{{ item.name }}</h3>
            <p class="text-gray-700 text-base">
              {{ item.description || '' }}
            </p>
          </a-col>
        </a-row>
      </a-card>
    </div>

    <div class="flex justify-end mt-6">
      <a-pagination
        :current="specialtiesStore.pageNumber"
        :pageSize="specialtiesStore.pageSize"
        :total="specialtiesStore.totalCount"
        @change="handlePageChange"
        class="flex justify-end w-full sm:w-auto"
      />
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue'
import { useRouter } from 'vue-router'
import { useSpecialtiesStore } from '@/store/specialties.pinia'

const specialtiesStore = useSpecialtiesStore()
const router = useRouter()
const specialties = ref([])
const search = ref('')

watch(
  () => specialtiesStore.specialties,
  (newSpecialties) => {
    specialties.value = newSpecialties
  },
  { immediate: true }
)

onMounted(async () => {
  await specialtiesStore.fetchSpecialties()
  specialties.value = specialtiesStore.specialties || []
})

const onSearch = () => {
  specialtiesStore.setFilters({ name: search.value })
}

const goToDoctors = (id) => {
  router.push({ path: '/dashboard/doctors', query: { specializationId: id } })
}

const getImageUrl = (path) => {
  if (!path) return '@/assets/images/for_remove/doctor1.jpg'
  return `${import.meta.env.VITE_API_URL}/${path}`
}

const handlePageChange = (page) => {
  specialtiesStore.setPage(page)
}
</script>

<style scoped>
</style>
