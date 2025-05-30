<template>
  <div class="flex flex-col lg:flex-row justify-center items-start gap-10 min-h-[80vh] p-6">
    <!-- Информация о пациенте -->
    <div v-if="!patientPinia.isLoading" class="bg-white rounded-2xl shadow-lg p-8 w-full max-w-md">
      <div class="text-center mb-6">
        <h2 class="text-3xl font-bold text-gray-800">
          {{ patientPinia.patient?.user?.firstName }} {{ patientPinia.patient?.user?.lastName }}
        </h2>
        <p class="text-gray-500">{{ patientPinia.patient?.user?.email }}</p>
      </div>

      <div v-if="!isEditing" class="space-y-3 text-gray-700">
        <p><span class="font-semibold">Город:</span> {{ patientPinia.patient?.city }}</p>
        <p><span class="font-semibold">Улица:</span> {{ patientPinia.patient?.street }}</p>
        <p><span class="font-semibold">Пол:</span> {{ genderText(patientPinia.patient?.gender) }}</p>
        <p><span class="font-semibold">Дата рождения:</span> {{ formatDate(patientPinia.patient?.dateOfBirth) }}</p>
        <p><span class="font-semibold">Эл. почта:</span> {{ patientPinia.patient?.user.email}}</p>
        <p><span class="font-semibold">Дата регистрации:</span> {{ formatDate(patientPinia.patient?.user?.createdAt) }}</p>
      </div>

      <!-- Форма редактирования -->
      <div v-if="isEditing" class="mt-8 space-y-6">
        <a-input v-model:value="editForm.firstName" placeholder="Имя" class="w-full" />
        <a-input v-model:value="editForm.lastName" placeholder="Фамилия" class="w-full" />
        <a-input v-model:value="editForm.email" placeholder="Эл. почта" class="w-full" />
        <a-input v-model:value="editForm.city" placeholder="Город" class="w-full" />
        <a-input v-model:value="editForm.street" placeholder="Улица" class="w-full" />

        <div class="flex gap-4">
          <a-select v-model:value="editForm.gender" placeholder="Пол" class="w-full">
            <a-select-option value="1">Мужской</a-select-option>
            <a-select-option value="2">Женский</a-select-option>
          </a-select>

          <a-date-picker v-model:value="editForm.dateOfBirth" :value-format="'YYYY-MM-DD'" format="YYYY-MM-DD" placeholder="Дата рождения" class="w-full" />
        </div>
      </div>

      <!-- Кнопки -->
      <div class="flex gap-4 mt-8">
        <a-button v-if="!isEditing" type="primary" class="bg-sky-600 w-full border-none" @click="startEdit">Редактировать</a-button>
        <a-button v-if="isEditing" type="primary" class="bg-sky-600 w-full border-none" @click="updatePatient">Сохранить</a-button>
        <a-button v-if="isEditing" type="default" class="w-full" @click="cancelEdit">Отмена</a-button>
      </div>
    </div>

    <!-- Болезни пациента -->
    <div class="w-full max-w-2xl bg-white rounded-2xl shadow-lg p-8">
      <h3 class="text-2xl font-bold text-gray-800 mb-4">Болезни пациента</h3>

      <a-input-search
        v-model:value="searchText"
        placeholder="Поиск по названию болезни"
        allow-clear
        enter-button
        @search="onSearch"
        class="mb-4"
      />

      <div v-if="diseasesStore.loading">
        <a-spin size="large" />
      </div>
      <div v-else-if="diseasesStore.diseases.length === 0" class="text-gray-500">Нет данных о болезнях</div>
      <ul v-else class="space-y-3">
        <li v-for="disease in diseasesStore.diseases" :key="disease.id" class="border-b pb-2">
          <h4 class="font-semibold text-lg text-teal-700">{{ disease.name }}</h4>
          <p class="text-sm text-gray-600">{{ disease.description || 'Нет описания' }}</p>
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { message } from 'ant-design-vue';
import usePatient from '@/store/patient.pinia.js';
import useDiseases from '@/store/diseases.pinia.js';
import dayjs from 'dayjs';

const patientPinia = usePatient();
const diseasesStore = useDiseases();
const isEditing = ref(false);
const searchText = ref('');

const editForm = ref({
  firstName: '',
  lastName: '',
  email: '',
  city: '',
  street: '',
  gender: null,
  dateOfBirth: null,
});

onMounted(async () => {
  await patientPinia.getPatient();
  populateEditForm();
  await diseasesStore.fetchAll({ patientId: patientPinia.patient.id });
});

const onSearch = async () => {
  await diseasesStore.fetchAll({
    patientId: patientPinia.patient.id,
    search: searchText.value
  });
};

const populateEditForm = () => {
  const patient = patientPinia.patient;
  if (patient) {
    editForm.value.firstName = patient.user?.firstName;
    editForm.value.lastName = patient.user?.lastName;
    editForm.value.email = patient.user?.email;
    editForm.value.city = patient.city;
    editForm.value.street = patient.street;
    editForm.value.gender = patient.gender;
    editForm.value.dateOfBirth = dayjs(patient.dateOfBirth);
  }
};

const startEdit = () => {
  isEditing.value = true;
};

const cancelEdit = () => {
  isEditing.value = false;
  populateEditForm();
};

const updatePatient = async () => {
  try {
    const payload = {
      ...editForm.value,
      dateOfBirth: editForm.value.dateOfBirth?.format('YYYY-MM-DD'),
    };
    await patientPinia.updatePatient(payload);
    isEditing.value = false;
    await diseasesStore.fetchAll({ patientId: patientPinia.patient.id });
  } catch (err) {
    console.error('Ошибка при обновлении данных пациента:', err);
  }
};

const formatDate = (date) => {
  if (!date) return '';
  const options = { year: 'numeric', month: 'long', day: 'numeric' };
  return new Date(date).toLocaleDateString('ru-RU', options);
};

const genderText = (gender) => {
  if (gender === 0) return 'Не указан';
  if (gender === 1) return 'Мужской';
  if (gender === 2) return 'Женский';
  return '';
};
</script>