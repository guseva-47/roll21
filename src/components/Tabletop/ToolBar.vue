<template>
  <div class="toolBar">
    <ul class="nav nav-tabs small tool-bar-nav">
      <li class="nav-item">
        <button
          class="nav-link p-2 not-link"
          v-bind:class="{ active: activeTab == 0 }"
          @click="activeTab = 0"
        >
          <i class="bi bi-file-earmark-arrow-down active"></i>
        </button>
      </li>
      <li class="nav-item">
        <button
          class="nav-link p-2 not-link"
          v-bind:class="{ active: activeTab == 1 }"
          @click="activeTab = 1"
        >
          <i class="bi bi-box"></i>
        </button>
      </li>
      <li class="nav-item">
        <button
          class="nav-link p-2 not-link"
          v-bind:class="{ active: activeTab == 2 }"
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
    <div v-if="activeTab == 2">
      <NoteBar />
      
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

import ImgRow from "./ImgRow.vue";
import NoteBar from "./Notes/NoteBar.vue";

export default defineComponent({
  name: "ToolBar",
  components: {
    ImgRow,
    NoteBar
  },
  data() {
    return {
      activeTab: 2,
    };
  },
  methods: {
    cl(): void {},
  },
});
</script>

<style scoped lang="scss">
.toolBar {
  min-height: 100%;
  background-color: #436d6e;
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
.active:hover {
  background-color: #ffffff;
}
</style>
