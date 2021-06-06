<template>
  <button
    class="col-form-label btn btn-outline-warning px-1 mx-1"
    @click="onClick(formula)"
  >
    {{title}}
  </button>
</template>
<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'DiceButton',
  props: ['title', 'formula', 'onClick'],
})
</script>