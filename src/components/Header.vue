<template>
  <header>
    <!-- TODO  хедер и футтер заканчиваются не по одной линии справа. верх вылезает вправо-->
    <nav class="navbar navbar-expand-lg navbar-dark">
      <div class="container-xxl">
        <router-link to="/" class="navbar-brand">Tabletop</router-link>
        <div class="navbar-nav">
          <a
            v-if="!haveUser"
            href="http://localhost:3000/login"
            class="nav-link text-center"
          >
            <i class="bi bi-person p-0 m-0"></i>
            <p class="small p-0 m-0">{{ label }}</p>
          </a>
          <router-link
            v-else
            :to="{ name: 'ProfId', params: { id: id } }"
            class="nav-link text-center"
          >
            <i class="bi bi-person p-0 m-0"></i>
            <p class="small p-0 m-0">{{ label }}</p>
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
import authService from "@/services/auth.service";
import api from "@/services/main.service";
import { defineComponent } from "vue";

export default defineComponent({
  name: "Header",
  data() {
    return {
      label: "войти с google",
      log: "http://localhost:3000/login",
      id: null,
    };
  },
  async created() {
    // await this.ping();
    this.id = await authService.getAuthorizedUserId();
    if (this.id != null) this.label = this.id;
  },
  computed: {
    haveUser() {
      return this.id != null;
    },
  },
  methods: {
    async ping() {
      try {
        console.log(await api.ping());
        api.login();
        console.log(await api.ok());
      } catch (err) {
        console.log(err);
      }
    },
    // async loginOrProfile() {
    //   const id = await authService.getAuthorizedUserId();
    //   if (id == null) this.$router.push({ name: 'Login'});
    //   this.$router.push({ name: 'ProfId', params: { id: id}});
    // }
  },
});
</script>

<style lang="scss" scoped>
.navbar {
  background-color: #436d6e;
}
</style>
