import { PipelineMiddleware } from "pipelineer";
import UpgradeDatabase from "./upgradeDatabase";
import { IDBPDatabase, IDBPTransaction } from "idb";

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
    )
      return;

    await this.migrate(request.db, request.transaction);
    console.warn(`[Migration] Applied migration ${this.version} - ${this.name}`)
    
    await next(request);
  }

  abstract migrate(
    db: IDBPDatabase,
    transaction: IDBPTransaction<unknown, ArrayLike<string>, "versionchange">
  ): Promise<undefined>;
}
