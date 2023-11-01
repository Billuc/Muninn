import { IDBPDatabase, IDBPObjectStore, IDBPTransaction } from "idb";
import Migration from "../migration";
import { deserializeWithMaps } from "./serializer";

export default class FixParentIdSerializationMigration extends Migration {
  version: number = 3;
  name: string = "FixParentIdSerialization";

  async migrate(
    db: IDBPDatabase<unknown>,
    transaction: IDBPTransaction<unknown, ArrayLike<string>, "versionchange">
  ): Promise<undefined> {
    const store = await transaction.objectStore("list-elements");
    const index = store.index("listId");
    const elementsWithWrongParentId = await index.getAll("undefined");

    for (const el of elementsWithWrongParentId) {
      store.put({ ...el, parentId: undefined });
    }
  }
}
