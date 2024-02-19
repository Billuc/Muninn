import { IDBPDatabase, IDBPObjectStore, IDBPTransaction } from "idb";

import Migration from "../migration";

export default class CreateGeneralStoreMigration extends Migration {
  version: number = 8;
  name: string = "CreateGeneralStore";

  async migrate(
    db: IDBPDatabase<unknown>,
    _: IDBPTransaction<unknown, ArrayLike<string>, "versionchange">
  ): Promise<undefined> {
    const generalStore = await this.createGeneralStore(db);
    await this.populateTheme(generalStore);
  }

  async createGeneralStore(db: IDBPDatabase<unknown>) {
    const generalStore = db.createObjectStore("general", { keyPath: "id" });

    return generalStore;
  }

  async populateTheme(
    generalStore: IDBPObjectStore<
      unknown,
      ArrayLike<string>,
      "general",
      "versionchange"
    >
  ) {
    generalStore.add({
      id: "theme",
      background: "#e8e8e8",
      primary: "#947f57",
      secondary: "#3d3d3d",
      listEven: "#ffffff",
      listOdd: "#b9c2c4",
      listNeutral: "#e8e8e8",
    });
  }
}
