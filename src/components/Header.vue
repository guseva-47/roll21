<template>
  <header>
    <!-- TODO  хедер и футтер заканчиваются не по одной линии справа. верх вылезает вправо-->
    <nav class="navbar navbar-expand-lg navbar-dark">
      <div class="container-xxl">
        <router-link to="/" class="navbar-brand">Tabletop</router-link>
        <div class="navbar-nav">
          <router-link to="/profile/id" class="not-link nav-link text-center">
            <i class="bi bi-person p-0 m-0"></i>
            <p class="small p-0 m-0" @click="ping">войти</p>
          </router-link>
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
import api from "@/services/main.service";
import { defineComponent } from "vue";

export default defineComponent({
  name: "Header",
  methods: {
    async ping() {
      try {
        console.log(await api.ping());
        api.login()
        console.log(await api.ok())
        // await api.fake()
      } catch (err) {
        console.log(err);
      }
    },
  },
});
</script>

<style lang="scss" scoped>
.navbar {
  background-color: #436d6e;
}
</style>
