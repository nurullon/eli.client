<script setup></script>

<template>
  <div class="h-full flex justify-center md:justify-center lg:justify-center flex-col gap-4">
    <div>
      <a-carousel :autoplay="true">
        <div>
          <div>
            <div class="flex items-center justify-center mb-12">
              <img class="w-1/2" src="@/assets/images/slide1.svg" alt="Слайд 1" />
            </div>
            <h3 class="text-primary text-center text-2xl font-semibold">
              Запишитесь к врачу ближайшей больницы в удобное для вас время
            </h3>
          </div>
        </div>

        <div>
          <div>
            <div class="flex items-center justify-center mb-12">
              <img class="w-1/2" src="@/assets/images/slide2.svg" alt="Слайд 2" />
            </div>
            <h3 class="text-primary text-center text-2xl font-semibold">
              Получите талон к вашему выбранному врачу
            </h3>
          </div>
        </div>

        <div>
          <div>
            <div class="flex items-center justify-center mb-12">
              <img class="w-1/2" src="@/assets/images/slide3.svg" alt="Слайд 3" />
            </div>
            <h3 class="text-primary text-center text-2xl font-semibold">
              Управляйте своим драгоценным временем
            </h3>
          </div>
        </div>
      </a-carousel>
    </div>
  </div>
</template>


<style scoped lang="scss">
:deep(.ant-carousel .slick-dots-bottom) {
  bottom: 65px;
}

:deep(.ant-carousel .slick-dots li button) {
  height: 6px;
  border-radius: 3px;
  background: #1E5A84;
}
</style>
