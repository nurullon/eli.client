<template>
  <div class="mb-4">
    <div class="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
      <div class="text-xl font-semibold">Все доктора</div>
      <div class="flex flex-col md:flex-row gap-3 w-full lg:w-auto">
        <a-input-search v-model:value="search" placeholder="Поиск по имени" allowClear enter-button @search="onSearch"
          class="w-full md:w-[250px]" />
        <a-select v-model:value="store.filters.specializationId" :options="specializations" allowClear
          placeholder="Специализация" class="w-full md:w-[180px]" @change="onFilterChange" />
        <a-select v-model:value="sortBy" :options="sortOptions" placeholder="Сортировать по" class="w-full md:w-[180px]"
          @change="onSortChange" />
      </div>
    </div>
  </div>
  <DoctorCard :data="store.doctors" />
  <a-pagination v-model:current="store.pageNumber" :total="store.total" :pageSize="store.pageSize" show-size-changer
    @change="store.setPage" class="mt-4 text-right" />
</template>

<script setup>
import { ref, onMounted, watch } from 'vue'
import { useRoute } from 'vue-router'
import useDoctorsStore from '@/store/doctors.pinia.js'
import { useSpecialtiesStore } from '@/store/specialties.pinia.js'
import DoctorCard from '@/components/DoctorCard.vue'

const store = useDoctorsStore()
const specialtiesStore = useSpecialtiesStore()
const route = useRoute()

const search = ref('')
const sortBy = ref('ratingDesc')
const specializations = ref([])

const sortOptions = [
  { label: 'По рейтингу ↓', value: 'ratingDesc' },
  { label: 'По рейтингу ↑', value: 'ratingAsc' },
  { label: 'По опыту ↓', value: 'experienceDesc' },
  { label: 'По опыту ↑', value: 'experienceAsc' }
]

function transformSpecialties(data) {
  return data.map(spec => ({
    label: spec.name,
    value: spec.id
  }))
}

onMounted(async () => {
  await specialtiesStore.getAllSpecialties();
  specializations.value = [
      { label: 'Все специализации', value: null },
      ...transformSpecialties(specialtiesStore.specialties || [])
    ]
  const specializationId = route.query.specializationId
  if (specializationId) {
    store.setFilters({ specializationId })
  } else {
    store.fetchDoctors()
  }
})

watch(() => route.query.specializationId, (newId) => {
  if (newId) {
    store.setFilters({ specializationId: newId })
  }
})

function onSearch() {
  store.setFilters({ name: search.value || null })
}

function onSortChange(value) {
  store.setFilters({
    ratingDesc: value === 'ratingDesc' ? true : null,
    experienceDesc: value === 'experienceDesc' ? true : null
  })
}

function onFilterChange(value) {
  store.setFilters({ specializationId: value || null })
}
</script>
