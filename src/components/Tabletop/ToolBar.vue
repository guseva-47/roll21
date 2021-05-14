<template>
  <div class="toolBar">
    <ul class="nav nav-tabs tt">
      <li class="nav-item t">
        <button 
          class="nav-link p-2" 
          v-bind:class="{'active': activeTab == 0}"
          @click="activeTab = 0"
        >
          <i class="bi bi-file-earmark-arrow-down"></i>
        </button>
      </li>
      <li class="nav-item">
        <button 
          class="nav-link p-2" 
          v-bind:class="{'active': activeTab == 1}"
          @click="activeTab = 1"
        >
          <i class="bi bi-box"></i>
        </button>
      </li>
      <li class="nav-item">
        <button 
          class="nav-link p-2" 
          v-bind:class="{'active': activeTab == 2}"
          @click="activeTab = 2"
        >
          <i class="bi bi-pencil-square"></i>
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
  background-color: #436d6e;
}
.t {
  background-color: #436d6e;
}
.tt {
  background-color: #2a4747;
}

</style>