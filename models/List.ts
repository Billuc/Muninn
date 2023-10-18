import { ID } from "./ID";

export interface ListElementDTO {
  id: ID;
  title: string;
  done: boolean;
  index: number;
  children: ListElementDTO[];
}

export interface ListElement {
  id: ID;
  title: string;
  done: boolean;
  index: number;
  parentId?: ID;
}

export interface List {
  id: ID;
  title: string;
  elements: Map<ID, ListElement>;
  nextElementId: number;
}
