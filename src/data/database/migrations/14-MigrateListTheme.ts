import { IDBPDatabase, IDBPTransaction } from "idb";

import Migration from "../migration";

export default class MigrateListThemeMigration extends Migration {
  version: number = 14;
  name: string = "MigrateListTheme";

  async migrate(
    _: IDBPDatabase<unknown>,
    transaction: IDBPTransaction<unknown, ArrayLike<string>, "versionchange">
  ): Promise<undefined> {
    const generalStore = transaction.objectStore("general");
    const currentTheme = await generalStore.get("theme");
    generalStore.put({
      id: "theme",
      background: currentTheme.background,
      backgroundText: currentTheme.backgroundText,
      primary: currentTheme.primary,
      primaryText: currentTheme.primaryText,
      secondary: currentTheme.secondary,
      secondaryText: currentTheme.secondaryText,
      list: currentTheme.listEven,
    });
  }
}
