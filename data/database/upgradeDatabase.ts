import type { IDBPDatabase, IDBPTransaction } from "idb";

export default interface UpdateDatabase {
  db: IDBPDatabase;
  oldVersion: number;
  newVersion: number | null;
  transaction: IDBPTransaction<unknown, ArrayLike<string>, "versionchange">;
}
