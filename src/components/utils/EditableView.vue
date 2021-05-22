<template>
  <div>
    <rich-text-viewer
      v-if="readonly"
      :content="content"
      @focus="edit()"
      fixedHeight="true"
    />
    <template v-else>
      <rich-text-editor v-model:content="content" :focused="true" heightFixed="true" />
      <button :disabled="content === backup" @click="apply(true)">
        Accept
      </button>
      <button @click="apply(false)">Cancel</button>
    </template>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import RichTextEditor from '@/components/utils/RichTextEditor/RichTextEditor.vue';
import RichTextViewer from '@/components/utils/RichTextViewer.vue';

export default defineComponent({
  components: { RichTextEditor, RichTextViewer },
  props: { htmlContent: String },
  emits: ['update:htmlContent'],
  setup: (props, { emit }) => {
    const backup = ref(props.htmlContent);
    const content = ref(props.htmlContent);
    const readonly = ref(true);

    const edit = () => (readonly.value = false);

    const apply = (needSave: boolean) => {
      if (needSave) {
        backup.value = content.value;
        emit('update:htmlContent', content.value);
      } else {
        content.value = backup.value;
      }
      readonly.value = true;
    };

    return { content, backup, readonly, edit, apply };
  },
});
</script>

<style scoped lang="scss"></style>
