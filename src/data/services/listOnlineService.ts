import axios from 'axios';
import { injectable } from 'tsyringe';
import { v4 } from 'uuid';

import Database from '../database/database';
import { SERVER_URL } from '../models/ServerData';
import SubscribableService from './base/subscribable';

import type { CreateList, List } from "../models/List";
import type { ID } from "../models/ID";

@injectable()
export class ListOnlineService extends SubscribableService<List> {
  constructor(database: Database) {
    super(database, "");
  }

  async get(id: ID): Promise<List> {
    const listResponse = await axios.get(`${SERVER_URL}/lists/${id}`);

    if (listResponse.status !== 200) {
      throw new Error(listResponse.statusText);
    }

    const list: List = listResponse.data;
    return list;
  }

  async create(create: CreateList): Promise<List> {
    const listResponse = await axios.post(`${SERVER_URL}/lists`, {
      id: v4(),
      title: create.title,
      hideChecked: true,
    });

    if (listResponse.status !== 200) {
      throw new Error(listResponse.statusText);
    }

    const list: List = listResponse.data;
    this._notify({
      action: "create",
      id: list.id,
      value: list,
    });
    return list;
  }

  async update(update: List): Promise<List> {
    const listResponse = await axios.post(`${SERVER_URL}/lists/${update.id}`, {
      id: update.id,
      title: update.title,
      hideChecked: update.hideChecked,
    });

    if (listResponse.status !== 200) {
      throw new Error(listResponse.statusText);
    }

    const list: List = listResponse.data;
    this._notify({
      action: "update",
      id: list.id,
      value: list,
    });
    return list;
  }

  async remove(id: ID): Promise<void> {
    const listResponse = await axios.delete(`${SERVER_URL}/lists/${id}`);

    if (listResponse.status !== 200) {
      throw new Error(listResponse.statusText);
    }

    this._notify({
      action: "remove",
      id: id,
    });
  }
}
