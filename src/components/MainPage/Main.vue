<template>
  <!-- TODO
  список последних игр
  нвости сайта
 -->
  <div class="Main container-xxl">
    <!-- Мои игры -->
    <div class="mt-3">
      <h4 class="p-0 m-0">Мои игры</h4>
      <div class="row row-cols-4 row-cols-md-6 m-0 p-0">
        <div class="col p-1">
          <GameCard />
        </div>

        <div class="col p-1">
          <GameCard />
        </div>

        <div class="col p-1">
          <GameCard />
        </div>

        <div class="col p-1">
          <GameCard />
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
import GameCard from "./GameCard.vue";
import News from "./News.vue";

export default defineComponent({
  name: "Main",
  components: {
    GameCard,
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
</style>
