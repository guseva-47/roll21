import api from '@/backend-api';
import { INote } from '@/components/types/types.interfaces';
import authService from './auth.service';

class NoteService {
  async getNotesOnTable(tableId: string): Promise<INote[]> {
    const authHeader = await authService.checkAccessTokenAndGetAuthHeader();

    let notes: INote[] = [];
    await api
      .get('note/tabletop/' + tableId, {
        headers: authHeader,
      })
      .then(res => {
        notes = res.data;
      })
      .catch(err => {
        console.log(err);
        throw new Error("Can't get all notes from table.");
      });

    return notes;
  }

  async putNoteOnTable(note: INote): Promise<INote> {
    const authHeader = await authService.checkAccessTokenAndGetAuthHeader();

    let noteRes = {} as INote;
    await api
      .put('note/tabletop', note, {
        headers: authHeader,
      })
      .then(res => {
        noteRes = res.data;
      })
      .catch(err => {
        console.log(err);
        throw new Error("Can't put note on table.");
      });

    return noteRes;
  }

  async postNoteOnTable(note: INote): Promise<INote> {
    const authHeader = await authService.checkAccessTokenAndGetAuthHeader();

    let noteRes = {} as INote;
    await api
      .post('note/tabletop', note, {
        headers: authHeader,
      })
      .then(res => {
        noteRes = res.data;
      })
      .catch(err => {
        console.log(err);
        throw new Error("Can't post note on table.");
      });

    return noteRes;
  }

  async deleteNote(idNote: string): Promise<INote> {
    const authHeader = await authService.checkAccessTokenAndGetAuthHeader();

    let noteRes = {} as INote;
    await api
      .delete('note/' + idNote, {
        headers: authHeader,
      })
      .then(res => {
        noteRes = res.data;
      })
      .catch(err => {
        console.log(err);
        throw new Error("Can't delete note.");
      });

    return noteRes;
  }
}

export default new NoteService();
