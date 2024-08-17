import axios from 'axios';
import { injectable } from 'tsyringe';
import { v4 } from 'uuid';

import Database from '../database/database';
import { CreateNote, Note } from '../models/Note';
import { SERVER_URL } from '../models/ServerData';
import SubscribableService from './base/subscribable';

import type { ID } from "../models/ID";

@injectable()
export class NoteOnlineService extends SubscribableService<Note> {
  constructor(database: Database) {
    super(database, "");
  }

  async get(id: ID): Promise<Note> {
    const noteResponse = await axios.get(`${SERVER_URL}/notes/${id}`);

    if (noteResponse.status !== 200) {
      throw new Error(noteResponse.statusText);
    }

    const note: Note = noteResponse.data;
    return note;
  }

  async create(create: CreateNote): Promise<Note> {
    const noteResponse = await axios.post(`${SERVER_URL}/notes`, {
      id: v4(),
      title: create.title,
      text: create.text,
    });

    if (noteResponse.status !== 200) {
      throw new Error(noteResponse.statusText);
    }

    const note: Note = noteResponse.data;
    this._notify({
      action: "create",
      id: note.id,
      value: note,
    });
    return note;
  }

  async update(update: Note): Promise<Note> {
    const noteResponse = await axios.post(`${SERVER_URL}/notes/${update.id}`, {
      id: update.id,
      title: update.title,
      text: update.text,
    });

    if (noteResponse.status !== 200) {
      throw new Error(noteResponse.statusText);
    }

    const note: Note = noteResponse.data;
    this._notify({
      action: "update",
      id: note.id,
      value: note,
    });
    return note;
  }

  async remove(id: ID): Promise<void> {
    const noteResponse = await axios.delete(`${SERVER_URL}/notes/${id}`);

    if (noteResponse.status !== 200) {
      throw new Error(noteResponse.statusText);
    }

    this._notify({
      action: "remove",
      id: id,
    });
  }
}
