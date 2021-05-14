<template>
<!--  -->
  <div class="card mb-2">
    <div class="card-body">
      <h5 class="card-title">Special title treatment</h5>
      <p class="card-text">With supporting text below as a natural lead-in to additional content.</p>
    </div>
    <div class="card-footer p-1">
      Featured
    </div>
  </div>

  <div class="card mb-2">
    
    <div class="row g-0">
      
      <div class="col-4 p-0 m-0">
        <img class="img-fluid rounded mx-auto d-block" src="http://placehold.it/300x200" alt="...">
      </div>
      <div class="col-8">
        <div class="card-body">
          <h5 class="card-title">Card title</h5>
          <p class="card-text">This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
          <p class="card-text"><small class="text-muted">Last updated 3 mins ago</small></p>
        </div>
      </div>
      <div class="card-footer p-1">
        Featured
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'News',
});
</script>

<style lang="scss" scoped>
  .card {
    background-color: #464646;
  }
</style>
