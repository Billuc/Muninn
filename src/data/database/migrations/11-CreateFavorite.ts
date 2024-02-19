import { IDBPDatabase, IDBPTransaction } from "idb";

import Migration from "../migration";

export default class CreateFavoriteMigration extends Migration {
  version: number = 11;
  name: string = "CreateFavorite";

  async migrate(
    db: IDBPDatabase<unknown>,
    _: IDBPTransaction<unknown, ArrayLike<string>, "versionchange">
  ): Promise<undefined> {
    await this.createFavoriteStore(db);
  }

  async createFavoriteStore(db: IDBPDatabase<unknown>) {
    const favoriteStore = db.createObjectStore("favorites", { keyPath: "id" });

    return favoriteStore;
  }
}
