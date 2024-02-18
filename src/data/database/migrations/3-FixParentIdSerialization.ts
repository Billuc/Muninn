import type { IDBPDatabase, IDBPTransaction } from "idb";
import Migration from "../migration";

export default class FixParentIdSerializationMigration extends Migration {
  version: number = 3;
  name: string = "FixParentIdSerialization";

  async migrate(
    _: IDBPDatabase<unknown>,
    transaction: IDBPTransaction<unknown, ArrayLike<string>, "versionchange">
  ): Promise<undefined> {
    const store = transaction.objectStore("list-elements");
    const index = store.index("parentId");
    const elementsWithWrongParentId = await index.getAll("undefined");

    for (const el of elementsWithWrongParentId) {
      store.put({ ...el, parentId: undefined });
    }
  }
}
