import type { IDBPDatabase, IDBPObjectStore, IDBPTransaction } from "idb";
import Migration from "../migration";
import { deserializeWithMaps } from "./serializer";

export default class MigrateNotesMigration extends Migration {
  version: number = 5;
  name: string = "MigrateNotes";

  async migrate(
    db: IDBPDatabase<unknown>,
    transaction: IDBPTransaction<unknown, ArrayLike<string>, "versionchange">
  ): Promise<undefined> {
    const noteStore = this.getOrCreateNoteStore(db, transaction);
    const noteTagStore = this.getOrCreateNoteTagStore(db, transaction);
    await this.copyFromLocalStorage(noteStore, noteTagStore);
  }

  getOrCreateNoteStore(
    db: IDBPDatabase<unknown>,
    transaction: IDBPTransaction<unknown, ArrayLike<string>, "versionchange">
  ): IDBPObjectStore<unknown, ArrayLike<string>, "notes", "versionchange"> {
    if (db.objectStoreNames.contains("notes"))
      return transaction.objectStore("notes");

    return db.createObjectStore("notes", { keyPath: "id" });
  }

  getOrCreateNoteTagStore(
    db: IDBPDatabase<unknown>,
    transaction: IDBPTransaction<unknown, ArrayLike<string>, "versionchange">
  ): IDBPObjectStore<unknown, ArrayLike<string>, "note-tags", "versionchange"> {
    if (db.objectStoreNames.contains("note-tags"))
      return transaction.objectStore("note-tags");

    return db.createObjectStore("note-tags", { keyPath: "id" });
  }

  async copyFromLocalStorage(
    noteStore: IDBPObjectStore<
      unknown,
      ArrayLike<string>,
      "notes",
      "versionchange"
    >,
    noteTagStore: IDBPObjectStore<
      unknown,
      ArrayLike<string>,
      "note-tags",
      "versionchange"
    >
  ) {
    const localNotes = localStorage.getItem("__persisted__notes");
    if (!localNotes) {
      console.warn("No note in localStorage");
      return;
    }

    const noteState = deserializeWithMaps(localNotes);
    const notes: Map<
      string,
      {
        id: string;
        title: string;
        tagId: string;
        text: string;
      }
    > = noteState.notes;

    const tags: Map<
      string,
      {
        id: string;
        title: string;
        color: string;
        icon: string[];
      }
    > = noteState.tags;

    for (const [_, note] of notes) {
      await noteStore.add({
        id: note.id,
        text: note.text,
        title: note.title,
        tagId: note.tagId,
      });
    }

    for (const [_, tag] of tags) {
      await noteTagStore.add({
        id: tag.id,
        title: tag.title,
        color: tag.color,
        icon: tag.icon,
      });
    }
  }
}
