<template>
  <div
    :class="{ 'fixed-height': heightFixed }"
    @focus="onFocus()"
    @blur="onBlur()"
    tabindex="100"
  >
    <div class="ql-editor"><p v-html="content"></p></div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import '@vueup/vue-quill/dist/vue-quill.snow.css';

export default defineComponent({
  props: { content: { type: String }, heightFixed: Boolean },
  emits: ['focus', 'blur'],
  setup: (props, { emit }) => ({
    onFocus: () => emit('focus'),
    onBlur: () => emit('blur'),
  }),
});
</script>

<style scoped lang="scss"></style>
