<template>
  <div v-if="notifications.length > 0" class="fixed top-5 right-5 z-50">
    <div v-for="(note, index) in notifications" :key="index" class="bg-red-500 text-white px-4 py-2 mb-2 rounded shadow-lg">
      {{ note }}
    </div>
  </div>
</template>

<script setup>
import { useBookingNotificationStore } from '@/store/bookingNotification.pinia';

const { notifications } = useBookingNotificationStore();
</script>

<style scoped></style>
