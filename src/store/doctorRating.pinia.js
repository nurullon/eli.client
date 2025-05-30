import { defineStore } from 'pinia'
import apiService from '../api'
import { ApiUrls } from '../api/apiUrls'
import { ApiMethods } from '../constants/ApiMethods'
import { message } from 'ant-design-vue'

const useDoctorRating = defineStore('doctorRating', {
  state: () => ({
    loading: false,
    ratings: [] // Holds the ratings for the patient
  }),

  actions: {
    async createDoctorRating({ doctorId, patientId, rating, comment }) {
      if (!patientId) {
        message.error('Patient ID not found')
        return
      }

      this.loading = true
      try {
        const requestBody = {
          doctorId,
          patientId,
          rating,
          comment,
        }

        const response = await apiService.sendRequest(
          ApiUrls.DOCTOR_RATING_URL,
          ApiMethods.POST,
          requestBody
        )

        if (response?.isSuccess) {
          message.success('Спасибо за вашу оценку!')
        } else {
          message.error('Ошибка при добавлении рейтинга')
        }
      } catch (err) {
        console.error('Ошибка при добавлении рейтинга:', err)
        message.error('Ошибка при добавлении рейтинга')
      } finally {
        this.loading = false
      }
    },

    async getRatingsByPatientId(patientId) {
      this.loading = true
      try {
        const response = await apiService.sendRequest(
          `${ApiUrls.DOCTOR_RATING_BY_PATIENT_URL}/${patientId}`,
          ApiMethods.GET
        )

        if (response?.isSuccess) {
          this.ratings = response.data
        } else {
          message.error('Ошибка при получении оценок')
        }
      } catch (err) {
        console.error('Ошибка при получении оценок:', err)
        message.error('Ошибка при получении оценок')
      } finally {
        this.loading = false
      }
    }
  },

  getters: {
    isLoading: (state) => state.loading,
    getRatingsForDoctor: (state) => (doctorId) => {
      return state.ratings.find(rating => rating.doctor.id === doctorId)
    }
  }
})

export default useDoctorRating
