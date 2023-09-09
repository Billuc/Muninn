export interface Note {
  id: number;
  title: string;
  tagIds: number[];
  text: string;
}

export interface Tag {
  id: number;
  title: string;
}
