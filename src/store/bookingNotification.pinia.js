import { defineStore } from 'pinia';
import { ref } from 'vue';
import * as signalR from '@microsoft/signalr';
import { notification } from 'ant-design-vue';
import useAppointments from '@/store/appointments.pinia';

export const useBookingNotificationStore = defineStore('bookingNotification', () => {
  const notifications = ref([]);
  const connection = ref(null);
  const isConnected = ref(false);

  const startConnection = async () => {
    if (isConnected.value) return;

    connection.value = new signalR.HubConnectionBuilder()
      .withUrl(`${import.meta.env.VITE_API_URL}/bookingHub`, {
        withCredentials: true,
      })
      .withAutomaticReconnect()
      .build();

    connection.value.on('SlotTakenNotification', async (message) => {
      notifications.value.push(message);
      showErrorNotification('Ошибка записи', message);
      const appointmentsStore = useAppointments();
      await appointmentsStore.fetchActives();
    });

    connection.value.on('AppointmentCreated', async (message) => {
      notifications.value.push(message);
      showSuccessNotification('Создание записи', message);
      const appointmentsStore = useAppointments();
      await appointmentsStore.fetchActives();
    });

    connection.value.on('AppointmentUpdated', async (message) => {
      notifications.value.push(message);
      showSuccessNotification('Обновление записи', message);
      const appointmentsStore = useAppointments();
      await appointmentsStore.fetchActives();
    });

    try {
      await connection.value.start();
      console.log('✅ SignalR connected');
      isConnected.value = true;
    } catch (error) {
      console.error('❌ SignalR error:', error);
      showErrorNotification('Ошибка подключения', 'Не удалось подключиться к уведомлениям');
    }
  };

  const showSuccessNotification = (title, message) => {
    notification.success({
      message: title,
      description: message,
      placement: 'topRight',
      duration: 5,
    });
  };

  const showErrorNotification = (title, message) => {
    notification.error({
      message: title,
      description: message,
      placement: 'topRight',
      duration: 5,
    });
  };

  return {
    notifications,
    startConnection,
  };
});
