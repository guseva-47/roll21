<template>
  <div class="">
    <div class="person-block row">
      <div class="col-auto">
        <a href="one-game.html">
          <img class="img-fluid rounded mb-3 mb-md-0 avatar" src="http://placehold.it/60x60" alt="">
        </a>
      </div>
      <div class="col">
          <p>Иванов Иван</p>
          <!-- <p>Комментарий заказчика</p> -->
      </div>
    </div>

    <div class="person-block row g-0">
      <div class="col-lg-12 col-md-4 col-6">
        <FrendRowBar />
      </div>
      <div class="col-lg-12 col-md-4 col-6">
        <FrendRowBar />
      </div>
      <div class="col-lg-12 col-md-4 col-6">
        <FrendRowBar />
      </div>
      <div class="col-lg-12 col-md-4 col-6">
        <FrendRowBar />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import FrendRowBar from './FrendRowBar.vue'

export default defineComponent({
  name: 'RightBar',
  components: {
    FrendRowBar
  }
})
</script>

<style lang="scss" scoped>
.person-block {
  margin-top: 10px;
  padding: 5px;
  margin-left: 0;
  margin-right: 0;
  border-radius: 5px;
  background-color: #464646;
}
.icon {
  width: 60px; 
  height: 60px;
  background: #cccccc;
  border-radius: 50%;
  margin: 5px;
}

.avatar {
  max-height: 40px;
}
</style>
