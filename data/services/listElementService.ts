import { v4 } from "uuid";
import Database from "../database/database";
import type {
  CreateListElement,
  ListElement,
  UpdateListElement,
} from "../models/List";
import type { ID } from "../models/ID";
import SubscribableService from "./base/subscribable";
import { injectable } from "tsyringe";

@injectable()
export class ListElementService extends SubscribableService<ListElement> {
  private readonly LIST_INDEX = "listId";
  private readonly LIST_PARENT_INDEX = "listId_parentId";

  constructor(database: Database) {
    super(database, "list-elements");
  }

  async get(id: ID): Promise<ListElement> {
    const listElement = await this._get(id);
    return listElement;
  }

  async getAllChildren(listId: ID, parentId?: ID): Promise<ListElement[]> {
    const listElements = await this._getAllFromIndex(this.LIST_PARENT_INDEX, [
      listId,
      parentId ?? "",
    ]);
    return listElements;
  }

  async create(create: CreateListElement): Promise<ListElement> {
    const listElement: ListElement = {
      id: v4(),
      title: create.title,
      done: false,
      index: 0,
      listId: create.listId,
      parentId: create.parentId,
    };
    const created = await this._create(listElement);
    return created;
  }

  async update(update: UpdateListElement): Promise<ListElement> {
    const element = await this._get(update.id);
    const updatedElement: ListElement = {
      ...element,
      done: update.done ?? element.done,
      title: update.title ?? element.title,
    };
    
    const updated = await this._update(updatedElement);
    return updated;
  }

  async sortChildren(parentId: ID, sortedChildren: ListElement[]) {
    const updatePromises = sortedChildren.map(
      async (c, i) =>
        await this._update({
          id: c.id,
          done: c.done,
          index: i,
          listId: c.listId,
          parentId: parentId,
          title: c.title,
        })
    );

    await Promise.all(updatePromises);
  }

  async remove(id: ID): Promise<void> {
    await this._remove(id);
  }
}
