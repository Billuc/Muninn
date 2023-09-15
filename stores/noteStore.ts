import { faTag } from "@fortawesome/free-solid-svg-icons";
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
  },
  actions: {
    newNote(title: string, tagIds: number[]) {
      this.notes.set(this.nextNoteId, {
        id: this.nextNoteId,
        title: title,
        tagIds: tagIds,
        text: "",
      });
      this.nextNoteId++;
    },
    editNote(noteId: number, title: string, text: string) {
      this.getNote(noteId).title = title;
      this.getNote(noteId).text = text;
    },
    removeNote(noteId: number) {
      if (!this.notes.delete(noteId)) {
        throw new Error(`[Notes] Note with ID ${noteId} not found`);
      }
    },
    newTag(title: string) {
      this.tags.set(this.nextTagId, {
        id: this.nextTagId,
        title: title,
        color: _.sample(Object.values(TagColor))!,
        icon: [faTag.prefix, faTag.iconName],
      });
      this.nextTagId++;
    },
    removeTag(tagId: number) {
      this.tags.delete(tagId);
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
});
