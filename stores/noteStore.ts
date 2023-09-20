import _ from "lodash";
import { Note } from "~/models/Note";
import { Tag, TagColor } from "~/models/Tag";
import { definePersistedStore } from "~/tools/persistedPinia";

export const useNoteStore = definePersistedStore("notes", {
  state: () => ({
    notes: new Map<number, Note>(),
    tags: new Map<number, Tag>(),
    nextNoteId: 0,
    nextTagId: 0,
  }),
  getters: {
    getNote: (state) => {
      return (noteId: number) => {
        if (!state.notes.has(noteId)) {
          throw new Error(`[Notes] Note with ID ${noteId} not found`);
        }
        return state.notes.get(noteId)!;
      };
    },
    tagArray: (state) => [...state.tags.values()],
  },
  actions: {
    newNote(title: string, tagId: number) {
      this.notes.set(this.nextNoteId, {
        id: this.nextNoteId,
        title: title,
        tagId: tagId,
        text: "",
      });
      this.nextNoteId++;
    },
    editNote(noteId: number, title: string, text: string, tagId: number) {
      this.getNote(noteId).title = title;
      this.getNote(noteId).text = text;
      this.getNote(noteId).tagId = tagId;
    },
    removeNote(noteId: number) {
      if (!this.notes.delete(noteId)) {
        throw new Error(`[Notes] Note with ID ${noteId} not found`);
      }
    },
    newTag(title: string, color: TagColor, icon: string[]) {
      if (_.some([...this.tags.values()], (t) => t.color === color))
        throw new Error(`[Notes] Tag with color ${color} already exists`);

      this.tags.set(this.nextTagId, {
        id: this.nextTagId,
        title: title,
        color: color,
        icon: icon,
      });
      this.nextTagId++;
    },
    removeTag(tagId: number) {
      this.tags.delete(tagId);
    },
    editTag(tagId: number, title: string, color: TagColor, icon: string[]) {
      if (!this.tags.has(tagId))
        throw new Error(`[Notes] Tag with ID ${tagId} not found`);

      if (
        _.some(
          [...this.tags.values()],
          (t) => t.id !== tagId && t.color === color
        )
      )
        throw new Error(`[Notes] Tag with color ${color} already exists`);

      this.tags.set(tagId, {
        id: tagId,
        color: color,
        title: title,
        icon: icon,
      });
    },
  },
});
