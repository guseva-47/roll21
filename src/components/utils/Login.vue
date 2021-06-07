<template>
  <div class="container-xxl ">
    <div class="p-4">
      <p class="col-6">
        Произошла какая-то ошибка при выполнении операции. Возможно вы не
        авторизированы, или срок авторизации истек. Хотите авторизоваться?
      </p>
      <a :href="log" class="btn btn-outline-light btn-lg">
        Авторизоваться
      </a>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'Login',
  data() {
    return {
      log: process.env.VUE_APP_LOGIN_URL,
    };
  },
  methods: {},
});
</script>
