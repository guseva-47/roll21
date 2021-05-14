<template>
<!--  -->
  <div class="card mb-2">
    <div class="card-body">
      <h5 class="card-title">Обновленный интерфейс</h5>
      <p class="card-text">Личная сраница теперь выглядит поновому, мы обновили дизайн, чтобы пользоваться сайтом через телефон стало удобнее.</p>
    </div>
    <div class="card-footer p-1">
      Обновление
    </div>
  </div>

  <div class="card mb-2">
    
    <div class="row g-0">
      
      <div class="col-4 p-0 m-0">
        <img class="img-fluid rounded mx-auto d-block" src="http://placehold.it/300x200" alt="...">
      </div>
      <div class="col-8">
        <div class="card-body">
          <h5 class="card-title">Конкурс</h5>
          <p class="card-text">Объявляем конкурс креативных карт! </p>
          <p class="card-text"><small class="text-muted">Last updated 3 mins ago</small></p>
        </div>
      </div>
      <div class="card-footer p-1">
        Веселье
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'News',
});
</script>

<style lang="scss" scoped>
  .card {
    background-color: #464646;
  }
</style>
