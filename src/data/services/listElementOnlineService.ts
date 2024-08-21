import axios from "axios";
import { injectable } from "tsyringe";
import { v4 } from "uuid";

import Database from "../database/database";
import { SERVER_URL } from "../models/ServerData";
import SubscribableService from "./base/subscribable";

import type {
  CreateListElement,
  ListElement,
  UpdateListElement,
} from "../models/List";
import type { ID } from "../models/ID";

@injectable()
export class ListElementOnlineService extends SubscribableService<ListElement> {
  constructor(database: Database) {
    super(database, "");
  }

  async getAllChildren(id: ID): Promise<ListElement[]> {
    const elementsResponse = await axios.get(
      `${SERVER_URL}/lists/${id}/elements`
    );

    if (elementsResponse.status !== 200) {
      throw new Error(elementsResponse.statusText);
    }

    const elements: ListElement[] = elementsResponse.data;
    return elements;
  }

  async create(create: CreateListElement): Promise<ListElement> {
    const elementResponse = await axios.post(`${SERVER_URL}/list-elements`, {
      id: v4(),
      title: create.title,
      done: false,
      index: create.index,
      parentId: create.parentId ?? "",
      listId: create.listId,
    });

    if (elementResponse.status !== 200) {
      throw new Error(elementResponse.statusText);
    }

    const element: ListElement = elementResponse.data;
    this._notify({
      action: "create",
      id: element.id,
      value: element,
    });
    return element;
  }

  async update(update: UpdateListElement): Promise<ListElement> {
    const elementResponse = await axios.post(
      `${SERVER_URL}/list-elements/${update.id}`,
      {
        id: update.id,
        title: update.title,
        done: update.done,
      }
    );

    if (elementResponse.status !== 200) {
      throw new Error(elementResponse.statusText);
    }

    const element: ListElement = elementResponse.data;
    this._notify({
      action: "update",
      id: element.id,
      value: element,
    });
    return element;
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

  async sortChildren(
    parentId: ID,
    sortedChildren: ListElement[]
  ): Promise<void> {
    const listResponse = await axios.post(
      `${SERVER_URL}/lists/${parentId}/sort`,
      sortedChildren
    );

    if (listResponse.status !== 200) {
      throw new Error(listResponse.statusText);
    }
  }
}
