<template>
  <!-- Table One -->
  <div class="row tabe-card">
    <div class="col-md-4">
      <router-link to="/tabe/id">
        <img
          class="img-fluid rounded mb-3 mb-md-0"
          src="http://placehold.it/700x300"
          alt=""
        />
      </router-link>
    </div>
    <div class="col-md-8">
      <div class="position-relative">
        <h3 class="d-flex justify-content-between">
          <h3 class="list-inline-item">
          Зимняя роскошь роскошь роскошь
          </h3>
          <router-link
            to="/tabe/id"
            class="btn btn-outline-primary stretched-link btn-outline-darksalmon list-inline-item"
          >
            <i class="bi bi-arrow-right"></i>
          </router-link>
        </h3>
        <p>
          В этом году Праздник Макушки зимы проходит в прекрасном Морском районе
          Глубоководья. Там проходит шумная ярмарка и специальный при­ём на
          ВИЛЛЕ КАССАЛАНТЕРОВ, которую семьяКассалантеров любезно открыла для
          публики навремя праздников.
        </p>
      </div>
      <router-link to="/tabe/id/go" class="btn btn-outline-success">
        Запустить <i class="bi bi-play play"></i>
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
.tabe-card {
  padding: 0;
  padding-top: 10px;
  padding-bottom: 10px;
}

.btn-outline-darksalmon {
  color: #bf8685;
  border-color: #bf8685;
}
.btn-outline-darksalmon:hover {
  border-color: #bf8685;
  background-color: #bf8685;
  color: white;
}
</style>
