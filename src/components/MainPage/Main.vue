<template>
  <div class="Main container-xxl">
    <!-- Мои игры -->
    <div class="mt-3">
      <router-link to="/profile/id" class="not-link">
        <h4 class="p-0 m-0">Мои игры</h4>
      </router-link>
      <div class="row row-cols-3 row-cols-md-5 row-cols-xl-6 m-0 p-0 align-items-center">
        <div class="col p-1">
          <TableCard />
        </div>

        <div class="col p-1">
          <TableCard />
        </div>

        <div class="col p-1">
          <TableCard />
        </div>

        <div class="col p-1">
          <TableCard />
        </div>
        <div class="col p-1">
          <router-link
            to="/profile/id"
            class="btn btn-sm btn-outline-secondary p-1"
          >
            <i class="bi bi-arrow-right viuw arrow"></i>
          </router-link>
        </div>
      </div>
    </div>
    <div class="mt-3 row m-0">
      <h4 class="p-0 m-0 mb-1">Новости сайта</h4>

      <div class="news-feed col-md-6">
        <News />
      </div>
      <div class="news-feed col-md-6">
        <News />
      </div>
    </div>
    <!-- Последние игры -->
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import TableCard from "./TableCard.vue";
import News from "./News.vue";

export default defineComponent({
  name: "Main",
  components: {
    TableCard,
    News,
  },
});
</script>

<style scoped lang="scss">
.person-block {
  padding-top: 5px;
  margin-left: 0;
  margin-right: 0;
  border-radius: 5px;
  background-color: #464646;
}
.arrow {
  font-size: 2rem;
}
</style>
