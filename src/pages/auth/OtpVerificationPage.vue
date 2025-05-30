<template>
  <div class="otp-verification-form">
    <a-form :model="{ otpCode }" @submit.prevent="verifyOtp">
      <a-form-item label="OTP">
        <a-input v-model:value="otpCode" placeholder="Введите OTP код" />
      </a-form-item>

      <a-form-item>
        <a-button type="primary" html-type="submit" :loading="loading"
          >Подтвердить</a-button
        >
      </a-form-item>
    </a-form>

    <a-button type="link" @click="sendOtp" :loading="loading"
      >Отправить OTP</a-button
    >
  </div>
</template>

<script>
import { defineComponent, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import useAuth from '@/store/auth.pinia.js'

export default defineComponent({
  name: 'OtpVerificationPage',
  setup() {
    const route = useRoute()
    const router = useRouter()
    const authStore = useAuth()

    const otpCode = ref('')
    const email = ref(decodeURIComponent(route.params.email || ''))
    const loading = ref(false)

    const sendOtp = async () => {
      if (!email.value) {
        return message.error('Введите ваш e-mail')
      }

      loading.value = true
      try {
        const result = await authStore.sendOtp(email.value)
        if (result === true) {
          message.success('OTP отправлен на ваш e-mail')
        } else {
          message.error(result?.error || 'Не удалось отправить OTP')
        }
      } catch (error) {
        console.error('Ошибка при отправке OTP:', error)
        message.error('Ошибка при отправке OTP')
      } finally {
        loading.value = false
      }
    }

    const verifyOtp = async () => {
      console.log('Verifying OTP...', otpCode.value)
      if (!email.value || !otpCode.value) {
        return message.error('Пожалуйста, введите оба поля.')
      }

      loading.value = true
      try {
        const result = await authStore.verifyEmail(email.value, otpCode.value)
        if (result === true) {
          router.push({ name: 'AuthLogin' })
        } else {
          message.error(
            result?.error || 'Неверный код или истекло время действия'
          )
        }
      } catch (error) {
        console.error('Ошибка при верификации OTP:', error)
        message.error('Ошибка при верификации OTP')
      } finally {
        loading.value = false
      }
    }

    return {
      otpCode,
      email,
      loading,
      sendOtp,
      verifyOtp
    }
  }
})
</script>

<style scoped>
.otp-verification-form {
  max-width: 400px;
  margin: 0 auto;
  padding: 20px;
  background-color: #f9f9f9;
  border-radius: 8px;
}
</style>
