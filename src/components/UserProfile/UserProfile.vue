<template>
  <div class="row g-0">
    <div class="row lol" style="padding: 12px;">
      <!-- $router.push({ name: 'editTable', params: { id: '-1' } }) -->
      <router-link
        :to="{ name: 'TableProfId', params: { id: '-1' } }"
        class="btn btn-outline-success btn-lg"
      >
        <i class="bi bi-plus-lg"></i> Новая игра
      </router-link>
    </div>
    <TableCard />
    <TableCard />
    <TableCard />
  </div>
</template>

<script lang="ts">
import tabletopService from "@/services/tabletop.service";
import { defineComponent } from "vue";

import TableCard from "./TableCard.vue";

export default defineComponent({
  name: "Profile",
  components: {
    TableCard,
  },
  async created() {
    console.log(await tabletopService.getAllTabletops("5fb164e5b304e646441ce2da")) // TODO
  }
});
</script>

<style scoped lang="scss"></style>
