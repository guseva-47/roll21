<template>
  <div class="container-xxl">
    <!-- Мои игры -->
    <div class="mt-3">
      <router-link :to="{ name: 'ProfId', params: { id: userId } }" class="not-link">
        <h4 class="p-0 m-0">Мои игры</h4>
      </router-link>
      <div
        class="row row-cols-3 row-cols-md-5 row-cols-xl-6 m-0 p-0 align-items-center"
      >
        <div v-for="(table, i) in userTables" :key="i" class="col p-1">
          <TableCard :table="table" />
        </div>

        <div v-if="!haveTables" class="col p-1">
          <p>Игр пока нет.</p>
        </div>

        <div v-if="haveId" class="col p-1">
          <router-link
            :to="{ name: 'ProfId', params: { id: userId } }"
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
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import TableCard from "./TableCard.vue";
import News from "./News.vue";
import tabletopService from "@/services/tabletop.service";
import authService from "@/services/auth.service";

import { ITableData } from "../types/types.interfaces";

export default defineComponent({
  name: "Main",
  components: {
    TableCard,
    News,
  },
  data() {
    return {
      userTables: [] as ITableData[],
      maxCountTables: 4,
      userId: null as string | null,
    };
  },
  computed: {
    haveTables() {
      // @ts-ignore
      return this.userTables.length > 0;
    },
    haveId() {
      // @ts-ignore
      return this.userId != null;
    },
  },
  async created() {
    this.userTables = [];
    try {
      this.userId = await authService.getAuthorizedUserId();
      if (this.userId == null) return;
      this.userTables = await this.getLastGames(this.userId);
    } catch (err) {
      this.userTables = [];
    }
  },
  methods: {
    async getLastGames(id: string) {
      return tabletopService.getFewTabletops(id, this.maxCountTables);
    },
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
