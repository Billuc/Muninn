import { injectable } from 'tsyringe';
import { v4 } from 'uuid';

import Database from '../database/database';
import SubscribableService from './base/subscribable';
import { ListService } from './listService';

import type {
  CreateListElement,
  ListElement,
  UpdateListElement,
} from "../models/List";
import type { ID } from "../models/ID";
@injectable()
export class ListElementService extends SubscribableService<ListElement> {
  private readonly LIST_INDEX = "listId";
  private readonly LIST_PARENT_INDEX = "listId_parentId";
  private readonly PARENT_INDEX = "parentId";

  constructor(database: Database, listService: ListService) {
    super(database, "list-elements");

    listService.subscribeEvents((act) => {
      if (act.action == "remove") {
        this.removeAllChildren(act.id);
      }
    });
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
    const siblings = await this.getAllChildren(create.listId, create.parentId);
    const listElement: ListElement = {
      id: v4(),
      title: create.title,
      done: false,
      index: siblings.length,
      listId: create.listId,
      parentId: create.parentId ?? "",
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

    if (update.done) {
      const children = await this.getAllChildren(element.listId, element.id);
      const childrenPromises = children.map(
        async (c) =>
          await this.update({
            id: c.id,
            done: true,
          })
      );
      await Promise.all(childrenPromises);
    } else if (update.done === false && !!element.parentId) {
      await this.update({ id: element.parentId, done: false });
    }

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

    const children = await this._getAllFromIndex(this.PARENT_INDEX, id);
    await Promise.all(children.map((c) => this.remove(c.id)));
  }

  async removeAllChildren(listId: string): Promise<void> {
    const children = await this._getAllFromIndex(this.LIST_INDEX, listId);

    await Promise.all(children.map((c) => this._remove(c.id)));
  }
}
