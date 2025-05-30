import { defineStore } from 'pinia'
import apiService from '../api'
import { ApiUrls } from '../api/apiUrls'
import { ApiMethods } from '../constants/ApiMethods'
import { message } from 'ant-design-vue'
import { useCookies } from 'vue3-cookies'
import { router } from '@/routers/index.js'

const { cookies } = useCookies();

const useAuth = defineStore('auth', {
  state: () => ({
    _loggedIn: !!localStorage.getItem('authToken'),
    loading: false,
    user: null,
    token: localStorage.getItem('authToken') || null,
    otpSent: false,
    otpCode: null,
  }),

  actions: {
    async register(model) {
      this.loading = true
      try {
        const response = await apiService.sendRequest(ApiUrls.PATIENT_REGISTER_URL, ApiMethods.POST, model)
        if (response?.isSuccess) {
          await this.sendOtp(model.email);
          return true;
        }
      } catch (err) {
        console.error('Ошибка регистрации:', err)
        message.error('Ошибка при регистрации')
        throw err
      } finally {
        this.loading = false
      }
    },

    async sendOtp(email) {
      this.loading = true;
      try {
        const encodedEmail = encodeURIComponent(email);
    
        const response = await apiService.sendRequest(
          `${ApiUrls.SEND_OTP_URL}?email=${encodedEmail}`,
          ApiMethods.GET,
        );
    
        if (response?.isSuccess) {
          this.otpSent = true;
          message.success('OTP отправлен на ваш e-mail');
          router.push({ name: 'OtpVerificationPage', params: { email: email } });

          return true;
        } else {
          message.error('Не удалось отправить OTP');
        }
      } catch (err) {
        console.error('Ошибка при отправке OTP:', err);
        message.error('Ошибка при отправке OTP');
        throw err;
      } finally {
        this.loading = false;
      }
    },

    async verifyEmail(email, code) {
      this.loading = true
      try {
        const response = await apiService.sendRequest(
          `${ApiUrls.VERIFY_EMAIL_URL}?email=${encodeURIComponent(email)}&code=${code}`,
          ApiMethods.POST
        )
    
        if (response?.isSuccess) {
          message.success('Ваш email успешно подтвержден')
        } else {
          message.error(response?.data?.error || 'Неверный код или истекло время действия')
        }
    
        return response.data
      } catch (err) {
        console.error('Ошибка при верификации email:', err)
        message.error('Ошибка при верификации email')
        return { isSuccess: false, error: 'Ошибка при верификации email' }
      } finally {
        this.loading = false
      }
    },

    async login(credentials) {
      this.loading = true
      try {
        const response = await apiService.sendRequest(ApiUrls.PATIENT_LOGIN_URL, ApiMethods.POST, credentials)
        if (response?.isSuccess) {
          this.token = response.data.token
          this.user = response.data.patient.user || null
          this._loggedIn = true

          localStorage.setItem('authToken', this.token)
          cookies.set('token', this.token)
          localStorage.setItem('patientId', response.data.patient.id)

          message.success('Вы успешно вошли в систему')
          router.push({ name: 'DashboardView' })

          return true
        } else {
          message.error(response?.data?.error || 'Неверный логин или пароль')
          return false
        }
      } catch (err) {
        console.error('Ошибка при входе в систему:', err)
        message.error('Ошибка при входе в систему')
        return false
      } finally {
        this.loading = false
      }
    },

    logout() {
      this._loggedIn = false
      this.user = null
      this.token = null

      cookies.remove('token')
      localStorage.removeItem('authToken');
      localStorage.removeItem('patientId');
      router.push({ name: 'AuthLogin' });
    }
  },

  getters: {
    loggedIn: (state) => state._loggedIn,
    currentUser: (state) => state.user,
    isLoading: (state) => state.loading,
    isOtpSent: (state) => state.otpSent,
  }
})

export default useAuth
