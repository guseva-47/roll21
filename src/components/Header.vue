<template>
      <header>
        <nav class="navbar navbar-expand-lg navbar-dark">
          <div class="container-xxl">
            <a class="navbar-brand" href="#">Tabletop</a>
            <div class="navbar-nav">
              <a class="nav-link" href="#">другая станица</a>
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
  background-color: #5f9ea0
}

</style>