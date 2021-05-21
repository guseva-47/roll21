<template>
  <div class="row FrendRowBar p-1">
    <div class="col-auto">
      <router-link to="/person/id">
        <img
          class="img-fluid rounded mb-3 mb-md-0 avatar"
          src="http://placehold.it/40x40"
          alt=""
        />
      </router-link>
    </div>
    <div class="col p-0">
      <p>
        <router-link class="not-link" to="/profile/id">
          Иванов Иван
        </router-link>
        <br />
        игрок
      </p>
    </div>
    <div class="col-auto">
      <!-- TODO выпадающее меню -->
      <div class="dropdown">
        <button
          class="btn btn-outline-secondary"
          id="dropdownMenuButton1"
          data-bs-toggle="dropdown"
          aria-expanded="false"
          style="padding-inline: 3px"
        >
          ⁝
        </button>
        <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton1">
          <li><a class="dropdown-item" href="#">Изменить роль</a></li>
          <li><a class="dropdown-item" href="#">Удалить из игры</a></li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "PlayerRowBar",
});
</script>

<style lang="scss" scoped>
.avatar {
  max-height: 40px;
}
</style>
