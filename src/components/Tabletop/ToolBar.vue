<template>
  <div class="toolBar">
    <ul class="nav nav-tabs">
      <li class="nav-item">
        <button 
          class="nav-link p-2" 
          v-bind:class="{'active': activeTab == 0}"
          @click="activeTab = 0"
        >
          A
        </button>
      </li>
      <li class="nav-item">
        <button 
          class="nav-link p-2" 
          v-bind:class="{'active': activeTab == 1}"
          @click="activeTab = 1"
        >
          B
        </button>
      </li>
    </ul>
    
    <div v-if="activeTab == 0">
      <ImgRow />
      <ImgRow />
      <ImgRow />
      <ImgRow />
    </div>
    <div v-if="activeTab == 1">
      content 1
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

import ImgRow from './ImgRow.vue'

export default defineComponent({
  name: 'ToolBar',
  components: {
    ImgRow
  },
  data() {
    return {
      activeTab: 0,
    }
  },
  methods: {
    cl(): void {
    }
  }
});
</script>

<style scoped lang="scss">
.toolBar {
  min-height: 100%;
  background-color: yellowgreen;
}

</style>