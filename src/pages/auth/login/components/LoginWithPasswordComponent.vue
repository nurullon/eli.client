<template>
  <div class="flex justify-center items-center h-screen bg-gray-50">
    <a-card class="w-[460px] border-none shadow-md">
      <div class="flex items-center justify-center mb-4">
        <img src="@/assets/images/logo_2.svg" alt="Логотип" width="120" />
      </div>

      <h2 class="text-2xl font-bold text-center mb-4">
        {{ t('auth_view.login') }}
      </h2>

      <a-form ref="formRef" :model="form">
        <a-form-item
          label="Электронная почта"
          name="email"
          :rules="[{ validator: validateEmail }]"
        >
          <a-input type="email" v-model:value="form.email" />
        </a-form-item>

        <a-form-item
          :rules="[requiredField]"
          name="password"
          :label="t('auth_view.password')"
        >
          <a-input-password v-model:value="form.password" />
        </a-form-item>
      </a-form>

      <!-- reCAPTCHA блок -->
      <div class="flex justify-center mb-4">
        <div
          class="g-recaptcha"
          :data-sitekey="siteKey"
          data-callback="onRecaptchaSuccess"
        ></div>
      </div>

      <div class="flex justify-end text-sm mb-4">
        <a-button type="text" class="text-primary px-0">
          {{ t('auth_view.reset_password') }}
        </a-button>
      </div>

      <a-button
        type="primary"
        size="large"
        block
        :disabled="!isRecaptchaVerified"
        :loading="coreStore.isLoading('get-token')"
        @click="submitForm"
      >
        {{ t('auth_view.login') }}
      </a-button>

      <div class="w-full flex justify-between mt-4 text-base">
        <span>{{ t('auth_view.no_account') }}</span>
        <router-link to="/auth/register" class="text-primary underline">
          {{ t('auth_view.register') }}
        </router-link>
      </div>
    </a-card>
  </div>
</template>

<script setup>
import { useValidator } from '@/composables/index.js'
import useAuth from '@/store/auth.pinia.js'
import useCore from '@/store/core.pinia.js'
import { reactive, ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { useRouter } from 'vue-router'
import { onMounted } from 'vue'

const router = useRouter()
const { t } = useI18n()
const { requiredField } = useValidator()
const coreStore = useCore()
const authStore = useAuth()

const formRef = ref()
const form = reactive({
  email: '',
  password: ''
})

const siteKey = '6LeciDQrAAAAAD3scBLVUR962oY1MOdd-E4UTprO';

const isRecaptchaVerified = ref(false)
const recaptchaToken = ref(null)

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

const validateEmail = (rule, value) => {
  if (!value) return Promise.reject(t('validations.required_field'))
  if (!emailPattern.test(value))
    return Promise.reject(t('validations.invalid_email'))
  return Promise.resolve()
}

function onRecaptchaSuccess(token) {
  isRecaptchaVerified.value = true
  recaptchaToken.value = token
}

window.onRecaptchaSuccess = onRecaptchaSuccess

onMounted(() => {
  if (window.grecaptcha) {
    window.grecaptcha.render(document.querySelector('.g-recaptcha'), {
      sitekey: siteKey,
      callback: onRecaptchaSuccess
    });
  }
});


async function submitForm() {
  formRef.value
    .validate()
    .then(async () => {
      const model = {
        email: form.email,
        password: form.password,
        recaptcha: recaptchaToken.value
      }

      await authStore.login(model)

      grecaptcha.reset()
      isRecaptchaVerified.value = false
      recaptchaToken.value = null
    })
    .catch(() => {})
}
</script>

<style scoped lang="scss"></style>