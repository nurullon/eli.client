import { defineStore } from 'pinia';
import { ref } from 'vue';
import apiService from '@/api';
import { ApiMethods } from '@/constants/ApiMethods';
import { ApiUrls } from '@/api/apiUrls';
import { message } from 'ant-design-vue';

const usePrescriptions = defineStore('prescriptions', () => {
  const prescriptions = ref([]);
  const loading = ref(false);

  const fetchAll = async (filterParams = {}) => {
    loading.value = true;

    try {
      const queryParams = {
        search: filterParams.search || '',
        patientId: filterParams.patientId || null,
        appointmentId: filterParams.appointmentId || null,
        doctorId: filterParams.doctorId || null
      };

      const res = await apiService.sendRequest(
        ApiUrls.PRESCRIPTIONS_FILTER,
        ApiMethods.GET,
        null,
        queryParams
      );

      if (res?.isSuccess) {
        prescriptions.value = res.data;
      } else {
        message.error('Не удалось загрузить назначения');
      }
    } catch (err) {
      console.error(err);
      message.error('Ошибка при получении назначений');
    } finally {
      loading.value = false;
    }
  };

  return {
    prescriptions,
    loading,
    fetchAll
  };
});

export default usePrescriptions;
