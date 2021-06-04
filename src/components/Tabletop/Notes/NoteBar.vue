<template>
  <div class="row m-0">
    <button class="btn btn-outline-light p-1" @click="visible = true">
      <i class="bi bi-plus-lg"></i> заметка
    </button>
    <NoteViewEdit
      v-if="visible"
      :initMode="mode"
      :note="newNote"
      :tableId="tableId"
      :updateNotes="getAllNotes"
      @closeModal="visible = false"
    />
    <div v-for="(note, i) in allNotes" :key="i">
      {{note.title}} {{note._id}}
    </div>
  </div>
</template>

<script lang="ts">
import { INote, NoteMode } from '@/components/types/types.interfaces';
import { defineComponent } from 'vue';
import NoteViewEdit from './NoteViewEdit.vue';
import noteService from '@/services/note.service';

export default defineComponent({
  name: 'NoteBar',
  components: {
    NoteViewEdit,
  },
  data() {
    return {
      visible: false,
      newNote: { _id: '-1', title: 'title', text: 'text' } as INote,
      mode: NoteMode.CREATE,
      allNotes: [] as INote[],
      tableId: '',
    };
  },
  async created() {
    this.tableId = this.$route.params.idTable as string;
    await this.getAllNotes()
  },
  methods: {
    async getAllNotes() {
      console.log('getAllNotes')
      try {
        this.allNotes = await noteService.getNotesOnTable(this.tableId);
        console.log(this.allNotes)
      } catch (err) {
        console.log(err);
      }
    },
  },
});
</script>
