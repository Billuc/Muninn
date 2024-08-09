import { IDBPDatabase, IDBPObjectStore, IDBPTransaction } from "idb";
import { v4 } from "uuid";

import Migration from "../migration";

export default class TransformListAndNotesIntoBoardsMigration extends Migration {
  version: number = 13;
  name: string = "TransformListAndNotesIntoBoards";

  async migrate(
    _: IDBPDatabase<unknown>,
    transaction: IDBPTransaction<unknown, ArrayLike<string>, "versionchange">
  ): Promise<undefined> {
    const boardsStore = transaction.objectStore("boards");
    const listsStore = transaction.objectStore("lists");
    const notesStore = transaction.objectStore("notes");
    const favoritesStore = transaction.objectStore("favorites");
    await this.migrateData(boardsStore, listsStore, notesStore, favoritesStore);
  }

  async migrateData(
    boardsStore: IDBPObjectStore<
      unknown,
      ArrayLike<string>,
      "boards",
      "versionchange"
    >,
    listsStore: IDBPObjectStore<
      unknown,
      ArrayLike<string>,
      "lists",
      "versionchange"
    >,
    notesStore: IDBPObjectStore<
      unknown,
      ArrayLike<string>,
      "notes",
      "versionchange"
    >,
    favoritesStore: IDBPObjectStore<
      unknown,
      ArrayLike<string>,
      "favorites",
      "versionchange"
    >
  ) {
    const lists = await listsStore.getAll();
    const notes = await notesStore.getAll();
    const favoriteIds = await favoritesStore.getAllKeys();

    for (let list of lists) {
      const boardId = await boardsStore.add({
        id: v4(),
        title: list.title,
        tagId: "",
        cards: [{ id: list.id, type: "list" }],
      });

      if (favoriteIds.includes(list.id)) {
        await favoritesStore.add({ id: boardId, type: "board" });
        await favoritesStore.delete(list.id);
      }
    }
    for (let note of notes) {
      const boardId = await boardsStore.add({
        id: v4(),
        title: note.title,
        tagId: note.tagId,
        cards: [{ id: note.id, type: "note" }],
      });

      if (favoriteIds.includes(note.id)) {
        await favoritesStore.add({ id: boardId, type: "board" });
        await favoritesStore.delete(note.id);
      }
    }
  }
}
