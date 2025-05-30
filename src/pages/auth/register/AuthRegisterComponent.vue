<script setup>
import { useValidator } from '@/composables/index.js'
import useAuth from '@/store/auth.pinia.js'
import useCore from '@/store/core.pinia.js'
import { reactive, ref } from 'vue'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()
const { requiredField } = useValidator()

const coreStore = useCore()
const authStore = useAuth()

const formRef = ref()
const form = reactive({
  firstName: '',
  lastName: '',
  email: '',
  password: '',
  password_confirm: '',
  dateOfBirth: '',
  city: '',
  street: '',
  gender: 0
})

function submitForm() {
  formRef.value
    .validate()
    .then(async () => {
      const model = {
        firstName: form.firstName,
        lastName: form.lastName,
        email: form.email,
        password: form.password,
        dateOfBirth: form.dateOfBirth,
        city: form.city,
        street: form.street,
        gender: form.gender
      }
      const response = await authStore.register(model);
    })
    .catch(() => { })
}

const emailPattern = new RegExp(/^[^\s@]+@[^\s@]+\.[^\s@]+$/);

const validateConfirmPassword = (rule, value) => {
  if (!value) {
    return Promise.reject(t('validations.required_field'))
  } else if (value !== form.password) {
    return Promise.reject(t('validations.password_mismatch'))
  } else {
    return Promise.resolve()
  }
}

const validateEmail = (rule, value) => {
  if (!value) return Promise.reject(t('validations.required_field'))
  if (!emailPattern.test(value)) return Promise.reject(t('validations.invalid_email'))
  return Promise.resolve()
}
</script>

<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-50 py-10 px-4">
    <a-card class="w-full max-w-lg border-none shadow-md p-6">


      <h2 class="text-2xl font-bold text-center mb-6">
        {{ t('auth_view.register') || 'Регистрация' }}
      </h2>

      <a-form ref="formRef" :model="form" layout="vertical">
        <a-form-item label="Имя" name="firstName" :rules="[{ required: true, message: 'Введите имя' }]">
          <a-input v-model:value="form.firstName" />
        </a-form-item>

        <a-form-item label="Фамилия" name="lastName" :rules="[{ required: true, message: 'Введите фамилию' }]">
          <a-input v-model:value="form.lastName" />
        </a-form-item>

        <a-form-item label="Электронная почта" name="email" :rules="[{ validator: validateEmail }]">
          <a-input type="email" v-model:value="form.email" />
        </a-form-item>

        <a-form-item label="Пароль" name="password" :rules="[{  required: true }]">
          <a-input-password v-model:value="form.password" autocomplete="new-password" />
        </a-form-item>

        <a-form-item label="Повторите пароль" name="password_confirm" :rules="[{ validator: validateConfirmPassword }]">
          <a-input-password v-model:value="form.password_confirm" autocomplete="new-password" />
        </a-form-item>

        <a-row :gutter="[16, 8]" >
          <a-col :xs="24" :sm="12">
            <a-form-item name="dateOfBirth" :rules="[{ required: true, message: 'Введите дату рождения' }]">
              <a-date-picker v-model:value="form.dateOfBirth" class="w-full" placeholder="Дата рождения" />
            </a-form-item>
          </a-col>

          <a-col :xs="24" :sm="12">
            <a-form-item name="gender" :rules="[{ required: true }]">
              <a-radio-group v-model:value="form.gender" class="flex gap-4 pt-1">
                <a-radio :value="0">Мужской</a-radio>
                <a-radio :value="1">Женский</a-radio>
              </a-radio-group>
            </a-form-item>
          </a-col>
        </a-row>

        <a-form-item label="Город" name="city" :rules="[{ required: true, message: 'Введите город' }]">
          <a-input v-model:value="form.city" />
        </a-form-item>

        <a-form-item label="Улица" name="street" :rules="[{ required: true, message: 'Введите улицу' }]">
          <a-input v-model:value="form.street" />
        </a-form-item>

        <a-button @click="submitForm" :loading="coreStore.isLoading('get-token')" size="large" type="primary" block
          class="mt-4">
          {{ t('auth_view.register') || 'Зарегистрироваться' }}
        </a-button>
      </a-form>

      <div class="w-full flex justify-between mt-6 text-sm text-gray-600">
        <span>Уже есть аккаунт?</span>
        <router-link to="/auth/login" class="text-primary underline">Войти</router-link>
      </div>
    </a-card>
  </div>
</template>

<style scoped lang="scss"></style>
