import { defineStore } from "pinia";
import { Note, Tag } from "~/models/Note";

export const useNoteStore = defineStore("notes", {
  state: () => ({
    notes: {} as { [key: number]: Note },
    tags: {} as { [key: number]: Tag },
    nextNoteId: 0,
    nextTagId: 0,
  }),
  getters: {
    getNote: (state) => {
      return (noteId: number) => {
        if (state.notes[noteId] === undefined) {
          throw new Error(`[Notes] Note with ID ${noteId} not found`);
        }
        return state.notes[noteId];
      };
    },
  },
  actions: {
    newNote(title: string, tagIds: number[]) {
      this.notes[this.nextNoteId] = {
        id: this.nextNoteId,
        title: title,
        tagIds: tagIds,
        text: "",
      };
      this.nextNoteId++;
    },
    editNote(noteId: number, title: string, text: string) {
      this.getNote(noteId).title = title;
      this.getNote(noteId).text = text;
    },
    removeNote(noteId: number) {
      if (this.notes[noteId] === undefined) {
        throw new Error(`[Notes] Note with ID ${noteId} not found`);
      }
      delete this.notes[noteId];
    },
    newTag(title: string) {
      this.tags[this.nextTagId] = {
        id: this.nextTagId,
        title: title,
      };
      this.nextTagId++;
    },
    removeTag(tagId: number) {
      delete this.tags[tagId];
    },
    addTagToNote(noteId: number, tagId: number) {
      const noteTagIds = this.getNote(noteId).tagIds;

      if (noteTagIds.includes(tagId))
        console.warn(
          `[Notes] Note with ID ${noteId} already has tag with ID ${tagId}`
        );
      else noteTagIds.push(tagId);
    },
    removeTagfromNote(noteId: number, tagId: number) {
      const noteTagIds = this.getNote(noteId).tagIds;

      if (!noteTagIds.includes(tagId))
        console.warn(
          `[Notes] Note with ID ${noteId} doesn't have tag with ID ${tagId}`
        );
      else this.getNote(noteId).tagIds = noteTagIds.filter((id) => id != tagId);
    },
  },
  persist: true,
});
