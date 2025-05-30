import { defineStore } from 'pinia'
import apiService from '@/api'
import { ApiUrls } from '@/api/apiUrls'
import { ApiMethods } from '@/constants/ApiMethods'
import { message } from 'ant-design-vue'

const useDoctors = defineStore('doctors', {
  state: () => ({
    doctors: [],
    total: 0,
    pageNumber: 1,
    pageSize: 10,
    isFirst: true,
    isLast: true,
    loading: false,
    filters: {
      name: '',
      specializationId: null,
      ratingDesc: null,
      experienceDesc: null
    }
  }),

  actions: {
    async fetchDoctors() {
      this.loading = true
      try {
        const params = {
          Name: this.filters.name,
          SpecializationId: this.filters.specializationId,
          RatingDesc: this.filters.ratingDesc,
          ExperienceDesc: this.filters.experienceDesc,
          PageNumber: this.pageNumber,
          PageSize: this.pageSize
        }

        const response = await apiService.sendRequest(
          ApiUrls.DOCTOR_FILTER_URL,
          ApiMethods.GET,
          null,
          params
        )

        if (response?.isSuccess) {
          const data = response.data
          this.doctors = data.data || []
          this.total = data.totalCount
          this.pageNumber = data.pageNumber
          this.pageSize = data.pageSize
          this.isFirst = data.isFirst
          this.isLast = data.isLast
        } else {
          message.error(response?.error || 'Ошибка при загрузке докторов')
        }
      } catch (error) {
        console.error('Ошибка при получении списка докторов:', error)
        message.error(error.message || 'Ошибка при загрузке докторов')
      } finally {
        this.loading = false
      }
    },

    async fetchDoctorsWithCustom(params = {}) {
      this.loading = true
      try {
        var params = {
            Name: params.Name || '',
            SpecializationId: params.SpecializationId || null,
            RatingDesc: params.RatingDesc ?? null,
            ExperienceDesc: params.ExperienceDesc ?? null,
            PageNumber: params.PageNumber || 1,
            PageSize: params.PageSize || 10
          };

        const response = await apiService.sendRequest(
          ApiUrls.DOCTOR_FILTER_URL,
          ApiMethods.GET,
          null,
          params
        )
    
        if (response?.isSuccess) {
          const data = response.data
          this.doctors = data.data
          this.total = data.totalCount
          this.pageNumber = data.pageNumber
          this.pageSize = data.pageSize
          this.isFirst = data.isFirst
          this.isLast = data.isLast
        }
      } catch (e) {
        message.error(e.message || 'Ошибка при загрузке врачей')
      } finally {
        this.loading = false
      }
    },
    
    setFilters(newFilters) {
      this.filters = { ...this.filters, ...newFilters }
      this.pageNumber = 1
      this.fetchDoctors()
    },

    setPage(page) {
      this.pageNumber = page
      this.fetchDoctors()
    },

    async fetchDoctorById(id) {
      this.loading = true
      try {
        const response = await apiService.sendRequest(
          `${ApiUrls.DOCTOR_BY_ID_URL.replace(':id', id)}`,
          ApiMethods.GET
        )
    
        if (response?.isSuccess) {
          return response.data 
        } else {
          message.error(response?.error || 'Ошибка при загрузке врача')
          return null
        }
      } catch (error) {
        console.error('Ошибка при получении врача:', error)
        message.error(error.message || 'Ошибка при загрузке врача')
        return null
      } finally {
        this.loading = false
      }
    }
    
  },

  getters: {
    getDoctors: (state) => state.doctors,
    isLoading: (state) => state.loading,
    hasNextPage: (state) => !state.isLast,
    hasPrevPage: (state) => !state.isFirst
  }
})

export default useDoctors;