import type { IDBPDatabase, IDBPObjectStore, IDBPTransaction } from "idb";
import Migration from "../migration";
import { deserializeWithMaps } from "./serializer";

export default class MigrateListsMigration extends Migration {
  version: number = 2;
  name: string = "MigrateLists";

  async migrate(
    db: IDBPDatabase<unknown>,
    transaction: IDBPTransaction<unknown, ArrayLike<string>, "versionchange">
  ): Promise<undefined> {
    const listStore = this.getOrCreateListStore(db, transaction);
    const elementStore = this.getOrCreateListElementStore(db, transaction);
    await this.copyFromLocalStorage(listStore, elementStore);
  }

  getOrCreateListStore(
    db: IDBPDatabase<unknown>,
    transaction: IDBPTransaction<unknown, ArrayLike<string>, "versionchange">
  ): IDBPObjectStore<unknown, ArrayLike<string>, "lists", "versionchange"> {
    if (db.objectStoreNames.contains("lists"))
      return transaction.objectStore("lists");

    return db.createObjectStore("lists", { keyPath: "id" });
  }

  getOrCreateListElementStore(
    db: IDBPDatabase<unknown>,
    transaction: IDBPTransaction<unknown, ArrayLike<string>, "versionchange">
  ): IDBPObjectStore<
    unknown,
    ArrayLike<string>,
    "list-elements",
    "versionchange"
  > {
    if (db.objectStoreNames.contains("list-elements"))
      return transaction.objectStore("list-elements");

    const elementStore = db.createObjectStore("list-elements", {
      keyPath: "id",
    });
    elementStore.createIndex("listId", "listId", { unique: false });
    elementStore.createIndex("parentId", "parentId", { unique: false });
    return elementStore;
  }

  async copyFromLocalStorage(
    listStore: IDBPObjectStore<
      unknown,
      ArrayLike<string>,
      "lists",
      "versionchange"
    >,
    elementStore: IDBPObjectStore<
      unknown,
      ArrayLike<string>,
      "list-elements",
      "versionchange"
    >
  ) {
    const localLists = localStorage.getItem("__persisted__lists");
    if (!localLists) {
      console.warn("No list in localStorage");
      return;
    }

    const listsState = deserializeWithMaps(localLists);
    const lists: Map<
      string,
      {
        id: string;
        title: string;
        elements: Map<
          string,
          {
            id: string;
            title: string;
            done: boolean;
            index: number;
            parentId?: string;
          }
        >;
        nextElementId: number;
        hideChecked: boolean;
      }
    > = listsState.lists;

    for (const [_, list] of lists) {
      await listStore.add({
        id: list.id,
        title: list.title,
        hideChecked: list.hideChecked,
      });

      for (const [_, element] of list.elements) {
        await elementStore.add({
          id: element.id,
          title: element.title,
          done: element.done,
          index: element.index,
          parentId: element.parentId,
          listId: list.id,
        });
      }
    }
  }
}
