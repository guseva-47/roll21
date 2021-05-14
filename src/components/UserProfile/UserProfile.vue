<template>
  <div class="row g-0">
    <div class="row lol" style="padding: 12px;">
      <a class="btn btn-outline-success btn-lg " href="#" id="add-button">+ Новый рецепт</a>
    </div>
    <GameCard />
    <GameCard />
    <GameCard />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

import GameCard from './GameCard.vue'

export default defineComponent({
  name: 'Profile',
  components: {
    GameCard
  }
});
</script>

<style scoped lang="scss">


</style>
