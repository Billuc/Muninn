import { v4 } from "uuid";
import Database from "../database/database";
import { CreateListElement, ListElement } from "../models/List";
import { ID } from "../models/ID";
import SubscribableService from "./base/subscribable";
import { injectable } from "tsyringe";

@injectable()
export class ListElementService extends SubscribableService<ListElement> {
  private readonly LIST_INDEX = "listId";
  private readonly PARENT_INDEX = "parentId";

  constructor(database: Database) {
    super(database, "list-elements");
  }

  async get(id: ID): Promise<ListElement> {
    const listElement = await this._get(id);
    return listElement;
  }

  async getAllFromList(listId: ID): Promise<ListElement[]> {
    const listElements = await this._getAllFromIndex(this.LIST_INDEX, listId);
    return listElements;
  }

  async create(create: CreateListElement): Promise<ListElement> {
    const listElement: ListElement = {
      id: v4(),
      title: create.title,
      done: false,
      index: 0,
      listId: create.listId,
      parentId: create.parentId
    };
    const created = await this._create(listElement);
    return created;
  }

  async update(update: ListElement): Promise<ListElement> {
    const updated = await this._update(update);
    return updated;
  }

  async remove(id: ID): Promise<void> {
    await this._remove(id);
  }
}
