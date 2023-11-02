import type {
  IDBPDatabase,
  IDBPIndex,
  IDBPObjectStore,
  IDBPTransaction,
} from "idb";
import Migration from "../migration";

export default class ListIdAndParentIdMigration extends Migration {
  version: number = 6;
  name: string = "ListIdAndParentId";

  async migrate(
    db: IDBPDatabase<unknown>,
    transaction: IDBPTransaction<unknown, ArrayLike<string>, "versionchange">
  ): Promise<undefined> {
    const store = transaction.objectStore("list-elements");
    const index = store.index("parentId");

    await this.changeUndefinedParentIdsToEmptyString(store);
    this.removeIndex(store, index);
    this.createNewIndex(store);
  }

  async changeUndefinedParentIdsToEmptyString(
    store: IDBPObjectStore<
      unknown,
      ArrayLike<string>,
      "list-elements",
      "versionchange"
    >
  ) {
    const allElements: {
      id: string;
      title: string;
      done: boolean;
      index: number;
      parentId?: string;
      listId: string;
    }[] = await store.getAll();
    const elementsWithUndefinedParentId = allElements.filter(
      (el) => el.parentId === undefined
    );

    for (const el of elementsWithUndefinedParentId) {
      await store.put({ ...el, parentId: "" });
    }
  }

  removeIndex(
    store: IDBPObjectStore<
      unknown,
      ArrayLike<string>,
      "list-elements",
      "versionchange"
    >,
    index: IDBPIndex<
      unknown,
      ArrayLike<string>,
      "list-elements",
      "parentId",
      "versionchange"
    >
  ) {
    store.deleteIndex(index.name);
  }

  createNewIndex(
    store: IDBPObjectStore<
      unknown,
      ArrayLike<string>,
      "list-elements",
      "versionchange"
    >
  ) {
    store.createIndex("listId_parentId", ["listId", "parentId"], {
      unique: false,
    });
  }
}
