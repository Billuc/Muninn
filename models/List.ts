export interface ListElementDTO {
  id: number;
  title: string;
  done: boolean;
  index: number;
  children: ListElementDTO[];
}

export interface ListElement {
  id: number;
  title: string;
  done: boolean;
  index: number;
  parentId?: number;
}

export interface List {
  id: number;
  title: string;
  elements: Map<number, ListElement>;
  nextElementId: number;
}
