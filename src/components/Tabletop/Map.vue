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
      <div class="map" ref="pixiRoot"></div>
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
import assert from 'assert';
import { defineComponent } from 'vue';

import PixiApp from '../../graphic/PixiApp';
import PixiScene from '../../graphic/scene/PixiScene';
import NewSceneForm from './NewSceneForm.vue';
import { INewMapParam } from '@/components/types/types.interfaces';

export default defineComponent({
  name: 'Map',
  components: {
    NewSceneForm,
  },
  data() {
    return {
      pixiApp: {} as PixiApp,
      mapCount: 1,
      activeMapTab: 1,
    };
  },
  created() {
    this.onWindowResize = () => this.onWindowResize;
  },
  async mounted() {
    await this.createPixiMap();
  },
  methods: {
    async createPixiMap() {
      console.log(this.$refs.pixiRoot);
      assert(this.$refs.pixiRoot);

      // создание сцены
      const rowCellsAmount = 24;
      const columnCellsAmount = 20;
      const cellSizeInPixels = 64;

      const scene = await PixiScene.create(
        rowCellsAmount,
        columnCellsAmount,
        cellSizeInPixels,
      );

      // создание экземпляра pixi приложения
      this.pixiApp = new PixiApp(this.$refs.pixiRoot as HTMLElement, scene);

      window.addEventListener('resize', this.onWindowResize);
    },

    onWindowResize() {
      if (this.pixiApp) {
        const { clientWidth, clientHeight } = this.$refs
          .pixiRoot as HTMLElement;
        this.pixiApp.resize(clientWidth, clientHeight);
      }
    },

    createMap(params: INewMapParam) {
      console.log(params);
    },
  },
});
</script>

<style scoped lang="scss">
.map {
  background-color: #002000;
  min-height: 85vh;
}
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
