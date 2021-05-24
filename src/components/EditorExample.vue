<template>
  <div class="container-xxl">
    <!-- <button @click="visible = true">Open Modal</button>
    <modal
      v-if="visible"
      title="Добавить заметку"
      @close="visible = false"
    ></modal> -->
    <!-- TODO фокусироваться на названии или описании в зависимости от того, на кого нажал, а не только на описании, как сейчас -->
    <p v-if="readonly" @click="readonly = false">{{ title }}</p>
    <textarea v-else v-model="title" />
    <editable-view
      v-model:htmlContent="editableDescription"
      :readonly="readonly"
      @onEdit="readonly = false"
    />
    <button @click="save">Accept</button>
    <button @click="cancel">Cancel</button>

    <p>{{ content }}</p>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import Modal from "@/components/utils/Modal.vue";
import EditableView from "./utils/EditableView.vue";

export default defineComponent({
  // eslint-disable-next-line vue/no-unused-components
  components: { Modal, EditableView },
  setup() {
    const visible = ref(false);
    const title = ref("Title");
    const description = ref("waka<h1>waka</h1>ee ee");
    const editableDescription = ref(description.value);
    const readonly = ref(true);
    return { visible, title, description, readonly, editableDescription };
  },
  methods: {
    save() {
      // post/put todo
      this.description = this.editableDescription;
      this.readonly = true;
    },
    cancel() {
      this.editableDescription = this.description;
      this.readonly = true;
    },
  },
});
</script>

<style scoped lang="scss"></style>
