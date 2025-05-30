<template>
  <div class="py-4">
    <a-carousel dot-position="bottom" class="custom-carousel">
      <div v-for="(slide, index) in slides" :key="index">
        <div
          class="carousel-slide relative"
          :style="{ backgroundImage: `url(${slide.img})` }"
        >
          <div class="carousel-content space-y-4 md:space-y-6 lg:space-y-10">
            <h1 class="text-lg md:text-3xl lg:text-5xl font-bold">{{ slide.title }}</h1>
            <p class="text-sm lg:text-base">{{ slide.subtitle }}</p>
          </div>
          <div class="cover-darking"></div>
        </div>
      </div>
    </a-carousel>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const slides = ref([
  {
    title: 'Профессиональные медицинские услуги',
    subtitle: 'Предоставляем качественную помощь с заботой и вниманием к каждому пациенту.',
    img: 'https://images.pexels.com/photos/8376265/pexels-photo-8376265.jpeg',
  },
  {
    title: 'Современные медицинские исследования',
    subtitle: 'Инновации во имя здоровья будущих поколений.',
    img: 'https://images.pexels.com/photos/8376264/pexels-photo-8376264.jpeg',
  },
  {
    title: 'Надёжное медицинское оборудование',
    subtitle: 'Полный спектр инструментов для точной диагностики и лечения.',
    img: 'https://images.pexels.com/photos/8376263/pexels-photo-8376263.jpeg',
  },
]);
</script>

<style scoped>
.custom-carousel {
  width: 100%;
  border-radius: 0.75rem;
  overflow: hidden;
}

.carousel-slide {
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
  display: flex;
  align-items: center;
  height: 350px;
  color: white;
}

.carousel-content {
  position: relative;
  z-index: 2;
  max-width: 80%;
  padding: 2rem;
  border-radius: 8px;
}

.cover-darking {
  background: linear-gradient(270deg, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0.75) 100%);
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 1;
}

.carousel-button {
  background-color: #32BAAA;
  border-color: #32BAAA;
  color: white;
  padding: 0 30px;
  height: 40px;
  font-weight: bold;
  margin-top: 20px;
}

.carousel-button:hover {
  background-color: #299d90;
  border-color: #299d90;
}

:deep(.slick-dots) {
  justify-content: start;
  padding-left: 60px;
  bottom: 20px;
}

:deep(.slick-dots > .slick-active > button) {
  background-color: #32BAAA !important;
}

:deep(.slick-dots > li > button) {
  height: 8px;
  border-radius: 999px;
}
</style>
