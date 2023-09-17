export interface Tag {
  id: number;
  title: string;
  color: TagColor;
  icon?: string[];
}

export enum TagColor {
  red = "red",
  orange = "orange",
  yellow = "yellow",
  green = "green",
  cyan = "cyan",
  blue = "blue",
  purple = "purple",
}
