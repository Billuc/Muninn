import { Subscription } from "rxjs/internal/Subscription";
import { ID } from "../../models/ID";
import ServiceAction from "./serviceAction";
import ServiceSubscriber from "./subscriber";
import { Subject } from "rxjs/internal/Subject";
import { Ref } from "vue";
import Database from "~/data/database/database";

export default abstract class SubscribableService<T extends { id: ID }> {
  private _database: Database;
  protected _storeName: string;
  protected _subject: Subject<ServiceAction<T>>;

  constructor(database: Database, storeName: string) {
    this._database = database;
    this._storeName = storeName;
    this._subject = new Subject<ServiceAction<T>>();
  }

  // Subscription stuff

  subscribe(
    value: Ref<T | null> | Ref<T[] | null>,
    filter?: (v: T) => boolean
  ): Subscription {
    const subscriber = new ServiceSubscriber<T>(value, filter);
    return this._subject.subscribe(subscriber);
  }

  private _notify(action: ServiceAction<T>) {
    this._subject.next(action);
  }

  // Service stuff

  protected async _get(id: ID): Promise<T> {
    return await this._database.openTransaction(
      this._storeName,
      "readonly",
      async (transaction) => {
        const store = transaction.getStore();
        const item = store.get(id);
        return item;
      }
    );
  }

  protected async _getAll(): Promise<T[]> {
    return await this._database.openTransaction(
      this._storeName,
      "readonly",
      async (transaction) => {
        const store = transaction.getStore();
        const items = store.getAll();
        return items;
      }
    );
  }

  protected async _getAllFromIndex(
    indexName: string,
    indexKey?: IDBValidKey
  ): Promise<T[]> {
    return await this._database.openTransaction(
      this._storeName,
      "readonly",
      async (transaction) => {
        const index = transaction.getIndex(indexName);
        const items = await index.getAll(indexKey);
        return items;
      }
    );
  }

  protected async _create(create: T): Promise<T> {
    await this._database.openTransaction(
      this._storeName,
      "readwrite",
      async (transaction) => {
        const store = transaction.getStore();
        await store.add(create);
      }
    );

    this._notify({ action: "create", id: create.id, value: create });
    return create;
  }

  protected async _update(update: T): Promise<T> {
    await this._database.openTransaction(
      this._storeName,
      "readwrite",
      async (transaction) => {
        const store = transaction.getStore();
        await store.put(update);
      }
    );

    this._notify({ action: "update", id: update.id, value: update });
    return update;
  }

  protected async _remove(id: ID): Promise<void> {
    await this._database.openTransaction(
      this._storeName,
      "readwrite",
      async (transaction) => {
        const store = await transaction.getStore();
        await store.delete(id);
      }
    );

    this._notify({ action: "remove", id: id });
  }

  protected async _removeFromIndex(
    indexName: string,
    id: IDBValidKey
  ): Promise<void> {
    await this._database.openTransaction(
      this._storeName,
      "readwrite",
      async (transaction) => {
        const store = transaction.getStore();
        const index = transaction.getIndex(indexName);

        const values: T[] = await index.getAll(id);
        await Promise.all(
          values.map(async (v) => {
            await store.delete(v.id);
            this._notify({ action: "remove", id: v.id });
          })
        );
      }
    );
  }
}
