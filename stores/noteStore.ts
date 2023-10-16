import _ from "lodash";
import { Note } from "~/models/Note";
import { Tag, TagColor } from "~/models/Tag";
import { ID } from "~/models/ID";
import { definePersistedStore } from "~/tools/persistedPinia";
import { v4 as uuidv4 } from "uuid";

export const useNoteStore = definePersistedStore("notes", {
  state: () => ({
    notes: new Map<ID, Note>(),
    tags: new Map<ID, Tag>(),
    nextNoteId: 0,
    nextTagId: 0,
  }),
  getters: {
    getNote: (state) => {
      return (noteId: ID) => {
        if (!state.notes.has(noteId)) {
          throw new Error(`[Notes] Note with ID ${noteId} not found`);
        }
        return state.notes.get(noteId)!;
      };
    },
    tagArray: (state) => [...state.tags.values()],
  },
  actions: {
    newNote(title: string, tagId: ID) {
      const noteData = {
        id: uuidv4(),
        title: title,
        tagId: tagId,
        text: "",
      };
      this.notes.set(noteData.id, noteData);
      this.nextNoteId++;
    },
    editNote(noteId: ID, title: string, text: string, tagId: ID) {
      this.getNote(noteId).title = title;
      this.getNote(noteId).text = text;
      this.getNote(noteId).tagId = tagId;
    },
    removeNote(noteId: ID) {
      if (!this.notes.delete(noteId)) {
        throw new Error(`[Notes] Note with ID ${noteId} not found`);
      }
    },
    newTag(title: string, color: TagColor, icon: string[]) {
      if (_.some([...this.tags.values()], (t) => t.color === color))
        throw new Error(`[Notes] Tag with color ${color} already exists`);

      const tagData = {
        id: uuidv4(),
        title: title,
        color: color,
        icon: icon,
      };
      this.tags.set(tagData.id, tagData);
      this.nextTagId++;
    },
    removeTag(tagId: ID) {
      this.tags.delete(tagId);
    },
    editTag(tagId: ID, title: string, color: TagColor, icon: string[]) {
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
