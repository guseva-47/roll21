<template>
  <div class="">
    <!-- TODO картинка уменьшается с увелечением длины названия -->
    <div class="d-flex flex-row mb-1 p-0 m-0">
      <div class="p-0 align-self-center token">
        <img class="img-fluid" src="http://placehold.it/60x60" />
      </div>
      <div class="p-0 flex-fill m-0">
        <p class="text-break text-start small m-1">img n</p>
      </div>
      <div class="p-0 d-flex align-items-stretch">
        <button class="btn badge btn-outline-danger p-0">
          <i class="bi bi-three-dots-vertical"></i>
        </button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "ImgRow",
  data() {
    return {};
  },
});
</script>

<style lang="scss" scoped>
.token {
  max-height: 60px;
  width: 60px;
}
</style>
