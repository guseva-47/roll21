<template>
  <div class="container row" @keyup.esc="closeModal">
    <modal :title="modalTitle" @close="closeModal">
      <template v-slot:header-buttons>
        <button
          v-if="isViewMode"
          class="btn btn-outline-darksalmon btn-sm"
          type="button"
          @click="editModOn"
        >
          <i class="bi bi-wrench"></i>
        </button>
        <button
          v-if="isEditMode"
          class="btn btn-outline-secondary btn-sm"
          type="button"
          @click="del"
        >
          <i class="bi bi-trash"></i>
        </button>
        <button
          v-if="!isViewMode"
          class="btn btn-outline-darksalmon btn-sm"
          type="button"
          @click="sav"
          :disabled="!haveChanges"
        >
          <i class="bi bi-save"></i> Сохранить
        </button>
      </template>
      <template v-slot:default>
        <div>
          <!-- editedNote.Title -->
          <div>
            <textarea
              v-if="!isViewMode"
              class="text-center h4 w-100 form-control-plaintext p-0"
              v-bind:rows="1"
              v-model="editedNote.title"
              ref="tableTitle"
            />
            <!-- <h4
              v-else
              class="text-center h4 w-100 form-control-plaintext"
              @click="editModOn"
            >
              {{ note.title }}
            </h4> -->
          </div>

          <!-- editedNote.text -->
          <div>
            <!-- editedNote.text в случае если запись создается. 
            Отличается тем, что нет возможности выйти из режима редактирования
          -->
            <EditableView
              v-if="isCreateMode"
              v-model:htmlContent="editedNote.text"
              :readonly="false"
              @onEdit="readonly = false"
            />
            <!-- editedNote.text в случае если запись просматривается или редактируется. 
            Текст может переходить в режим редактирования, если кликнуть по тексту
          -->
            <EditableView
              v-else
              v-model:htmlContent="editedNote.text"
              :readonly="isViewMode"
              @onEdit="readonly = false"
            />
          </div>
        </div>
      </template>
    </modal>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';
import rfdc from 'rfdc';

import { INote, NoteMode } from '@/components/types/types.interfaces';
import EditableView from '@/components/utils/EditableView.vue';
import Modal from '@/components/utils/Modal.vue';

const clone = rfdc();

export default defineComponent({
  name: 'NoteViewEdit',
  components: { Modal, EditableView },
  props: {
    initNote: { type: Object as PropType<INote>, required: true },
    initMode: {
      type: Number as PropType<NoteMode>,
      required: true,
      default: NoteMode.VIEW,
    },
    tableId: { type: String, required: true },

    deleteNote: {},
    saveNote: {},
  },
  emits: ['closeModal'],
  data() {
    return {
      note: {} as INote,
      editedNote: {} as INote,
      mode: NoteMode.VIEW,
    };
  },
  async created() {
    this.note = clone(this.initNote);
    this.editedNote = clone(this.initNote);
    this.mode = this.initMode;
  },
  computed: {
    // isEmptyName(): boolean {
    //   return this.editedTable.name.length <= 0;
    // },
    isEditMode(): boolean {
      return this.mode == NoteMode.EDIT;
    },
    isCreateMode(): boolean {
      return this.mode == NoteMode.CREATE;
    },
    isViewMode(): boolean {
      return this.mode == NoteMode.VIEW;
    },
    haveChanges(): boolean {
      if (this.note.title != this.editedNote.title) return true;
      if (this.note.text != this.editedNote.text) return true;
      if (this.note.secureMode != this.editedNote.secureMode) return true;
      return false;
    },
    modalTitle(): string {
      if(this.isCreateMode) return 'Создание';
      if(this.isEditMode) return 'Изменение';
      return this.editedNote.title;
    }
  },
  methods: {
    closeModal() {
      console.log('close!')
      this.$emit('closeModal');
    },
    async editModOn() {
      // todo расскомментировать
      // const userId = await authService.getAuthorizedUserId();
      // if (userId == null) return;
      // if (userId != this.note.authorId) return;
      this.mode = NoteMode.EDIT;
    },
    editModOff() {
      this.mode = NoteMode.VIEW;
    },
    cancelEdit() {
      this.mode = NoteMode.VIEW;
      this.editedNote = clone(this.note);
    },
    async del() {
      try {
        // eslint-disable-next-line no-undef
        // @ts-ignore
        await this.deleteNote(this.editedNote);
        this.closeModal();
      } catch (err) {
        console.log(err);
      }
    },
    async sav() {
      try {
        // todo запретить ввод, пока сохранение на сервер не подтвердится успехом
        // eslint-disable-next-line no-undef
        // @ts-ignore
        const result = await this.saveNote(this.editedNote);
        if(result == null) return;
        this.note = clone(result);
        this.editedNote._id = clone(result);
        this.mode = NoteMode.EDIT;
      } catch (err) {
        console.log(err);
      }
    },
  },
});
</script>

<style lang="scss" scoped>
.btn-outline-darksalmon {
  color: #bf8685;
  border-color: #bf8685;
}
.btn-outline-darksalmon:hover {
  border-color: #bf8685;
  background-color: #bf8685;
  color: white;
}
</style>
