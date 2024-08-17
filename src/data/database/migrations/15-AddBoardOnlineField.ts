import { IDBPDatabase, IDBPTransaction } from 'idb';

import Migration from '../migration';

export default class AddBoardOnlineFieldMigration extends Migration {
  version: number = 15;
  name: string = "AddBoardOnlineField";

  async migrate(
    _: IDBPDatabase<unknown>,
    transaction: IDBPTransaction<unknown, ArrayLike<string>, "versionchange">
  ): Promise<undefined> {
    const boardStore = transaction.objectStore("boards");
    const boards = await boardStore.getAll();

    for (let b of boards) {
      await boardStore.put({
        ...b,
        online: false,
      });
    }
  }
}
