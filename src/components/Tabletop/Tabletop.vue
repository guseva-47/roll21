<template>
  <div class="Tabletop">
    <div class="">

    <div class="row p-0 m-0">
      <div class="col-2 p-0">
        <ToolBar />
      </div>

      <div class="col-10 p-0">
        <Map />
      </div>
    </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

import ToolBar from './ToolBar.vue'
import Map from './Map.vue'

export default defineComponent({
  name: 'Tabletop',
  components: {
    ToolBar,
    Map
  }
});
</script>

<style scoped lang="scss">
.Tabletop {
  background-color: pink;
  flex: 1 0 auto;
}

.wrapper2 {
  display: flex;
	flex-direction: column;
}

.content2 {
  flex: 1 0 auto;
}

</style>
