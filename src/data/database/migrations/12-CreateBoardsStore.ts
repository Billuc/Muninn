import { IDBPDatabase, IDBPObjectStore, IDBPTransaction } from "idb";

import Migration from "../migration";

export default class CreateBoardsStoreMigration extends Migration {
  version: number = 12;
  name: string = "CreateBoardsStore";

  async migrate(
    db: IDBPDatabase<unknown>,
    _: IDBPTransaction<unknown, ArrayLike<string>, "versionchange">
  ): Promise<undefined> {
    await this.createBoardsStore(db);
  }

  async createBoardsStore(db: IDBPDatabase<unknown>) {
    const boardsStore = db.createObjectStore("boards", { keyPath: "id" });

    return boardsStore;
  }
}
