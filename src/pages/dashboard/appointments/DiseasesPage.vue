<template>
  <div class="p-6">
    <div class="flex items-center justify-between mb-4">
      <h2 class="text-2xl font-bold text-gray-800">
        Болезни по записи №{{ appointmentId.slice(0, 8) }}
      </h2>
      <a-button type="default" @click="goBack">
        ← Назад к записям
      </a-button>
    </div>

    <a-spin v-if="diseasesStore.loading" />

    <a-empty
      v-else-if="diseasesStore.diseases.length === 0"
      description="Нет данных о болезнях"
    />

    <a-card
      v-for="disease in diseasesStore.diseases"
      :key="disease.id"
      class="mb-4 shadow rounded-xl border border-gray-100"
    >
      <h3 class="text-lg font-semibold text-teal-700">Название: {{ disease.name }}</h3>
      <p class="text-sm text-gray-700 mt-1">
        <strong>Описание:</strong> {{ disease.description || 'Нет описания' }}
      </p>
      <p class="text-sm text-gray-700">
        <strong>Симптомы:</strong> {{ disease.symptoms || 'Не указаны' }}
      </p>
      <p class="text-sm text-gray-700">
        <strong>Лечение:</strong> {{ disease.treatment || 'Не указано' }}
      </p>
    </a-card>
  </div>
</template>


<script setup>
import { onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import useDiseases from '@/store/diseases.pinia.js';

const router = useRouter();
const route = useRoute();
const appointmentId = route.params.appointmentId;
const diseasesStore = useDiseases();

onMounted(async () => {
  await diseasesStore.fetchAll({ appointmentId });
});

const goBack = () => {
  router.push({ name: 'Appointments' });
};
</script>