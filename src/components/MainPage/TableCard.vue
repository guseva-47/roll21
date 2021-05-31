<template>
  <div class="card">
    <router-link :to="{ name: 'Go', params: { idTable: table._id } }">
      <img class="card-img-top" src="http://placehold.it/70x30" alt="" />
    </router-link>
    <div class="card-body p-1">
      <router-link
        :to="{ name: 'Go', params: { idTable: table._id } }"
        class="not-link"
      >
        <h5 class="card-title text-truncate">{{ table.name }}</h5>
      </router-link>

      <router-link
        :to="{ name: 'Go', params: { idTable: table._id } }"
        class="btn btn-outline-success p-1 mx-2"
      >
        <i class="bi bi-play play"></i>
      </router-link>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";
import { ITableData } from "../types/types.interfaces";

export default defineComponent({
  name: "TableCard",
  props: {
    table: { type: Object as PropType<ITableData>, required: true },
  },
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
