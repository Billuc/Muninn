export interface Tag {
  id: number;
  title: string;
  color: TagColor;
  icon?: string[];
}

export enum TagColor {
    red = "red",
    green = "green",
    blue = "blue"
}
