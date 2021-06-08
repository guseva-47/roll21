<template>
  <div class="row FrendRowBar p-1">
    <div class="col-auto">
      <router-link to="/profile/id">
        <img
          class="img-fluid rounded mb-3 mb-md-0 avatar"
          src="http://placehold.it/40x40"
          alt=""
        />
      </router-link>
    </div>
    <div class="col p-0">
      <p>
        <router-link class="not-link" to="/profile/id">
          {{ userName }}
        </router-link>
        <br />
        игрок
      </p>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';
import { IPlayer } from '../types/types.interfaces';

export default defineComponent({
  name: 'PlayerRowBar',
  props: { player: { type: Object as PropType<IPlayer> } },
  computed: {
    userName(): string {
      return this.player?.user.slice(-4) ?? '';
    },
  },
});
</script>

<style lang="scss" scoped>
.avatar {
  max-height: 40px;
}
</style>
