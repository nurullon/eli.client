<template>
  <div class="p-6">
    <!-- Header -->
    <div class="flex justify-between items-center mb-6">
      <h3 class="text-xl font-bold">Мои записи</h3>
      <a-button type="primary" @click="openAddAppointmentModal">
        Добавить запись
      </a-button>
    </div>

    <notification-popup />

    <!-- Tabs -->
    <a-tabs v-model:activeKey="activeKey">
      <a-tab-pane key="1" tab="Активные">
        <active-apps @edit="handleEditAppointment" />
      </a-tab-pane>
      <a-tab-pane key="2" tab="Завершённые">
        <review-apps />
      </a-tab-pane>
    </a-tabs>

    <!-- Modal -->
    <a-modal
      v-model:open="addAppointmentModal"
      title="Добавить запись"
      :footer="null"
      centered
      width="800px"
    >
      <a-form :model="formState" @finish="onFinish" layout="vertical">
        <!-- Doctor Select -->
        <a-form-item
          name="doctorId"
          :rules="[{ required: true, message: 'Выберите врача' }]"
        >
          <a-select
            v-model:value="formState.doctorId"
            size="large"
            style="height: 52px"
          >
            <a-select-option
              v-for="doctor in doctorsStore.getDoctors"
              :key="doctor.id"
              :value="doctor.id"
            >
              {{ doctor.user.firstName }} {{ doctor.user.lastName }}
            </a-select-option>
          </a-select>
        </a-form-item>

        <!-- DateTime Picker -->
        <a-form-item
          name="startTime"
          :rules="[{ required: true, message: 'Выберите дату и время' }]"
        >
          <a-date-picker
            v-model:value="formState.startTime"
            :show-time="{ format: 'HH:mm' }"
            format="YYYY-MM-DD HH:mm"
            size="large"
            style="width: 100%; height: 52px"
          />
        </a-form-item>

        <!-- Описание -->
        <a-form-item name="description" label="Описание">
          <a-textarea
            v-model:value="formState.description"
            rows="4"
            placeholder="Введите дополнительную информацию..."
          />
        </a-form-item>

        <!-- Buttons -->
        <div class="mt-6 flex justify-end gap-x-2">
          <a-button
            type="default"
            @click="closeAddAppointmentModal"
            class="bg-gray-100 text-gray-700 hover:bg-gray-200"
          >
            Вернуться
          </a-button>
          <a-button
            type="primary"
            html-type="submit"
            :loading="loading"
            class="bg-teal-500 text-white hover:bg-teal-600"
          >
            Сохранить
          </a-button>
        </div>
      </a-form>
    </a-modal>
  </div>
</template>

<script setup>
import { ref, reactive, watch, onMounted } from 'vue'
import { useRoute } from 'vue-router'

import ActiveApps from './components/ActiveApps.vue'
import ReviewApps from './components/ReviewApps.vue'
import NotificationPopup from '@/components/NotificationPopup.vue'

import { useBookingNotificationStore } from '@/store/bookingNotification.pinia'
import useAppointments from '@/store/appointments.pinia'
import useDoctors from '@/store/doctors.pinia.js'
import usePatients from '@/store/patient.pinia.js'
import dayjs from 'dayjs'

const activeKey = ref('1')
const notificationStore = useBookingNotificationStore()
const appointmentsStore = useAppointments()
const doctorsStore = useDoctors()
const patientsStore = usePatients()

const addAppointmentModal = ref(false)
const loading = ref(false)

const formState = reactive({
  doctorId: '',
  patientId: localStorage.getItem('patientId'),
  startTime: null,
  status: 0,
  description: null,
})

const route = useRoute()
const doctorId = ref('')

const openAddAppointmentModal = () => {
  addAppointmentModal.value = true
   console.log("opened modal");
}

const closeAddAppointmentModal = () => {
  addAppointmentModal.value = false
}

onMounted(() => {
  doctorId.value = route.params.doctorId || null
  if (doctorId.value) {
    formState.doctorId = doctorId.value
  }
  doctorsStore.fetchDoctors()
  notificationStore.startConnection()
})

const onFinish = async () => {
  try {
    loading.value = true

    if (formState.id) {
      await appointmentsStore.updateAppointment(formState.id, {
        doctorId: formState.doctorId,
        startTime: formState.startTime,
        status: formState.status,
        patientId: formState.patientId,
        description: formState.description
      })
    } else {
      await appointmentsStore.createAppointment(formState)
    }

    closeAddAppointmentModal()

    if (activeKey.value === '1') {
      await appointmentsStore.fetchActives()
    } else {
      await appointmentsStore.fetchPreviews()
    }
  } catch (error) {
    console.error('Ошибка при сохранении записи:', error)
  } finally {
    loading.value = false
  }
}

const handleEditAppointment = (appointment) => {
  formState.id = appointment.id
  formState.doctorId = appointment.doctor.id
  formState.startTime = dayjs(appointment.startTime);
  formState.status = appointment.status
  formState.description = appointment.description
  openAddAppointmentModal()
}

watch(
  activeKey,
  async (newValue) => {
    if (newValue === '1') {
      await appointmentsStore.fetchActives()
    } else {
      await appointmentsStore.fetchPreviews()
    }
  },
  { immediate: true }
)
</script>

<style scoped>
:deep(.ant-modal-header) {
  background-color: #f9f9f9;
  border-bottom: 1px solid #eee;
}
:deep(.ant-modal-body) {
  padding: 24px;
}
:deep(.ant-form-item) {
  margin-bottom: 24px;
}
:deep(.ant-select-selector),
:deep(.ant-picker) {
  border-radius: 12px;
  height: 52px;
  font-size: 16px;
  padding: 10px 16px;
}
:deep(.ant-select-selection-item) {
  line-height: 32px;
}
:deep(.ant-picker-input > input) {
  font-size: 16px;
}
:deep(.ant-btn) {
  transition: all 0.3s ease;
  min-width: 120px;
  height: 48px;
  font-size: 16px;
}
</style>
