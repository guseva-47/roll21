<template>
  <div class="">
    <div class="person-block row ">
      <div class="col-lg-12 col-md-4 col-6">
        <PlayerRowBar />
      </div>
      <div class="col-lg-12 col-md-4 col-6">
        <PlayerRowBar />
      </div>
      <div class="col-lg-12 col-md-4 col-6">
        <PlayerRowBar />
      </div>
      <div class="col-lg-12 col-md-4 col-6">
        <PlayerRowBar />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

import PlayerRowBar from './PlayerRowBar.vue'


export default defineComponent({
  name: 'RightBar',
  components: {
    PlayerRowBar
  }
})
</script>

<style lang="scss" scoped>
.person-block {
  padding-top: 5px;
  margin-left: 0;
  margin-right: 0;
  border-radius: 5px;
  background-color: #464646;
}


.avatar {
  max-height: 40px;
}
</style>
