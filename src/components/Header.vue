<template>
      <header>
        <!-- TODO  хедер и футтер заканчиваются не по одной линии справа. верх вылезает вправо-->
        <nav class="navbar navbar-expand-lg navbar-dark">
          <div class="container-xxl">
            <a class="navbar-brand" href="#">Tabletop</a>
            <div class="navbar-nav">
              <i class="bi bi-person text-center p-0 m-0"></i>
              <a class="nav-link small p-0 m-0" href="#">войти</a>
            </div>
            <!-- <button 
              class="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarNavAltMarkup"
              aria-controls="navbarNavAltMarkup"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span class="navbar-toggler-icon"></span>
            </button>
            <div 
              class="collapse navbar-collapse"
              id="navbarNavAltMarkup"
            >
              <div class="navbar-nav">
                <a class="nav-link" href="#">другая станица</a>
              </div>
            </div> -->
          </div>
        </nav>
    </header>
</template>

<script>
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'Header',
});
</script>

<style lang="scss" scoped>


.navbar {
  background-color: #436d6e
}

</style>