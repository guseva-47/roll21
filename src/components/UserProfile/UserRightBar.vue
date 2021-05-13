<template>
  <div class="">
      <div class="person-block row">
      <div class="icon"></div>
      <div class="col">
          <p>Иванов Иван</p>
          <!-- <p>Комментарий заказчика</p> -->
      </div>
    </div>
    <div class="person-block row" >
        <div class="col">
            <img class="icon" src="http://placehold.it/100x100" alt="">
            <div class="">
                <p> Иванов Иван</p>
            </div>
        </div>
        <div class="col">
            <img class="icon" src="http://placehold.it/100x100" alt="">
            <div class="">
                <p> Иванов Коля</p>
            </div>
        </div>
        <div class="col">
            <img class="icon" src="http://placehold.it/100x100" alt="">
            <div class="">
                <p> Иванова Аня</p>
            </div>
        </div>
        <div class="col">
            <img class="icon" src="http://placehold.it/100x100" alt="">
            <div class="">
                <p> Иванова kjhkjh Аня</p>
            </div>
        </div>
        
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'RightBar'
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

.lol {
  padding-top: 10px;
  padding-bottom: 10px;
}
</style>
