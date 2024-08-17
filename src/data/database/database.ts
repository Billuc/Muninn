import { openDB } from 'idb';
import _ from 'lodash';
import { Pipeline, PipelineFactory } from 'pipelineer';

import Migration from './migration';
import MigrateJournalMigration from './migrations/1-MigrateJournal';
import SetTextColorsMigration from './migrations/10-SetTextColors';
import CreateFavoriteMigration from './migrations/11-CreateFavorite';
import CreateBoardsStoreMigration from './migrations/12-CreateBoardsStore';
import TransformListAndNotesIntoBoardsMigration from './migrations/13-TransformListAndNotesIntoBoards';
import MigrateListThemeMigration from './migrations/14-MigrateListTheme';
import AddBoardOnlineFieldMigration from './migrations/15-AddBoardOnlineField';
import MigrateListsMigration from './migrations/2-MigrateLists';
import FixParentIdSerializationMigration from './migrations/3-FixParentIdSerialization';
import MigrateEventsMigration from './migrations/4-MigrateEvents';
import MigrateNotesMigration from './migrations/5-MigrateNotes';
import ListIdAndParentIdIndexMigration from './migrations/6-ListIdAndParentIdIndex';
import JournalMoodDBAndEntryCreatedAtMigration from './migrations/7-JournalMoodDBAndEntryCreatedAt';
import CreateGeneralStoreMigration from './migrations/8-CreateGeneralStore';
import ListElementParentIndexMigration from './migrations/9-ListElementParentIndex';
import Transaction from './transaction';

import type { IDBPDatabase } from "idb";
import type UpgradeDatabase from "./upgradeDatabase";
export default class Database {
  private readonly DB_NAME = "muninn-db";
  private readonly MIGRATIONS: Migration[] = [
    new MigrateJournalMigration(),
    new MigrateListsMigration(),
    new FixParentIdSerializationMigration(),
    new MigrateEventsMigration(),
    new MigrateNotesMigration(),
    new ListIdAndParentIdIndexMigration(),
    new JournalMoodDBAndEntryCreatedAtMigration(),
    new CreateGeneralStoreMigration(),
    new ListElementParentIndexMigration(),
    new SetTextColorsMigration(),
    new CreateFavoriteMigration(),
    new CreateBoardsStoreMigration(),
    new TransformListAndNotesIntoBoardsMigration(),
    new MigrateListThemeMigration(),
    new AddBoardOnlineFieldMigration(),
  ];

  private _dbVersion: number;
  private _upgrader: Pipeline<UpgradeDatabase, Promise<undefined>>;
  private _db?: IDBPDatabase;

  constructor() {
    const upgraderFactory = new PipelineFactory<
      UpgradeDatabase,
      Promise<undefined>
    >();
    for (const migration of _.sortBy(this.MIGRATIONS, (m) => m.version)) {
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
      async upgrade(db, oldVersion, newVersion, transaction, _) {
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
