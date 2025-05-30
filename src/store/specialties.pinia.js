import { defineStore } from 'pinia'
import apiService from '@/api'
import { ApiMethods } from '@/constants/ApiMethods'
import { ApiUrls } from '@/api/apiUrls'
import { message } from 'ant-design-vue'

export const useSpecialtiesStore = defineStore('specialties', {
  state: () => ({
    specialties: [],
    totalCount: 0,
    pageNumber: 1,
    pageSize: 9, 
    loading: false,
    filters: {
      name: ''
    }
  }),

  actions: {
    async fetchSpecialties() {
      this.loading = true;
      this.specialties = []; 
    
      try {
        const params = {
          PageNumber: this.pageNumber,
          PageSize: this.pageSize,
          Search: this.filters.name
        };
    
        const validParams = {};
        if (params.PageNumber) validParams.PageNumber = params.PageNumber;
        if (params.PageSize) validParams.PageSize = params.PageSize;
        if (params.Search) validParams.Search = params.Search;
    
        const response = await apiService.sendRequest(
          `${ApiUrls.SPECIALIZATIONS_URL}/filter`,
          ApiMethods.GET,
          null,
          Object.keys(validParams).length > 0 ? validParams : null, 
          null
        );
    
        if (response?.isSuccess) {
          this.specialties = response.data.data || [];
          this.totalCount = response.data.totalCount || 0;
        } else {
          message.error('Не удалось загрузить специализации');
        }
      } catch (e) {
        console.error('Ошибка при загрузке специализаций:', e);
        message.error(e.message || 'Ошибка при загрузке специализаций');
      } finally {
        this.loading = false;
      }
    },

    setPage(page) {
      this.pageNumber = page
      this.fetchSpecialties()
    },

    setFilters(newFilters) {
      this.filters = { ...this.filters, ...newFilters }
      this.pageNumber = 1
      this.fetchSpecialties()
    },

    setPageSize(pageSize) {
      this.pageSize = pageSize
      this.pageNumber = 1  
      this.fetchSpecialties()
    },

    async getAllSpecialties() {
      this.loading = true
      this.specialties = []

      try {
        const response = await apiService.sendRequest(
          ApiUrls.SPECIALIZATIONS_URL,
          ApiMethods.GET
        )

        if (response?.isSuccess) {
          this.specialties = response.data || []
        } else {
          message.error('Не удалось загрузить специализации')
        }
      } catch (e) {
        console.error('Ошибка при загрузке специализаций:', e)
        message.error(e.message || 'Ошибка при загрузке специализаций')
      } finally {
        this.loading = false
      }
    }
  }
})
