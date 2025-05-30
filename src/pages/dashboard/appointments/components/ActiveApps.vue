<template>
  <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
    <a-card
      v-for="item in appointmentsStore.getActives"
      :key="item.id"
      class="rounded-2xl shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300 bg-gradient-to-br from-white to-gray-50"
    >
      <div class="space-y-4 text-[15px] leading-snug text-gray-800">
        <!-- Заголовок -->
        <h3 class="text-lg font-bold text-teal-600">
          📌 Запись №{{ item.id.slice(0, 8) }}
        </h3>

        <!-- Дата -->
        <div>
          <span class="text-gray-500">📅 Дата и время:</span>
          <span class="ml-1 font-medium">{{ formatDateTime(item.startTime) }}</span>
        </div>

        <!-- Пациент -->
        <div>
          <span class="text-gray-500">👤 Пациент:</span>
          <span class="ml-1 font-medium">
            {{ item.patient.user.firstName }} {{ item.patient.user.lastName }}
          </span>
        </div>

        <!-- Врач -->
        <div>
          <span class="text-gray-500">🩺 Врач:</span>
          <span class="ml-1 font-medium">
            {{ item.doctor.user.firstName }} {{ item.doctor.user.lastName }}
          </span>
        </div>

        <!-- Статус -->
      <div>
  <span class="text-gray-500">📌 Статус:</span>
  <a-tag
    :color="statusColor(item.status)"
    class="ml-2 px-3 py-1 rounded-full text-sm font-medium"
  >
    {{ statusText(item.status) }}
  </a-tag>
</div>


        <!-- Описание -->
        <div v-if="item.description">
          <span class="text-gray-500">📝 Описание:</span>
          <span class="ml-1 italic">{{ item.description }}</span>
        </div>

        <!-- Кнопки -->
        <div class="pt-3 flex justify-end gap-2">
          <a-button
            type="primary"
            @click="editAppointment(item)"
          >
            Обновить
          </a-button>

          <a-popconfirm
            title="Вы уверены, что хотите удалить запись?"
            ok-text="Да"
            cancel-text="Нет"
            @confirm="deleteAppointment(item.id)"
          >
            <a-button
              danger
            >
              Удалить
            </a-button>
          </a-popconfirm>
        </div>
      </div>
    </a-card>
  </div>
</template>

<script setup>
import useAppointments from '@/store/appointments.pinia';
import { defineEmits } from 'vue';

const appointmentsStore = useAppointments();
const emit = defineEmits(['edit']);

function statusText(status) {
  switch (status) {
    case 0:
      return 'В ожидании';
    case 1:
      return 'Подтверждена';
    case 2:
      return 'Отменена';
    case 3:
      return 'Завершена';
    default:
      return 'Неизвестно';
  }
}

function statusColor(status) {
  switch (status) {
    case 0:
      return 'gold';    
    case 1:
      return 'blue';   
    case 2:
      return 'red';     
    case 3:
      return 'green';   
    default:
      return 'default';
  }
}

function formatDateTime(date) {
  return new Date(date).toLocaleString('ru-RU', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
}

function editAppointment(item) {
  console.log('Editing appointment:', item);
  emit('edit', item); 
}

async function deleteAppointment(id) {
  try {
    await appointmentsStore.deleteAppointment(id);
    message.success('Запись успешно удалена.');
    await appointmentsStore.fetchActives();
  } catch (error) {
    message.error('Ошибка при удалении записи.');
  }
}
</script>

