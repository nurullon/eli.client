<template>
  <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-6">
    <a-card
      v-for="doctor in data"
      :key="doctor.id"
      class="overflow-hidden rounded-xl border border-gray-200 shadow-md transition-all hover:shadow-lg hover:-translate-y-1"
      @click="navigateToAppointment(doctor.id)"
    >
      <div>
        <!-- Картинка и специализация -->
        <div class="relative w-full h-[220px] overflow-hidden rounded-xl">
          <img
            :src="getImageUrl(doctor.imageUrl)"
            alt="Doctor"
            class="w-full h-full object-cover rounded-md"
          />
          <div
            class="absolute top-2 left-2 bg-white bg-opacity-70 px-4 py-1 rounded-full text-teal-700 font-bold text-xs"
          >
            {{ doctor.specialization?.name }}
          </div>
        </div>

        <!-- Информация о враче -->
        <div class="p-3 flex flex-col justify-between">
          <div class="mb-3">
            <h3 class="text-lg font-semibold text-teal-700">
              {{ doctor.user?.firstName }} {{ doctor.user?.lastName }}
            </h3>
            <p class="text-sm text-gray-500">
              Опыт: {{ doctor.experienceYears }} лет
            </p>
            <p class="text-xs text-gray-400 mt-2 line-clamp-2">
              {{ doctor.bio }}
            </p>
          </div>

          <!-- Город и рейтинг -->
          <div
            class="flex items-center justify-between pt-2 border-t border-gray-100"
          >
            <div class="flex items-center text-sm text-gray-600">
              <EnvironmentOutlined class="mr-2 text-gray-400" />
              <span>{{
                doctor.city && doctor.street
                  ? doctor.city + ' ' + doctor.street
                  : 'Не указан'
              }}</span>
            </div>
            <div class="flex items-center gap-1 text-yellow-500">
              <StarFilled class="text-base" />
              <span class="text-sm text-gray-600">{{
                doctor.averageRating || 0
              }}</span>
            </div>
          </div>

          <!-- Блок оценки (если ещё не оценён) -->
          <div class="mt-3" v-if="!hasRated(doctor.id)" @click.stop>
            <a-rate
              v-model:value="ratings[doctor.id]"
              allow-clear
              :count="5"
              class="mr-2 text-teal-500"
            />
            <a-input
              v-model:value="comments[doctor.id]"
              placeholder="Оставьте комментарий"
              type="text"
              class="mt-2"
            />
            <a-button
              type="primary"
              class="ml-2 mt-2"
              @click="submitRating(doctor.id)"
            >
              Оценить
            </a-button>
          </div>
        </div>
      </div>
    </a-card>
  </div>
</template>

<script setup>
import { defineProps, ref, onMounted, computed } from 'vue'
import { useRouter } from 'vue-router'
import useDoctorRating from '@/store/doctorRating.pinia.js'

defineProps({
  data: Array
})

const router = useRouter()
const doctorRatingStore = useDoctorRating()

const ratings = ref({})
const comments = ref({})
const patientId = ref(localStorage.getItem('patientId'))

const ratingsData = computed(() => doctorRatingStore.ratings)

// Проверка: был ли уже оставлен отзыв конкретному врачу
const hasRated = (doctorId) => {
  return ratingsData.value.some(r => r.doctor.id === doctorId)
}

// Получить все оценки пациента и заполнить локальное состояние
const fetchRatings = async () => {
  if (patientId.value) {
    await doctorRatingStore.getRatingsByPatientId(patientId.value)
    ratings.value = {}
    comments.value = {}
    doctorRatingStore.ratings.forEach(rating => {
      ratings.value[rating.doctor.id] = rating.Rating
      comments.value[rating.doctor.id] = rating.Comment
    })
  }
}

// При загрузке компонента
onMounted(async () => {
  await fetchRatings()
})

// Получить URL изображения
const getImageUrl = (path) => {
  if (!path || typeof path !== 'string' || !path.trim()) {
    return '@/assets/images/default.png'
  }
  return `${import.meta.env.VITE_API_URL}/${path}`
}

// Отправить рейтинг и обновить все данные
const submitRating = async (doctorId) => {
  const rating = ratings.value[doctorId]
  const comment = comments.value[doctorId]

  if (!patientId.value || !rating) return

  await doctorRatingStore.createDoctorRating({
    doctorId,
    patientId: patientId.value,
    rating,
    comment
  })

  await fetchRatings() 
}

const navigateToAppointment = (doctorId) => {
  console.log('Navigating to appointment for doctor:', doctorId)
  if (doctorId) {
    router.push(`appointments/${doctorId}`)
  } else {
    router.push('appointments'); 
  }
}
</script>

<style scoped>
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

a-card .relative {
  height: 220px;
}

a-card {
  transition: all 0.3s ease;
}

.grid {
  margin-top: 24px;
}

a-card .p-3 {
  padding: 0.75rem;
}

h3 {
  font-size: 1.125rem;
}

p {
  font-size: 0.875rem;
}
</style>
