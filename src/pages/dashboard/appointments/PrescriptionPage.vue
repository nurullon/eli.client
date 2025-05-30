<template>
  <div class="p-6">
    <div class="flex items-center justify-between mb-4">
      <h2 class="text-2xl font-bold text-gray-800">
        Назначения по записи №{{ appointmentId.slice(0, 8) }}
      </h2>
      <a-button type="default" @click="goBack">
        ← Назад к записям
      </a-button>
    </div>

    <a-spin v-if="prescriptionsStore.loading" />

    <a-empty v-else-if="prescriptionsStore.prescriptions.length === 0" description="Назначения отсутствуют" />

    <a-card
      v-for="prescription in prescriptionsStore.prescriptions"
      :key="prescription.id"
      class="mb-4 shadow rounded-xl border border-gray-100"
    >
      <h3 class="text-lg font-semibold text-blue-700">💊 {{ prescription.title }}</h3>
      <p class="text-sm text-gray-700 mt-1">
        <strong>Инструкция:</strong> {{ prescription.instructions || 'Нет инструкции' }}
      </p>
      <p class="text-sm text-gray-700">
        <strong>Препараты:</strong> {{ prescription.medicines?.join(', ') || 'Не указаны' }}
      </p>
    </a-card>
  </div>
</template>


<script setup>
import { onMounted, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { ApiMethods } from '@/constants/ApiMethods';
import usePrescriptions from '@/store/prescription.pinia.js';

const route = useRoute();
const router = useRouter();
const prescriptionsStore = usePrescriptions();
const appointmentId = route.params.appointmentId;

onMounted(async () => {
  await prescriptionsStore.fetchAll({ appointmentId });
});

const goBack = () => {
  router.push({ name: 'Appointments' });
};
</script>