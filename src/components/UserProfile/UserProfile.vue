<template>
  <div class="row g-0">
    <div class="row lol" style="padding: 12px;">
      <router-link to="/" class="btn btn-outline-success btn-lg">
        <i class="bi bi-plus-lg"></i> Новая игра
      </router-link>
    </div>
    <GameCard />
    <GameCard />
    <GameCard />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

import GameCard from "./GameCard.vue";

export default defineComponent({
  name: "Profile",
  components: {
    GameCard,
  },
});
</script>

<style scoped lang="scss"></style>
