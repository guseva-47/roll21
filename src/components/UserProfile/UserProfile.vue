<template>
  <div class="row">
    <div class="row m-0 py-2">
      <router-link
        v-if="isAuth && isMyProfie"
        :to="{ name: 'TableProfId', params: { idTable: '-1' } }"
        class="btn btn-outline-success btn-lg p-1"
      >
        <i class="bi bi-plus-lg"></i> Новая игра
      </router-link>
    </div>
    <div v-if="!isAuth"></div>
    <div v-else-if="!haveTables && isMyProfie">
      <p>
        Игровых столов пока нет, они появятся здесь в списке, когда вы создадите
        их, или подключитесь к столам других игроков.
      </p>
    </div>
    <div v-else-if="!haveTables && !isMyProfie">
      <p>
        Игровых столов пока нет, или они не доступны для просмотра.
      </p>
    </div>
    <div v-else>
      <TableCard
        v-for="(table, i) in allTabletops"
        :key="i"
        :table="table"
        :userId="authUserId"
      />
    </div>
  </div>
</template>

<script lang="ts">
import authService from '@/services/auth.service';
import tabletopService from '@/services/tabletop.service';
import { defineComponent } from 'vue';
import { ITableData } from '../types/types.interfaces';

import TableCard from './TableCard.vue';

export default defineComponent({
  name: 'Profile',
  components: {
    // eslint-disable-next-line vue/no-unused-components
    TableCard,
  },
  data() {
    return {
      allTabletops: [] as ITableData[],
      userIdPage: '' as string | null,
      authUserId: '' as string | null,
    };
  },
  computed: {
    haveTables(): boolean {
      return this.allTabletops.length > 0;
    },
    isAuth(): boolean {
      return this.authUserId != null;
    },
    isMyProfie(): boolean {
      return this.userIdPage == this.authUserId;
    },
  },
  async created() {
    this.userIdPage = this.$route.params.id as string;

    // @ts-ignore
    this.authUserId = await authService.getAuthorizedUserId();
    if (this.authUserId != null) {
      this.allTabletops = await tabletopService.getAllTabletops(
        this.userIdPage,
      );
      console.log(this.allTabletops);
    } else this.$router.push({ name: 'Login' });
  },
});
</script>

<style scoped lang="scss"></style>
