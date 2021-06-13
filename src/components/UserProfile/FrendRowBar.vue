<template>
  <div class="row FrendRowBar p-1">
    <div class="col-auto">
      <router-link :to="{ name: 'ProfId', params: { id: user } }">
        <img
          class="img-fluid rounded mb-3 mb-md-0 avatar"
          src="http://placehold.it/40x40"
          alt=""
        />
      </router-link>
    </div>
    <div class="col p-0">
      <router-link class="not-link" :to="{ name: 'ProfId', params: { id: user } }">
        <p>{{userName}}</p>
      </router-link>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
// TODO BAG: при переходе на страницу другого пользователя, роут меняется а страница не изменяется под нового пользователя

export default defineComponent({
  name: "FrendRowBar",
  props: { user: {type: String, required: true}},
  computed: {
    userName(): string {
      return (this.user.length > 4) ? this.user.slice(-4) : this.user;
    }
  },
});
</script>

<style lang="scss" scoped>
.avatar {
  max-height: 40px;
}

</style>
