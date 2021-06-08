<template>
  <header>
    <!-- TODO  хедер и футтер заканчиваются не по одной линии справа. верх вылезает вправо-->
    <nav class="navbar navbar-expand-lg navbar-dark p-0">
      <div class="container-xxl">
        <router-link to="/" class="navbar-brand">Tabletop</router-link>
        <div class="navbar-nav">
          <a v-if="!haveUser" :href="log" class="nav-link text-center">
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
      </div>
    </nav>
  </header>
</template>

<script lang="ts">
import authService from '@/services/auth.service';
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'Header',
  data() {
    return {
      label: 'войти с google',
      log: process.env.VUE_APP_LOGIN_URL,
      id: null as string | null,
    };
  },
  async created() {
    this.id = await authService.getAuthorizedUserId();
    if (this.id != null) this.label = this.id;
  },
  computed: {
    haveUser(): boolean {
      return this.id != null;
    },
    userName(): string {
      if (!this.haveUser) return '';
      return this.id?.slice(-4) ?? '';
    },
  },
  methods: {},
});
</script>

<style lang="scss" scoped>
.navbar {
  background-color: #436d6e;
}
</style>
