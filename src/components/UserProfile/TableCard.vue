<template>
  <!-- Table One -->
  <div class="row tabe-card">
    <div class="col-md-4">
      <router-link :to="tableProfileRoute">
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
            {{ table.name }}; isOner={{ isOwner }}
          </h3>
          <!-- router-link :to="{ name: 'TableProfId', params: { idTable: 123 }}" -->
          <router-link
            :to="tableProfileRoute"
            class="btn btn-outline-primary stretched-link btn-outline-darksalmon list-inline-item"
          >
            <i class="bi bi-arrow-right"></i>
          </router-link>
        </h3>
        <p>
          {{ table.aboutInfo }}
        </p>
      </div>
      <router-link :to="tableGoRoute" class="btn btn-outline-success">
        Запустить <i class="bi bi-play play"></i>
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
    userId: { type: String, require: true },
  },
  computed: {
    // gameInfo(): string {
    //   return (typeof this.table.aboutInfo == 'undefined') ? '' : this.table.aboutInfo;
    // },
    isOwner(): boolean {
      if (typeof this.table.owner == "undefined") return false;
      return this.userId == this.table.owner;
    },
    tableId(): string {
      // @ts-ignore
      return this.table._id;
    },
    tableProfileRoute(): object {
      const path = { name: "TableProfId", params: { idTable: this.tableId } };
      return path;
    },
    tableGoRoute(): object {
      return { name: "Go", params: { idTable: this.tableId } };
    },
  },
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
