<template>
  <RichTextViewer
    v-if="readonly"
    :content="content"
    @focus="edit()"
    fixedHeight="true"
  />
  <RichTextEditor v-else v-model:content="content" :focused="true" />
</template>

<script lang="ts">
import { defineComponent, computed } from "vue";
import RichTextEditor from "@/components/utils/RichTextEditor/RichTextEditor.vue";
import RichTextViewer from "@/components/utils/RichTextViewer.vue";

export default defineComponent({
  components: { RichTextEditor, RichTextViewer },
  props: { htmlContent: String, readonly: { type: Boolean, default: true } },
  emits: ["update:htmlContent", "onEdit"],
  setup: (props, { emit }) => {
    const content = computed<string>({
      get: () => props.htmlContent ?? "",
      set: (value) => emit("update:htmlContent", value),
    });

    const edit = () => emit("onEdit");

    return { content, edit };
  },
});
</script>

<style scoped lang="scss"></style>
