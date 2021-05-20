<template>
  <QuillEditor theme="snow" toolbar="full" />
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { QuillEditor } from "@vueup/vue-quill";
import "@vueup/vue-quill/dist/vue-quill.snow.css";
import "./editor-theme-patch.css";

export default defineComponent({
  components: { QuillEditor },
});
</script>

<style scoped lang="scss"></style>
