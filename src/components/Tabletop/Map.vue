<template>
  <div class="map" ref="pixiRoot"></div>
</template>

<script lang="ts">
import { defineComponent, onMounted, onUnmounted, ref } from 'vue';
// @ts-ignore
import IGraphicApp from '@/graphic/graphicApp/IGraphicApp';
import PixiApp from '@/graphic/graphicApp/PixiApp';
import BasicScene from '@/graphic/scene/BasicScene';
import TokenLoader from '@/graphic/scene/token/TokenLoader';

export default defineComponent({
  props: {
    rowCellsAmount: { type: Number, default: 24 },
    columnCellsAmount: { type: Number, default: 20 },
    cellSizeInPixels: { type: Number, default: 64 },
  },
  setup(props) {
    const pixiRoot = ref<HTMLElement>();
    const pixiApp = ref<IGraphicApp>();

    const resizeMap = () => {
      const { clientWidth, clientHeight } = pixiRoot.value!;
      pixiApp.value!.resize(clientWidth, clientHeight);
    };

    onMounted(async () => {
      // создание сцены
      const scene = BasicScene.create(
        props.rowCellsAmount,
        props.columnCellsAmount,
        props.cellSizeInPixels,
      );

      // создание экземпляра pixi приложения
      pixiApp.value = new PixiApp(pixiRoot.value!, scene);

      // включение обновления размера карты при изменении размера окна
      window.addEventListener('resize', resizeMap);

      //
      // test
      //
      const tokenData = [
        { name: 'waka', url: '/img/size64/token_1.png', x: 64, y: 64 },
        { name: 'bar', url: '/img/size64/token_2.png', x: 256, y: 256 },
        { name: 'foo', url: '/img/size64/token_3.png', x: 64, y: 256 },
      ];
      const loader = new TokenLoader();
      const promises = tokenData.map(dto => loader.loadToken(dto));
      const tokens = await Promise.all(promises);
      tokens.forEach(token => pixiApp.value!.addToken(token));

      const dto = { name: '#', url: '/img/size64/token_4.png', x: 512, y: 512 };
      const token = await loader.loadToken(dto);
      setTimeout(() => {
        pixiApp.value!.addToken(token);
      }, 3000);
    });

    onUnmounted(() => {
      // отключение обновления размера карты при изменении размера окна
      window.removeEventListener('resize', resizeMap);
    });

    return { pixiRoot };
  },
});
</script>

<style scoped lang="scss">
.map {
  background-color: #222222;
  min-height: 80vh;
}
</style>
