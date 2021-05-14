<template>
  
  <div class="wrapper">
    <Header />

    <div class="content">
      <router-view/>
    </div>

    <Footer />
  </div>

</template>

<script lang="ts">
import { defineComponent } from 'vue';
import Header from './components/Header.vue';
import Footer from './components/Footer.vue'

export default defineComponent({
  name: 'App',
  components: {
    Header,
    Footer
  }
});
</script>

<style lang="scss">

@import url('https://fonts.googleapis.com/css2?family=Open+Sans&family=Raleway:wght@500&display=swap');
#app {
  font-family: 'Raleway', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #ffffff;
  background-color: #222222;
  min-height: 100vh;
}

.wrapper {
  display: flex;
  min-height: 100vh;
  flex-direction: column;
}

.content {
  flex: 1;
}

</style>
