import { injectable } from "tsyringe";

import Database from "../database/database";
import { Theme } from "../models/Theme";
import SubscribableService from "./base/subscribable";

@injectable()
export class ThemeService extends SubscribableService<Theme> {
  private readonly THEME_KEY = "theme";

  constructor(database: Database) {
    super(database, "general");
  }

  async get(): Promise<Theme> {
    const theme = await this._get(this.THEME_KEY);
    return theme;
  }

  async update(update: Theme): Promise<Theme> {
    const updated = await this._update(update);
    return updated;
  }
}
