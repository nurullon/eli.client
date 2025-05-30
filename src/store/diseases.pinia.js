import { defineStore } from 'pinia';
import { ref } from 'vue';
import apiService from '../api'
import { ApiMethods } from '@/constants/ApiMethods';
import { message } from 'ant-design-vue';
import { ApiUrls } from '@/api/apiUrls'

const useDiseases = defineStore('diseases', () => {
  const diseases = ref([]);
  const selectedDisease = ref(null);
  const patientsByDisease = ref([]);
  const doctorsByDisease = ref([]);
  const loading = ref(false);

  const fetchAll = async (filterParams = {}) => {
    loading.value = true;

    try {
      const queryParams = {
        patientId: filterParams.patientId || null,
        doctorId: filterParams.doctorId || null,
        search: filterParams.search || '',
        appointmentId: filterParams.appointmentId || null
      };

      const res = await apiService.sendRequest(
        ApiUrls.DISEASES_FILTER,
        ApiMethods.GET,
        null,
        queryParams
      );

      if (res?.isSuccess) {
        diseases.value = res.data;
      } else {
        message.error('Не удалось загрузить список болезней');
      }
    } catch (err) {
      console.error(err);
      message.error('Ошибка при получении списка болезней');
    } finally {
      loading.value = false;
    }
  };

  const fetchById = async (id) => {
    loading.value = true;
    try {
      const res = await apiService.sendRequest(`${ApiUrls.DISEASES}/${id}`, ApiMethods.GET);
      if (res?.isSuccess) {
        selectedDisease.value = res.data;
      } else {
        message.error('Не удалось загрузить данные болезни');
      }
    } catch (err) {
      console.error(err);
      message.error('Ошибка при получении болезни');
    } finally {
      loading.value = false;
    }
  };

  const deleteDisease = async (id) => {
    loading.value = true;
    try {
      const res = await apiService.sendRequest(`${ApiUrls.DISEASES}/${id}`, ApiMethods.DELETE);
      if (res?.isSuccess) {
        message.success('Болезнь удалена');
        await fetchAll();
      } else {
        message.error('Ошибка при удалении болезни');
      }
    } catch (err) {
      console.error(err);
      message.error('Ошибка при удалении болезни');
    } finally {
      loading.value = false;
    }
  };

  return {
    diseases,
    selectedDisease,
    patientsByDisease,
    doctorsByDisease,
    loading,
    fetchAll,
    fetchById,
    deleteDisease,
  };
});

export default useDiseases;