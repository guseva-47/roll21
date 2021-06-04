<template>
  <div></div>
</template>

<script lang="ts">
import mainService from "@/services/main.service";
import { defineComponent } from "vue";

export default defineComponent({
  name: "Oauth",
  data() {
    return {};
  },
  created() {
    this.f();
  },
  methods: {
    async f() {
      const jwt = this.$route.params.jwt.toString();
      console.log(`jwt: ${jwt}`)
      await mainService.login(jwt);
      this.$router.go(-2);
    }
  }
});
</script>