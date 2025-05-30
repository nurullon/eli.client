import { defineStore } from 'pinia'
import apiService from '../api'
import { ApiUrls } from '../api/apiUrls'
import { ApiMethods } from '../constants/ApiMethods'
import { message } from 'ant-design-vue'

const usePatient = defineStore('patient', {
  state: () => ({
    patient: null,
    loading: false,
  }),

  actions: {
    async getPatient() {
      const patientId = localStorage.getItem('patientId')
      if (!patientId) {
        message.error('Patient ID not found')
        return
      }

      this.loading = true
      try {
        const response = await apiService.sendRequest(
          `${ApiUrls.PATIENT_URL}/${patientId}`,
          ApiMethods.GET
        )

        if (response?.isSuccess) {
          this.patient = response.data
        } else {
          message.error('Error fetching patient data')
        }
      } catch (err) {
        console.error('Error fetching patient data:', err)
        message.error('Error fetching patient data')
      } finally {
        this.loading = false
      }
    },

    async updatePatient(updatedPatientData) {
      const patientId = localStorage.getItem('patientId')
      if (!patientId) {
        message.error('Patient ID not found')
        return
      }

      this.loading = true
      try {
        const response = await apiService.sendRequest(
          `${ApiUrls.PATIENT_URL}/${patientId}`,
          ApiMethods.PUT,
          updatedPatientData
        )

        if (response?.isSuccess) {
          this.patient = response.data
          message.success('Patient data updated successfully')
        } else {
          message.error('Error updating patient data')
        }
      } catch (err) {
        console.error('Error updating patient data:', err)
        message.error('Error updating patient data')
      } finally {
        this.loading = false
      }
    },
  },

  getters: {
    getPatientData: (state) => state.patient,
    isLoading: (state) => state.loading,
  },
})

export default usePatient
