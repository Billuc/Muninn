import { IDBPDatabase, IDBPObjectStore, IDBPTransaction } from "idb";

import Migration from "../migration";

export default class SetTextColorsMigration extends Migration {
  version: number = 10;
  name: string = "SetTextColors";

  async migrate(
    _: IDBPDatabase<unknown>,
    transaction: IDBPTransaction<unknown, ArrayLike<string>, "versionchange">
  ): Promise<undefined> {
    const generalStore = transaction.objectStore("general");
    await this.populateTheme(generalStore);
  }

  async populateTheme(
    generalStore: IDBPObjectStore<
      unknown,
      ArrayLike<string>,
      "general",
      "versionchange"
    >
  ) {
    const currentValue = await generalStore.get("theme");
    const updatedValue = {
      ...currentValue,
      backgroundText: "#252525",
      primaryText: "#000000",
      secondaryText: "#fafafa",
    };
    await generalStore.put(updatedValue);
  }
}
