<template>
  <!-- TODO добавиьт ссылки по окну и надписи -->
  <div class="card">
    <router-link to="/table/id">
      <img class="card-img-top" src="http://placehold.it/70x30" alt="" />
    </router-link>
    <div class="card-body p-1">
      <router-link to="/table/id" class="not-link">
        <h5 class="card-title text-truncate">Зимняя роскошь</h5>
      </router-link>

      <router-link to="/table/id/go" class="btn btn-outline-success p-1 mx-2">
        <i class="bi bi-play play"></i>
      </router-link>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "TableCard",
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
