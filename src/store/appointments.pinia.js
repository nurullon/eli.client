import { defineStore } from 'pinia';
import apiService from '../api';
import { ApiUrls } from '../api/apiUrls';
import { ApiMethods } from '../constants/ApiMethods';
import { message } from 'ant-design-vue';

const useAppointments = defineStore('appointments', {
  state: () => ({
    actives: [],
    previews: [],
    all: [],
    loading: false,
    signalrConnected: false,
  }),

  actions: {
    async fetchAll() {
      this.loading = true;
      try {
        const response = await apiService.sendRequest(ApiUrls.APPOINTMENTS_URL, ApiMethods.GET);
        if (response?.isSuccess) {
          this.all = response.data;
        } 
      } catch (err) {
        console.error(err);
      } finally {
        this.loading = false;
      }
    },

    async fetchActives() {
      this.loading = true;
      try {
        const params = {
          patientId: localStorage.getItem('patientId'),
        }
         const response = await apiService.sendRequest(
          ApiUrls.ACTIVE_APPOINTMENTS_URL,
          ApiMethods.GET,
          null,
          params
        )
        if (response?.isSuccess) {
          this.actives = response.data;
        }
      } catch (err) {
        console.error(err);
        message.error('Ошибка при загрузке активных записей');
      } finally {
        this.loading = false;
      }
    },

    async fetchPreviews() {
      this.loading = true;
      try {
        const params = {
          patientId: localStorage.getItem('patientId'),
        }
         const response = await apiService.sendRequest(
          ApiUrls.PREVIEWS_APPOINTMENTS_URL,
          ApiMethods.GET,
          null,
          params
        )

        if (response?.isSuccess) {
          this.previews = response.data;
        } else {
          message.error('Ошибка при загрузке завершённых записей');
        }
      } catch (err) {
        console.error(err);
        message.error('Ошибка при загрузке завершённых записей');
      } finally {
        this.loading = false;
      }
    },

    async createAppointment(newAppointmentData) {
      this.loading = true;
      try {
        const response = await apiService.sendRequest(ApiUrls.APPOINTMENTS_URL, ApiMethods.POST, newAppointmentData);
        if (response?.isSuccess) {
          await this.fetchActives();
        } 
      } catch (err) {
        console.error(err);
      } finally {
        this.loading = false;
      }
    },

    async updateAppointment(id, updateData) {
      this.loading = true;
      try {
        const response = await apiService.sendRequest(`${ApiUrls.APPOINTMENTS_URL}/${id}`, ApiMethods.PUT, updateData);
        if (response?.isSuccess) {
          await this.fetchActives();
        } 
      } catch (err) {
        console.error(err);
      } finally {
        this.loading = false;
      }
    },

    async deleteAppointment(id) {
      this.loading = true;
      try {
        const response = await apiService.sendRequest(`${ApiUrls.APPOINTMENTS_URL}/${id}`, ApiMethods.DELETE);
        if (response?.isSuccess) {
          await this.fetchActives();
        }
      } catch (err) {
        console.error(err);
      } finally {
        this.loading = false;
      }
    },
  },

  getters: {
    getActives: (state) => state.actives,
    getPreviews: (state) => state.previews,
    getAll: (state) => state.all,
    isLoading: (state) => state.loading,
  },
});

export default useAppointments;