<template>
  <div class="hello">
    <button @click="visible = true">Open Modal</button>
    <modal v-if="visible" title="Добавить заметку" @close="visible = false"></modal>
    <editable-view v-model:htmlContent="content" />
    <p>{{ content }}</p>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import Modal from '@/components/utils/Modal.vue';
import EditableView from './utils/EditableView.vue';

export default defineComponent({
  components: { Modal, EditableView },
  setup() {
    const visible = ref(false);
    const content = ref('waka<h1>waka</h1>ee ee');
    return { visible, content };
  },
});
</script>

<style scoped lang="scss"></style>
