<template>
  <div class="container row">
    <modal title="Добавить заметку" @close="closeModal">
      <template v-slot:header-buttons>
        <button
          v-if="!isViewMode"
          class="btn btn-outline-secondary btn-sm"
          type="button"
          @click="deleteNote"
        >
          Удалить
        </button>
        <button
          v-if="!isViewMode"
          class="btn btn-outline-darksalmon btn-sm"
          type="button"
          @click="saveNote"
        >
          Сохранить
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
            <h4
              v-else
              class="text-center h4 w-100 form-control-plaintext"
              @click="editModOn"
            >
              {{ note.title }}
            </h4>
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
              @onEdit="editModOn"
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
// eslint-disable-next-line no-unused-vars
import authService from '@/services/auth.service'; // TODO
import noteService from '@/services/note.service';
import EditableView from '@/components/utils/EditableView.vue';
import Modal from '@/components/utils/Modal.vue';

const clone = rfdc();

export default defineComponent({
  name: 'NoteViewEdit',
  components: { Modal, EditableView },
  props: {
    note: { type: Object as PropType<INote>, required: true },
    initMode: {
      type: Number as PropType<NoteMode>,
      required: true,
      default: NoteMode.VIEW,
    },
    tableId: { type: String, required: true },
    // eslint-disable-next-line no-undef
    // @ts-ignore
    updateNotes: {},
  },
  emits: ['closeModal'],
  data() {
    return {
      editedNote: {} as INote,
      mode: NoteMode.VIEW,
    };
  },
  async created() {
    this.editedNote = clone(this.note);
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
  },
  methods: {
    closeModal() {
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

    async deleteNote() {
      try {
        console.log('delete note from server');
        await noteService.deleteNote(this.editedNote._id);
        this.closeModal();
        // if (typeof this.table._id == 'undefined')
        //   throw new Error('Tabletop id is undefined');

        // await TabletopService.deleteNotetop(this.table._id);
      } catch (err) {
        console.log('Error delete note:', err);
        // this.$router.push({ name: 'Login' });
      }
      //@ts-ignore
      this.updateNotes()
    },

    async saveNote() {
      try {
        console.log('save note in server');
        const userId = await authService.getAuthorizedUserId();
        if (userId == null) return;

        this.editedNote.date = new Date();
        this.editedNote.tabletop = this.tableId;
        try {
          // проверка на наличие прав на редактирование. или не нужна
          if (this.editedNote._id == '-1') {
            this.editedNote.author = userId;
            this.editedNote = await noteService.postNoteOnTable(this.editedNote);
          } else {
            this.editedNote = await noteService.putNoteOnTable(this.editedNote);
          }
          //@ts-ignore
          this.updateNotes()
        } catch (err) {
          console.log(err);
        }
        // проверить есть id или нет, в зависимости от этого сделать post или put
        // todo перед отправкой на сервер задисэйблить окно
        // при получении положительного ответа изменить id записки на новую
      } catch (err) {
        console.log('Error create note:', err);
        // this.$router.push({ name: 'Login' });
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
