<template>
  <quill-editor
    :class="{ 'fixed-height': heightFixed }"
    theme="snow"
    contentType="html"
    :toolbar="toolbar"
    :readOnly="readonly"
    v-model:content="contentUpdater"
    @focus="onFocus()"
    @blur="onBlur()"
    ref="editor"
  />
</template>

<script lang="ts">
import { defineComponent, PropType, computed, ref, onMounted } from 'vue';
import { QuillEditor } from '@vueup/vue-quill';
import '@vueup/vue-quill/dist/vue-quill.snow.css';
import './editor-theme-patch.css';

export default defineComponent({
  components: { QuillEditor },
  props: {
    content: { type: String, required: true },
    readonly: { type: Boolean, default: false },
    focused: Boolean,
    toolbar: {
      type: String as PropType<'essential' | 'minimal' | 'full' | ''>,
      default: 'full',
    },
    heightFixed: Boolean,
  },
  emits: {
    'update:content': (content: string) => typeof content === 'string',
    focus: null,
    blur: null,
  },
  setup(props, { emit }) {
    const contentUpdater = computed<string>({
      get: () => props.content,
      set: (value) => emit('update:content', value),
    });

    const editor = ref<typeof QuillEditor>();
    const quill = computed<{ focus: () => void } | undefined>(() =>
      editor.value?.getQuill()
    );

    onMounted(() => props.focused && quill.value?.focus());

    const onFocus = () => emit('focus');
    const onBlur = () => emit('blur');

    return { contentUpdater, onFocus, onBlur, editor };
  },
});
</script>

<style scoped lang="scss"></style>
