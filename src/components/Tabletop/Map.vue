<template>
  <div class="map" ref="pixiRoot">
  </div>
</template>

<script lang="ts">
import assert from 'assert'
import { defineComponent } from 'vue';

import PixiApp from '../../graphic/PixiApp'
import PixiScene from '../../graphic/scene/PixiScene';

export default defineComponent({
  name: 'Map',
  data() {
    return {
      pixiApp: {} as PixiApp
    }
  },
  created() {
    this.onWindowResize = () => this.onWindowResize
  },
  async mounted() {
    await this.createPixiMap();
  },
  methods: {
    async createPixiMap() {
      console.log(this.$refs.pixiRoot)
      assert(this.$refs.pixiRoot);

      // создание сцены
      const rowCellsAmount = 24;
      const columnCellsAmount = 20;
      const cellSizeInPixels = 64;

      const scene = await PixiScene.create(
          rowCellsAmount,
          columnCellsAmount,
          cellSizeInPixels
      );

      // создание экземпляра pixi приложения
      this.pixiApp = new PixiApp(this.$refs.pixiRoot as HTMLElement, scene);

      window.addEventListener('resize', this.onWindowResize);
    },
    onWindowResize() {
        if (this.pixiApp) {
            const { clientWidth, clientHeight } = this.$refs.pixiRoot as HTMLElement;
            this.pixiApp.resize(clientWidth, clientHeight);
        }
    }
  }
});
</script>

<style scoped lang="scss">

.map {
  background-color: #002000;
  min-height: 85vh;
}

</style>