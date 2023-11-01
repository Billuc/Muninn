import { Pipeline, PipelineFactory } from "pipelineer";
import { IDBPDatabase, openDB } from "idb";
import UpgradeDatabase from "./upgradeDatabase";
import Migration from "./migration";
import Transaction from "./transaction";
import MigrateJournalMigration from "./migrations/1-MigrateJournal";
import _ from "lodash";
import MigrateListsMigration from "./migrations/2-MigrateLists";
import FixParentIdSerializationMigration from "./migrations/3-FixParentIdSerialization";

export default class Database {
  private readonly DB_NAME = "muninn-db";
  private readonly MIGRATIONS: Migration[] = [
    new MigrateJournalMigration(),
    new MigrateListsMigration(),
    new FixParentIdSerializationMigration(),
  ];

  private _dbVersion: number;
  private _upgrader: Pipeline<UpgradeDatabase, Promise<undefined>>;
  private _db?: IDBPDatabase;

  constructor() {
    const upgraderFactory = new PipelineFactory<
      UpgradeDatabase,
      Promise<undefined>
    >();
    for (const migration of this.MIGRATIONS) {
      upgraderFactory.push(migration);
    }
    this._upgrader = upgraderFactory.build();

    this._dbVersion = _(this.MIGRATIONS)
      .chain()
      .map((m) => m.version)
      .max()
      .value();
  }

  private async open(): Promise<IDBPDatabase> {
    if (!!this._db) return this._db;

    const upgrader = this._upgrader;
    this._db = await openDB(this.DB_NAME, this._dbVersion, {
      async upgrade(db, oldVersion, newVersion, transaction, event) {
        try {
          await upgrader.exec({ db, oldVersion, newVersion, transaction });
        } catch (e) {
          console.warn(e);
          transaction.abort();
        }
      },
    });
    return this._db;
  }

  async openTransaction<T extends "readonly" | "readwrite", U>(
    store: string,
    mode: T,
    fn: (t: Transaction<T>) => Promise<U>
  ): Promise<U> {
    const db = await this.open();
    const transaction = new Transaction<T>(db, store, mode);

    try {
      return await fn(transaction);
    } catch (e) {
      transaction.rollback();
      throw e;
    } finally {
      await transaction.commit();
    }
  }
}
