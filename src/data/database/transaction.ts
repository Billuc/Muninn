import type { IDBPDatabase, IDBPIndex, IDBPObjectStore, IDBPTransaction } from "idb";

export default class Transaction<T extends "readonly" | "readwrite"> {
  _database: IDBPDatabase;
  _storeName: string;
  _transaction: IDBPTransaction<unknown, [string], T>;

  constructor(database: IDBPDatabase, storeName: string, mode: T) {
    this._database = database;
    this._storeName = storeName;
    this._transaction = this._database.transaction(this._storeName, mode);
  }

  getStore(): IDBPObjectStore<unknown, [string], string, T> {
    return this._transaction.objectStore(this._storeName);
  }

  getIndex(indexName: string): IDBPIndex<unknown, [string], string, string, T> {
    return this.getStore().index(indexName);
  }

  async commit(): Promise<void> {
    await this._transaction.done;
  }

  rollback(): void {
    this._transaction.abort()
  }
}
