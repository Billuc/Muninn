export interface ListElement {
  id: number;
  title: string;
  done: boolean;
  index: number;
}

export interface List {
  id: number;
  title: string;
  elements: Map<number, ListElement>;
  nextElementId: number;
}
