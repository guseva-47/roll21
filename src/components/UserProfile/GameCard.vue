<template>
   <!-- Game One -->
    <div class="row game-card">
        <div class="col-md-4">
            <a href="one-game.html">
              <img class="img-fluid rounded mb-3 mb-md-0" src="http://placehold.it/700x300" alt="">
            </a>
        </div>
        <div class="col-md-8">
            <h3>Суп "Солянка"</h3>
            <p>Суп солянка классическая отлично пойдет на второй-третий день праздника — когда народ  захочет чего-либо горяченького вместо поднадоевших салатов.</p>
            <a class="btn btn-outline-primary btn-outline-darksalmon" href="#">Подробно</a>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'GameCard',
})
</script>

<style lang="scss" scoped>

.game-card {
  padding: 0;
  padding-top: 10px;
  padding-bottom: 10px;
}

.btn-outline-darksalmon {
  color: #BF8685;
  border-color: #BF8685;
}
.btn-outline-darksalmon:hover {
  border-color: #BF8685;
  background-color: #BF8685;
  color: white;
}

</style>