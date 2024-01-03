import type { PipelineMiddleware } from "pipelineer";

import type UpgradeDatabase from "./upgradeDatabase";
import type { IDBPDatabase, IDBPTransaction } from "idb";

export default abstract class Migration
  implements PipelineMiddleware<UpgradeDatabase, Promise<undefined>>
{
  abstract version: number;
  abstract name: string;

  async exec(
    request: UpgradeDatabase,
    next: (req: UpgradeDatabase) => Promise<undefined> | undefined
  ): Promise<undefined> {
    if (
      request.oldVersion >= this.version ||
      this.version > (request.newVersion ?? -1)
    ) {
      console.debug(
        `[Migration] Skipping migration ${this.version} - ${this.name}`
      );
      await next(request);
      return;
    }

    console.log(
      `[Migration] Applying migration ${this.version} - ${this.name}`
    );
    await this.migrate(request.db, request.transaction);
    console.warn(
      `[Migration] Applied migration ${this.version} - ${this.name}`
    );

    await next(request);
  }

  abstract migrate(
    db: IDBPDatabase,
    transaction: IDBPTransaction<unknown, ArrayLike<string>, "versionchange">
  ): Promise<undefined>;
}
