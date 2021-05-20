<template>
  <div class="container-xxl row">
    <div class="lol order-lg-2 col-lg-3 order-1">
      <router-view name="rightBar" />
    </div>

    <div class="col-xxl-8 offset-xxl-1 
                col-lg-9 offset-lg-0 order-lg-1 
                order-2"
    >
      <router-view name="leftBar" />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "TwoColumnTemplate",
});
</script>

<style scoped lang="scss"></style>
