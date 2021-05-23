<template>
  <div class="row g-0">
    <div class="row lol" style="padding: 12px;">
      <router-link
        v-if="isAuth"
        :to="{ name: 'TableProfId', params: { idTable: '-1' } }"
        class="btn btn-outline-success btn-lg"
      >
        <i class="bi bi-plus-lg"></i> Новая игра
      </router-link>
    </div>
    <div v-if="!isAuth"></div>
    <div v-else-if="!haveTables">
      <p>
        Игровых столов пока нет, они появятся здесь в списке, когда вы создадите
        их, или подключитесь к столам других игроков.
      </p>
    </div>
    <div v-else>
      <TableCard
        :table="allTabletops[0]"
        :userId="userId"
      />
      <TableCard 
        v-for="(table, i) in allTabletops"
        :key="i"
        :table="table"
        :userId="userId"
      />
    </div>
    <!-- <TableCard />
    <TableCard />
    <TableCard /> -->
  </div>
</template>

<script lang="ts">
import authService from "@/services/auth.service";
import tabletopService from "@/services/tabletop.service";
import { defineComponent } from "vue";
import { ITableData } from "../types/types.interfaces";

import TableCard from "./TableCard.vue";

export default defineComponent({
  name: "Profile",
  components: {
    // eslint-disable-next-line vue/no-unused-components
    TableCard,
  },
  data() {
    return {
      allTabletops: [] as ITableData[],
      userId: "",
    };
  },
  computed: {
    haveTables(): boolean {
      return this.allTabletops.length > 0;
    },
    isAuth(): boolean {
      return this.userId != null;
    },
    // isOwner(ownerId): boolean {
    //   console.log('this.userId', this.userId);
    //   console.log('ownerId', ownerId);
    //   return this.userId == ownerId;
    // }
  },
  async created() {
    // @ts-ignore
    this.userId = await authService.getAuthorizedUserId();
    if (this.userId != null) {
      this.allTabletops = await tabletopService.getAllTabletops(this.userId); // TODO
      console.log(this.allTabletops)
    }
  },
});
</script>

<style scoped lang="scss"></style>
