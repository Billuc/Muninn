import { IDBPDatabase, IDBPTransaction } from "idb";

import Migration from "../migration";

export default class ListElementParentIndexMigration extends Migration {
  version: number = 9;
  name: string = "ListElementParentIndex";

  async migrate(
    _: IDBPDatabase<unknown>,
    transaction: IDBPTransaction<unknown, ArrayLike<string>, "versionchange">
  ): Promise<undefined> {
    const store = transaction.objectStore("list-elements");

    store.createIndex("parentId", "parentId", {
      unique: false,
    });
  }
}
