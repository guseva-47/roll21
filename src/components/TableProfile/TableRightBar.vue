<template>
  <div class="row m-0 py-2">
    <router-link
      v-if="isOwner || isOnlyGamer"
      :to="{ name: 'Go', params: { idTable: 'table._id' } }"
      class="btn btn-success btn-lg"
    >
      <i class="bi bi-play play"></i> Начать игру
    </router-link>
    <div class="person-block row mt-2">
      <div v-if="table.players.length < 1">
        <p>Игроки еще не добавлены</p>
      </div>
      <div
        v-else
        v-for="(player, i) in table.players"
        :key="i"
        class="col-lg-12 col-md-4 col-6"
      >
        <PlayerRowBar :player="player" />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import authService from '@/services/auth.service';
import tabletopService from '@/services/tabletop.service';
import { defineComponent } from 'vue';
import { IPlayer, ITableData } from '../types/types.interfaces';

import PlayerRowBar from './PlayerRowBar.vue';

export default defineComponent({
  name: 'RightBar',
  components: {
    PlayerRowBar,
  },
  data() {
    return {
      table: {
        _id: '-1',
        name: '',
        aboutInfo: '',
        owner: '',
        players: [] as IPlayer[],
      } as ITableData,
      userId: '',
    };
  },
  async created() {
    const tableId = this.$route.params.idTable;

    await this.getTable(tableId as string)
    const id = await authService.getAuthorizedUserId();
    this.userId = id == null ? '' : id;
  },
  computed: {
    tableId(): string {
      console.log('computed')
      return this.$route.params.idTable as string;
    },
    isOwner(): boolean {
      if (typeof this.table.owner == 'undefined') return false;
      return this.userId == this.table.owner;
    },
    isOnlyGamer(): boolean {
      const players = this.table.players ?? [];
      const user = players.find(item => item.user == this.userId);
      return typeof user !== 'undefined';
    },
  },
  watch: {
    tableId: function () {
      console.log('wathc')
      this.getTable(this.tableId)
    },
  },
  methods: {
    async getTable(tableId: string) {
      if(!tableId) return;
      console.log('getTable')
      if (tableId != '-1') {
        try {
          this.table = await tabletopService.getTabletop(tableId as string);
          this.table.players = this.table.players ?? ([] as IPlayer[]);
          console.log('this.table', this.table);
        } catch (err) {
          console.log('Error get table:', err);
          this.$router.push({ name: 'Login' });
        }
      }
    },
  },
});
</script>

<style lang="scss" scoped>
.person-block {
  padding-top: 5px;
  margin-left: 0;
  margin-right: 0;
  border-radius: 5px;
  background-color: #464646;
}

.avatar {
  max-height: 40px;
}
</style>
