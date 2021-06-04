<template>
  <!-- Контекстное меню -->
  <context-menu>
    <context-menu-item @itemClickHandle="contextEditItem">
      Редактировать
    </context-menu-item>
    <context-menu-item @itemClickHandle="contextDoubleItem">
      Дублировать
    </context-menu-item>
    <context-menu-item @itemClickHandle="contextRemoveItem">
      Удалить
    </context-menu-item>
  </context-menu>

  <!-- Модальное окно с просмотром/редактированием заметки -->
  <NoteViewEdit
    v-if="visible"
    :initMode="mode"
    :initNote="activeNote"
    :tableId="tableId"
    :deleteNote="deleteNote"
    :saveNote="saveNote"
    @closeModal="visible = false"
  />

  <!-- Контент Note бара -->
  <div class="row m-0">
    <!-- Кнопка создания заметки -->
    <button class="btn btn-outline-light p-1" @click="createNote">
      <i class="bi bi-plus-lg"></i> заметка
    </button>
    <!-- Список заметок -->
    <div
      v-for="(note, i) in allNotes"
      :key="i"
      v-contextmenu="{ note: note }"
      @click="viewNote(note)"
      class="note p-1 text-truncate"
    >
      <i class="bi bi-card-text"></i> {{ note.title }}
    </div>
  </div>
</template>


<script lang="ts">
// TODO bag :  когда удаляешь несколько дублированных записок из списка, появляется ошибка сервера 404
// при добавлении большого количества записей срколл не появляется
import {
  INote,
  NoteMode,
  NoteSecureMode,
} from '@/components/types/types.interfaces';
import { defineComponent } from 'vue';
import NoteViewEdit from './NoteViewEdit.vue';
import noteService from '@/services/note.service';
import authService from '@/services/auth.service';

export default defineComponent({
  name: 'NoteBar',
  components: {
    NoteViewEdit,
  },
  data() {
    return {
      visible: false,
      mode: NoteMode.CREATE,
      allNotes: [] as INote[],
      tableId: '',
      activeNote: {} as INote,
    };
  },
  async created() {
    this.tableId = this.$route.params.idTable as string;
    await this.getAllNotes();
  },
  methods: {
    newNoteObject() {
      return {
        _id: '-1',
        title: 'title',
        text: 'text',
        secureMode: NoteSecureMode.author_only,
        tabletop: this.tableId,
        date: new Date(),
        author: '',
      };
    },

    async getAllNotes() {
      try {
        this.allNotes = await noteService.getNotesOnTable(this.tableId);
        console.log(this.allNotes);
      } catch (err) {
        console.log(err);
      }
    },

    createNote() {
      this.activeNote = this.newNoteObject();
      this.mode = NoteMode.CREATE;
      this.visible = true;
    },

    viewNote(note: INote) {
      this.activeNote = note;
      this.mode = NoteMode.VIEW;
      this.visible = true;
    },

    contextEditItem(e: { note: INote }) {
      this.activeNote = e.note;
      this.mode = NoteMode.EDIT;
      this.visible = true;
    },

    contextDoubleItem(e: { note: INote }) {
      this.dubleNote(e.note);
    },

    contextRemoveItem(e: { note: INote }) {
      this.deleteNote(e.note);
    },

    async deleteNote(note: INote) {
      console.log('note', JSON.stringify(note));
      try {
        console.log('delete note from server');
        await noteService.deleteNote(note._id);
      } catch (err) {
        console.log('Error delete note:', err);
      }
      //@ts-ignore
      this.getAllNotes();
    },

    async saveNote(note: INote): Promise<INote | null> {
      try {
        const userId = await authService.getAuthorizedUserId();
        if (userId == null) return null;

        note.date = new Date();
        note.tabletop = this.tableId;

        if (note._id == '-1') {
          note.author = userId;
          note = await noteService.postNoteOnTable(note);
        } else {
          note = await noteService.putNoteOnTable(note);
        }
        this.getAllNotes();
      } catch (err) {
        console.log('Error create note:', err);
        // this.$router.push({ name: 'Login' });
      }
      return note;
    },

    async dubleNote(note: INote): Promise<INote | null> {
      try {
        const userId = await authService.getAuthorizedUserId();
        if (userId == null) return null;

        note._id = '-1';
        note.date = new Date();
        note.tabletop = this.tableId;
        note.author = userId;

        note = await noteService.postNoteOnTable(note);
        this.getAllNotes();
      } catch (err) {
        console.log('Error create note:', err);
        // this.$router.push({ name: 'Login' });
      }
      return note;

    }
  },
});
</script>

<style lang="scss" scoped>
.note {
  border: 0;
}
.note {
  cursor: pointer;
  color: #ffffff;
  border-color: #2a4747;
}
.note:hover {
  border-color: #2a4747;
  background-color: #2a4747;
  color: white;
}
</style>