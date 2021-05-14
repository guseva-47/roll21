<template>
<!-- TODO добавиьт ссылки по окну и надписи -->
  <div class="card">
    <img class="card-img-top" src="http://placehold.it/70x30" alt="">
    <div class="card-body p-1">
      <h5 class="card-title text-truncate">Зимняя роскошь</h5>

      <a href="#" class="btn btn-sm btn-outline-secondary p-1">
        <i class="bi bi-arrow-right viuw"></i>
      </a>

      <a href="#" class="btn btn-outline-success p-1 mx-2">
        <i class="bi bi-play play"></i>
      </a>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'GameCard',
});
</script>

<style lang="scss" scoped>
  .card {
    background-color: #464646;
  }

  .bi {
    font-size: 1rem;
  }

  .card-img-top {
    max-height: 80px;
  }
</style>
