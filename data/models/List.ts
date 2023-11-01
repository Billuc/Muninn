import { ID } from "./ID";

export interface ListTreeElement {
  id: ID;
  title: string;
  done: boolean;
  index: number;
  children: ListTreeElement[];
}

export interface ListElement {
  id: ID;
  title: string;
  done: boolean;
  index: number;
  parentId?: ID;
  listId: ID;
}

export interface List {
  id: ID;
  title: string;
  hideChecked: boolean;
}

export interface CreateList {
  title: string;
}

export interface CreateListElement {
  title: string;
  parentId?: ID;
  listId: ID;
}
