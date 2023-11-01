import { v4 } from "uuid";
import Database from "../database/database";
import type { Note, CreateNote } from "../models/Note";
import type { ID } from "../models/ID";
import SubscribableService from "./base/subscribable";
import { injectable } from "tsyringe";

@injectable()
export class NoteService extends SubscribableService<Note> {
  constructor(database: Database) {
    super(database, "events");
  }

  async get(id: ID): Promise<Note> {
    const note = await this._get(id);
    return note;
  }

  async getAll(): Promise<Note[]> {
    const notes = await this._getAll();
    return notes;
  }

  async create(create: CreateNote): Promise<Note> {
    const event: Note = {
      id: v4(),
      title: create.title,
      text: create.text,
      tagId: create.tagId,
    };
    const created = await this._create(event);
    return created;
  }

  async update(update: Note): Promise<Note> {
    const updated = await this._update(update);
    return updated;
  }

  async remove(id: ID): Promise<void> {
    await this._remove(id);
  }
}
