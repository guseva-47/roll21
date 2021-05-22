<template>
  <div class="hello">
    <button @click="visible = true">Open Modal</button>
    <Modal v-if="visible" title="Добавить заметку" @close="visible = false">
      <Editor />
    </Modal>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import Editor from '@/components/Tabletop/Editor/Editor.vue';
import Modal from '@/components/Tabletop/Editor/Modal.vue';

export default defineComponent({
  components: { Editor, Modal },
  setup() {
    const visible = ref(false);
    return { visible };
  },
});
</script>

<style scoped lang="scss"></style>
