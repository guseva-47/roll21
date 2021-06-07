<template>
  <div class="toolBar">
    <ul class="nav nav-tabs small tool-bar-nav">
      <li v-for="i in mapCount - 1" :key="i" class="nav-item not-link">
        <button
          class="nav-link not-link p-2"
          v-bind:class="{ active: activeMapTab == i }"
          @click="activeMapTab = i"
        >
          Название
        </button>
      </li>
      <li class="nav-item">
        <button
          class="nav-link p-2 not-link not-link-plus"
          v-bind:class="{ active: activeMapTab == mapCount }"
          @click="activeMapTab = mapCount"
        >
          <i class="bi bi-plus-circle"></i>
        </button>
      </li>
    </ul>

    <div v-if="activeMapTab == 3">
      
    </div>
    <div v-if="activeMapTab == mapCount">
      <NewSceneForm :createMap="createMap" />
    </div>
    <div v-if="activeMapTab == 2">
      2
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

import NewSceneForm from './NewSceneForm.vue';
import { INewMapParam } from '@/components/types/types.interfaces';

export default defineComponent({
  name: 'MapController',
  components: {
    NewSceneForm,
  },
  data() {
    return {
      mapCount: 1,
      activeMapTab: 1,
    };
  },
  methods: {

    createMap(params: INewMapParam) {
      console.log(params);
    },
  },
});
</script>

<style scoped lang="scss">
.tool-bar-nav {
  background-color: #2a4747;
}
.not-link {
  color: rgb(255, 255, 255);
  text-decoration: none;
}
.not-link:visited {
  color: rgb(255, 255, 255);
  text-decoration: none;
}
.not-link:hover {
  background-color: #436d6e;
}
.not-link-plus:hover {
  background-color: #bf8685;
}
.active:hover {
  background-color: #ffffff;
}
</style>
